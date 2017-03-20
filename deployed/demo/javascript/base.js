// For all pages.

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

/*global realityBuilder, $, alert */

var realityBuilderDemo = (function () {
    var publicInterface,
    coordinateButtonDeltaBs = {
        'incX': [1, 0, 0],
        'decX': [-1, 0, 0],
        'incY': [0, 1, 0],
        'decY': [0, -1, 0],
        'incZ': [0, 0, 1],
        'decZ': [0, 0, -1]
    },
    backgroundImageIsLoaded = false, // initially only a placeholder is loaded
    realityBuilderIsReady = false,
    realityBuilderVersion;
    
    function forEachCoordinateButton(f) {
        $.each(coordinateButtonDeltaBs, function (type, deltaB) {
            f(type, deltaB);
        });
    }

    function onBrowserNotSupportedError() {
        // "alert" works also in very old browsers such as Netscape 4.
        alert('Your web browser is not supported.');
    }

    function onServerError() {
        alert('Server error.');
    }

    // Unhides the content.
    function unhideView() {
        $('#loadIndicator').fadeOut(1000);
    }

    // Unhides the view, if the Reality Builder is ready and if the background
    // image is ready, i.e. has been loaded.
    function unhideViewIfAllReady() {
        if (realityBuilderIsReady && backgroundImageIsLoaded) {
            unhideView();
        }
    }

    function updateBackgroundImage() {
        $('#backgroundImage').
            attr('src', 
                 '/demo/images/prerendered_' + 
                 realityBuilder.prerenderMode().i() + '.jpg');

        if (!backgroundImageIsLoaded) {
            $('#backgroundImage').one('load', function () { 
                backgroundImageIsLoaded = true;
                unhideViewIfAllReady();
            });
        }
    }

    // Called also at the very beginning, i.e. when there has been no previous
    // prerendered block configuration displayed.
    function onPrerenderedBlockConfigurationChanged() {
        updateBackgroundImage();
    }

    // Updates the state of a node, i.e. whether it's enabled or disabled.
    function updateNodeState(node, shouldBeEnabled) {
        if (shouldBeEnabled) {
            node.removeClass('disabled');
        } else {
            node.addClass('disabled');
        }
    }

    function controlButtonNode(type) {
        return $('#' + type + 'Button');
    }

    function updateControlButtonState(type, shouldBeEnabled) {
        updateNodeState(controlButtonNode(type), shouldBeEnabled);
    }

    function updateCoordinateButtonState(type, deltaB) {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateControlButtonState(type, newBlock.canBeMoved(deltaB));
        }
    }

    function updateRotate90ButtonState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateControlButtonState('rotate90', newBlock.canBeRotated90());
        }
    }

    function updateMakeRealButtonState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateControlButtonState('requestMakeReal', 
                                     newBlock.canBeMadeReal());
        }
    }

    function updateControlPanelState() {
        var newBlock;

        if (realityBuilderIsReady) {
            newBlock = realityBuilder.newBlock();
            updateNodeState($('#controlPanel'), !newBlock.isFrozen());
        }
    }

    function onDegreesOfFreedomChanged() {
        forEachCoordinateButton(updateCoordinateButtonState);
        updateControlPanelState();
        updateRotate90ButtonState();
        updateMakeRealButtonState();
    }

    function setUpControlButton(type, onClick) {
        controlButtonNode(type).click(onClick);
    }

    function setUpCoordinateButton(type, deltaB) {
        setUpControlButton(type,
                           function () {
                               realityBuilder.newBlock().move(deltaB);
                           });
    }

    function setUpRotate90Button() {
        setUpControlButton('rotate90',
                           function () {
                               realityBuilder.newBlock().rotate90();
                           });
    }

    function setUpRequestMakeRealButton() {
        setUpControlButton('requestMakeReal',
                           function () {
                               realityBuilder.newBlock().requestMakeReal();
                           });
    }

    function scheduleReset() {
        realityBuilder.prerenderMode().scheduleReset();
    }

    function onKeyPressed(event) {
        if (event.which === 114) {
            scheduleReset();
        }
    }

    function setUpHandlingOfKeyPresses() {
        $(document.documentElement).keypress(onKeyPressed);
    }

    function updateResetDelay() {
        $('#resetDelay').text(realityBuilder.prerenderMode().resetDelay());
    }

    // Called when the Reality Builder is ready. Note that the background image
    // is separate and may still be in the process of being loaded.
    function onReady() {
        forEachCoordinateButton(setUpCoordinateButton);
        setUpRotate90Button();
        setUpRequestMakeRealButton();
        setUpHandlingOfKeyPresses();
        updateResetDelay();

        realityBuilderIsReady = true;

        unhideViewIfAllReady();
    }

    publicInterface = {
        setRealityBuilderVersion: function (x) {
            realityBuilderVersion = x;
        },

        settings: function () {
            return {
                width: 640,
                height: 480,
                namespace: realityBuilderVersion + '_demo',
                onReady: onReady,
                onBrowserNotSupportedError: onBrowserNotSupportedError,
                onPrerenderedBlockConfigurationChanged: 
                onPrerenderedBlockConfigurationChanged,
                onDegreesOfFreedomChanged: onDegreesOfFreedomChanged,
                onServerError: onServerError
            };
        }
    };

    return publicInterface;
}());
