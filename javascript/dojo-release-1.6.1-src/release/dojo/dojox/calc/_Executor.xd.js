/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.calc._Executor"],["require","dijit._Templated"],["require","dojox.math._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.calc._Executor"]){_4._hasResource["dojox.calc._Executor"]=true;_4.provide("dojox.calc._Executor");_4.require("dijit._Templated");_4.require("dojox.math._base");_4.experimental("dojox.calc._Executor");(function(){var _7;if(!("pow" in _6.calc)){_6.calc.pow=function(_8,_9){function _a(n){return Math.floor(n)==n;};if(_8>=0||_a(_9)){return Math.pow(_8,_9);}else{var _b=1/_9;return (_a(_b)&&(_b&1))?-Math.pow(-_8,_9):NaN;}};}_4.declare("dojox.calc._Executor",[_5._Widget,_5._Templated],{templateString:"<iframe src=\""+_4.moduleUrl("dojox.calc","_ExecutorIframe.html")+"\" style=\"display:none;\" onload=\"if(arguments[0] && arguments[0].Function)"+_5._scopeName+".byNode(this)._onLoad(arguments[0])\"></iframe>",_onLoad:function(_c){_7=_c;_c.outerPrompt=window.prompt;_c.dojox={math:{}};for(var f in _6.math){_c.dojox.math[f]=_4.hitch(_6.math,f);}if("toFrac" in _6.calc){_c.toFracCall=_4.hitch(_6.calc,"toFrac");this.Function("toFrac","x","return toFracCall(x)");}_c.isJavaScriptLanguage=_4.number.format(1.5,{pattern:"#.#"})=="1.5";_c.Ans=0;_c.pi=Math.PI;_c.eps=Math.E;_c.powCall=_4.hitch(_6.calc,"pow");this.normalizedFunction("sqrt","x","return Math.sqrt(x)");this.normalizedFunction("sin","x","return Math.sin(x)");this.normalizedFunction("cos","x","return Math.cos(x)");this.normalizedFunction("tan","x","return Math.tan(x)");this.normalizedFunction("asin","x","return Math.asin(x)");this.normalizedFunction("acos","x","return Math.acos(x)");this.normalizedFunction("atan","x","return Math.atan(x)");this.normalizedFunction("atan2","y, x","return Math.atan2(y, x)");this.normalizedFunction("Round","x","return Math.round(x)");this.normalizedFunction("Int","x","return Math.floor(x)");this.normalizedFunction("Ceil","x","return Math.ceil(x)");this.normalizedFunction("ln","x","return Math.log(x)");this.normalizedFunction("log","x","return Math.log(x)/Math.log(10)");this.normalizedFunction("pow","x, y","return powCall(x,y)");this.normalizedFunction("permutations","n, r","return dojox.math.permutations(n, r);");this.normalizedFunction("P","n, r","return dojox.math.permutations(n, r);");this.normalizedFunction("combinations","n, r","return dojox.math.combinations(n, r);");this.normalizedFunction("C","n, r","return dojox.math.combinations(n, r)");this.normalizedFunction("toRadix","number, baseOut","if(!baseOut){ baseOut = 10; } if(typeof number == 'string'){ number = parseFloat(number); }return number.toString(baseOut);");this.normalizedFunction("toBin","number","return toRadix(number, 2)");this.normalizedFunction("toOct","number","return toRadix(number, 8)");this.normalizedFunction("toHex","number","return toRadix(number, 16)");this.onLoad();},onLoad:function(){},Function:function(_d,_e,_f){return _4.hitch(_7,_7.Function.apply(_7,arguments));},normalizedFunction:function(_10,_11,_12){return _4.hitch(_7,_7.normalizedFunction.apply(_7,arguments));},deleteFunction:function(_13){_7[_13]=undefined;delete _7[_13];},eval:function(_14){return _7.eval.apply(_7,arguments);},destroy:function(){this.inherited(arguments);_7=null;}});})();(function(){var _15=(1<<30)-35;_4.mixin(_6.calc,{approx:function(r){if(typeof r=="number"){return Math.round(r*_15)/_15;}return r;}});})();}}};});