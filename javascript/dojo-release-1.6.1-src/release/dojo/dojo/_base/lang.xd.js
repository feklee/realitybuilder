/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo._base.lang"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo._base.lang"]){_4._hasResource["dojo._base.lang"]=true;_4.provide("dojo._base.lang");(function(){var d=_4,_7=Object.prototype.toString;_4.isString=function(it){return (typeof it=="string"||it instanceof String);};_4.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};_4.isFunction=function(it){return _7.call(it)==="[object Function]";};_4.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));};_4.isArrayLike=function(it){return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};_4.isAlien=function(it){return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};_4.extend=function(_8,_9){for(var i=1,l=arguments.length;i<l;i++){d._mixin(_8.prototype,arguments[i]);}return _8;};_4._hitchArgs=function(_a,_b){var _c=d._toArray(arguments,2);var _d=d.isString(_b);return function(){var _e=d._toArray(arguments);var f=_d?(_a||d.global)[_b]:_b;return f&&f.apply(_a||this,_c.concat(_e));};};_4.hitch=function(_f,_10){if(arguments.length>2){return d._hitchArgs.apply(d,arguments);}if(!_10){_10=_f;_f=null;}if(d.isString(_10)){_f=_f||d.global;if(!_f[_10]){throw (["dojo.hitch: scope[\"",_10,"\"] is null (scope=\"",_f,"\")"].join(""));}return function(){return _f[_10].apply(_f,arguments||[]);};}return !_f?_10:function(){return _10.apply(_f,arguments||[]);};};_4.delegate=_4._delegate=(function(){function TMP(){};return function(obj,_11){TMP.prototype=obj;var tmp=new TMP();TMP.prototype=null;if(_11){d._mixin(tmp,_11);}return tmp;};})();var _12=function(obj,_13,_14){return (_14||[]).concat(Array.prototype.slice.call(obj,_13||0));};var _15=function(obj,_16,_17){var arr=_17||[];for(var x=_16||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};_4._toArray=d.isIE?function(obj){return ((obj.item)?_15:_12).apply(this,arguments);}:_12;_4.partial=function(_18){var arr=[null];return d.hitch.apply(d,arr.concat(d._toArray(arguments)));};var _19=d._extraNames,_1a=_19.length,_1b={};_4.clone=function(o){if(!o||typeof o!="object"||d.isFunction(o)){return o;}if(o.nodeType&&"cloneNode" in o){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}if(o instanceof RegExp){return new RegExp(o);}var r,i,l,s,_1c;if(d.isArray(o)){r=[];for(i=0,l=o.length;i<l;++i){if(i in o){r.push(d.clone(o[i]));}}}else{r=o.constructor?new o.constructor():{};}for(_1c in o){s=o[_1c];if(!(_1c in r)||(r[_1c]!==s&&(!(_1c in _1b)||_1b[_1c]!==s))){r[_1c]=d.clone(s);}}if(_1a){for(i=0;i<_1a;++i){_1c=_19[i];s=o[_1c];if(!(_1c in r)||(r[_1c]!==s&&(!(_1c in _1b)||_1b[_1c]!==s))){r[_1c]=s;}}}return r;};_4.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};var _1d=/\{([^\}]+)\}/g;_4.replace=function(_1e,map,_1f){return _1e.replace(_1f||_1d,d.isFunction(map)?map:function(_20,k){return d.getObject(k,false,map);});};})();}}};});