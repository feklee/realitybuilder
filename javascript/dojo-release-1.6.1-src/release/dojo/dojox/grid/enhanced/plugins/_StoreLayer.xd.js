/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins._StoreLayer"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins._StoreLayer"]){_4._hasResource["dojox.grid.enhanced.plugins._StoreLayer"]=true;_4.provide("dojox.grid.enhanced.plugins._StoreLayer");(function(){var ns=_6.grid.enhanced.plugins,_7=function(_8){var _9=["reorder","sizeChange","normal","presentation"];var _a=_9.length;for(var i=_8.length-1;i>=0;--i){var p=_4.indexOf(_9,_8[i]);if(p>=0&&p<=_a){_a=p;}}if(_a<_9.length-1){return _9.slice(0,_a+1);}else{return _9;}},_b=function(_c){var i,_d=this._layers,_e=_d.length;if(_c){for(i=_e-1;i>=0;--i){if(_d[i].name()==_c){_d[i]._unwrap(_d[i+1]);break;}}_d.splice(i,1);}else{for(i=_e-1;i>=0;--i){_d[i]._unwrap();}}if(!_d.length){delete this._layers;delete this.layer;delete this.unwrap;delete this.forEachLayer;}return this;},_f=function(_10){var i,_11=this._layers;if(typeof _10=="undefined"){return _11.length;}if(typeof _10=="number"){return _11[_10];}for(i=_11.length-1;i>=0;--i){if(_11[i].name()==_10){return _11[i];}}return null;},_12=function(_13,_14){var len=this._layers.length,_15,end,dir;if(_14){_15=0;end=len;dir=1;}else{_15=len-1;end=-1;dir=-1;}for(var i=_15;i!=end;i+=dir){if(_13(this._layers[i],i)===false){return i;}}return end;};ns.wrap=function(_16,_17,_18,_19){if(!_16._layers){_16._layers=[];_16.layer=_4.hitch(_16,_f);_16.unwrap=_4.hitch(_16,_b);_16.forEachLayer=_4.hitch(_16,_12);}var _1a=_7(_18.tags);if(!_4.some(_16._layers,function(lyr,i){if(_4.some(lyr.tags,function(tag){return _4.indexOf(_1a,tag)>=0;})){return false;}else{_16._layers.splice(i,0,_18);_18._wrap(_16,_17,_19,lyr);return true;}})){_16._layers.push(_18);_18._wrap(_16,_17,_19);}return _16;};_4.declare("dojox.grid.enhanced.plugins._StoreLayer",null,{tags:["normal"],layerFuncName:"_fetch",constructor:function(){this._store=null;this._originFetch=null;this.__enabled=true;},initialize:function(_1b){},uninitialize:function(_1c){},invalidate:function(){},_wrap:function(_1d,_1e,_1f,_20){this._store=_1d;this._funcName=_1e;var _21=_4.hitch(this,function(){return (this.enabled()?this[_1f||this.layerFuncName]:this.originFetch).apply(this,arguments);});if(_20){this._originFetch=_20._originFetch;_20._originFetch=_21;}else{this._originFetch=_1d[_1e]||function(){};_1d[_1e]=_21;}this.initialize(_1d);},_unwrap:function(_22){this.uninitialize(this._store);if(_22){_22._originFetch=this._originFetch;}else{this._store[this._funcName]=this._originFetch;}this._originFetch=null;this._store=null;},enabled:function(_23){if(typeof _23!="undefined"){this.__enabled=!!_23;}return this.__enabled;},name:function(){if(!this.__name){var m=this.declaredClass.match(/(?:\.(?:_*)([^\.]+)Layer$)|(?:\.([^\.]+)$)/i);this.__name=m?(m[1]||m[2]).toLowerCase():this.declaredClass;}return this.__name;},originFetch:function(){return (_4.hitch(this._store,this._originFetch)).apply(this,arguments);}});_4.declare("dojox.grid.enhanced.plugins._ServerSideLayer",ns._StoreLayer,{constructor:function(_24){_24=_24||{};this._url=_24.url||"";this._isStateful=!!_24.isStateful;this._onUserCommandLoad=_24.onCommandLoad||function(){};this.__cmds={cmdlayer:this.name(),enable:true};this.useCommands(this._isStateful);},enabled:function(_25){var res=this.inherited(arguments);this.__cmds.enable=this.__enabled;return res;},useCommands:function(_26){if(typeof _26!="undefined"){this.__cmds.cmdlayer=(_26&&this._isStateful)?this.name():null;}return !!(this.__cmds.cmdlayer);},_fetch:function(_27){if(this.__cmds.cmdlayer){_4.xhrPost({url:this._url||this._store.url,content:this.__cmds,load:_4.hitch(this,function(_28){this.onCommandLoad(_28,_27);this.originFetch(_27);}),error:_4.hitch(this,this.onCommandError)});}else{this.onCommandLoad("",_27);this.originFetch(_27);}return _27;},command:function(_29,_2a){var _2b=this.__cmds;if(_2a===null){delete _2b[_29];}else{if(typeof _2a!=="undefined"){_2b[_29]=_2a;}}return _2b[_29];},onCommandLoad:function(_2c,_2d){this._onUserCommandLoad(this.__cmds,_2d,_2c);},onCommandError:function(_2e){console.log(_2e);throw _2e;}});})();}}};});