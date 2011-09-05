/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.analytics._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.analytics._base"]){_4._hasResource["dojox.analytics._base"]=true;_4.provide("dojox.analytics._base");_6.analytics=function(){this._data=[];this._id=1;this.sendInterval=_4.config["sendInterval"]||5000;this.inTransitRetry=_4.config["inTransitRetry"]||200;this.dataUrl=_4.config["analyticsUrl"]||_4.moduleUrl("dojox.analytics.logger","dojoxAnalytics.php");this.sendMethod=_4.config["sendMethod"]||"xhrPost";this.maxRequestSize=_4.isIE?2000:_4.config["maxRequestSize"]||4000;_4.addOnLoad(this,"schedulePusher");_4.addOnUnload(this,"pushData",true);};_4.extend(_6.analytics,{schedulePusher:function(_7){setTimeout(_4.hitch(this,"checkData"),_7||this.sendInterval);},addData:function(_8,_9){if(arguments.length>2){var c=[];for(var i=1;i<arguments.length;i++){c.push(arguments[i]);}_9=c;}this._data.push({plugin:_8,data:_9});},checkData:function(){if(this._inTransit){this.schedulePusher(this.inTransitRetry);return;}if(this.pushData()){return;}this.schedulePusher();},pushData:function(){if(this._data.length){this._inTransit=this._data;this._data=[];var _a;switch(this.sendMethod){case "script":_a=_4.io.script.get({url:this.getQueryPacket(),preventCache:1,callbackParamName:"callback"});break;case "xhrPost":default:_a=_4.xhrPost({url:this.dataUrl,content:{id:this._id++,data:_4.toJson(this._inTransit)}});break;}_a.addCallback(this,"onPushComplete");return _a;}return false;},getQueryPacket:function(){while(true){var _b={id:this._id++,data:_4.toJson(this._inTransit)};var _c=this.dataUrl+"?"+_4.objectToQuery(_b);if(_c.length>this.maxRequestSize){this._data.unshift(this._inTransit.pop());this._split=1;}else{return _c;}}},onPushComplete:function(_d){if(this._inTransit){delete this._inTransit;}if(this._data.length>0){this.schedulePusher(this.inTransitRetry);}else{this.schedulePusher();}}});_6.analytics=new _6.analytics();}}};});