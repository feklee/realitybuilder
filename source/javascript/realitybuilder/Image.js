// The live image, being updated regularly.

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

/*global realitybuilder, dojo, dojox, FlashCanvas, logoutUrl */

dojo.provide('realitybuilder.Image');

dojo.declare('realitybuilder.Image', null, {
    // Version of data last retrieved from the server, or "-1" initially. Is a
    // string in order to be able to contain very large integers.
    _versionOnServer: '-1',

    // The URL that the server retrieves the image from (it then caches it):
    _url: '',

    // The duration of the intervals between the server retrieving a new image
    // from the url:
    _updateIntervalServer: 5, // s

    // Node object of the live image.
    _node: null,

    // Handle of the onload event connection.
    _onloadHandle: null,

    // True after the first image has been loaded.
    _imageLoaded: false,

    // Sets the dimensions of the image to those of the sensor of the camera
    // "camera" and starts the update cicle.
    constructor: function (camera) {
        this._node = dojo.byId('live');

        this._node.style.width = camera.sensor().width() + 'px';
        this._node.style.height = camera.sensor().height() + 'px';

        this._onloadHandle = dojo.connect(this._node, 'onload', 
                                          this, this._onFirstImageLoad);
    },

    imageLoaded: function () {
        return this._imageLoaded;
    },

    versionOnServer: function () {
        return this._versionOnServer;
    },

    url: function () {
        return this._url;
    },

    updateIntervalServer: function () {
        return this._updateIntervalServer;
    },

    // Updates the settings of the image to the version on the server, which is
    // described by "serverData".
    updateWithServerData: function (serverData) {
        this._versionOnServer = serverData.version;
        this._updateIntervalServer = serverData.updateIntervalServer;
        this._url = serverData.url;
        dojo.publish('realitybuilder/Image/changed');
    },

    // Called when an image has been loaded for the first time. Notes that in a
    // flag and stops listening to the onload event.
    _onFirstImageLoad: function () {
        this._imageLoaded = true;
        dojo.disconnect(this._onloadHandle);
    },

    // Updates the image.
    update: function () {
        this._node.src = realitybuilder.util.rootUrl() + 
            'images/live.jpg?nocache=' + Math.random().toString();
    }
});