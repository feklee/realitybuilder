// The new block in the construction. It may be positioned by the user.
// Published topics:
//
// - When the block has been stopped: com/realitybuilder/NewBlock/stopped
// 
// - When the block has been made movable: 
//   com/realitybuilder/NewBlock/madeMovable

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

dojo.provide('com.realitybuilder.NewBlock');

dojo.require('com.realitybuilder.Block');
dojo.require('com.realitybuilder.Shadow');

dojo.declare('com.realitybuilder.NewBlock', com.realitybuilder.Block, {
    '-chains-': {
        constructor: 'manual'
    },

    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // Points in block space, defining the rectangle which represents the space
    // in which blocks may be built.
    _buildSpace1B: null,
    _buildSpace2B: null,

    // State of the block: 0 = stopped, 1 = movable
    _state: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Shadow in south-east direction.
    _shadow: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Block space position used when last calculating the sensor space
    // coordinates.
    _lastPositionB: null,

    // State of the block when it was last rendered.
    _lastState: null,

    // Version of the construction blocks when the shadow was last rendered.
    _lastConstructionBlocksVersion: null,

    // Creates the new block that the user may position. For collision
    // detection and for calculating hidden lines, the block needs to know
    // about the other blocks in the construction: "constructionBlocks" When
    // the block is rendered, it is as seen by the sensor of the camera
    // "camera".
    //
    // The block's properties, such as shape and size, are described by
    // "blockProperties".
    constructor: function (blockProperties, camera, constructionBlocks) {
        this.inherited(arguments, [blockProperties, camera, [0, 0, 0]]);
        this._state = 1;
        this._constructionBlocks = constructionBlocks;
        this._shadow = new com.realitybuilder.Shadow(this, blockProperties, 
                                                     camera, 
                                                     constructionBlocks);
        this._camera = camera;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    // Returns false when the object is new and has not yet been updated with
    // server data.
    isInitializedWithServerData: function () {
        return this._versionOnServer !== '-1';
    },

    // Updates the block properties to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        var positionNotInitialized, positionWasInitialized;

        positionNotInitialized = !this.isInitializedWithServerData();

        if (positionNotInitialized) {
            this._positionB = [serverData.initXB,
                               serverData.initYB,
                               serverData.initZB];
            positionWasInitialized = true;
        } else {
            positionWasInitialized = false;
        }

        this._buildSpace1B = [serverData.buildSpace1XB,
                              serverData.buildSpace1YB,
                              serverData.buildSpace1ZB];
        this._buildSpace2B = [serverData.buildSpace2XB,
                              serverData.buildSpace2YB,
                              serverData.buildSpace2ZB];

        this._versionOnServer = serverData.version;

        if (positionWasInitialized) {
            dojo.publish('com/realitybuilder/NewBlock/positionInitialized');
        }
        dojo.publish('com/realitybuilder/NewBlock/buildSpaceChanged');
    },

    // Returns true, iff the current block collides with any real block.
    collidesWithRealBlock: function () {
        return this._constructionBlocks.realBlocksCollideWith(this);
    },

    // See same function in super class.
    _viewSpaceNeedsToBeUpdated: function () {
        return (this._lastPositionB === null ||
                !com.realitybuilder.util.pointsIdenticalB(
                    this._lastPositionB, this._positionB) ||
                this.inherited(arguments));
    },

    // See same function in super class.
    _onViewSpaceUpdated: function () {
        this._lastPositionB = dojo.clone(this._positionB);
        this.inherited(arguments);
    },

    // Moves the block in block space, by "delta", unless the move would make
    // it go out of range.
    move: function (deltaB) {
        if (!this.wouldGoOutOfRange(deltaB)) {
            this._positionB = com.realitybuilder.util.addVectorsB(
                this._positionB, deltaB);
        }
        dojo.publish('com/realitybuilder/NewBlock/moved');
    },

    isMovable: function () {
        return this._state === 1;
    },

    isStopped: function () {
        return this._state === 0;
    },

    stop: function () {
        this._state = 0;
        dojo.publish('com/realitybuilder/NewBlock/stopped');
    },

    makeMovable: function () {
        this._state = 1;
        dojo.publish('com/realitybuilder/NewBlock/madeMovable');
    },

    // Maximum vertical position of the new block. Note that this position is
    // higher than the position in which blocks may be build, by 1.
    maxZB: function () {
        return this._buildSpace2B[2];
    },

    // Makes sure that this block does not intersect with any real block. If it
    // does, it is elevated step by step until it sits on top of another block.
    // Only updates the position of the block in block space. Does not update
    // any of the other coordinates.
    updatePositionB: function () {
        var 
        testBlock, cbs = this._constructionBlocks, 
        xB = this.xB(), yB = this.yB(), testZB;
        if (this.collidesWithRealBlock()) {
            testZB = this.zB();
            do {
                testZB += 1;
                testBlock = new com.realitybuilder.Block(this._blockProperties,
                                                         this._camera,
                                                         [xB, yB, testZB]);
            } while (cbs.realBlocksCollideWith(testBlock));
            this._positionB[2] = testZB;
        }
    },

    // Returns true, if this block would intersect with any real block if it
    // was moved in block space by the vector "deltaB", or if it would be
    // outside of the space where it is allowed to be moved. This space may be
    // larger than the building space, allowing movement of the block alongside
    // the exterior of the construction, for positioning.
    wouldGoOutOfRange: function (deltaB) {
        var testPositionB, testBlock, cbs = this._constructionBlocks;

        testPositionB = 
            com.realitybuilder.util.addVectorsB(this._positionB, deltaB);
        testBlock = new com.realitybuilder.Block(this._blockProperties,
                                                 this._camera, testPositionB);

        return (cbs.realBlocksCollideWith(testBlock) ||
                !this._wouldBeInMoveSpace(testPositionB));
    },

    // Returns true, if this block would be outside the move space, if it was
    // in block space at the position "testB". The move space is above the
    // ground and just as large as to allow a block to be moved anywhere
    // outside the boundary of the build space.
    _wouldBeInMoveSpace: function (testB) {
        var b1B = this._buildSpace1B, b2B = this._buildSpace2B;
        return (
            testB[0] >= b1B[0] - 2 && testB[0] <= b2B[0] &&
            testB[1] >= b1B[1] - 2 && testB[1] <= b2B[1] &&
            testB[2] >= 0 && testB[2] <= b2B[2] + 1);
    },

    // Returns true, iff this block is in the space where blocks may be build.
    _isInBuildSpace: function () {
        var xB = this._positionB[0],
            yB = this._positionB[1],
            zB = this._positionB[2],
            b1B = this._buildSpace1B, b2B = this._buildSpace2B;
        return (
            xB >= b1B[0] && xB <= b2B[0] - 2 &&
            yB >= b1B[1] && yB <= b2B[1] - 2 &&
            zB >= b1B[2] && zB <= b2B[2]);
    },

    // Returns true, iff this block is attachable to another block or to the
    // ground.
    _isAttachable: function () {
        return (this._constructionBlocks.realBlocksAreAttachableTo(this) || 
                this.zB() === 0);
    },

    // Returns true, iff the new block can be made real in its current
    // position.
    canBeMadeReal: function () {
        return this._isInBuildSpace() && this._isAttachable();
    },

    // Returns true, iff the bounding box of the current block overlaps with
    // that of the block "block", in sensor space.
    _boundingBoxesOverlap: function (block) {
        return true;

        /* FIXME - reactivate: (
            (this._boundingBoxS[1][0] >= block._boundingBoxS[0][0]) &&
            (this._boundingBoxS[0][0] <= block._boundingBoxS[1][0]) &&
            (this._boundingBoxS[1][1] >= block._boundingBoxS[0][1]) &&
            (this._boundingBoxS[0][1] <= block._boundingBoxS[1][1]));
            */
    },

    // If the new block (= the current block) and the block "block" are on the
    // same layer (SL) and they overlap (O) in sensor space, then this has one
    // of the following return values:
    //
    // True: The block "block" obscures the new block visually. In other words:
    //   To get a correct result, the block "block" has to be drawn on top of
    //   the new block.
    //
    // False: The new block obscures the block "block" visually.
    _isObscuredBySLO: function (block) {
        var 
        i, j, relation, vertexesVXZ, blockVertexesVXZ, len, vertexVXZ,
        blockVertexVXZ, edgeVXZ, util;

        util = com.realitybuilder.util;

        // What follows is a comparison of the projection of the blocks on the
        // view space x-z-plane, from the point of view of the camera. The
        // projection is a parallel projection: It works simply by extending
        // the vertical edges of the prismatic blocks to the view space
        // x-z-plane.

        vertexesVXZ = this.projectedVertexesVXZ();
        blockVertexesVXZ = block.projectedVertexesVXZ();

        if (vertexesVXZ === false || blockVertexesVXZ === false) {
            // something went wrong during calculation (extremely unlikely) =>
            // fail silently with an arbitrary return value:
            return false;
        }

        len = vertexesVXZ.length; // same for all blocks
        for (i = 0; i < len; i += 1) { // iter. all edges of this block
            edgeVXZ = [vertexesVXZ[i], vertexesVXZ[(i + 1) % len]];
            for (j = 0; j < len; j += 1) { // iter. vertexes of "block"
                blockVertexVXZ = blockVertexesVXZ[j];
                relation = util.relationPointSegmentVXZ(blockVertexVXZ,
                                                        edgeVXZ);

                if (relation < 0) {
                    // Vertex of "block" is in front of edge of this block. =>
                    // "block" is in front of this block, as both are convex
                    // prisms in the same layer.
                    return true;
                } else if (relation > 0) {
                    // Vertex of "block" is behind edge of this block.
                    return false;
                } // else continue since no decision can be made yet
            }
        }

        return false; // blocks don't overlap in screen space, and so return
                      // value is irrelevant (see description of function)
    },

    // Subtracts the shape of the the real block "realblock" from the canvas
    // containing the drawing of the new block. The context of that canvas is
    // "context". To speed up things, the block is only subtracted, if its
    // sensor space bounding box overlaps with that of the new block.
    _subtractRealBlock: function (realBlock, context) {
        if (this._boundingBoxesOverlap(realBlock)) {
            realBlock.subtract(context);
        }
    },

    // Subtracts the shapes of the real blocks in front of the block from the
    // drawing on the canvas with rendering context "context".
    _subtractRealBlocks: function (context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
        i, realBlock, zB = this.zB();

        // Idea behind the following loop: the new block may be obscured by
        // blocks in a layer above or the same layer. Due to perspective
        // (camera always above construction), it will never be obscured by
        // blocks on the layer below.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < zB) {
                break; // because all the following blocks are also below the
                       // new block
            } else if (realBlock.zB() === zB) {
                if (this._isObscuredBySLO(realBlock)) {
                    this._subtractRealBlock(realBlock, context);
                }
            } else if (realBlock.zB() > zB) {
                // Real blocks in a layer above always obscure real blocks in
                // the layer below, due to perspective.
                this._subtractRealBlock(realBlock, context);
            }
        }
    },

    // Updates the shadow, i.e. (re-)draws it or removes it.
    _renderShadow: function () {
        if (this.isMovable()) {
            this._shadow.render();
        } else {
            this._shadow.clear();
        }
    },

    // Returns true, iff there have been changes that make it necessary to
    // rerender this block.
    _needsToBeRendered: function () {
        var 
        coordinatesHaveChanged, constructionBlocksHaveChanged, 
        stateHasChanged;

        coordinatesHaveChanged = this._coordinatesChangedAfterLastRendering;

        // Rerendering is necessary on construction block change, because they
        // may obscure part of the block and shadow, and are thus part of the
        // rendering:
        constructionBlocksHaveChanged = 
            (this._lastConstructionBlocksVersion !==
             this._constructionBlocks.versionOnServer());

        stateHasChanged = (this._lastState !== this._state);

        return coordinatesHaveChanged || constructionBlocksHaveChanged ||
            stateHasChanged;
    },

    _onRendered: function () {
        this._coordinatesChangedAfterLastRendering = false;
        this._lastState = this._state;
        this._lastConstructionBlocksVersion =
            this._constructionBlocks.versionOnServer();
    },

    // Draws the block with shadow on the sensor of the camera. Depends on the
    // vertexes in view coordinates. Only re-renders the new block when
    // necessary, i.e. when its sensor space projection has changed or when its
    // state has changed. The shadow is updated only when the sensor space
    // projection of the new block has changed, when the state of the new block
    // has changed, or when the construction blocks have changed.
    render: function () {
        var canvas, context, color;

        this._updateCoordinates();

        if (this._needsToBeRendered()) {
            canvas = this._camera.sensor().newBlockCanvas();
            if (canvas.getContext) {
                context = canvas.getContext('2d');
                color = this.isMovable() ? 'red' : 'white';

                // Shadow does currently not work with FlashCanvas.
                if (!com.realitybuilder.util.isFlashCanvasActive()) {
                    this._renderShadow();
                }

                com.realitybuilder.util.clearCanvas(canvas);
                this.inherited(arguments, [context, color]);

                // removes parts of the real block obscured by other blocks:
                this._subtractRealBlocks(context);
            }
            this._onRendered();
        }
    }
});
