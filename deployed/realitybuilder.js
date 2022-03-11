// Provides the Reality Builder as a web widget.
//
// Copyright 2011 Felix E. Klee <felix.klee@inka.de>
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

/*global realityBuilderDojo, realityBuilderDojoUncompressed, acme, window, 
  LazyLoad */

var realityBuilder = (function () {
    var
    scriptIsLoaded,
    initialized, // true, after the public "initialize" has been called
    settings, publicInterface;

    /* {{ "*" }}{{ "/" }} 
       {% include "javascript/lazyload/lazyload-min.js" %}
    {{ "/" }}{{ "*" }} */

    // Instanciates the widget and merges its global members into the
    // "realityBuilder" name space.
    function setupWidget() {
        realityBuilderDojo.mixin(realityBuilder, 
                                 new realityBuilder.RealityBuilder(settings));
    }

    // Some old browsers may support JavaScript but not Dojo. In this case,
    // this function returns false.
    function dojoIsSupported() {
        return typeof realityBuilderDojo !== 'undefined';
    }

    // Returns false for some old browsers.
    function w3cDomIsSupported() {
        // The check does not use "in" since older browsers such as Netscape 4
        // don't support that operator.
        return document.getElementById && document.createElement;
    }

    // Sets up the widget after waiting for Dojo to be ready.
    function requestSetupWidget() {
        if (dojoIsSupported()) {
            // {% if debug %}
            realityBuilderDojo.require('realityBuilder.RealityBuilder');
            // {% endif %}

            // "addOnLoad" is necessary to wait for Dojo dependencies to be
            // resolved.
            realityBuilderDojo.addOnLoad(function () {
                setupWidget();
            });
        } else {
            settings.onBrowserNotSupportedError();
        }
    }

    function requestSetupWidgetIfScriptIsLoaded() {
        if (scriptIsLoaded) {
            requestSetupWidget();
        }
    }

    function requestSetupWidgetIfInitialized() {
        if (initialized) {
            requestSetupWidget();
        }
    }

    // Necessary to work around a bug in Dojo 1.6 where "scopeMap" breaks
    // "dojo.query":
    //
    // <url:http://groups.google.com/group/dojo-interest/browse_thread/thread/2
    // bcd6c8aff0487cb/4a164ecba59d16f9>
    function fixDojoQueryBug() {
        if (!('query' in realityBuilderDojo) && 
            typeof acme !== 'undefined' && 'query' in acme) {
            realityBuilderDojo.query = acme.query; 
        }
    }

    function onScriptLoaded() {
        scriptIsLoaded = true;
        fixDojoQueryBug();
        requestSetupWidgetIfInitialized();
    }

    // Requests asynchronous loading of the specified JavaScript file.
    //
    // Note that this function causes "onload" to be blocked until the script
    // is loaded in Firefox, Chrome, and Safari:
    //
    //   http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
    //
    // However, in general this should be no problem. After all, in the
    // anticipated use cases the widget is an integral part of a web page.
    // Also, one can still work around the issue by loading the current script
    // in an asynchronous way.
    function requestLoadScript(scriptUrl) {
        LazyLoad.js(scriptUrl, onScriptLoaded);
    }

    // Loads the Dojo JavaScript that is used for debugging mode.
    function requestLoadDebugScript() {
        var scriptUrl, baseUrl;

        // For debugging it is assumed that this script and related Dojo
        // resources are included from files which are hosted on the same
        // domain.
        //
        // This makes  it possible to  use for example Apache's  "ProxyPass" to
        // work around GAE's current limitation of only being able to serve one
        // file at a  time (slow!). "host" would be the host  of the Google App
        // Engine, and not of the proxy.
        //
        // Note that with Dojo 1.6, the baseUrl has to be set manually because
        // it is not detected correctly:
        //
        //   <url:http://groups.google.com/group/dojo-interest/msg/65a43ee98f27
        //   cb6e>
        scriptUrl = 
            '/javascript/dojo-release-1.6.1/dojo/dojo.js.uncompressed.js';
        baseUrl = '/javascript/dojo-release-1.6.1/dojo/';

        window.djConfig = {
            isDebug: true,
            locale: "en",
            debugContainerId: "firebugLite",
            baseUrl: baseUrl,
            scopeMap: [
                ["dojo", "realityBuilderDojo"], 
                ["dijit", "realityBuilderDijit"],
                ["dojox", "realityBuilderDojox"]
            ],
            modulePaths: {
                "realityBuilder": "/javascript/realityBuilder"
            }
        };

        requestLoadScript(scriptUrl);
    }

    function releaseScriptPostfix() {
        return (typeof realityBuilderDojoUncompressed !== 'undefined' &&
                realityBuilderDojoUncompressed) ? '.uncompressed.js' : '';
    }

    // Loads the Dojo JavaScript that is used for release mode. Almost all
    // functionality is built into one file.
    function requestLoadReleaseScript() {
        var baseUrl = '{{ base_url }}';
        requestLoadScript(baseUrl + '/javascript/dojo/dojo.xd.js' +
                          releaseScriptPostfix());
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

    scriptIsLoaded = false;
    initialized = false;
    settings = {};

    if (w3cDomIsSupported()) {
        // {% if debug %}
        requestLoadDebugScript();
        // {% else %}
        requestLoadReleaseScript();
        // {% endif %}
    } // else: don't do anything - "settings.onBrowserNotSupportedError" is not
      // yet set.

    publicInterface = {
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
        // * "onReady": Function that is called when the Reality Builder is
        //   ready to use, i.e. after it has downloaded the required resources,
        //   rendered itself, etc.
        //
        // * "jsonpTimeout", "onJsonpError": 
        //
        //   Possible values of the timeout "jsonpTimeout":
        //   
        //   0: no effect
        // 
        //   >0 (ms): "onJsonpError" is called when the server doesn't respond
        //     to a JSONP request before the timeout has been reached.
        //
        //   This functionality is necessary since the method of making JSONP
        //   requests otherwise is incapable of reporting errors when the
        //   server is not responding:
        //
        //     <url:http://www.ibm.com/developerworks/library/wa-aj-jsonp1/?ca=
        //     dgr-jw64JSONP-jQuery&S%5FTACT=105AGY46&S%5FCMP=grsitejw64>
        //
        //   Be careful with specifying a timeout though: A user of the Reality
        //   Builder may be behind a very slow connection.
        //
        // * "onBrowserNotSupportedError": Function that is executed when the
        //   Reality Builder does not work with the current browser, e.g. when
        //   the current browser doesn't support a required HTML element such
        //   as the canvas element.
        //
        // * "onPrerenderedBlockConfigurationChanged": Function that is
        //   executed when the prerendered configuration is changed.
        //
        // * "onDegreesOfFreedomChanged": Function that is called when the
        //   degrees of freedom of the new block changed.
        //
        //   That may happen for example when after the block has been moved
        //   into a corner from where it can only be moved in certain
        //   directions. Or it may happen if the block can now be made real.
        //
        // * "onMovedOrRotated": Function that is called when the new block has
        //   been moved or rotated.
        //
        // * "onCameraChanged": Function that is called when camera data has
        //   changed.
        //
        // * "onConstructionBlocksChanged": Called when new blocks have been
        //   added, when a pending block has been made real, etc.
        //
        // * "onServerError": Called when the server could not process are
        //   request, for example because the server was down.
        //
        // * "lineWidthOfBlock": line width of block (px)
        //
        // * "colorOfPendingBlock", "colorOfRealBlock", "colorOfNewBlock",
        //   "colorOfFrozenNewBlock", "colorOfNewBlockShadow",
        //   "alphaOfNewBlockShadow":
        //
        //   Colors (CSS format) and alpha transparency of blocks, shadow.
        initialize: function (settings) {
            var defaultSettings = {
                id: 'realityBuilder',
                namespace: 'default',
                jsonpTimeout: 0,
                onServerCommunicationError: nop,
                onBrowserNotSupportedError: nop,
                onPrerenderedBlockConfigurationChanged: nop,
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
                alphaOfNewBlockShadow: 0.2
            };

            if (!w3cDomIsSupported()) {
                // Happens for example with Netscape 4. There is no point in
                // continuing.
                settings.onBrowserNotSupportedError();
            } else {
                mergeIntoSettings(defaultSettings);
                mergeIntoSettings(settings);
                initialized = true;
                requestSetupWidgetIfScriptIsLoaded();
            }
        }
    };

    return publicInterface;
}());
