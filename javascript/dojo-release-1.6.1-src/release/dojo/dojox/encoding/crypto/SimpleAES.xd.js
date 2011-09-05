/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.encoding.crypto.SimpleAES"],["require","dojox.encoding.base64"],["require","dojox.encoding.crypto._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.encoding.crypto.SimpleAES"]){_4._hasResource["dojox.encoding.crypto.SimpleAES"]=true;_4.provide("dojox.encoding.crypto.SimpleAES");_4.require("dojox.encoding.base64");_4.require("dojox.encoding.crypto._base");_4.getObject("encoding.crypto.SimpleAES",true,_6);(function(){var _7=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];var _8=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];function _9(_a,w){var Nb=4;var Nr=w.length/Nb-1;var _b=[[],[],[],[]];for(var i=0;i<4*Nb;i++){_b[i%4][Math.floor(i/4)]=_a[i];}_b=_c(_b,w,0,Nb);for(var _d=1;_d<Nr;_d++){_b=_e(_b,Nb);_b=_f(_b,Nb);_b=_10(_b,Nb);_b=_c(_b,w,_d,Nb);}_b=_e(_b,Nb);_b=_f(_b,Nb);_b=_c(_b,w,Nr,Nb);var _11=new Array(4*Nb);for(var i=0;i<4*Nb;i++){_11[i]=_b[i%4][Math.floor(i/4)];}return _11;};function _e(s,Nb){for(var r=0;r<4;r++){for(var c=0;c<Nb;c++){s[r][c]=_7[s[r][c]];}}return s;};function _f(s,Nb){var t=new Array(4);for(var r=1;r<4;r++){for(var c=0;c<4;c++){t[c]=s[r][(c+r)%Nb];}for(var c=0;c<4;c++){s[r][c]=t[c];}}return s;};function _10(s,Nb){for(var c=0;c<4;c++){var a=new Array(4);var b=new Array(4);for(var i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&128?s[i][c]<<1^283:s[i][c]<<1;}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3];}return s;};function _c(_12,w,rnd,Nb){for(var r=0;r<4;r++){for(var c=0;c<Nb;c++){_12[r][c]^=w[rnd*4+c][r];}}return _12;};function _13(key){var Nb=4;var Nk=key.length/4;var Nr=Nk+6;var w=new Array(Nb*(Nr+1));var _14=new Array(4);for(var i=0;i<Nk;i++){var r=[key[4*i],key[4*i+1],key[4*i+2],key[4*i+3]];w[i]=r;}for(var i=Nk;i<(Nb*(Nr+1));i++){w[i]=new Array(4);for(var t=0;t<4;t++){_14[t]=w[i-1][t];}if(i%Nk==0){_14=_15(_16(_14));for(var t=0;t<4;t++){_14[t]^=_8[i/Nk][t];}}else{if(Nk>6&&i%Nk==4){_14=_15(_14);}}for(var t=0;t<4;t++){w[i][t]=w[i-Nk][t]^_14[t];}}return w;};function _15(w){for(var i=0;i<4;i++){w[i]=_7[w[i]];}return w;};function _16(w){w[4]=w[0];for(var i=0;i<4;i++){w[i]=w[i+1];}return w;};function _17(_18,_19,_1a){if(!(_1a==128||_1a==192||_1a==256)){return "";}var _1b=_1a/8;var _1c=new Array(_1b);for(var i=0;i<_1b;i++){_1c[i]=_19.charCodeAt(i)&255;}var key=_9(_1c,_13(_1c));key=key.concat(key.slice(0,_1b-16));var _1d=16;var _1e=new Array(_1d);var _1f=(new Date()).getTime();for(var i=0;i<4;i++){_1e[i]=(_1f>>>i*8)&255;}for(var i=0;i<4;i++){_1e[i+4]=(_1f/4294967296>>>i*8)&255;}var _20=_13(key);var _21=Math.ceil(_18.length/_1d);var _22=new Array(_21);for(var b=0;b<_21;b++){for(var c=0;c<4;c++){_1e[15-c]=(b>>>c*8)&255;}for(var c=0;c<4;c++){_1e[15-c-4]=(b/4294967296>>>c*8);}var _23=_9(_1e,_20);var _24=b<_21-1?_1d:(_18.length-1)%_1d+1;var ct="";for(var i=0;i<_24;i++){var _25=_18.charCodeAt(b*_1d+i);var _26=_25^_23[i];ct+=((_26<16)?"0":"")+_26.toString(16);}_22[b]=ct;}var _27="";for(var i=0;i<8;i++){_27+=((_1e[i]<16)?"0":"")+_1e[i].toString(16);}return _27+" "+_22.join(" ");};function _28(s){var ret=[];s.replace(/(..)/g,function(str){ret.push(parseInt(str,16));});return ret;};function _29(_2a,_2b,_2c){if(!(_2c==128||_2c==192||_2c==256)){return "";}var _2d=_2c/8;var _2e=new Array(_2d);for(var i=0;i<_2d;i++){_2e[i]=_2b.charCodeAt(i)&255;}var _2f=_13(_2e);var key=_9(_2e,_2f);key=key.concat(key.slice(0,_2d-16));var _30=_13(key);_2a=_2a.split(" ");var _31=16;var _32=new Array(_31);var _33=_2a[0];_32=_28(_33);var _34=new Array(_2a.length-1);for(var b=1;b<_2a.length;b++){for(var c=0;c<4;c++){_32[15-c]=((b-1)>>>c*8)&255;}for(var c=0;c<4;c++){_32[15-c-4]=((b/4294967296-1)>>>c*8)&255;}var _35=_9(_32,_30);var pt="";var tmp=_28(_2a[b]);for(var i=0;i<tmp.length;i++){var _36=_2a[b].charCodeAt(i);var _37=tmp[i]^_35[i];pt+=String.fromCharCode(_37);}_34[b-1]=pt;}return _34.join("");};function _38(str){return str.replace(/[\0\t\n\v\f\r\xa0!-]/g,function(c){return "!"+c.charCodeAt(0)+"!";});};function _39(str){return str.replace(/!\d\d?\d?!/g,function(c){return String.fromCharCode(c.slice(1,-1));});};_6.encoding.crypto.SimpleAES=new (function(){this.encrypt=function(_3a,key){return _17(_3a,key,256);};this.decrypt=function(_3b,key){return _29(_3b,key,256);};})();})();}}};});