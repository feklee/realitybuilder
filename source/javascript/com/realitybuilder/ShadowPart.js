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

// Part of the shadow under the new block.

"use strict";

dojo.provide('com.realitybuilder.ShadowPart');

dojo.declare('com.realitybuilder.ShadowPart', null, {
    // New block that the shadow is associated with.
    _newBlock: null,

    // Vertices in world space.
    _vertices: null,

    // Vertices in view space.
    _verticesV: null,

    // Vertices in sensor space.
    _verticesS: null,

    // Camera object, used for calculating the projection on the camera sensor.
    _camera: null,

    // Bounding box of the shadow.
    _boundingBoxS: null,

    // The list of points that is used when drawing the shadow polygon.
    _points: null,

    // Permament blocks in the construction, including real and pending blocks.
    // Needed for hidden lines removal and collision detection.
    _constructionBlocks: null,

    // Position of the shadow in block space.
    _xB: null,
    _yB: null,
    _zB: null,

    // Position of the shadow part relative to the origin of the shadow:
    _deltaXB: null,
    _deltaYB: null,

    // Creates the part of the shadow of the block "newBlock". The shadow
    // part's size is 1x1 in block space, and realtive to the origin of the
    // complete shadow, it is located at "deltaXB", "deltaYB". When the shadow
    // part is rendered, it is as seen by the sensor of the camera "camera".
    // For finding which parts of the shadow have to be obscured, the list of
    // non-new blocks in the construction is used: "constructionBlocks"
    constructor: function(deltaXB, deltaYB, newBlock, camera, 
        constructionBlocks)
    {
        this._deltaXB = deltaXB;
        this._deltaYB = deltaYB;
        this._newBlock = newBlock;
        this._camera = camera;
        this._constructionBlocks = constructionBlocks;
    },

    zB: function() {
        return this._zB;
    },

    // Returns the shadow's position in block space. From the position the
    // block extends in positive direction along the x- and y-axis. Depends on
    // up to date coordinates in world space.
    positionB: function() {
        return [this._newBlock.xB(), this._newBlock.yB(), this._zB];
    },

    // Updates the vertices in world space.
    _updateWorldSpace: function() {
        var xB = this._newBlock.xB() + this._deltaXB,
            yB = this._newBlock.yB() + this._deltaYB,
            zB = this._constructionBlocks.
                zBOfUpperSideOfRealBlockBelow(xB, yB, this._newBlock.zB() + 1),
            relativeVerticesB = [[0, 0], [1, 0], [1, 1], [0, 1]];

        this._vertices = dojo.map(relativeVerticesB, function(rVB) {
            return com.realitybuilder.util.blockToWorld
                ([xB + rVB[0], yB  + rVB[1], zB]);
        });

        this._xB = xB;
        this._yB = yB;
        this._zB = zB;
    },

    // Calculates the vertices in view space.
    _updateViewSpace: function() {
        this._updateWorldSpace();
        this._verticesV = dojo.map(this._vertices, 
            dojo.hitch(this._camera, this._camera.worldToView));
    },

    // Calculates the vertices of the shadow and its bounding box in sensor
    // space. The camera is positioned in the center of the sensor.
    updateSensorSpace: function() {
        this._updateViewSpace();
        this._verticesS = dojo.map(this._verticesV,
            dojo.hitch(this._camera, this._camera.viewToSensor));
        this._updateSensorSpaceBoundingBox();
    },

    // Returns true, iff the bounding box of the shadow overlaps with that of
    // the block "block", in sensor space.
    _boundingBoxesOverlap: function(block) {
        var bBS = block.boundingBoxS();
        return (
            this._boundingBoxS[1][0] >= bBS[0][0] &&
            this._boundingBoxS[0][0] <= bBS[1][0] &&
            this._boundingBoxS[1][1] >= bBS[0][1] &&
            this._boundingBoxS[0][1] <= bBS[1][1]);
    },

    // Returns true, iff any vertex of the shadow is inside the bounding box of
    // the block "block", in sensor space. If the block "block" is obscuring
    // part or all of the shadow, then this is the case.
    _anyVertexInBoundingBox: function(block) {
        var bBS = block.boundingBoxS(), i, vS;
        for (i = 0; i < this._verticesS.length; i += 1) {
            vS = this._verticesS[i];
            if (vS[0] >= bBS[0][0] &&
                vS[0] <= bBS[1][0] &&
                vS[1] >= bBS[0][1] &&
                vS[1] <= bBS[1][1])
            {
                return true;
            }
        }
        return false;
    },

    // Updates the vertices (top left, lower right) defining the bounding box
    // of the shadow in sensor space. Depends on the vertices of the shadow in
    // sensor space.
    _updateSensorSpaceBoundingBox: function() {
        var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE,
            maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
        dojo.forEach(this._verticesS, function(tmp) {
            if (tmp[0] < minX) {
                minX = tmp[0];
            } else if (tmp[0] > maxX) {
                maxX = tmp[0];
            }
            if (tmp[1] < minY) {
                minY = tmp[1];
            } else if (tmp[1] > maxY) {
                maxY = tmp[1];
            }
        });

        this._boundingBoxS = [[minX, minY], [maxX, maxY]];
    },

    // Returns true, if the block "block" is a cutting block, i.e. if it is a
    // block in front of the shadow part.
    _isCuttingBlock: function(block) {
        return (
            block.xB() >= this._xB - 1 && 
            block.yB() <= this._yB + 1 &&
            block.zB() >= this._zB);
    },

    // Subtracts the shapes of the real blocks in front of the shadow from the
    // drawing on the canvas context "context". Needs to be called for each sub
    // shadow individually since a sub shadow may be on a block that hides
    // another sub shadow.
    _subtractRealBlocks: function(context) {
        var realBlocksSorted = this._constructionBlocks.realBlocksSorted(),
            i, realBlock;

        // Idea behind the following loop: the shadow may be covered by blocks
        // in a layer above or the same layer.
        for (i = 0; i < realBlocksSorted.length; i += 1) {
            realBlock = realBlocksSorted[i];

            if (realBlock.zB() < this._zB) {
                break;
            }

            // Only blocks in front of the shadow are allowed to cut it.
            if (this._isCuttingBlock(realBlock)) {
                if (this._boundingBoxesOverlap(realBlock) && 
                    this._anyVertexInBoundingBox(realBlock))
                {
                    realBlock.subtract(context);
                }
            }
        }
    },

    // Draws the shadow on the canvas context "context". The shadow is drawn in
    // front of everything else on the surface of the canvas. Depends on up to
    // date vertices in sensor space.
    render: function(context) {
        var verticesS = this._verticesS, i;
        context.fillStyle = 'rgba(255,0,0,0.2)';
        context.beginPath();
        context.moveTo(verticesS[0][0], verticesS[0][1]);
        for (i = 1; i < 4; i += 1) {
            context.lineTo(verticesS[i][0], verticesS[i][1]);
        }
        context.closePath();
        context.fill();

        this._subtractRealBlocks(context);
    }
});
