/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gfx3d.lighting"],["require","dojox.gfx._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gfx3d.lighting"]){_4._hasResource["dojox.gfx3d.lighting"]=true;_4.provide("dojox.gfx3d.lighting");_4.require("dojox.gfx._base");(function(){var _7=_6.gfx3d.lighting;_4.mixin(_6.gfx3d.lighting,{black:function(){return {r:0,g:0,b:0,a:1};},white:function(){return {r:1,g:1,b:1,a:1};},toStdColor:function(c){c=_6.gfx.normalizeColor(c);return {r:c.r/255,g:c.g/255,b:c.b/255,a:c.a};},fromStdColor:function(c){return new _4.Color([Math.round(255*c.r),Math.round(255*c.g),Math.round(255*c.b),c.a]);},scaleColor:function(s,c){return {r:s*c.r,g:s*c.g,b:s*c.b,a:s*c.a};},addColor:function(a,b){return {r:a.r+b.r,g:a.g+b.g,b:a.b+b.b,a:a.a+b.a};},multiplyColor:function(a,b){return {r:a.r*b.r,g:a.g*b.g,b:a.b*b.b,a:a.a*b.a};},saturateColor:function(c){return {r:c.r<0?0:c.r>1?1:c.r,g:c.g<0?0:c.g>1?1:c.g,b:c.b<0?0:c.b>1?1:c.b,a:c.a<0?0:c.a>1?1:c.a};},mixColor:function(c1,c2,s){return _7.addColor(_7.scaleColor(s,c1),_7.scaleColor(1-s,c2));},diff2Color:function(c1,c2){var r=c1.r-c2.r;var g=c1.g-c2.g;var b=c1.b-c2.b;var a=c1.a-c2.a;return r*r+g*g+b*b+a*a;},length2Color:function(c){return c.r*c.r+c.g*c.g+c.b*c.b+c.a*c.a;},dot:function(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;},scale:function(s,v){return {x:s*v.x,y:s*v.y,z:s*v.z};},add:function(a,b){return {x:a.x+b.x,y:a.y+b.y,z:a.z+b.z};},saturate:function(v){return Math.min(Math.max(v,0),1);},length:function(v){return Math.sqrt(_6.gfx3d.lighting.dot(v,v));},normalize:function(v){return _7.scale(1/_7.length(v),v);},faceforward:function(n,i){var p=_6.gfx3d.lighting;var s=p.dot(i,n)<0?1:-1;return p.scale(s,n);},reflect:function(i,n){var p=_6.gfx3d.lighting;return p.add(i,p.scale(-2*p.dot(i,n),n));},diffuse:function(_8,_9){var c=_7.black();for(var i=0;i<_9.length;++i){var l=_9[i],d=_7.dot(_7.normalize(l.direction),_8);c=_7.addColor(c,_7.scaleColor(d,l.color));}return _7.saturateColor(c);},specular:function(_a,v,_b,_c){var c=_7.black();for(var i=0;i<_c.length;++i){var l=_c[i],h=_7.normalize(_7.add(_7.normalize(l.direction),v)),s=Math.pow(Math.max(0,_7.dot(_a,h)),1/_b);c=_7.addColor(c,_7.scaleColor(s,l.color));}return _7.saturateColor(c);},phong:function(_d,v,_e,_f){_d=_7.normalize(_d);var c=_7.black();for(var i=0;i<_f.length;++i){var l=_f[i],r=_7.reflect(_7.scale(-1,_7.normalize(v)),_d),s=Math.pow(Math.max(0,_7.dot(r,_7.normalize(l.direction))),_e);c=_7.addColor(c,_7.scaleColor(s,l.color));}return _7.saturateColor(c);}});_4.declare("dojox.gfx3d.lighting.Model",null,{constructor:function(_10,_11,_12,_13){this.incident=_7.normalize(_10);this.lights=[];for(var i=0;i<_11.length;++i){var l=_11[i];this.lights.push({direction:_7.normalize(l.direction),color:_7.toStdColor(l.color)});}this.ambient=_7.toStdColor(_12.color?_12.color:"white");this.ambient=_7.scaleColor(_12.intensity,this.ambient);this.ambient=_7.scaleColor(this.ambient.a,this.ambient);this.ambient.a=1;this.specular=_7.toStdColor(_13?_13:"white");this.specular=_7.scaleColor(this.specular.a,this.specular);this.specular.a=1;this.npr_cool={r:0,g:0,b:0.4,a:1};this.npr_warm={r:0.4,g:0.4,b:0.2,a:1};this.npr_alpha=0.2;this.npr_beta=0.6;this.npr_scale=0.6;},constant:function(_14,_15,_16){_16=_7.toStdColor(_16);var _17=_16.a,_18=_7.scaleColor(_17,_16);_18.a=_17;return _7.fromStdColor(_7.saturateColor(_18));},matte:function(_19,_1a,_1b){if(typeof _1a=="string"){_1a=_7.finish[_1a];}_1b=_7.toStdColor(_1b);_19=_7.faceforward(_7.normalize(_19),this.incident);var _1c=_7.scaleColor(_1a.Ka,this.ambient),_1d=_7.saturate(-4*_7.dot(_19,this.incident)),_1e=_7.scaleColor(_1d*_1a.Kd,_7.diffuse(_19,this.lights)),_1f=_7.scaleColor(_1b.a,_7.multiplyColor(_1b,_7.addColor(_1c,_1e)));_1f.a=_1b.a;return _7.fromStdColor(_7.saturateColor(_1f));},metal:function(_20,_21,_22){if(typeof _21=="string"){_21=_7.finish[_21];}_22=_7.toStdColor(_22);_20=_7.faceforward(_7.normalize(_20),this.incident);var v=_7.scale(-1,this.incident),_23,_24,_25=_7.scaleColor(_21.Ka,this.ambient),_26=_7.saturate(-4*_7.dot(_20,this.incident));if("phong" in _21){_23=_7.scaleColor(_26*_21.Ks*_21.phong,_7.phong(_20,v,_21.phong_size,this.lights));}else{_23=_7.scaleColor(_26*_21.Ks,_7.specular(_20,v,_21.roughness,this.lights));}_24=_7.scaleColor(_22.a,_7.addColor(_7.multiplyColor(_22,_25),_7.multiplyColor(this.specular,_23)));_24.a=_22.a;return _7.fromStdColor(_7.saturateColor(_24));},plastic:function(_27,_28,_29){if(typeof _28=="string"){_28=_7.finish[_28];}_29=_7.toStdColor(_29);_27=_7.faceforward(_7.normalize(_27),this.incident);var v=_7.scale(-1,this.incident),_2a,_2b,_2c=_7.scaleColor(_28.Ka,this.ambient),_2d=_7.saturate(-4*_7.dot(_27,this.incident)),_2e=_7.scaleColor(_2d*_28.Kd,_7.diffuse(_27,this.lights));if("phong" in _28){_2a=_7.scaleColor(_2d*_28.Ks*_28.phong,_7.phong(_27,v,_28.phong_size,this.lights));}else{_2a=_7.scaleColor(_2d*_28.Ks,_7.specular(_27,v,_28.roughness,this.lights));}_2b=_7.scaleColor(_29.a,_7.addColor(_7.multiplyColor(_29,_7.addColor(_2c,_2e)),_7.multiplyColor(this.specular,_2a)));_2b.a=_29.a;return _7.fromStdColor(_7.saturateColor(_2b));},npr:function(_2f,_30,_31){if(typeof _30=="string"){_30=_7.finish[_30];}_31=_7.toStdColor(_31);_2f=_7.faceforward(_7.normalize(_2f),this.incident);var _32=_7.scaleColor(_30.Ka,this.ambient),_33=_7.saturate(-4*_7.dot(_2f,this.incident)),_34=_7.scaleColor(_33*_30.Kd,_7.diffuse(_2f,this.lights)),_35=_7.scaleColor(_31.a,_7.multiplyColor(_31,_7.addColor(_32,_34))),_36=_7.addColor(this.npr_cool,_7.scaleColor(this.npr_alpha,_35)),_37=_7.addColor(this.npr_warm,_7.scaleColor(this.npr_beta,_35)),d=(1+_7.dot(this.incident,_2f))/2,_35=_7.scaleColor(this.npr_scale,_7.addColor(_35,_7.mixColor(_36,_37,d)));_35.a=_31.a;return _7.fromStdColor(_7.saturateColor(_35));}});})();_6.gfx3d.lighting.finish={defaults:{Ka:0.1,Kd:0.6,Ks:0,roughness:0.05},dull:{Ka:0.1,Kd:0.6,Ks:0.5,roughness:0.15},shiny:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.001},glossy:{Ka:0.1,Kd:0.6,Ks:1,roughness:0.0001},phong_dull:{Ka:0.1,Kd:0.6,Ks:0.5,phong:0.5,phong_size:1},phong_shiny:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:200},phong_glossy:{Ka:0.1,Kd:0.6,Ks:1,phong:1,phong_size:300},luminous:{Ka:1,Kd:0,Ks:0,roughness:0.05},metalA:{Ka:0.35,Kd:0.3,Ks:0.8,roughness:1/20},metalB:{Ka:0.3,Kd:0.4,Ks:0.7,roughness:1/60},metalC:{Ka:0.25,Kd:0.5,Ks:0.8,roughness:1/80},metalD:{Ka:0.15,Kd:0.6,Ks:0.8,roughness:1/100},metalE:{Ka:0.1,Kd:0.7,Ks:0.8,roughness:1/120}};}}};});