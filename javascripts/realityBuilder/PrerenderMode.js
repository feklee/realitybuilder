// Configuration for prerender-mode, if enabled.

// Copyright 2010-2012 Felix E. Klee <felix.klee@inka.de>
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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global realityBuilder, dojo, dojox, FlashCanvas */

dojo.provide('realityBuilder.PrerenderMode');

dojo.declare('realityBuilder.PrerenderMode', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // With prerender-mode enabled, a block is automatically made real after
    // "_makeRealAfter" milliseconds, and if the total construction would
    // afterwards match one of the block configurations in the list
    // "_blockConfigurations".
    _isEnabled: null,
    _makeRealAfter: null, // ms
    _blockConfigurations: null, // [[xB, yB, zB, a], [xB, ...], ...], sorted!

    // How much a reset should be delayed:
    _resetDelay: null, // ms

    // Index of the currently and of the previously loaded prerendered block
    // configuration.
    _i: null,
    _prevI: null,

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    resetDelay: function () {
        return this._resetDelay;
    },

    // Updates the settings of the camera to the version on the server, which
    // is described by "serverData".
    updateWithServerData: function (serverData) {
        if (this._versionOnServer !== serverData.version) {
            this._versionOnServer = serverData.version;
            this._isEnabled = serverData.isEnabled;
            this._makeRealAfter = serverData.makeRealAfter;
            this._blockConfigurations = serverData.blockConfigurations;

            // Updates only the index of the current prerendered block
            // configuration. The construction blocks themselves are not
            // updated here!
            this._i = serverData.i;

            this._prevI = serverData.prevI;
            this._resetDelay = serverData.resetDelay;

            this._sortBlockConfigurations(this._blockConfigurations);

            dojo.publish('realityBuilder/PrerenderMode/changed');
        }
    },

    i: function () {
        return this._i;
    },

    prevI: function () {
        return this._prevI;
    },

    isEnabled: function () {
        return this._isEnabled;
    },

    makeRealAfter: function () {
        return this._makeRealAfter;
    },

    _sortBlockConfiguration2: function (poseB1, poseB2) {
        var a = poseB1, b = poseB2;

        if (a[0] === b[0]) {
            if (a[1] === b[1]) {
                if (a[2] === b[2]) {
                    if (a[3] === b[3]) {
                        return 0;
                    } else {
                        return a[3] - b[3];
                    }
                } else {
                    return a[2] - b[2];
                }
            } else {
                return a[1] - b[1];
            }
        } else {
            return a[0] - b[0];
        }
    },

    _sortBlockConfiguration: function (blockConfiguration) {
        blockConfiguration.sort(dojo.hitch(this,
                                           this._sortBlockConfiguration2));
    },

    _sortBlockConfigurations: function (blockConfigurations) {
        var that = this;

        dojo.forEach(blockConfigurations, function (blockConfiguration) {
            that._sortBlockConfiguration(blockConfiguration);
        });
    },

    _poseBsMatch: function (poseB1, poseB2) {
        var i;

        for (i = 0; i < 4; i += 1) {
            if (poseB1[i] !== poseB2[i]) {
                return false;
            }
        }

        return true;
    },

    // Returns true, iff specified block configurations match.
    _blockConfigurationsMatch: function (blockConfiguration1,
                                         blockConfiguration2) {
        var i;

        if (blockConfiguration1.length === blockConfiguration2.length) {
            for (i = 0; i < blockConfiguration1.length; i += 1) {
                if (!this._poseBsMatch(blockConfiguration1[i],
                                       blockConfiguration2[i])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    },

    // Returns the pose in block space (position in block space and the
    // rotation angle) in a simplified form:
    //
    // * If the block has two-fold symmetry:
    //
    //   If necessay, the values of the block will be adapted so that its
    //   rotation angle is either 0° or 90°.
    //
    // * Otherwise: The native values of the block will be returned.
    simplifiedPoseB: function (poseB, blockProperties) {
        var simplifiedPoseB, posB, a, congruencyOffsetB;

        posB = poseB;
        a = poseB[3];

        if (blockProperties.has2FoldSymmetry() && a >= 2) {
            congruencyOffsetB = blockProperties.congruencyOffsetB(a);
            simplifiedPoseB =
                realityBuilder.util.addVectorsB(posB,
                                                congruencyOffsetB);
            simplifiedPoseB.push(a % 2);
        } else {
            simplifiedPoseB = dojo.clone(poseB);
        }

        return simplifiedPoseB;
    },

    _simplifiedPoseBOfBlock: function (block) {
        return this.simplifiedPoseB(block.poseB(),
                                    block.blockProperties());
    },

    // Returns an array created from positions and rotations angles of the real
    // blocks and of the new block:
    //
    // [[x1B, y1B, z1B, a1],
    //  [x2B, y2B, z2B, a2],
    //  ...]
    //
    // If the blocks have two-fold symmetry, then alls blocks will be
    // positioned in this array with an angle of 0° or 90°. Their coordinates
    // will be adapted accordingly.
    //
    // The returned block configuration is sorted.
    _currentBlockConfiguration: function (realBlocks, newBlock) {
        var blockConfiguration = [], poseB, that = this;

        dojo.forEach(realBlocks, function (realBlock) {
            poseB = that._simplifiedPoseBOfBlock(realBlock);
            blockConfiguration.push(poseB);
        });

        poseB = this._simplifiedPoseBOfBlock(newBlock);
        blockConfiguration.push(poseB);

        this._sortBlockConfiguration(blockConfiguration);

        return blockConfiguration;
    },

    // Iff there is a prerendered block configuration that matches the block
    // configuration described by the real blocks "realBlocks" and the new
    // block "newBlock", then returns the index of that configuration.
    //
    // Otherwise returns false.
    matchingBlockConfigurationI: function (realBlocks, newBlock) {
        var i, blockConfiguration, currentBlockConfiguration;

        currentBlockConfiguration =
            this._currentBlockConfiguration(realBlocks, newBlock);

        for (i = 0; i < this._blockConfigurations.length; i += 1) {
            blockConfiguration = this._blockConfigurations[i];
            if (this._blockConfigurationsMatch(blockConfiguration,
                                               currentBlockConfiguration)) {
                return i;
            }
        }

        return false; // no prerendered configuration matches
    },

    _loadBlockConfigurationOnServerSucceeded: function () {
        dojo.publish('realityBuilder/PrerenderMode/' +
                     'loadedBlockConfigurationOnServer');
    },

    // Loads the prerendered block configuration with index "i" on the server.
    loadBlockConfigurationOnServer: function (i) {
        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() +
                "rpc/load_prerendered_block_configuration",
            content: {
                "i": i
            },
            load: dojo.hitch(this,
                             this._loadBlockConfigurationOnServerSucceeded)
        });
    },

    // Loads the previous prerendered block configuration, unless the current
    // one is already the first.
    loadPrevBlockConfigurationOnServer: function () {
        if (this.i() > 0) {
            this.loadBlockConfigurationOnServer(this.i() - 1);
        }
    },

    // Loads the next prerendered block configuration, unless the current one
    // is already the last.
    loadNextBlockConfigurationOnServer: function () {
        if (this.i() < this._blockConfigurations.length - 1) {
            this.loadBlockConfigurationOnServer(this.i() + 1);
        }
    },

    _scheduleResetOnServer: function () {
        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() + "rpc/schedule_reset"
        });
    },

    scheduleReset: function () {
        this._scheduleResetOnServer();
    }
});