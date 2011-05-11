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

import logging
import os
import time
import sys
import exceptions
import google.appengine.ext.db
from google.appengine.api import mail
from google.appengine.api import users
from google.appengine.api import urlfetch
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
from google.appengine.dist import use_library
use_library('django', '0.96')
from django.utils import simplejson

# Whether debugging should be turned on:
debug = True

# Dumps the data "data" as JSON response, with the correct MIME type.
# "obj" is the object from which the response is generated.
def dump_json(obj, data):
    obj.response.headers['Content-Type'] = 'application/json; charset=utf-8';
    obj.response.out.write(simplejson.dumps(data))

# General information about the construction.
class Construction(db.Model):
    # Version of the blocks configuration. Is the string representation of an
    # integer because the integer may become very large. The version is
    # incremented every time a change is made to the construction, for example
    # if a block has been built or requested to be built.
    blocks_data_version = db.StringProperty()

    # Camera properties (see client code for detailed description). The camera
    # version is the version of the data below. It is increased every time the
    # data is changed. See also the description of the blocks version.
    camera_data_version = db.StringProperty()
    camera_x = db.FloatProperty(default=1.) # x position
    camera_y = db.FloatProperty(default=1.) # y position
    camera_z = db.FloatProperty(default=1.) # z position
    camera_a_x = db.FloatProperty(default=0.) # angle of rotation about x
    camera_a_y = db.FloatProperty(default=0.) # angle of rotation about y
    camera_a_z = db.FloatProperty(default=0.) # angle of rotation about z
    camera_fl = db.FloatProperty(default=1.) # focal length
    camera_sensor_resolution = \
        db.FloatProperty(default=100.) # sensor resolution

    # Live background image, its URL, when it was last updated, and how often
    # it should be updated. When fetching the URL, a get parameter is appended,
    # to avoid caching the request by App Engine. The image version is the
    # version of the data below, not of the image itself. This version is
    # increased every time the data is changed. See also the description of the
    # blocks version.
    image_data_version = db.StringProperty()
    image = db.BlobProperty(default=None)
    image_url = db.LinkProperty()
    image_last_update = db.FloatProperty(default=0.) # s
    image_update_interval_server = db.FloatProperty(default=5.) # s
    image_update_interval_client = db.FloatProperty(default=5.) # s

    # Increases the blocks version number. Should be run in a transaction.
    def increase_blocks_data_version(self):
        self.blocks_data_version = str(int(self.blocks_data_version) + 1)
        self.put()

    # Increases the camera version number. Should be run in a transaction.
    def increase_camera_data_version(self):
        self.camera_data_version = str(int(self.camera_data_version) + 1)
        self.put()

    # Increases the image data version number. Should be run in a transaction.
    def increase_image_data_version(self):
        self.image_data_version = str(int(self.image_data_version) + 1)
        self.put()

    # Returns the main construction, which is the only construction. Raises an
    # exception, if the construction cannot be found.
    @staticmethod
    def get_main():
        construction = Construction.get_by_key_name('main')
        if construction:
            return construction
        else:
            raise Exception('could not find construction')

class Block(db.Model):
    xB = db.IntegerProperty()
    yB = db.IntegerProperty()
    zB = db.IntegerProperty()

    # 0 = deleted, 1 = pending, 2 = real
    state = db.IntegerProperty(default=0)

    # Time stamp of last state change, which includes the initial block
    # creation:
    time_stamp = db.IntegerProperty() # s

    # Returns the datastore key name of a block at "xB", "yB", "zB".
    @staticmethod
    def build_key_name(xB, yB, zB):
        return str(xB) + ',' + str(yB) + ',' + str(zB)

    # Returns the block at the block space position "xB", "yB", "zB" in the
    # construction "construction", or "None", if the block cannot be found.
    # Also returns blocks in state deleted.
    @staticmethod
    def get_by_positionB(construction, xB, yB, zB):
        return Block.get_by_key_name(
            Block.build_key_name(xB, yB, zB), parent=construction)

    # Inserts a block at the block space position "xB", "yB", "zB" in the
    # construction "construction", with the initial state deleted. Raises an
    # exception on failure. Returns the block.
    @staticmethod
    def insert_at_positionB(construction, xB, yB, zB):
        return Block(parent=construction, 
                     key_name=Block.build_key_name(xB, yB, zB),
                     xB=xB, yB=yB, zB=zB, 
                     time_stamp=long(time.time()))

    # If there is a block at "xB", "yB", "zB" in the state "state" in the
    # construction "construction", returns that block. Otherwise returns
    # "None".
    @staticmethod
    def get_at(construction, xB, yB, zB, state):
        block = Block.get_by_key_name(Block.build_key_name(xB, yB, zB), 
                                      parent=construction)
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

    # Returns True, iff the block "block" intersects with any real block. Self
    # intersection does not count as intersection.
    def is_intersecting_with_real(self):
        for relative_xy_positionB in self.intersecting_relative_xy_positionsB:
            testXB = self.xB + relative_xy_positionB[0]
            testYB = self.yB + relative_xy_positionB[1]
            testZB = self.zB
            testBlock = Block.get_at(self.parent(), 
                                     testXB, testYB, testZB, 2)
            if testBlock:
                # Intersecting real block exists.
                return True
        return False

    # Deletes any pending blocks intersecting with the block "block", aside
    # from the block itself.
    @staticmethod
    def delete_intersecting_pending_blocks(block):
        for relative_xy_positionB in Block.intersecting_relative_xy_positionsB:
            testXB = block.xB + relative_xy_positionB[0]
            testYB = block.yB + relative_xy_positionB[1]
            testZB = block.zB
            testBlock = Block.get_at(block.parent(), testXB, testYB, testZB, 1)
            if testBlock:
                # Intersecting pending block exists. => It is deleted:
                testBlock.state = 0
                testBlock.put()

    # Sets the state of the block to "state", also updating the time stamp.
    # Increases the blocks version number. Should be run in a transaction.
    def store_state_and_increase_blocks_data_version(self, state):
        self.state = state
        self.time_stamp = long(time.time())
        self.put()
        self.parent().increase_blocks_data_version()

# Properties of the block: shape, size, how to attach blocks, etc.
class BlockProperties(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # Block dimensions in world space. The side length of a block is
    # approximately two times the grid spacing in the respective direction.
    position_spacing_xy = db.FloatProperty() # mm
    position_spacing_z = db.FloatProperty() # mm

    # Outline of the block in the xy plane, with coordinates in block space,
    # counterclockwise:
    outline_b = db.StringProperty() # JSON array

    # Two blocks are defined to collide, iff one block is offset against the
    # other in the x-y-plane by:
    collision_offsets_b = db.StringProperty() # JSON array

    # A block is defined to be attachable to another block, if it is in any of
    # the following positions relative to the other block, in block space:
    attachment_offsets_b = db.StringProperty() # JSON array

class Index(webapp.RequestHandler):
    def get(self):
        template_values = {'debug': debug}
        
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

class Admin(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user and users.is_current_user_admin():
            template_values = {
                'debug': debug, 
                'logout_url': users.create_logout_url("/admin")}

            path = os.path.join(os.path.dirname(__file__), 'admin.html')
            self.response.out.write(template.render(path, template_values))
        else:
            self.redirect(users.create_login_url("/admin"))
            return

class About(webapp.RequestHandler):
    def get(self):
        template_values = {'debug': debug, 
                           'up_url': '/', 'up_text': 'Home',
                           'video_id': 'XiI6lOvQLRM'}
        
        path = os.path.join(os.path.dirname(__file__), 'about.html')
        self.response.out.write(template.render(path, template_values))

class Felix(webapp.RequestHandler):
    def get(self):
        template_values = {'debug': debug, 'up_url': '/about', 
                           'up_text': 'Up'}
        
        path = os.path.join(os.path.dirname(__file__), 'felix.html')
        self.response.out.write(template.render(path, template_values))

class Webcam(webapp.RequestHandler):
    def get(self):
        template_values = {'debug': debug, 'up_url': '/about', 
                           'up_text': 'Up'}
        
        path = os.path.join(os.path.dirname(__file__), 'webcam.html')
        self.response.out.write(template.render(path, template_values))

class Tests(webapp.RequestHandler):
    def get(self):
        tests = [
            ['Chrome 5', 'WinXP/32', 'Yes', ''],
            ['Firefox 1', 'WinXP/32', 'No', 'No Canvas'],
            ['Firefox 3.6', 'WinXP/32', 'Yes', ''],
            ['Firefox 3.6 w/o Flash', 'WinXP/32', 'Yes', ''],
            ['Firefox 3.6 w/o JavaScript', 'WinXP/32', 'No', 
             'No JavaScript'],
            ['Internet Explorer 6', 'Win2K/32', 'Yes', ''],
            ['Internet Explorer 7', 'WinXP/32', 'Yes', ''],
            ['Internet Explorer 8', 'WinXP/32', 'Yes', ''],
            ['Lynx 2.8', 'WinXP/32', 'No', 'No JavaScript'],
            ['Netscape 4', 'Win2K/32', 'No', 'No Dojo Tookit'],
            ['Opera 10.60', 'WinXP/32', 'Yes', ''],
            ['Opera 10.60 w/o Images', 'WinXP/32', 'No', 
             'No Images'],
            ['Opera Mini 5.1', 'Symbian S60', 'Yes', ''],
            ['Safari 5.0', 'WinXP/32', 'Yes', '']];
        template_values = {'debug': debug, 'up_url': '/about', 
                           'up_text': 'Up', 'tests': tests}
        
        path = os.path.join(os.path.dirname(__file__), 'tests.html')
        self.response.out.write(template.render(path, template_values))

# Data describing a construction, including building blocks.
class RPCConstruction(webapp.RequestHandler):
    # Returns the blocks as an array of dictionaries. Only returns deleted
    # blocks, if "get_deleted_blocks" is true.
    @staticmethod
    def get_blocks_data_blocks(construction, get_deleted_blocks):
        query = Block.all().ancestor(construction)
        if not get_deleted_blocks:
            query.filter('state !=', 0)
        blocks = []
        for block in query:
            blocks.append({
                    'xB': block.xB, 
                    'yB': block.yB, 
                    'zB': block.zB,
                    'state': block.state,
                    'timeStamp': block.time_stamp})
        return blocks

    # Returns JSON serializable data related to blocks. The data only contains
    # deleted blocks, if "get_deleted_blocks" is true.
    @staticmethod
    def get_blocks_data(construction, blocks_data_version_client, 
                        get_deleted_blocks):
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
                    'blocks': 
                    RPCConstruction.get_blocks_data_blocks(
                        construction, get_deleted_blocks)})
        return data

    # Returns JSON serializable data related to the camera.
    @staticmethod
    def get_camera_data(construction, camera_data_version_client):
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
                    'x': construction.camera_x,
                    'y': construction.camera_y,
                    'z': construction.camera_z,
                    'aX': construction.camera_a_x,
                    'aY': construction.camera_a_y,
                    'aZ': construction.camera_a_z,
                    'fl': construction.camera_fl,
                    'sensorResolution': construction.camera_sensor_resolution})
        return data

    # Returns JSON serializable data related to the live image.
    @staticmethod
    def get_image_data(construction, image_data_version_client):
        image_data_version = construction.image_data_version
        image_data_changed = (image_data_version != 
                              image_data_version_client)
        data = {
            'version': image_data_version,
            'changed': image_data_changed}
        if image_data_changed:
            # Image data version on server not the same as on client. =>
            # Deliver all the data.
            data.update({
                    'url': construction.image_url,
                    'updateIntervalServer': \
                        construction.image_update_interval_server,
                    'updateIntervalClient': \
                        construction.image_update_interval_client})
        return data

    # Returns JSON serializable data related to the block properties.
    @staticmethod
    def get_block_properties_data(construction, 
                                  block_properties_data_version_client):
        query = BlockProperties.all().ancestor(construction)
        block_properties = query.get()
        if block_properties is None:
            raise Exception('could not get block properties')

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
            data.update({'positionSpacingXY': 
                         block_properties.position_spacing_xy,
                         'positionSpacingZ': 
                         block_properties.position_spacing_z,
                         'outlineB': 
                         simplejson.loads(block_properties.outline_b),
                         'collisionOffsetsB':
                         simplejson.loads(block_properties.collision_offsets_b),
                         'attachmentOffsetsB':
                             simplejson.loads(block_properties.
                                              attachment_offsets_b)})
        return data

    # A transaction may not be necessary, but it ensures data integrity for
    # example if there is a transaction missing somewhere else.
    @staticmethod
    def transaction(blocks_data_version_client, 
                    get_deleted_blocks,
                    camera_data_version_client,
                    image_data_version_client,
                    block_properties_data_version_client):
        construction = Construction.get_main()
        data = {
            'blocksData': RPCConstruction.get_blocks_data(
                construction, blocks_data_version_client, 
                get_deleted_blocks),
            'cameraData': RPCConstruction.get_camera_data(
                construction, camera_data_version_client),
            'imageData': RPCConstruction.get_image_data(
                construction, camera_data_version_client),
            'blockPropertiesData': RPCConstruction.get_block_properties_data(
                construction, block_properties_data_version_client)
        }
        return data

    def get(self):
        try:
            blocks_data_version_client = \
                self.request.get('blocksDataVersion')
            if self.request.get('getDeletedBlocks') == 'true':
                get_deleted_blocks = True
            else:
                get_deleted_blocks = False
            camera_data_version_client = \
                self.request.get('cameraDataVersion')
            image_data_version_client = self.request.get('imageDataVersion')
            block_properties_data_version_client = \
                self.request.get('blockPropertiesDataVersion')

            data = db.run_in_transaction(RPCConstruction.transaction, 
                                         blocks_data_version_client, 
                                         get_deleted_blocks,
                                         camera_data_version_client,
                                         image_data_version_client,
                                         block_properties_data_version_client)
            dump_json(self, data)
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
    # Tries to make the block at the block position "xB", "yB", "zB" real.
    @staticmethod
    def transaction(xB, yB, zB):
        construction = Construction.get_main()
        
        block = Block.get_by_positionB(construction, xB, yB, zB)
        if not block or block.state == 2:
            return # No block to update or already real.
        
        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be
            # deleted.
            new_state = 0
        else:
            new_state = 2
            
        block.store_state_and_increase_blocks_data_version(new_state)
            
        if new_state != 0:
            Block.delete_intersecting_pending_blocks(block)

    def post(self):
        try:
            xB = int(self.request.get('xB'))
            yB = int(self.request.get('yB'))
            zB = int(self.request.get('zB'))
            db.run_in_transaction(RPCAdminMakeReal.transaction, xB, yB, zB)
        except Exception, e:
            logging.error('Could not make block real: ' + str(e))

# Sets the state of the block at the provided position to deleted.
#
# The post request fails silently on error.
class RPCAdminDelete(webapp.RequestHandler):
    # Tries to delete the block at position "xB", "yB", "zB".
    @staticmethod
    def transaction(xB, yB, zB):
        construction = Construction.get_main()

        block = Block.get_by_positionB(construction, xB, yB, zB)
        if block:
            # block found to be set to state deleted
            block.store_state_and_increase_blocks_data_version(0)

    def post(self):
        try:
            xB = int(self.request.get('xB'))
            yB = int(self.request.get('yB'))
            zB = int(self.request.get('zB'))
            db.run_in_transaction(RPCAdminDelete.transaction, xB, yB, zB)
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
# The post request fails silently on error.
class RPCCreatePending(webapp.RequestHandler):
    # Tries to send an email, informing that a pending block has been created,
    # or the state of an existing block has been changed to pending. The
    # position of the block: "xB", "yB", "zB"
    @staticmethod
    def send_info_email(xB, yB, zB):
        sender_address = "Reality Builder <felixedgarklee@googlemail.com>"
        recipient_address = "new.pending.blocks@realitybuilder.com"
        subject = "New Pending Block"
        body = """
Position: %d, %d, %d
""" % (xB, yB, zB)

        try:
            mail.send_mail(sender_address, recipient_address, subject, body)
        except:
            return False

        return True

    # Tries to create a pending block at the block position "xB", "yB", "zB".
    @staticmethod
    def transaction(xB, yB, zB):
        construction = Construction.get_main()

        block = Block.get_by_positionB(construction, xB, yB, zB)
        if not block:
            # Block has to be created, with initial state deleted. It is left
            # in that state, if it intersects with a real block - see below.
            block = Block.insert_at_positionB(construction, xB, yB, zB)

        if block.state == 2 or block.state == 1:
            # Block is real or block is already pending.
            return

        # Block neither real nor pending. => It's in the state deleted.

        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be left deleted.
            return

        block.store_state_and_increase_blocks_data_version(1) # Set to pending.
        RPCCreatePending.send_info_email(xB, yB, zB)

    def post(self):
        try:
            xB = int(self.request.get('xB'))
            yB = int(self.request.get('yB'))
            zB = int(self.request.get('zB'))
            db.run_in_transaction(RPCCreatePending.transaction, xB, yB, zB)
        except Exception, e:
            logging.error('Could not add pending block or set existing ' + 
                          'block to pending: ' + str(e))

# Changes the status of a real or deleted block to pending, unless the block
# does intersect with any real block. If there is no block at the provided
# position or if it is already pending, then nothing is done. If the block
# intersects with a real block, then it is deleted.
#
# The post request fails silently on error.
class RPCAdminMakePending(webapp.RequestHandler):
    # Tries to turn the block at the block position "xB", "yB", "zB" into a
    # pending block, or sets its state to deleted, if it intersects with a real
    # block.
    @staticmethod
    def transaction(xB, yB, zB):
        construction = Construction.get_main()

        block = Block.get_by_positionB(construction, xB, yB, zB)
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

    def post(self):
        try:
            xB = int(self.request.get('xB'))
            yB = int(self.request.get('yB'))
            zB = int(self.request.get('zB'))
            db.run_in_transaction(RPCAdminMakePending.transaction, xB, yB, zB)
        except Exception, e:
            logging.error('Could not make block pending: ' + str(e))

# Updates the camera and live image settings and increases the camera version
# number.
#
# The post request fails silently on error.
class RPCAdminUpdateSettings(webapp.RequestHandler):
    # Tries to update the image and camera settings. Ignores values that cannot
    # be assigned.
    @staticmethod
    def transaction(data):
        construction = Construction.get_main()

        for key, value in data.iteritems():
            try:
                setattr(construction, key, value);
            except:
                pass # nothing to be done

        construction.put()

        # Everything has gone well. Now the versions of the data are updated.
        construction.increase_camera_data_version()
        construction.increase_image_data_version()

    def post(self):
        try:
            data = {
                'camera_x': float(self.request.get('camera.x')),
                'camera_y': float(self.request.get('camera.y')),
                'camera_z': float(self.request.get('camera.z')),
                'camera_a_x': float(self.request.get('camera.aX')),
                'camera_a_y': float(self.request.get('camera.aY')),
                'camera_a_z': float(self.request.get('camera.aZ')),
                'camera_fl': float(self.request.get('camera.fl')),
                'camera_sensor_resolution':
                    float(self.request.get('camera.sensorResolution')),
                'image_url': self.request.get('image.url'),
                'image_update_interval_server':
                    float(self.request.get('image.updateIntervalServer')),
                'image_update_interval_client':
                    float(self.request.get('image.updateIntervalClient'))}
            db.run_in_transaction(RPCAdminUpdateSettings.transaction, 
                                  data)
        except Exception, e:
            logging.error('Could not update camera and image data: ' + str(e))

# Initializes part or all of the database. Use with caution.
class AdminUpdate(webapp.RequestHandler):
    def get(self):
        if not debug:
            print 'Only available in debug mode.'
            return
        
        # Deletes all construction entries:
        queries = [Construction.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Creates the construction configuration. An image URL is not set to an
        # image on the same App Engine instance, since urlfetch doesn't seem to
        # like that.
        construction = Construction(key_name = 'main')
        construction.blocks_data_version = '0'
        construction.camera_data_version = '0'
        construction.camera_x = 122.05
        construction.camera_y = -88.81
        construction.camera_z = 122.37
        construction.camera_a_x = 2.3363
        construction.camera_a_y = -0.50827
        construction.camera_a_z = 0.438
        construction.camera_fl = 40.1
        construction.camera_sensor_resolution = 18.2857
        construction.image_data_version = '0'
        construction.image_url = \
            'http://sites.inka.de/W1787/realitybuilder/live.jpg';
        construction.image_update_interval_server = 5.
        construction.image_update_interval_client = 5.
        construction.put()

        # Deletes all block shape entries:
        queries = [BlockProperties.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Sets up the block properties (construction as parent is important so
        # that the properties form one entity group with the construction,
        # which is necessary when doing transactions):
        blockProperties = BlockProperties(parent=construction)
        blockProperties.data_version = '0'
        blockProperties.position_spacing_xy = 8.
        blockProperties.position_spacing_z = 9.6
        blockProperties.outline_b = '[[0, 0], [2, 0], [2, 2], [0, 2]]'
        blockProperties.collision_offsets_b = ('[[0, 0], ' +
                                               '[-1, 0], ' +
                                               '[-1, 1], [0, 1], [1, 1], ' +
                                               '[1, 0], ' +
                                               '[1, -1], [0, -1], [-1, -1]]')
        blockProperties.attachment_offsets_b = \
            ('[[0, 0, -1], ' +
             '[0, 1, -1], [-1, 1, -1], [-1, 0, -1], [-1, -1, -1], ' +
             '[0, -1, -1], [1, -1, -1], [1, 0, -1], [1, 1, -1], ' +
             '[0, 0, 1], ' +
             '[0, 1, 1], [-1, 1, 1], [-1, 0, 1], [-1, -1, 1], ' +
             '[0, -1, 1], [1, -1, 1], [1, 0, 1], [1, 1, 1]]')
        blockProperties.put()

        # Deletes all block entries:
        queries = [Block.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Creates block entries:
        cs = [
            [0, 0, 0, 2], [2, 0, 0, 2], [6, 0, 0, 2], [8, 0, 0, 2],
            [8, 2, 0, 2], [8, 4, 0, 2], [6, 8, 0, 2],
            [2, 0, 1, 2], [6, 0, 1, 2],
            [3, 0, 2, 2], [5, 0, 2, 2]]
        for c in cs:
            xB = c[0]
            yB = c[1]
            zB = c[2]
            state = c[3]
            block = Block.insert_at_positionB(construction, xB, yB, zB)
            block.state = state
            block.put()

        print 'Done.'

# Provides the background image. Refetches it from the live source in certain
# intervals. If the refetching fails, provides the old image, and if that image
# is not valid, redirects to a place holder.
class Image(webapp.RequestHandler):
    # Retrieves a new image, stores it in the database for the entity
    # "construction", and returns the image. Returns the old image, if the
    # image retrieval fails.
    @staticmethod
    def update_image(construction):
        old_image = construction.image
        try:
            if not construction.image_url:
                return old_image
            url = str(construction.image_url) + '?nocache=' + str(time.time())
            
            # To avoid concurrent requests, the deadline is set to a value less
            # than the update interval:
            deadline = construction.image_update_interval_server * 2. / 3.

            tmp = urlfetch.Fetch(url, deadline=deadline)
            if not tmp:
                return old_image

            new_image = db.Blob(tmp.content)
        except:
            return old_image
        construction.image = new_image
        construction.image_last_update = time.time()
        construction.put()
        return new_image

    # Checks if the image needs to be updated. If not, returns the image
    # currently stored in the data store. Otherwise, retrieves an up to date
    # image, stores it in the data store and returns the result. If retrieving
    # does fail, returns the image currently in the data store.
    @staticmethod
    def transaction():
        construction = Construction.get_main()
        if (time.time() > construction.image_last_update + \
                construction.image_update_interval_server):
            return Image.update_image(construction)
        else:
            return construction.image

    def get(self):
        try:
            image = db.run_in_transaction(Image.transaction)
            if image:
                self.response.headers['Content-Type'] = 'image/jpeg'
                self.response.out.write(image)
            else:
                self.redirect(self.request.
                              relative_url('/images/placeholder.gif'))
        except Exception, e:
            logging.error('Could not retrieve image: ' + str(e))

application = webapp.WSGIApplication([
    ('/', Index), ('/admin', Admin), 
    ('/images/live.jpg', Image),
    ('/about', About),
    ('/felix', Felix),
    ('/webcam', Webcam),
    ('/tests', Tests),
    ('/admin/update', AdminUpdate),
    ('/admin/rpc/delete', RPCAdminDelete),
    ('/admin/rpc/make_real', RPCAdminMakeReal),
    ('/admin/rpc/make_pending', RPCAdminMakePending),
    ('/admin/rpc/update_settings', RPCAdminUpdateSettings),
    ('/rpc/construction', RPCConstruction),
    ('/rpc/create_pending', RPCCreatePending)],
    debug = debug)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
