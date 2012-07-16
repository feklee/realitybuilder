/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.storage.Provider"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.storage.Provider"]){_4._hasResource["dojox.storage.Provider"]=true;_4.provide("dojox.storage.Provider");_4.declare("dojox.storage.Provider",null,{constructor:function(){},SUCCESS:"success",FAILED:"failed",PENDING:"pending",SIZE_NOT_AVAILABLE:"Size not available",SIZE_NO_LIMIT:"No size limit",DEFAULT_NAMESPACE:"default",onHideSettingsUI:null,initialize:function(){console.warn("dojox.storage.initialize not implemented");},isAvailable:function(){console.warn("dojox.storage.isAvailable not implemented");},put:function(_7,_8,_9,_a){console.warn("dojox.storage.put not implemented");},get:function(_b,_c){console.warn("dojox.storage.get not implemented");},hasKey:function(_d,_e){return !!this.get(_d,_e);},getKeys:function(_f){console.warn("dojox.storage.getKeys not implemented");},clear:function(_10){console.warn("dojox.storage.clear not implemented");},remove:function(key,_11){console.warn("dojox.storage.remove not implemented");},getNamespaces:function(){console.warn("dojox.storage.getNamespaces not implemented");},isPermanent:function(){console.warn("dojox.storage.isPermanent not implemented");},getMaximumSize:function(){console.warn("dojox.storage.getMaximumSize not implemented");},putMultiple:function(_12,_13,_14,_15){for(var i=0;i<_12.length;i++){_6.storage.put(_12[i],_13[i],_14,_15);}},getMultiple:function(_16,_17){var _18=[];for(var i=0;i<_16.length;i++){_18.push(_6.storage.get(_16[i],_17));}return _18;},removeMultiple:function(_19,_1a){for(var i=0;i<_19.length;i++){_6.storage.remove(_19[i],_1a);}},isValidKeyArray:function(_1b){if(_1b===null||_1b===undefined||!_4.isArray(_1b)){return false;}return !_4.some(_1b,function(key){return !this.isValidKey(key);},this);},hasSettingsUI:function(){return false;},showSettingsUI:function(){console.warn("dojox.storage.showSettingsUI not implemented");},hideSettingsUI:function(){console.warn("dojox.storage.hideSettingsUI not implemented");},isValidKey:function(_1c){if(_1c===null||_1c===undefined){return false;}return /^[0-9A-Za-z_]*$/.test(_1c);},getResourceList:function(){return [];}});}}};});