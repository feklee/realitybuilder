// The Reality Builder.

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

/*global realityBuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realityBuilder.RealityBuilder');

dojo.require('realityBuilder.BlockProperties');
dojo.require('realityBuilder.ConstructionBlockProperties');
dojo.require('realityBuilder.ConstructionBlocks');
dojo.require('realityBuilder.ConstructionBlock');
dojo.require('realityBuilder.NewBlock');
dojo.require('realityBuilder.Camera');
dojo.require('realityBuilder.PrerenderMode');
dojo.require('realityBuilder.util');

dojo.declare('realityBuilder.RealityBuilder', null, {
    // All blocks, permanently in the construction, including real and pending
    // blocks:
    _constructionBlocks: null,

    // True, iff real/pending blocks should be shown. By default, always
    // enabled if the admin controls are shown. With only the user controls
    // shown, by default disabled.
    _showReal: null,
    _showPending: null,

    // Properties (shape, dimensions, etc.) of a block:
    _blockProperties: null,

    // Properties of a construction block:
    _constructionBlockProperties: null,

    // Prerender-mode:
    _prerenderMode: null,

    // The new block that the user is supposed to position. Could move once the
    // real blocks are loaded, if there are any intersections.
    _newBlock: null,

    // The camera, whose sensor is shown.
    _camera: null,

    // Handle for the timeout between requests to the server for new
    // construction data.
    _updateTimeout: null,

    _onReadyCalled: null,

    // Creates a construction. For a documentation of the settings, see the
    // main Reality Builder include script.
    constructor: function (settings) {
        var rb = realityBuilder;

        if (!rb.util.isCanvasSupported()) {
            // canvas not supported => abort
            settings.onBrowserNotSupportedError();
            return;
        }

        realityBuilder.util.SETTINGS = settings;

        this._onReadyCalled = false;

        this._blockProperties = new rb.BlockProperties();
        this._constructionBlockProperties = 
            new rb.ConstructionBlockProperties();
        this._camera = new rb.Camera(this._blockProperties, 
                                     settings.width, settings.height,
                                     dojo.byId(settings.id));
        this._constructionBlocks = 
            new rb.ConstructionBlocks(this._blockProperties,
                                      this._constructionBlockProperties,
                                      this._camera);
        this._prerenderMode = new rb.PrerenderMode();
        this._newBlock = 
            new rb.NewBlock(this._blockProperties,
                            this._camera,
                            this._constructionBlocks,
                            this._prerenderMode);

        dojo.subscribe('realityBuilder/ConstructionBlocks/changedOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realityBuilder/PrerenderMode/' + 
                       'loadedBlockConfigurationOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realityBuilder/NewBlock/createdPendingOnServer', 
                       this, this._update); // Speeds up responsiveness.
        dojo.subscribe('realityBuilder/NewBlock/' + 
                       'positionAngleInitialized', 
                       this, this._onNewBlockPositionAngleInitialized);
        dojo.subscribe('realityBuilder/NewBlock/buildOrMoveSpaceChanged', 
                       this, this._onMoveOrBuildSpaceChanged);
        dojo.subscribe('realityBuilder/NewBlock/stopped', 
                       this, this._onNewBlockStopped);
        dojo.subscribe('realityBuilder/NewBlock/madeMovable', 
                       this, this._onNewBlockMadeMovable);
        dojo.subscribe('realityBuilder/NewBlock/movedOrRotated',
                       this, this._onNewBlockMovedOrRotated);
        dojo.subscribe('realityBuilder/NewBlock/' + 
                       'onNewBlockMakeRealRequested',
                       this, this._onNewBlockMakeRealRequested);
        dojo.subscribe('realityBuilder/ConstructionBlocks/changed',
                       this, this._onConstructionBlocksChanged);
        dojo.subscribe('realityBuilder/Camera/changed',
                       this, this._onCameraChanged);
        dojo.subscribe('realityBuilder/BlockProperties/changed',
                       this, this._onBlockPropertiesChanged);
        dojo.subscribe('realityBuilder/ConstructionBlockProperties/changed',
                       this, this._onConstructionBlockPropertiesChanged);
        dojo.subscribe('realityBuilder/PrerenderMode/changed',
                       this, this._onPrerenderModeChanged);

        dojo.connect(null, "onkeypress", dojo.hitch(this, this._onKeyPress));

        this._update();
    },

    newBlock: function () {
        return this._newBlock;
    },

    camera: function () {
        return this._camera;
    },

    prerenderMode: function () {
        return this._prerenderMode;
    },

    showPending: function () {
        return this._showPending;
    },

    showReal: function () {
        return this._showReal;
    },

    constructionBlocks: function () {
        return this._constructionBlocks;
    },

    // Called after the new block has been stopped.
    _onNewBlockStopped: function () {
        this._newBlock.render(); // color changes
        realityBuilder.util.SETTINGS.onDegreesOfFreedomChanged();
    },

    // Called after the new block has been made movable.
    _onNewBlockMadeMovable: function () {
        this._newBlock.render(); // color changes
        realityBuilder.util.SETTINGS.onDegreesOfFreedomChanged();
    },

    // Called after the block was requested to be made real.
    _onNewBlockMakeRealRequested: function () {
    },

    setRealBlocksVisibility: function (shouldBeVisible) {
        this._camera.sensor().setRealBlocksVisibility(shouldBeVisible);
        this._constructionBlocks.renderIfVisible();
        realityBuilder.util.SETTINGS.onRealBlocksVisibilityChanged();
    },

    setPendingBlocksVisibility: function (shouldBeVisible) {
        this._camera.sensor().setPendingBlocksVisibility(shouldBeVisible);
        this._constructionBlocks.renderIfVisible();
        realityBuilder.util.SETTINGS.onPendingBlocksVisibilityChanged();
    },

    realBlocksAreVisible: function () {
        return this._camera.sensor().realBlocksAreVisible();
    },

    pendingBlocksAreVisible: function () {
        return this._camera.sensor().pendingBlocksAreVisible();
    },

    // Handles keys events.
    _onKeyPress: function (event) {
        var constructionBlocks, newBlock;

        newBlock = this._newBlock;

        if (event.keyCode === 109) { // m
            // For demoing the Reality Builder:
            //
            // Makes the block at the position of the new block real on the
            // server. This only works if there is a block at that position in
            // the list of construction blocks, and if the user is logged in as
            // administrator.
            constructionBlocks = this._constructionBlocks;
            constructionBlocks.setBlockStateOnServer(newBlock.positionB(), 
                                                     newBlock.a(), 2);
        }
    },

    // Called after the new block has been moved or rotated. Lets it redraw and
    // updates controls.
    _onNewBlockMovedOrRotated: function () {
        this._newBlock.render();
        realityBuilder.util.SETTINGS.onDegreesOfFreedomChanged(); // may have
                                                                  // changed
        realityBuilder.util.SETTINGS.onMovedOrRotated();
    },

    // (Re-)renders blocks, but only if all necessary components have been
    // initialized, which is relevant only in the beginning.
    _renderBlocksIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData()) {
            this._constructionBlocks.renderIfVisible();
            this._newBlock.render();
        }
    },

    // Updates the state (including position) of the new block (and related
    // controls), but only if all necessary components have been initialized,
    // which is relevant only in the beginning.
    _updateNewBlockStateIfFullyInitialized: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._newBlock.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._prerenderMode.isInitializedWithServerData()) {

            this._newBlock.updatePositionAndMovability();
            realityBuilder.util.SETTINGS.onDegreesOfFreedomChanged();
            realityBuilder.util.SETTINGS.onMovedOrRotated();
        }
    },

    // Called after the construction blocks have changed.
    _onConstructionBlocksChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
        realityBuilder.util.SETTINGS.onConstructionBlocksChanged();
    },

    // Called after the camera settings have changed.
    _onCameraChanged: function () {
        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
        realityBuilder.util.SETTINGS.onCameraChanged();
    },

    // Called after the new block's position, rotation angle have been
    // initialized.
    _onNewBlockPositionAngleInitialized: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
    },

    // Called after the dimensions of the space where the new block may be
    // moved or built have been changed.
    _onMoveOrBuildSpaceChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
    },

    // Called after the block properties have changed.
    _onBlockPropertiesChanged: function () {
        // Updates the state (and related controls) of the new block, because
        // they depend on block properties such as collision settings:
        this._updateNewBlockStateIfFullyInitialized();

        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
    },

    // Called after the block properties have changed.
    _onConstructionBlockPropertiesChanged: function () {
        this._renderBlocksIfFullyInitialized();
        this._checkIfReady();
    },

    _onPrerenderModeChanged: function () {
        this._updateNewBlockStateIfFullyInitialized();
        this._checkIfReady();
        realityBuilder.util.SETTINGS.onPrerenderedBlockConfigurationChanged();
    },

    // Checks if the widget is ready to be used. If so, signals that by calling
    // the "onReady" function, but only the first time.
    _checkIfReady: function () {
        if (this._constructionBlocks.isInitializedWithServerData() &&
            this._camera.isInitializedWithServerData() &&
            this._blockProperties.isInitializedWithServerData() &&
            this._constructionBlockProperties.isInitializedWithServerData() &&
            this._onReadyCalled === false) {

            realityBuilder.util.SETTINGS.onReady();
            this._onReadyCalled = true;
        }
    },

    // Second step of the construction update process.
    //
    // Updates client data with server data, but only where there have been
    // changes. Note that update of certain client data may trigger a redraw of
    // blocks and/or controls.
    //
    // Finally, sets timeout after which a new check for an update is
    // performed.
    _updateSucceeded: function (data) {
        var that = this;

        if (data.blocksData.changed) {
            this._constructionBlocks.updateWithServerData(data.blocksData);
        }

        if (data.prerenderModeData.changed) {
            this._prerenderMode.updateWithServerData(data.prerenderModeData);
        }

        if (data.cameraData.changed) {
            this._camera.updateWithServerData(data.cameraData);
        }

        if (data.blockPropertiesData.changed) {
            this._blockProperties.
                updateWithServerData(data.blockPropertiesData);
        }

        if (data.constructionBlockPropertiesData.changed) {
            this._constructionBlockProperties.
                updateWithServerData(data.constructionBlockPropertiesData);
        }

        if (data.newBlockData.changed) {
            this._newBlock.updateWithServerData(data.newBlockData);
        }

        if (this._updateTimeout) {
            // Clears the last timeout. May be necessary if the call to the
            // function has not been triggered by that timeout. Without
            // clearing the timeout, it may happen that two "timeout chains"
            // run concurrently.
            clearTimeout(this._updateTimeout);
        }
        this._updateTimeout = 
            setTimeout(function () {
                that._update();
            }, data.updateIntervalClient);
    },

    // Triggers an update of the construction with the data stored on the
    // server. Only updates data where there is a new version. Fails silently
    // on error.
    _update: function () {
        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() + "rpc/construction",
            content: {
                "blocksDataVersion": 
                this._constructionBlocks.versionOnServer(),
                "cameraDataVersion": this._camera.versionOnServer(),
                "blockPropertiesDataVersion": 
                this._blockProperties.versionOnServer(),
                "constructionBlockPropertiesDataVersion": 
                this._constructionBlockProperties.versionOnServer(),
                "newBlockDataVersion": this._newBlock.versionOnServer(),
                "prerenderModeDataVersion": 
                this._prerenderMode.versionOnServer()
            },
            load: dojo.hitch(this, this._updateSucceeded)
        });
    },

    // Called if updating the settings on the server succeeded. Triggers
    // retrieval of the latest settings from the server, which would happen
    // anyhow sooner or later, since the version of the settings has changed.
    _storeSettingsOnServerSucceeded: function () {
        this._update(); // Will check for new settings.
    },

    // Returns camera data, prepared to sending it to the server.
    _preparedCameraData: function (cameraData) {
        var preparedCameraData;

        preparedCameraData = 
            realityBuilder.util.addPrefix('camera.', cameraData);
        preparedCameraData['camera.x'] = cameraData.position[0];
        preparedCameraData['camera.y'] = cameraData.position[1];
        preparedCameraData['camera.z'] = cameraData.position[2];
        return preparedCameraData;
    },

    // Updates certain settings on the server. Fails silently on error.
    storeSettingsOnServer: function (settings) {
        var content = {};

        if ('cameraData' in settings) {
            dojo.mixin(content, this._preparedCameraData(settings.cameraData));
        }

        realityBuilder.util.jsonpGet({
            url: realityBuilder.util.rootUrl() + "admin/rpc/update_settings",
            content: content,
            load: dojo.hitch(this, this._storeSettingsOnServerSucceeded)
        });
    }
});