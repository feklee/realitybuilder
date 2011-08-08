/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.filter.FilterLayer"],["require","dojox.grid.enhanced.plugins.filter._FilterExpr"],["require","dojox.grid.enhanced.plugins._StoreLayer"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.filter.FilterLayer"]){_4._hasResource["dojox.grid.enhanced.plugins.filter.FilterLayer"]=true;_4.provide("dojox.grid.enhanced.plugins.filter.FilterLayer");_4.require("dojox.grid.enhanced.plugins.filter._FilterExpr");_4.require("dojox.grid.enhanced.plugins._StoreLayer");(function(){var ns=_6.grid.enhanced.plugins,_7="filter",_8="clear",_9=function(_a,_b){return _b?_4.hitch(_a||_4.global,_b):function(){};},_c=function(_d){var _e={};if(_d&&_4.isObject(_d)){for(var _f in _d){_e[_f]=_d[_f];}}return _e;};_4.declare("dojox.grid.enhanced.plugins.filter._FilterLayerMixin",null,{tags:["sizeChange"],name:function(){return "filter";},onFilterDefined:function(_10){},onFiltered:function(_11,_12){}});_4.declare("dojox.grid.enhanced.plugins.filter.ServerSideFilterLayer",[ns._ServerSideLayer,ns.filter._FilterLayerMixin],{constructor:function(_13){this._onUserCommandLoad=_13.setupFilterQuery||this._onUserCommandLoad;this.filterDef(null);},filterDef:function(_14){if(_14){this._filter=_14;var obj=_14.toObject();this.command(_7,this._isStateful?_4.toJson(obj):obj);this.command(_8,null);this.useCommands(true);this.onFilterDefined(_14);}else{if(_14===null){this._filter=null;this.command(_7,null);this.command(_8,true);this.useCommands(true);this.onFilterDefined(null);}}return this._filter;},onCommandLoad:function(_15,_16){this.inherited(arguments);var _17=_16.onBegin;if(this._isStateful){var _18;if(_15){this.command(_7,null);this.command(_8,null);this.useCommands(false);var _19=_15.split(",");if(_19.length>=2){_18=this._filteredSize=parseInt(_19[0],10);this.onFiltered(_18,parseInt(_19[1],10));}else{return;}}else{_18=this._filteredSize;}if(this.enabled()){_16.onBegin=function(_1a,req){_9(_16.scope,_17)(_18,req);};}}else{var _1b=this;_16.onBegin=function(_1c,req){if(!_1b._filter){_1b._storeSize=_1c;}_1b.onFiltered(_1c,_1b._storeSize||_1c);req.onBegin=_17;_9(_16.scope,_17)(_1c,req);};}}});_4.declare("dojox.grid.enhanced.plugins.filter.ClientSideFilterLayer",[ns._StoreLayer,ns.filter._FilterLayerMixin],{_storeSize:-1,_fetchAll:true,constructor:function(_1d){this.filterDef(null);_1d=_4.isObject(_1d)?_1d:{};this.fetchAllOnFirstFilter(_1d.fetchAll);this._getter=_4.isFunction(_1d.getter)?_1d.getter:this._defaultGetter;},_defaultGetter:function(_1e,_1f,_20,_21){return _21.getValue(_1e,_1f);},filterDef:function(_22){if(_22!==undefined){this._filter=_22;this.invalidate();this.onFilterDefined(_22);}return this._filter;},setGetter:function(_23){if(_4.isFunction(_23)){this._getter=_23;}},fetchAllOnFirstFilter:function(_24){if(_24!==undefined){this._fetchAll=!!_24;}return this._fetchAll;},invalidate:function(){this._items=[];this._nextUnfetchedIdx=0;this._result=[];this._indexMap=[];this._resultStartIdx=0;},_fetch:function(_25,_26){if(!this._filter){var _27=_25.onBegin,_28=this;_25.onBegin=function(_29,r){_9(_25.scope,_27)(_29,r);_28.onFiltered(_29,_29);};this.originFetch(_25);return _25;}try{var _2a=_26?_26._nextResultItemIdx:_25.start;_2a=_2a||0;if(!_26){this._result=[];this._resultStartIdx=_2a;var _2b;if(_4.isArray(_25.sort)&&_25.sort.length>0&&(_2b=_4.toJson(_25.sort))!=this._lastSortInfo){this.invalidate();this._lastSortInfo=_2b;}}var end=typeof _25.count=="number"?_2a+_25.count-this._result.length:this._items.length;if(this._result.length){this._result=this._result.concat(this._items.slice(_2a,end));}else{this._result=this._items.slice(_25.start,typeof _25.count=="number"?_25.start+_25.count:this._items.length);}if(this._result.length>=_25.count||this._hasReachedStoreEnd()){this._completeQuery(_25);}else{if(!_26){_26=_c(_25);_26.onBegin=_4.hitch(this,this._onFetchBegin);_26.onComplete=_4.hitch(this,function(_2c,req){this._nextUnfetchedIdx+=_2c.length;this._doFilter(_2c,req.start,_25);this._fetch(_25,req);});}_26.start=this._nextUnfetchedIdx;if(this._fetchAll){delete _26.count;}_26._nextResultItemIdx=end<this._items.length?end:this._items.length;this.originFetch(_26);}}catch(e){if(_25.onError){_9(_25.scope,_25.onError)(e,_25);}else{throw e;}}return _25;},_hasReachedStoreEnd:function(){return this._storeSize>=0&&this._nextUnfetchedIdx>=this._storeSize;},_applyFilter:function(_2d,_2e){var g=this._getter,s=this._store;try{return !!(this._filter.applyRow(_2d,function(_2f,arg){return g(_2f,arg,_2e,s);}).getValue());}catch(e){console.warn("FilterLayer._applyFilter() error: ",e);return false;}},_doFilter:function(_30,_31,_32){for(var i=0,cnt=0;i<_30.length;++i){if(this._applyFilter(_30[i],_31+i)){_9(_32.scope,_32.onItem)(_30[i],_32);cnt+=this._addCachedItems(_30[i],this._items.length);this._indexMap.push(_31+i);}}},_onFetchBegin:function(_33,req){this._storeSize=_33;},_completeQuery:function(_34){var _35=this._items.length;if(this._nextUnfetchedIdx<this._storeSize){_35++;}_9(_34.scope,_34.onBegin)(_35,_34);this.onFiltered(this._items.length,this._storeSize);_9(_34.scope,_34.onComplete)(this._result,_34);},_addCachedItems:function(_36,_37){if(!_4.isArray(_36)){_36=[_36];}for(var k=0;k<_36.length;++k){this._items[_37+k]=_36[k];}return _36.length;},onRowMappingChange:function(_38){if(this._filter){var m=_4.clone(_38),_39={};for(var r in m){r=parseInt(r,10);_38[this._indexMap[r]]=this._indexMap[m[r]];if(!_39[this._indexMap[r]]){_39[this._indexMap[r]]=true;}if(!_39[r]){_39[r]=true;delete _38[r];}}}}});})();}}};});