/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.async"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.async"]){_4._hasResource["dojox.lang.async"]=true;_4.provide("dojox.lang.async");(function(){var d=_4,_7=d.Deferred,_8=d.forEach,_9=d.some,_a=_6.lang.async,_b=Array.prototype.slice,_c=Object.prototype.toString;_a.seq=function(x){var fs=_c.call(x)=="[object Array]"?x:arguments;return function(_d){var x=new _7();_8(fs,function(f){x.addCallback(f);});x.callback(_d);return x;};};_a.par=function(x){var fs=_c.call(x)=="[object Array]"?x:arguments;return function(_e){var _f=new Array(fs.length),_10=function(){_8(_f,function(v){if(v instanceof _7&&v.fired<0){v.cancel();}});},x=new _7(_10),_11=fs.length;_8(fs,function(f,i){var x;try{x=f(_e);}catch(e){x=e;}_f[i]=x;});var _12=_9(_f,function(v){if(v instanceof Error){_10();x.errback(v);return true;}return false;});if(!_12){_8(_f,function(v,i){if(v instanceof _7){v.addCallbacks(function(v){_f[i]=v;if(!--_11){x.callback(_f);}},function(v){_10();x.errback(v);});}else{--_11;}});}if(!_11){x.callback(_f);}return x;};};_a.any=function(x){var fs=_c.call(x)=="[object Array]"?x:arguments;return function(_13){var _14=new Array(fs.length),_15=true;cancel=function(_16){_8(_14,function(v,i){if(i!=_16&&v instanceof _7&&v.fired<0){v.cancel();}});},x=new _7(cancel);_8(fs,function(f,i){var x;try{x=f(_13);}catch(e){x=e;}_14[i]=x;});var _17=_9(_14,function(v,i){if(!(v instanceof _7)){cancel(i);x.callback(v);return true;}return false;});if(!_17){_8(_14,function(v,i){v.addBoth(function(v){if(_15){_15=false;cancel(i);x.callback(v);}});});}return x;};};_a.select=function(_18,x){var fs=_c.call(x)=="[object Array]"?x:_b.call(arguments,1);return function(_19){return new _7().addCallback(_18).addCallback(function(v){if(typeof v=="number"&&v>=0&&v<fs.length){return fs[v](_19);}else{return new Error("async.select: out of range");}}).callback(_19);};};_a.ifThen=function(_1a,_1b,_1c){return function(_1d){return new _7().addCallback(_1a).addCallback(function(v){return (v?_1b:_1c)(_1d);}).callback(_1d);};};_a.loop=function(_1e,_1f){return function(_20){var x,y=new _7(function(){x.cancel();});function _21(v){y.errback(v);};function _22(v){if(v){x.addCallback(_1f).addCallback(_23);}else{y.callback(v);}return v;};function _23(_24){x=new _7().addCallback(_1e).addCallback(_22).addErrback(_21);x.callback(_24);};_23(_20);return y;};};})();}}};});