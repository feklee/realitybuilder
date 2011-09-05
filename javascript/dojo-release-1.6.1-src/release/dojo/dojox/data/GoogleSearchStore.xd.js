/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.GoogleSearchStore"],["require","dojo.io.script"],["provide","dojox.data.GoogleWebSearchStore"],["provide","dojox.data.GoogleBlogSearchStore"],["provide","dojox.data.GoogleLocalSearchStore"],["provide","dojox.data.GoogleVideoSearchStore"],["provide","dojox.data.GoogleNewsSearchStore"],["provide","dojox.data.GoogleBookSearchStore"],["provide","dojox.data.GoogleImageSearchStore"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.GoogleSearchStore"]){_4._hasResource["dojox.data.GoogleSearchStore"]=true;_4.provide("dojox.data.GoogleSearchStore");_4.require("dojo.io.script");_4.provide("dojox.data.GoogleWebSearchStore");_4.provide("dojox.data.GoogleBlogSearchStore");_4.provide("dojox.data.GoogleLocalSearchStore");_4.provide("dojox.data.GoogleVideoSearchStore");_4.provide("dojox.data.GoogleNewsSearchStore");_4.provide("dojox.data.GoogleBookSearchStore");_4.provide("dojox.data.GoogleImageSearchStore");_4.experimental("dojox.data.GoogleSearchStore");_4.declare("dojox.data.GoogleSearchStore",null,{constructor:function(_7){if(_7){if(_7.label){this.label=_7.label;}if(_7.key){this._key=_7.key;}if(_7.lang){this._lang=_7.lang;}if("urlPreventCache" in _7){this.urlPreventCache=_7.urlPreventCache?true:false;}}this._id=_6.data.GoogleSearchStore.prototype._id++;},_id:0,_requestCount:0,_googleUrl:"http://ajax.googleapis.com/ajax/services/search/",_storeRef:"_S",_attributes:["unescapedUrl","url","visibleUrl","cacheUrl","title","titleNoFormatting","content","estimatedResultCount"],_aggregatedAttributes:{estimatedResultCount:"cursor.estimatedResultCount"},label:"titleNoFormatting",_type:"web",urlPreventCache:true,_queryAttrs:{text:"q"},_assertIsItem:function(_8){if(!this.isItem(_8)){throw new Error("dojox.data.GoogleSearchStore: a function was passed an item argument that was not an item");}},_assertIsAttribute:function(_9){if(typeof _9!=="string"){throw new Error("dojox.data.GoogleSearchStore: a function was passed an attribute argument that was not an attribute name string");}},getFeatures:function(){return {"dojo.data.api.Read":true};},getValue:function(_a,_b,_c){var _d=this.getValues(_a,_b);if(_d&&_d.length>0){return _d[0];}return _c;},getAttributes:function(_e){return this._attributes;},hasAttribute:function(_f,_10){if(this.getValue(_f,_10)){return true;}return false;},isItemLoaded:function(_11){return this.isItem(_11);},loadItem:function(_12){},getLabel:function(_13){return this.getValue(_13,this.label);},getLabelAttributes:function(_14){return [this.label];},containsValue:function(_15,_16,_17){var _18=this.getValues(_15,_16);for(var i=0;i<_18.length;i++){if(_18[i]===_17){return true;}}return false;},getValues:function(_19,_1a){this._assertIsItem(_19);this._assertIsAttribute(_1a);var val=_19[_1a];if(_4.isArray(val)){return val;}else{if(val!==undefined){return [val];}else{return [];}}},isItem:function(_1b){if(_1b&&_1b[this._storeRef]===this){return true;}return false;},close:function(_1c){},_format:function(_1d,_1e){return _1d;},fetch:function(_1f){_1f=_1f||{};var _20=_1f.scope||_4.global;if(!_1f.query){if(_1f.onError){_1f.onError.call(_20,new Error(this.declaredClass+": A query must be specified."));return;}}var _21={};for(var _22 in this._queryAttrs){_21[_22]=_1f.query[_22];}_1f={query:_21,onComplete:_1f.onComplete,onError:_1f.onError,onItem:_1f.onItem,onBegin:_1f.onBegin,start:_1f.start,count:_1f.count};var _23=8;var _24="GoogleSearchStoreCallback_"+this._id+"_"+(++this._requestCount);var _25=this._createContent(_21,_24,_1f);var _26;if(typeof (_1f.start)==="undefined"||_1f.start===null){_1f.start=0;}if(!_1f.count){_1f.count=_23;}_26={start:_1f.start-_1f.start%_23};var _27=this;var _28=this._googleUrl+this._type;var _29={url:_28,preventCache:this.urlPreventCache,content:_25};var _2a=[];var _2b=0;var _2c=false;var _2d=_1f.start-1;var _2e=0;var _2f=[];function _30(req){_2e++;_29.content.context=_29.content.start=req.start;var _31=_4.io.script.get(_29);_2f.push(_31.ioArgs.id);_31.addErrback(function(_32){if(_1f.onError){_1f.onError.call(_20,_32,_1f);}});};var _33=function(_34,_35){if(_2f.length>0){_4.query("#"+_2f.splice(0,1)).forEach(_4.destroy);}if(_2c){return;}var _36=_27._getItems(_35);var _37=_35?_35["cursor"]:null;if(_36){for(var i=0;i<_36.length&&i+_34<_1f.count+_1f.start;i++){_27._processItem(_36[i],_35);_2a[i+_34]=_36[i];}_2b++;if(_2b==1){var _38=_37?_37.pages:null;var _39=_38?Number(_38[_38.length-1].start):0;if(_1f.onBegin){var est=_37?_37.estimatedResultCount:_36.length;var _3a=est?Math.min(est,_39+_36.length):_39+_36.length;_1f.onBegin.call(_20,_3a,_1f);}var _3b=(_1f.start-_1f.start%_23)+_23;var _3c=1;while(_38){if(!_38[_3c]||Number(_38[_3c].start)>=_1f.start+_1f.count){break;}if(Number(_38[_3c].start)>=_3b){_30({start:_38[_3c].start});}_3c++;}}if(_1f.onItem&&_2a[_2d+1]){do{_2d++;_1f.onItem.call(_20,_2a[_2d],_1f);}while(_2a[_2d+1]&&_2d<_1f.start+_1f.count);}if(_2b==_2e){_2c=true;_4.global[_24]=null;if(_1f.onItem){_1f.onComplete.call(_20,null,_1f);}else{_2a=_2a.slice(_1f.start,_1f.start+_1f.count);_1f.onComplete.call(_20,_2a,_1f);}}}};var _3d=[];var _3e=_26.start-1;_4.global[_24]=function(_3f,_40,_41,_42){try{if(_41!=200){if(_1f.onError){_1f.onError.call(_20,new Error("Response from Google was: "+_41),_1f);}_4.global[_24]=function(){};return;}if(_3f==_3e+1){_33(Number(_3f),_40);_3e+=_23;if(_3d.length>0){_3d.sort(_27._getSort());while(_3d.length>0&&_3d[0].start==_3e+1){_33(Number(_3d[0].start),_3d[0].data);_3d.splice(0,1);_3e+=_23;}}}else{_3d.push({start:_3f,data:_40});}}catch(e){_1f.onError.call(_20,e,_1f);}};_30(_26);},_getSort:function(){return function(a,b){if(a.start<b.start){return -1;}if(b.start<a.start){return 1;}return 0;};},_processItem:function(_43,_44){_43[this._storeRef]=this;for(var _45 in this._aggregatedAttributes){_43[_45]=_4.getObject(this._aggregatedAttributes[_45],false,_44);}},_getItems:function(_46){return _46["results"]||_46;},_createContent:function(_47,_48,_49){var _4a={v:"1.0",rsz:"large",callback:_48,key:this._key,hl:this._lang};for(var _4b in this._queryAttrs){_4a[this._queryAttrs[_4b]]=_47[_4b];}return _4a;}});_4.declare("dojox.data.GoogleWebSearchStore",_6.data.GoogleSearchStore,{});_4.declare("dojox.data.GoogleBlogSearchStore",_6.data.GoogleSearchStore,{_type:"blogs",_attributes:["blogUrl","postUrl","title","titleNoFormatting","content","author","publishedDate"],_aggregatedAttributes:{}});_4.declare("dojox.data.GoogleLocalSearchStore",_6.data.GoogleSearchStore,{_type:"local",_attributes:["title","titleNoFormatting","url","lat","lng","streetAddress","city","region","country","phoneNumbers","ddUrl","ddUrlToHere","ddUrlFromHere","staticMapUrl","viewport"],_aggregatedAttributes:{viewport:"viewport"},_queryAttrs:{text:"q",centerLatLong:"sll",searchSpan:"sspn"}});_4.declare("dojox.data.GoogleVideoSearchStore",_6.data.GoogleSearchStore,{_type:"video",_attributes:["title","titleNoFormatting","content","url","published","publisher","duration","tbWidth","tbHeight","tbUrl","playUrl"],_aggregatedAttributes:{}});_4.declare("dojox.data.GoogleNewsSearchStore",_6.data.GoogleSearchStore,{_type:"news",_attributes:["title","titleNoFormatting","content","url","unescapedUrl","publisher","clusterUrl","location","publishedDate","relatedStories"],_aggregatedAttributes:{}});_4.declare("dojox.data.GoogleBookSearchStore",_6.data.GoogleSearchStore,{_type:"books",_attributes:["title","titleNoFormatting","authors","url","unescapedUrl","bookId","pageCount","publishedYear"],_aggregatedAttributes:{}});_4.declare("dojox.data.GoogleImageSearchStore",_6.data.GoogleSearchStore,{_type:"images",_attributes:["title","titleNoFormatting","visibleUrl","url","unescapedUrl","originalContextUrl","width","height","tbWidth","tbHeight","tbUrl","content","contentNoFormatting"],_aggregatedAttributes:{}});}}};});