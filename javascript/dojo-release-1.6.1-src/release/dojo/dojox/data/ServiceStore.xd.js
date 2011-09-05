/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.ServiceStore"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.ServiceStore"]){_4._hasResource["dojox.data.ServiceStore"]=true;_4.provide("dojox.data.ServiceStore");_4.declare("dojox.data.ServiceStore",_6.data.ClientFilter||null,{service:null,constructor:function(_7){this.byId=this.fetchItemByIdentity;this._index={};if(_7){_4.mixin(this,_7);}this.idAttribute=(_7&&_7.idAttribute)||(this.schema&&this.schema._idAttr);},schema:null,idAttribute:"id",labelAttribute:"label",syncMode:false,estimateCountFactor:1,getSchema:function(){return this.schema;},loadLazyValues:true,getValue:function(_8,_9,_a){var _b=_8[_9];return _b||(_9 in _8?_b:_8._loadObject?(_6.rpc._sync=true)&&arguments.callee.call(this,_6.data.ServiceStore.prototype.loadItem({item:_8})||{},_9,_a):_a);},getValues:function(_c,_d){var _e=this.getValue(_c,_d);if(_e instanceof Array){return _e;}if(!this.isItemLoaded(_e)){_6.rpc._sync=true;_e=this.loadItem({item:_e});}return _e instanceof Array?_e:_e===undefined?[]:[_e];},getAttributes:function(_f){var res=[];for(var i in _f){if(_f.hasOwnProperty(i)&&!(i.charAt(0)=="_"&&i.charAt(1)=="_")){res.push(i);}}return res;},hasAttribute:function(_10,_11){return _11 in _10;},containsValue:function(_12,_13,_14){return _4.indexOf(this.getValues(_12,_13),_14)>-1;},isItem:function(_15){return (typeof _15=="object")&&_15&&!(_15 instanceof Date);},isItemLoaded:function(_16){return _16&&!_16._loadObject;},loadItem:function(_17){var _18;if(_17.item._loadObject){_17.item._loadObject(function(_19){_18=_19;delete _18._loadObject;var _1a=_19 instanceof Error?_17.onError:_17.onItem;if(_1a){_1a.call(_17.scope,_19);}});}else{if(_17.onItem){_17.onItem.call(_17.scope,_17.item);}}return _18;},_currentId:0,_processResults:function(_1b,_1c){if(_1b&&typeof _1b=="object"){var id=_1b.__id;if(!id){if(this.idAttribute){id=_1b[this.idAttribute];}else{id=this._currentId++;}if(id!==undefined){var _1d=this._index[id];if(_1d){for(var j in _1d){delete _1d[j];}_1b=_4.mixin(_1d,_1b);}_1b.__id=id;this._index[id]=_1b;}}for(var i in _1b){_1b[i]=this._processResults(_1b[i],_1c).items;}var _1e=_1b.length;}return {totalCount:_1c.request.count==_1e?(_1c.request.start||0)+_1e*this.estimateCountFactor:_1e,items:_1b};},close:function(_1f){return _1f&&_1f.abort&&_1f.abort();},fetch:function(_20){_20=_20||{};if("syncMode" in _20?_20.syncMode:this.syncMode){_6.rpc._sync=true;}var _21=this;var _22=_20.scope||_21;var _23=this.cachingFetch?this.cachingFetch(_20):this._doQuery(_20);_23.request=_20;_23.addCallback(function(_24){if(_20.clientFetch){_24=_21.clientSideFetch({query:_20.clientFetch,sort:_20.sort,start:_20.start,count:_20.count},_24);}var _25=_21._processResults(_24,_23);_24=_20.results=_25.items;if(_20.onBegin){_20.onBegin.call(_22,_25.totalCount,_20);}if(_20.onItem){for(var i=0;i<_24.length;i++){_20.onItem.call(_22,_24[i],_20);}}if(_20.onComplete){_20.onComplete.call(_22,_20.onItem?null:_24,_20);}return _24;});_23.addErrback(_20.onError&&function(err){return _20.onError.call(_22,err,_20);});_20.abort=function(){_23.cancel();};_20.store=this;return _20;},_doQuery:function(_26){var _27=typeof _26.queryStr=="string"?_26.queryStr:_26.query;return this.service(_27);},getFeatures:function(){return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true,"dojo.data.api.Schema":this.schema};},getLabel:function(_28){return this.getValue(_28,this.labelAttribute);},getLabelAttributes:function(_29){return [this.labelAttribute];},getIdentity:function(_2a){return _2a.__id;},getIdentityAttributes:function(_2b){return [this.idAttribute];},fetchItemByIdentity:function(_2c){var _2d=this._index[(_2c._prefix||"")+_2c.identity];if(_2d){if(_2d._loadObject){_2c.item=_2d;return this.loadItem(_2c);}else{if(_2c.onItem){_2c.onItem.call(_2c.scope,_2d);}}}else{return this.fetch({query:_2c.identity,onComplete:_2c.onItem,onError:_2c.onError,scope:_2c.scope}).results;}return _2d;}});}}};});