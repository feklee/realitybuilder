/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo._base.json"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo._base.json"]){_4._hasResource["dojo._base.json"]=true;_4.provide("dojo._base.json");_4.fromJson=function(_7){return eval("("+_7+")");};_4._escapeString=function(_8){return ("\""+_8.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};_4.toJsonIndentStr="\t";_4.toJson=function(it,_9,_a){if(it===undefined){return "undefined";}var _b=typeof it;if(_b=="number"||_b=="boolean"){return it+"";}if(it===null){return "null";}if(_4.isString(it)){return _4._escapeString(it);}var _c=arguments.callee;var _d;_a=_a||"";var _e=_9?_a+_4.toJsonIndentStr:"";var tf=it.__json__||it.json;if(_4.isFunction(tf)){_d=tf.call(it);if(it!==_d){return _c(_d,_9,_e);}}if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}var _f=_9?" ":"";var _10=_9?"\n":"";if(_4.isArray(it)){var res=_4.map(it,function(obj){var val=_c(obj,_9,_e);if(typeof val!="string"){val="undefined";}return _10+_e+val;});return "["+res.join(","+_f)+_10+_a+"]";}if(_b=="function"){return null;}var _11=[],key;for(key in it){var _12,val;if(typeof key=="number"){_12="\""+key+"\"";}else{if(typeof key=="string"){_12=_4._escapeString(key);}else{continue;}}val=_c(it[key],_9,_e);if(typeof val!="string"){continue;}_11.push(_10+_e+_12+":"+_f+val);}return "{"+_11.join(","+_f)+_10+_a+"}";};}}};});