# -*- coding: utf-8 -*-

# Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

from google.appengine.dist import use_library
use_library('django', '0.96')

import logging
import time
import sys
import exceptions
import google.appengine.ext.db
from google.appengine.api import namespace_manager
from google.appengine.api import mail
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from django.utils import simplejson
from datetime import datetime, timedelta

# Whether debugging should be turned on:
debug = False

# Dumps the data "data" as JSONP response, with the correct MIME type.
# "obj" is the object from which the response is generated.
def dump_jsonp(obj, data, callback):
    obj.response.headers['Content-Type'] = \
        'application/javascript; charset=utf-8';
    obj.response.out.write(callback + '(' + simplejson.dumps(data) + ')')

# General information about the construction.
class Construction(db.Model):
    # How often the client should update server data.
    update_interval_client = db.IntegerProperty() # ms

    # Version of the blocks configuration. Is the string representation of an
    # integer because the integer may become very large. The version is
    # incremented every time a change is made to the construction, for example
    # if a block has been built or requested to be built.
    blocks_data_version = db.StringProperty()

    # Camera properties (see client code for detailed description). The camera
    # version is the version of the data below. It is increased every time the
    # data is changed. See also the description of the blocks version.
    camera_data_version = db.StringProperty()
    camera_pos = db.ListProperty(float) # position in world space
    camera_a_x = db.FloatProperty(default=0.) # angle of rotation about x
    camera_a_y = db.FloatProperty(default=0.) # angle of rotation about y
    camera_a_z = db.FloatProperty(default=0.) # angle of rotation about z
    camera_fl = db.FloatProperty(default=1.) # focal length
    camera_sensor_resolution = \
        db.FloatProperty(default=100.) # sensor resolution

    def prerender_mode(self):
        query = PrerenderMode.all().ancestor(self)
        prerender_mode = query.get()
        if prerender_mode is None:
            raise Exception('Could not get prerender-mode data')
        else:
            return prerender_mode

    # Increases the blocks version number. Should be run in a transaction.
    def increase_blocks_data_version(self):
        self.blocks_data_version = str(int(self.blocks_data_version) + 1)
        self.put()

    # Increases the camera version number. Should be run in a transaction.
    def increase_camera_data_version(self):
        self.camera_data_version = str(int(self.camera_data_version) + 1)
        self.put()

    # Returns the main construction, which is the only construction. Raises an
    # exception, if the construction cannot be found.
    @classmethod
    def get_main(cls):
        construction = Construction.get_by_key_name('main')
        if construction:
            return construction
        else:
            raise Exception('Could not find construction')

# Data specific to prerender-mode.
class PrerenderMode(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # With prerender-mode enabled, a block is automatically made real after
    # "make_real_after" milliseconds, and if the total construction would
    # afterwards match one of the block configurations in the list
    # "block_configurations".
    #
    # If the block has 2-fold rotational symmetry, then the prerendered block
    # configurations are only allowed to contain blocks rotated by angles 0°
    # and 90°!
    is_enabled = db.BooleanProperty()
    make_real_after = db.IntegerProperty() # ms
    block_configurations = db.StringListProperty()

    # If "reset_at" is set, then the current configuration is reset to
    # prerendered block configuration number 0 at or after that time. When a
    # reset is requested, then - unless already set - "reset_at" is set to:
    #
    #   now plus "reset_delay"
    reset_delay = db.IntegerProperty() # ms
    reset_at = db.DateTimeProperty(None)

    # Index of the currently loaded prerendered block configuration, and of the
    # previously loaded one:
    i = db.IntegerProperty()
    prev_i = db.IntegerProperty(default=-1) # -1 = nothing

    # Increases the data version number. Should be run in a transaction.
    def increase_data_version(self):
        self.data_version = str(int(self.data_version) + 1)
        self.put()

    def reset_should_happen(self):
        return self.reset_at != None and datetime.now() >= self.reset_at

    def unschedule_reset(self):
        self.reset_at = None
        self.put()

    # Replaces all construction blocks with those in the prerendered block
    # configuration number "i". Should be run in a transaction.
    def load_block_configuration(self, i):
        construction = self.parent()

        block_configurations = self.block_configurations

        if i < len(block_configurations):
            # Deletes all block entries:
            queries = [Block.all().ancestor(construction)]
            for query in queries:
                for result in query:
                    result.delete()

            # Inserts blocks:
            blocks = simplejson.loads(block_configurations[i])
            for block in blocks:
                x_b = block[0]
                y_b = block[1]
                z_b = block[2]
                a = block[3]
                block = Block.insert_at(construction, [x_b, y_b, z_b], a)
                block.state = 2
                block.put()

            construction.increase_blocks_data_version()

            self.prev_i = self.i
            self.i = i
            self.increase_data_version()
        else:
            raise Exception('Index out of bounds')

# Data specific to the new block.
class NewBlock(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # Initial position, in block space:
    init_pos_b = db.ListProperty(int)

    # Initial rotation angle:
    init_a = db.IntegerProperty() # multiples of 90°, CCW when viewed from
                                  # above

    # Points in block space, defining the rectangle which represents the space
    # in which the block may be moved around.
    move_space_1_b = db.ListProperty(int)
    move_space_2_b = db.ListProperty(int)

    # Points in block space, defining the rectangle which represents the space
    # in which the block may be built.
    build_space_1_b = db.ListProperty(int)
    build_space_2_b = db.ListProperty(int)

class Block(db.Model):
    # Position, in block space:
    pos_b = db.ListProperty(int)

    # Rotation angle:
    a = db.IntegerProperty() # ° CCW when viewed from above

    # 0 = deleted, 1 = pending, 2 = real
    state = db.IntegerProperty(default=0)

    # Time stamp of last state change, which includes the initial block
    # creation:
    time_stamp = db.IntegerProperty() # s

    # Returns the datastore key name of a block at "x_b", "y_b", "z_b", rotated
    # by "a".
    @classmethod
    def build_key_name(cls, pos_b, a):
        x_b = pos_b[0]
        y_b = pos_b[1]
        z_b = pos_b[2]
        return str(x_b) + ',' + str(y_b) + ',' + str(z_b) + ',' + str(a)

    # Returns the block at the block space position "pos_b", rotated by
    # the angle "a", in the construction "construction", or "None", if the
    # block cannot be found. Also returns blocks in state deleted.
    @classmethod
    def get_at(cls, construction, pos_b, a):
        return cls.get_by_key_name(cls.build_key_name(pos_b, a), 
                                   parent = construction)

    # Inserts a block at the block space position "pos_b" in the
    # construction "construction", with the initial state deleted. The block is
    # rotated by "a", CCW when viewed from above. Raises an exception on
    # failure. Returns the block.
    @classmethod
    def insert_at(cls, construction, pos_b, a):
        return Block(parent = construction, 
                     key_name = cls.build_key_name(pos_b, a),
                     pos_b = pos_b, a = a,
                     time_stamp = long(time.time()))

    # If there is a block at "pos_b", rotated by "a", in the state "state"
    # in the construction associated with the current block, returns that
    # block. Otherwise returns "None".
    def get_at_with_state(self, pos_b, a, state):
        construction = self.parent()
        block = self.get_at(construction, pos_b, a)
        if block and block.state == state:
            return block
        else:
            return None

    # The set with all the positions, relative to a block in block space,
    # that would intersect with the block. The position of the block itself
    # - that would be (0, 0) - is not included.
    intersecting_relative_xy_positionsB = [
        (-1, 0), 
        (-1, 1), (0, 1), (1, 1),
        (1, 0),
        (1, -1), (0, -1), (-1, -1)]

    def x_b(self):
        return self.pos_b[0]

    def y_b(self):
        return self.pos_b[1]

    def z_b(self):
        return self.pos_b[2]

    # Returns True, iff the block "block" intersects with any real block. Self
    # intersection does not count as intersection.
    def is_intersecting_with_real(self):
        return False # currently not implemented

    # Deletes any pending blocks intersecting with the current block, aside
    # from the block itself.
    def delete_intersecting_pending_blocks(self):
        for relative_xy_posB in self.intersecting_relative_xy_positionsB:
            testXB = self.x_b() + relative_xy_posB[0]
            testYB = self.y_b() + relative_xy_posB[1]
            testZB = self.z_b()
            testA = self.a
            testBlock = self.get_at_with_state([testXB, testYB, testZB], 
                                               testA, 1)
            if testBlock:
                # Intersecting pending block exists. => It is deleted:
                testBlock.state = 0
                testBlock.put()

    # Sets the state of the block to "state", also updating the time stamp.
    # Increases the blocks version number. Returns the new blocks data version.
    #
    # Should be run in a transaction.
    def store_state_and_increase_blocks_data_version(self, state):
        self.state = state
        self.time_stamp = long(time.time())
        self.put()
        self.parent().increase_blocks_data_version()
        return self.parent().blocks_data_version

    # Tries to make the block real. Increases construction blocks version
    # number, if something has changed. May delete intersecting blocks.
    #
    # Returns true, iff the bock was made real or if it was already real.
    #
    # Should be run in a transaction.
    def make_real(self):
        if self.state != 2:
            if self.is_intersecting_with_real():
                # Block intersects with real block. => Should be deleted.
                return False
            else:
                self.delete_intersecting_pending_blocks()
                self.store_state_and_increase_blocks_data_version(2)
                return True
        else:
            # block already real
            return True

# Properties of the block: shape, size, how to attach blocks, etc.
class BlockProperties(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # True if the block has two-fold rotational symmetry, when viewed from
    # above. Note that this setting is irrespective of the center of rotation.
    has_2_fold_symmetry = db.BooleanProperty()

    # Block dimensions in world space. The side length of a block is
    # approximately two times the grid spacing in the respective direction.
    pos_spacing_xy = db.FloatProperty() # mm
    pos_spacing_z = db.FloatProperty() # mm

    # Outline of a block in the xy plane, with coordinates in block space,
    # counterclockwise, when not rotated:
    outline_bxy = db.StringProperty() # JSON array

    # Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    # block 1 in the block space x-y-plane by any of the following values. The
    # rotation angles below are those of block 2 relative to block 1. The
    # offsets are stored as JSON arrays.
    #
    # If the block has 2-fold rotational symmetry, then the list has two
    # entries, for 0° and 90°. Otherwise it has four entries.
    collision_offsets_list_bxy = db.StringListProperty()

    # A block 2 is defined to be attachable to a block 1, if it is offset
    # against block 1 by any of the following values, in block space. The
    # rotation angles below are those of block 2 relative to block 1. The
    # offsets are stored as JSON arrays.
    #
    # If the block has 2-fold rotational symmetry, then the list has two
    # entries, for 0° and 90°. Otherwise it has four entries.
    attachment_offsets_list_b = db.StringListProperty()

    # Center of rotation, with coordinates in block space, relative to the
    # lower left corner of the unrotated block, when viewed from above:
    rot_center_bxy = db.ListProperty(float)

    # Alpha transparency of the block's background:
    background_alpha = db.FloatProperty()

# Information concerning sending info emails about pending blocks.
class PendingBlockEmail(db.Model):
    sender_address = db.EmailProperty()
    recipient_address = db.EmailProperty()

# Data describing a construction, including building blocks.
class RPCConstruction(webapp.RequestHandler):
    # Returns the blocks as an array of dictionaries.
    @classmethod
    def get_blocks_data_blocks(cls, construction):
        query = Block.all().ancestor(construction)
        blocks = []
        for block in query:
            blocks.append({
                    'posB': block.pos_b, 
                    'a': block.a,
                    'state': block.state,
                    'timeStamp': block.time_stamp})
        return blocks

    # Returns JSON serializable data related to blocks.
    @classmethod
    def get_blocks_data(cls, construction, blocks_data_version_client):
        blocks_data_version = construction.blocks_data_version
        blocks_data_changed = \
            (blocks_data_version != blocks_data_version_client)
        data = {
            'version': blocks_data_version,
            'changed': blocks_data_changed}
        if blocks_data_changed:
            # Blocks version on server not the same as on client. => Deliver
            # all the data.
            data.update({
                    'blocks': cls.get_blocks_data_blocks(construction)})
        return data

    # Returns JSON serializable data related to the camera.
    @classmethod
    def get_camera_data(cls, construction, camera_data_version_client):
        camera_data_version = construction.camera_data_version
        camera_data_changed = \
            (camera_data_version != camera_data_version_client)
        data = {
            'version': camera_data_version,
            'changed': camera_data_changed}
        if camera_data_changed:
            # Camera version on server not the same as on client. =>
            # Deliver all the data.
            data.update({
                    'pos': construction.camera_pos,
                    'aX': construction.camera_a_x,
                    'aY': construction.camera_a_y,
                    'aZ': construction.camera_a_z,
                    'fl': construction.camera_fl,
                    'sensorResolution': construction.camera_sensor_resolution})
        return data

    @classmethod
    def json_decode_list(cls, l):
        return map(simplejson.loads, l)

    # Returns JSON serializable data related to the block properties.
    @classmethod
    def get_block_properties_data(cls, construction, 
                                  block_properties_data_version_client):
        query = BlockProperties.all().ancestor(construction)
        block_properties = query.get()
        if block_properties is None:
            raise Exception('Could not get block properties data')

        block_properties_data_version = block_properties.data_version
        block_properties_data_changed = \
            (block_properties_data_version != 
             block_properties_data_version_client)
        data = {
            'version': block_properties_data_version,
            'changed': block_properties_data_changed}
        if block_properties_data_changed:
            # Block properties data version on server not the same as on
            # client. => Deliver all the data.
            data.update({'has2FoldSymmetry': 
                         block_properties.has_2_fold_symmetry,
                         'posSpacingXY': 
                         block_properties.pos_spacing_xy,
                         'posSpacingZ': 
                         block_properties.pos_spacing_z,
                         'outlineBXY': 
                         simplejson.loads(block_properties.outline_bxy),
                         'collisionOffsetsListBXY': \
                             cls.json_decode_list \
                             (block_properties.collision_offsets_list_bxy),
                         'attachmentOffsetsListB': \
                             cls.json_decode_list \
                             (block_properties.attachment_offsets_list_b),
                         'rotCenterBXY': block_properties.rot_center_bxy,
                         'backgroundAlpha': block_properties.background_alpha})
        return data

    # Returns JSON serializable data related to the new block
    @classmethod
    def get_new_block_data(cls, construction, new_block_data_version_client):
        query = NewBlock.all().ancestor(construction)
        new_block = query.get()
        if new_block is None:
            raise Exception('Could not get new block data')

        new_block_data_version = new_block.data_version
        new_block_data_changed = (new_block_data_version != 
                                  new_block_data_version_client)
        data = {
            'version': new_block_data_version,
            'changed': new_block_data_changed}
        if new_block_data_changed:
            # New block data version on server not the same as on client. =>
            # Deliver all the data.
            data.update({'initPosB': new_block.init_pos_b,
                         'initA': new_block.init_a,
                         'moveSpace1B': new_block.move_space_1_b,
                         'moveSpace2B': new_block.move_space_2_b,
                         'buildSpace1B': new_block.build_space_1_b,
                         'buildSpace2B': new_block.build_space_2_b})
        return data

    # Returns JSON serializable data related to prerender-mode.
    @classmethod
    def get_prerender_mode_data(cls, construction, 
                                prerender_mode_data_version_client):
        query = PrerenderMode.all().ancestor(construction)
        prerender_mode = query.get()
        if prerender_mode is None:
            raise Exception('Could not get prerender-mode data')

        prerender_mode_data_version = prerender_mode.data_version
        prerender_mode_data_changed = (prerender_mode_data_version != 
                                       prerender_mode_data_version_client)
        data = {
            'version': prerender_mode_data_version,
            'changed': prerender_mode_data_changed}
        if prerender_mode_data_changed:
            # Prerender-mode data version on server not the same as on client.
            # => Deliver all the data.
            data.update({'isEnabled': prerender_mode.is_enabled,
                         'makeRealAfter': prerender_mode.make_real_after,
                         'blockConfigurations': \
                             cls.json_decode_list \
                             (prerender_mode.block_configurations),
                         'i': prerender_mode.i,
                         'prevI': prerender_mode.prev_i,
                         'resetDelay': prerender_mode.reset_delay})
        return data

    # Only has an effect in prerender-mode.
    #
    # If behind or on schedule, resets the current block configuration to
    # prerendered block configuration number 0.
    @classmethod
    def reset_if_scheduled(cls, construction):
        prerender_mode = construction.prerender_mode()
        if prerender_mode.is_enabled and prerender_mode.reset_should_happen():
            prerender_mode.load_block_configuration(0)
            prerender_mode.unschedule_reset()

    # A transaction may not be necessary, but it ensures data integrity for
    # example if there is a transaction missing somewhere else.
    @classmethod
    def transaction(cls,
                    blocks_data_version_client, 
                    camera_data_version_client,
                    block_properties_data_version_client,
                    new_block_data_version_client,
                    prerender_mode_data_version_client):
        construction = Construction.get_main()

        cls.reset_if_scheduled(construction)

        data = {
            'updateIntervalClient': construction.update_interval_client,
            'blocksData':
                cls.get_blocks_data(construction, blocks_data_version_client),
            'cameraData':
                cls.get_camera_data(construction, camera_data_version_client),
            'blockPropertiesData':
                cls.get_block_properties_data(
                construction, block_properties_data_version_client),
            'newBlockData': cls.get_new_block_data(
                construction, new_block_data_version_client),
            'prerenderModeData': cls.get_prerender_mode_data(
                construction, prerender_mode_data_version_client)
        }
        return data

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            blocks_data_version_client = \
                self.request.get('blocksDataVersion')
            camera_data_version_client = \
                self.request.get('cameraDataVersion')
            block_properties_data_version_client = \
                self.request.get('blockPropertiesDataVersion')
            new_block_data_version_client = \
                self.request.get('newBlockDataVersion')
            prerender_mode_data_version_client = \
                self.request.get('prerenderModeDataVersion')
            callback = self.request.get('callback')

            data = db.run_in_transaction \
                (self.transaction, 
                 blocks_data_version_client, 
                 camera_data_version_client,
                 block_properties_data_version_client,
                 new_block_data_version_client,
                 prerender_mode_data_version_client)
            dump_jsonp(self, data, callback)
        except Exception, e:
            logging.error('Could not retrieve data: ' + str(e))

# Changes the status of the block at the provided position to real. If the
# block isn't in the construction, then the operation fails. If the block
# intersects with any real block, then it is deleted. If there are pending
# blocks that intersect with the newly turned real block, then they are
# deleted.
# 
# Silently fails on error.
class RPCAdminMakeReal(webapp.RequestHandler):
    # Tries to make the block at the block position "x_b", "y_b", "z_b", and
    # rotated by the angle "a", real.
    @classmethod
    def transaction(cls, x_b, y_b, z_b, a):
        construction = Construction.get_main()
       
        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block:
            return # no block
        else:
            block.make_real()

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            callback = self.request.get('callback')
            db.run_in_transaction(RPCAdminMakeReal.transaction, 
                                  x_b, y_b, z_b, a)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not make block real: ' + str(e))

# Only has an effect if prerender-mode is enabled.
#
# Requests a reset of the block configuration to the prerendered block
# configuration 0. The reset is scheduled to happen at or after: now plus
# "reset_delay". If a reset is already scheduled, then that schedule is not
# changed.
# 
# Silently fails on error.
class RPCScheduleReset(webapp.RequestHandler):
    @classmethod
    def transaction(cls):
        construction = Construction.get_main()

        prerender_mode = construction.prerender_mode()

        if prerender_mode.is_enabled:
            if prerender_mode.reset_at == None:
                delay = prerender_mode.reset_delay
                prerender_mode.reset_at = datetime.now() + timedelta(0, 0, 0, 
                                                                     delay)
                prerender_mode.put()

    # Only runs if prerender-mode is enabled.
    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not schedule reset: ' + str(e))

# Loads the prerendered block configuration with the provided index.
# 
# Silently fails on error.
class RPCLoadPrerenderedBlockConfiguration(webapp.RequestHandler):
    # If prerender-mode is enabled, then replaces all blocks with the blocks in
    # the prerendered block configuration with index "i".
    @classmethod
    def transaction(cls, i):
        construction = Construction.get_main()

        prerender_mode = construction.prerender_mode()

        if prerender_mode.is_enabled:
            prerender_mode.load_block_configuration(i)

    # Only runs if prerender-mode is enabled.
    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))
            i = int(self.request.get('i'))
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction, i)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not load prerendered block configuration: ' + 
                          str(e))

# Sets the state of the block at the provided position to deleted.
#
# The request fails silently on error.
class RPCAdminDelete(webapp.RequestHandler):
    # Tries to delete the block at position "x_b", "y_b", "z_b", and rotated by
    # the angle "a".
    @classmethod
    def transaction(cls, x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if block:
            # block found to be set to state deleted
            block.store_state_and_increase_blocks_data_version(0)

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction, x_b, y_b, z_b, a)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not delete block: ' + str(e))

# Creates a block at the given position, with the state: pending to be build.
# If a block already exists in that position, and if that block is non-real and
# non-pending, then the state of that block is made pending. If the block
# intersects with a real block, then it is left in the state deleted.
#
# Possible reason for failure: Adding a pending block was requested from a
# client that doesn't yet know that this block is already real. In this case,
# that client will sooner or later pick up the latest version of the blocks,
# and inform the user that his request was denied. There is no need for an
# additional increase in blocks version number.
#
# If a new pending block has been created, or if the state of an existing
# non-pending block has been changed to pending, then an email is sent to the
# configured email address.
#
# The request fails silently on error.
class RPCCreatePending(webapp.RequestHandler):
    # Tries to send an email, informing that a pending block has been created,
    # or the state of an existing block has been changed to pending. The
    # position of the block: "pos_b" Its rotation angle: "a"
    @classmethod
    def send_info_email(cls, construction, pos_b, a):
        query = PendingBlockEmail.all().ancestor(construction)
        pending_block_email = query.get()
        if pending_block_email is None:
            raise Exception('Could not get pending block email data')

        sender_address = pending_block_email.sender_address
        recipient_address = pending_block_email.recipient_address
        subject = "New Pending Block"
        body = """
Position: %d, %d, %d
Angle: %d
""" % (pos_b[0], pos_b[1], pos_b[2], a)

        try:
            mail.send_mail(sender_address, recipient_address, subject, body)
        except:
            return False

        return True

    # Tries to create a pending block at the block position "x_b", "y_b",
    # "z_b", and rotated about its center of rotation by "a".
    @classmethod
    def transaction(cls, x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block:
            # Block has to be created, with initial state deleted. It is left
            # in that state, if it intersects with a real block - see below.
            block = Block.insert_at(construction, [x_b, y_b, z_b], a)

        if block.state == 2 or block.state == 1:
            # Block is real or block is already pending.
            return

        # Block neither real nor pending. => It's in the state deleted.

        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be left deleted.
            return

        block.store_state_and_increase_blocks_data_version(1) # Set to pending.
        cls.send_info_email(construction, [x_b, y_b, z_b], a)

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction, x_b, y_b, z_b, a)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not add pending block or set existing ' + 
                          'block to pending: ' + str(e))

# Changes the status of a real or deleted block to pending, unless the block
# does intersect with any real block. If there is no block at the provided
# position or if it is already pending, then nothing is done. If the block
# intersects with a real block, then it is deleted.
#
# The request fails silently on error.
class RPCAdminMakePending(webapp.RequestHandler):
    # Tries to turn the block at the block position "x_b", "y_b", "z_b" and
    # rotated by the angle "a" into a pending block, or sets its state to
    # deleted, if it intersects with a real block.
    @classmethod
    def transaction(cls, x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block or block.state == 1:
            # No block found, or block is already pending, or block intersects
            # with real block. => Nothing is done.
            return

        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be deleted.
            new_state = 0
        else:
            new_state = 1

        block.store_state_and_increase_blocks_data_version(new_state)

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction, x_b, y_b, z_b, a)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not make block pending: ' + str(e))

# Updates the camera settings and increases the camera version number.
#
# The request fails silently on error.
class RPCAdminUpdateSettings(webapp.RequestHandler):
    # Tries to update camera settings. Ignores values that cannot be assigned.
    @classmethod
    def transaction(cls, data):
        construction = Construction.get_main()

        for key, value in data.iteritems():
            try:
                setattr(construction, key, value)
            except:
                pass # nothing to be done

        construction.put()

        # Everything has gone well. Now the version of the data is updated.
        construction.increase_camera_data_version()

    def get(self):
        try:
            namespace_manager.set_namespace(self.request.get('namespace'))

            data = {
                'camera_pos': [float(self.request.get('camera.x')),
                               float(self.request.get('camera.y')),
                               float(self.request.get('camera.z'))],
                'camera_a_x': float(self.request.get('camera.aX')),
                'camera_a_y': float(self.request.get('camera.aY')),
                'camera_a_z': float(self.request.get('camera.aZ')),
                'camera_fl': float(self.request.get('camera.fl')),
                'camera_sensor_resolution':
                    float(self.request.get('camera.sensorResolution'))}
            callback = self.request.get('callback')
            db.run_in_transaction(self.transaction, data)
            dump_jsonp(self, {}, callback)
        except Exception, e:
            logging.error('Could not update camera data: ' + str(e))

class RealityBuilderJs(webapp.RequestHandler):
    def get(self):
        template_values = {
            'debug': debug,
            'host': self.request.host
            }
        
        path = os.path.join(os.path.dirname(__file__), 'realitybuilder.js')
        self.response.headers['Content-Type'] = \
            'application/javascript; charset=utf-8';
        self.response.out.write(template.render(path, template_values))

application = webapp.WSGIApplication([
    ('/realitybuilder.js', RealityBuilderJs),
    ('/admin/rpc/delete', RPCAdminDelete),
    ('/admin/rpc/make_real', RPCAdminMakeReal),
    ('/admin/rpc/make_pending', RPCAdminMakePending),
    ('/admin/rpc/update_settings', RPCAdminUpdateSettings),
    ('/rpc/construction', RPCConstruction),
    ('/rpc/create_pending', RPCCreatePending),
    ('/rpc/schedule_reset', RPCScheduleReset),
    ('/rpc/load_prerendered_block_configuration', 
     RPCLoadPrerenderedBlockConfiguration)],
    debug = debug)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
