// Provides the Reality Builder as a web widget.
//
// Copyright 2011-2012 Felix E. Klee <felix.klee@inka.de>
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

/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true */

/*global define */

define(['./scripts/reality_builder', './vendor/underscore-wrapped'
       ], function (realityBuilderFixme, _) {
    var exportsFixme = {};

    // Instanciates the widget and merges its global members into the
    // "realityBuilder" name space.
    function setupWidget(settings) {
        realityBuilderFixme.init(settings);
        _.extend(realityBuilder, realityBuilderFixme);
    }

    // Returns false for some old browsers.
    function w3cDomIsSupported() {
        // The check does not use "in" since older browsers such as Netscape 4
        // don't support that operator.
        return document.getElementById && document.createElement;
    }

    function mergeIntoSettings(newSettings) {
        var prop;

        for (prop in newSettings) {
            if (newSettings.hasOwnProperty(prop)) {
                settings[prop] = newSettings[prop];
            }
        }
    }

    function nop() {}

    // Mandatory settings:
    //
    // * "width", "height": dimensions (px)
    //
    // Optional settings:
    //
    // * "id": ID of HTML element into which to insert the Reality Builder.
    //
    // * "namespace": Namespace used when accessing the data store.
    //
    // * "baseUrl": Base URL of this script. Example: If this script has the
    //   URL "http://example.com/some/where/realitybuilder.js", then its base
    //   URL needs to be specified as "http://example.com/some/where".
    //
    // * "onReady": Function that is called when the Reality Builder is ready
    //   to use, i.e. after it has downloaded the required resources, rendered
    //   itself, etc.
    //
    // * "jsonpTimeout", "onJsonpError": 
    //
    //   Possible values of the timeout "jsonpTimeout":
    //   
    //   0: no effect
    // 
    //   >0 (ms): "onJsonpError" is called when the server doesn't respond to a
    //     JSONP request before the timeout has been reached.
    //
    //   This functionality is necessary since the method of making JSONP
    //   requests otherwise is incapable of reporting errors when the server is
    //   not responding:
    //
    //     <url:http://www.ibm.com/developerworks/library/wa-aj-jsonp1/?ca=
    //     dgr-jw64JSONP-jQuery&S%5FTACT=105AGY46&S%5FCMP=grsitejw64>
    //
    //   Be careful with specifying a timeout though: A user of the Reality
    //   Builder may be behind a very slow connection.
    //
    // * "onBrowserNotSupportedError": Function that is executed when the
    //   Reality Builder does not work with the current browser, e.g. when the
    //   current browser doesn't support a required HTML element such as the
    //   canvas element.
    //
    // * "onDegreesOfFreedomChanged": Function that is called when the degrees
    //   of freedom of the new block changed.
    //
    //   That may happen for example when after the block has been moved into a
    //   corner from where it can only be moved in certain directions. Or it
    //   may happen if the block can now be made real.
    //
    // * "onMovedOrRotated": Function that is called when the new block has
    //   been moved or rotated.
    //
    // * "onCameraChanged": Function that is called when camera data has
    //   changed.
    //
    // * "onConstructionBlocksChanged": Called when new blocks have been added,
    //   when a pending block has been made real, etc.
    //
    // * "onServerError": Called when the server could not process are request,
    //   for example because the server was down.
    //
    // * "lineWidthOfBlock": line width of block (px)
    //
    // * "colorOfPendingBlock", "colorOfRealBlock", "colorOfNewBlock",
    //   "colorOfFrozenNewBlock", "colorOfNewBlockShadow",
    //   "alphaOfNewBlockShadow":
    //
    //   Colors (CSS format) and alpha transparency of blocks, shadow.
    function init(settings) {
        var defaultSettings = {
            id: 'realityBuilder',
            namespace: 'default',
            baseUrl: null,
            jsonpTimeout: 0,
            onServerCommunicationError: nop,
            onBrowserNotSupportedError: nop,
            onReady: nop,
            onDegreesOfFreedomChanged: nop,
            onRealBlocksVisibilityChanged: nop,
            onPendingBlocksVisibilityChanged: nop,
            onCameraChanged: nop,
            onMovedOrRotated: nop,
            onConstructionBlocksChanged: nop,
            onServerError: nop,
            lineWidthOfBlock: 1,
            colorOfPendingBlock: 'white',
            colorOfRealBlock: 'green',
            colorOfNewBlock: 'red',
            colorOfFrozenNewBlock: 'white',
            colorOfNewBlockShadow: 'red',
            alphaOfNewBlockShadow: 0.2,
            backgroundAlpha: 0.2
        };

        if (!w3cDomIsSupported()) {
            // Happens for example with Netscape 4. There is no point in
            // continuing.
            settings.onBrowserNotSupportedError();
        } else {
            setupWidget(_.extend({}, defaultSettings, settings));
        }
    }

    settings = {};

    exportsFixme.init = init;

    return exportsFixme;
});
