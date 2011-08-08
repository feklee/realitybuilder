/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.observable"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.observable"]){_4._hasResource["dojox.lang.observable"]=true;_4.provide("dojox.lang.observable");_4.experimental("dojox.lang.observable");_6.lang.observable=function(_7,_8,_9,_a){return _6.lang.makeObservable(_8,_9,_a)(_7);};_6.lang.makeObservable=function(_b,_c,_d,_e){_e=_e||{};_d=_d||function(_f,obj,_10,_11){return obj[_10].apply(_f,_11);};function _12(_13,_14,i){return function(){return _d(_13,_14,i,arguments);};};if(_6.lang.lettableWin){var _15=_6.lang.makeObservable;_15.inc=(_15.inc||0)+1;var _16="gettable_"+_15.inc;_6.lang.lettableWin[_16]=_b;var _17="settable_"+_15.inc;_6.lang.lettableWin[_17]=_c;var _18={};return function(_19){if(_19.__observable){return _19.__observable;}if(_19.data__){throw new Error("Can wrap an object that is already wrapped");}var _1a=[],i,l;for(i in _e){_1a.push(i);}var _1b={type:1,event:1};for(i in _19){if(i.match(/^[a-zA-Z][\w\$_]*$/)&&!(i in _e)&&!(i in _1b)){_1a.push(i);}}var _1c=_1a.join(",");var _1d,_1e=_18[_1c];if(!_1e){var _1f="dj_lettable_"+(_15.inc++);var _20=_1f+"_dj_getter";var _21=["Class "+_1f,"\tPublic data__"];for(i=0,l=_1a.length;i<l;i++){_1d=_1a[i];var _22=typeof _19[_1d];if(_22=="function"||_e[_1d]){_21.push("  Public "+_1d);}else{if(_22!="object"){_21.push("\tPublic Property Let "+_1d+"(val)","\t\tCall "+_17+"(me.data__,\""+_1d+"\",val)","\tEnd Property","\tPublic Property Get "+_1d,"\t\t"+_1d+" = "+_16+"(me.data__,\""+_1d+"\")","\tEnd Property");}}}_21.push("End Class");_21.push("Function "+_20+"()","\tDim tmp","\tSet tmp = New "+_1f,"\tSet "+_20+" = tmp","End Function");_6.lang.lettableWin.vbEval(_21.join("\n"));_18[_1c]=_1e=function(){return _6.lang.lettableWin.construct(_20);};}console.log("starting5");var _23=_1e();_23.data__=_19;console.log("starting6");try{_19.__observable=_23;}catch(e){}for(i=0,l=_1a.length;i<l;i++){_1d=_1a[i];try{var val=_19[_1d];}catch(e){console.log("error ",_1d,e);}if(typeof val=="function"||_e[_1d]){_23[_1d]=_12(_23,_19,_1d);}}return _23;};}else{return function(_24){if(_24.__observable){return _24.__observable;}var _25=_24 instanceof Array?[]:{};_25.data__=_24;for(var i in _24){if(i.charAt(0)!="_"){if(typeof _24[i]=="function"){_25[i]=_12(_25,_24,i);}else{if(typeof _24[i]!="object"){(function(i){_25.__defineGetter__(i,function(){return _b(_24,i);});_25.__defineSetter__(i,function(_26){return _c(_24,i,_26);});})(i);}}}}for(i in _e){_25[i]=_12(_25,_24,i);}_24.__observable=_25;return _25;};}};if(!{}.__defineGetter__){if(_4.isIE){var _27;if(document.body){_27=document.createElement("iframe");document.body.appendChild(_27);}else{document.write("<iframe id='dj_vb_eval_frame'></iframe>");_27=document.getElementById("dj_vb_eval_frame");}_27.style.display="none";var doc=_27.contentWindow.document;_6.lang.lettableWin=_27.contentWindow;doc.write("<html><head><script language=\"VBScript\" type=\"text/VBScript\">"+"Function vb_global_eval(code)"+"ExecuteGlobal(code)"+"End Function"+"</script>"+"<script type=\"text/javascript\">"+"function vbEval(code){ \n"+"return vb_global_eval(code);"+"}"+"function construct(name){ \n"+"return window[name]();"+"}"+"</script>"+"</head><body>vb-eval</body></html>");doc.close();}else{throw new Error("This browser does not support getters and setters");}}_6.lang.ReadOnlyProxy=_6.lang.makeObservable(function(obj,i){return obj[i];},function(obj,i,_28){});}}};});