/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.calc.toFrac"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.calc.toFrac"]){_4._hasResource["dojox.calc.toFrac"]=true;_4.provide("dojox.calc.toFrac");(function(){var a=[];var _7=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30,31,33,34,35,37,38,39,41,42,43,46,47,51,53,55,57,58,59,61,62,65,66,67,69,70,71,73,74,77,78,79,82,83,85,86,87,89,91,93,94,95,97];var _8=false;var i=-3;var d=2;var _9=1e-15/9;function _a(_b){var m,mt;while(i<_7.length){switch(i){case -3:m=1;mt="";break;case -2:m=Math.PI;mt="pi";break;case -1:m=Math.sqrt(Math.PI);mt="√(pi)";break;default:m=Math.sqrt(_7[i]);mt="√("+_7[i]+")";}while(d<=100){for(n=1;n<(m==1?d:100);n++){var r=m*n/d;var f=_6.calc.approx(r);if(!(f in a)){if(n==d){n=1;d=1;}a[f]={n:n,d:d,m:m,mt:mt};if(f==_b){_b=undefined;}}}d++;if(_b==undefined){setTimeout(function(){_a();},1);return;}}d=2;i++;}_8=true;};function _c(n){return Math.floor(n)==n;};_a();function _d(_e){function _f(){_a(_e);return _d(_e);};_e=Math.abs(_e);var f=a[_6.calc.approx(_e)];if(!f&&!_8){return _f();}if(!f){var i=Math.floor(_e);if(i==0){return _8?null:_f();}var n=_e%1;if(n==0){return {m:1,mt:1,n:_e,d:1};}f=a[_6.calc.approx(n)];if(!f||f.m!=1){var inv=_6.calc.approx(1/n);return _c(inv)?{m:1,mt:1,n:1,d:inv}:(_8?null:_f());}else{return {m:1,mt:1,n:(i*f.d+f.n),d:f.d};}}return f;};_4.mixin(_6.calc,{toFrac:function(_10){var f=_d(_10);return f?((_10<0?"-":"")+(f.m==1?"":(f.n==1?"":(f.n+"*")))+(f.m==1?f.n:f.mt)+((f.d==1?"":"/"+f.d))):_10;},pow:function(_11,_12){if(_11>0||_c(_12)){return Math.pow(_11,_12);}else{var f=_d(_12);if(_11>=0){return (f&&f.m==1)?Math.pow(Math.pow(_11,1/f.d),_12<0?-f.n:f.n):Math.pow(_11,_12);}else{return (f&&f.d&1)?Math.pow(Math.pow(-Math.pow(-_11,1/f.d),_12<0?-f.n:f.n),f.m):NaN;}}}});})();}}};});