/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.rpc.RpcService"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.rpc.RpcService"]){_4._hasResource["dojo.rpc.RpcService"]=true;_4.provide("dojo.rpc.RpcService");_4.declare("dojo.rpc.RpcService",null,{constructor:function(_7){if(_7){if((_4.isString(_7))||(_7 instanceof _4._Url)){if(_7 instanceof _4._Url){var _8=_7+"";}else{_8=_7;}var _9=_4.xhrGet({url:_8,handleAs:"json-comment-optional",sync:true});_9.addCallback(this,"processSmd");_9.addErrback(function(){throw new Error("Unable to load SMD from "+_7);});}else{if(_7.smdStr){this.processSmd(_4.eval("("+_7.smdStr+")"));}else{if(_7.serviceUrl){this.serviceUrl=_7.serviceUrl;}this.timeout=_7.timeout||3000;if("strictArgChecks" in _7){this.strictArgChecks=_7.strictArgChecks;}this.processSmd(_7);}}}},strictArgChecks:true,serviceUrl:"",parseResults:function(_a){return _a;},errorCallback:function(_b){return function(_c){_b.errback(_c.message);};},resultCallback:function(_d){var tf=_4.hitch(this,function(_e){if(_e.error!=null){var _f;if(typeof _e.error=="object"){_f=new Error(_e.error.message);_f.code=_e.error.code;_f.error=_e.error.error;}else{_f=new Error(_e.error);}_f.id=_e.id;_f.errorObject=_e;_d.errback(_f);}else{_d.callback(this.parseResults(_e));}});return tf;},generateMethod:function(_10,_11,url){return _4.hitch(this,function(){var _12=new _4.Deferred();if((this.strictArgChecks)&&(_11!=null)&&(arguments.length!=_11.length)){throw new Error("Invalid number of parameters for remote method.");}else{this.bind(_10,_4._toArray(arguments),_12,url);}return _12;});},processSmd:function(_13){if(_13.methods){_4.forEach(_13.methods,function(m){if(m&&m.name){this[m.name]=this.generateMethod(m.name,m.parameters,m.url||m.serviceUrl||m.serviceURL);if(!_4.isFunction(this[m.name])){throw new Error("RpcService: Failed to create"+m.name+"()");}}},this);}this.serviceUrl=_13.serviceUrl||_13.serviceURL;this.required=_13.required;this.smd=_13;}});}}};});