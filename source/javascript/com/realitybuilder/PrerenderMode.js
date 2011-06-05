// Configuration for prerender-mode, if enabled.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('com.realitybuilder.PrerenderMode');

dojo.declare('com.realitybuilder.PrerenderMode', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // With prerender-mode enabled, a block is automatically made real after
    // "prerender_make_real_after" seconds, and if the total construction would
    // afterwards match one of the block configurations in the list
    // "prerender_block_configurations". Associated with each block
    // configuration is an image, the URL of which is constructed using the
    // template "prerender_image_url_template": %d is substituted with the
    // block configuration number. This number is identical to the
    // corresponding index in the array with the block configurations.
    _isEnabled: null,
    makeRealAfter: null, // s
    blockConfigurations: null, // [[xB, yB, zB, a], [xB, ...
    imageUrlTemplate: null,

    constructor: function () {
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the settings of the camera to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._isEnabled = serverData.isEnabled;
        this._makeRealAfter = serverData.makeRealAfter;
        this._blockConfigurations = serverData.blockConfigurations;
        this._imageUrlTemplate = serverData.imageUrlTemplate;

        dojo.publish('com/realitybuilder/PrerenderMode/changed');
    },

    isEnabled: function () {
        return this._isEnabled;
    },

    _blockConfigurationSetKey: function (block) {
        return block.xB() + ',' + block.yB() + ',' + block.zB() + ',' +
            block.a();
    },

    // Returns a set describing the block configuration comprised of the real
    // blocks "realBlocks" and the block "newBlock". The keys in the set have
    // the format "xB,yB,zB,a".
    _blockConfigurationSet: function (realBlocks, newBlock) {
        var set = {}, setKey = this._blockConfigurationSetKey;

        dojo.forEach(realBlocks, function (realBlock) {
            set[setKey(realBlock)] = true;
        });

        set[setKey(newBlock)] = true;

        return set;
    },

    _setIsEmpty: function (set) {
        var key;

        for (key in set) {
            if (set.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },

    // Returns true, iff the real blocks "realBlock" plus the block "newBlock"
    // form the same block configuration as described in "blockConfigurations".
    _blockConfigurationMatches: function (blockConfiguration, 
                                          realBlocks, newBlock)
    {
        var blockConfigurationSet, i, item, key;

        blockConfigurationSet = this._blockConfigurationSet(realBlocks, 
                                                            newBlock);

        for (i = 0; i < blockConfiguration.length; i += 1) {
            item = blockConfiguration[i];
            key = item[0] + ',' + item[1] + ',' + item[2] + ',' + item[3];
            if (typeof blockConfigurationSet[key] === 'undefined') {
                return false;
            } else {
                delete blockConfigurationSet[key];
            }
        }

        return this._setIsEmpty(blockConfigurationSet);
    },

    // Returns true, iff there is a prerendered block configuration that
    // matches the block configuration described by the real blocks
    // "realBlocks" and the new block "newBlock".
    onePrerenderedConfigurationMatches: function (realBlocks, newBlock) {
        var i, blockConfiguration;

        for (i = 0; i < this._blockConfigurations.length; i += 1) {
            blockConfiguration = this._blockConfigurations[i];
            if (this._blockConfigurationMatches(blockConfiguration, 
                                                realBlocks, newBlock)) {
                return true;
            }
        }
        return false; // no prerendered configuration matches
    }
});
