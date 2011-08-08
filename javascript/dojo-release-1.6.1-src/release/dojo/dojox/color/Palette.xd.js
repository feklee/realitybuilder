/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.color.Palette"],["require","dojox.color"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.color.Palette"]){_4._hasResource["dojox.color.Palette"]=true;_4.provide("dojox.color.Palette");_4.require("dojox.color");(function(){var _7=_6.color;_7.Palette=function(_8){this.colors=[];if(_8 instanceof _6.color.Palette){this.colors=_8.colors.slice(0);}else{if(_8 instanceof _6.color.Color){this.colors=[null,null,_8,null,null];}else{if(_4.isArray(_8)){this.colors=_4.map(_8.slice(0),function(_9){if(_4.isString(_9)){return new _6.color.Color(_9);}return _9;});}else{if(_4.isString(_8)){this.colors=[null,null,new _6.color.Color(_8),null,null];}}}}};function _a(p,_b,_c){var _d=new _6.color.Palette();_d.colors=[];_4.forEach(p.colors,function(_e){var r=(_b=="dr")?_e.r+_c:_e.r,g=(_b=="dg")?_e.g+_c:_e.g,b=(_b=="db")?_e.b+_c:_e.b,a=(_b=="da")?_e.a+_c:_e.a;_d.colors.push(new _6.color.Color({r:Math.min(255,Math.max(0,r)),g:Math.min(255,Math.max(0,g)),b:Math.min(255,Math.max(0,b)),a:Math.min(1,Math.max(0,a))}));});return _d;};function _f(p,_10,val){var ret=new _6.color.Palette();ret.colors=[];_4.forEach(p.colors,function(_11){var o=_11.toCmy(),c=(_10=="dc")?o.c+val:o.c,m=(_10=="dm")?o.m+val:o.m,y=(_10=="dy")?o.y+val:o.y;ret.colors.push(_6.color.fromCmy(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y))));});return ret;};function _12(p,_13,val){var ret=new _6.color.Palette();ret.colors=[];_4.forEach(p.colors,function(_14){var o=_14.toCmyk(),c=(_13=="dc")?o.c+val:o.c,m=(_13=="dm")?o.m+val:o.m,y=(_13=="dy")?o.y+val:o.y,k=(_13=="dk")?o.b+val:o.b;ret.colors.push(_6.color.fromCmyk(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y)),Math.min(100,Math.max(0,k))));});return ret;};function _15(p,_16,val){var ret=new _6.color.Palette();ret.colors=[];_4.forEach(p.colors,function(_17){var o=_17.toHsl(),h=(_16=="dh")?o.h+val:o.h,s=(_16=="ds")?o.s+val:o.s,l=(_16=="dl")?o.l+val:o.l;ret.colors.push(_6.color.fromHsl(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,l))));});return ret;};function _18(p,_19,val){var ret=new _6.color.Palette();ret.colors=[];_4.forEach(p.colors,function(_1a){var o=_1a.toHsv(),h=(_19=="dh")?o.h+val:o.h,s=(_19=="ds")?o.s+val:o.s,v=(_19=="dv")?o.v+val:o.v;ret.colors.push(_6.color.fromHsv(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,v))));});return ret;};function _1b(val,low,_1c){return _1c-((_1c-val)*((_1c-low)/_1c));};_4.extend(_7.Palette,{transform:function(_1d){var fn=_a;if(_1d.use){var use=_1d.use.toLowerCase();if(use.indexOf("hs")==0){if(use.charAt(2)=="l"){fn=_15;}else{fn=_18;}}else{if(use.indexOf("cmy")==0){if(use.charAt(3)=="k"){fn=_12;}else{fn=_f;}}}}else{if("dc" in _1d||"dm" in _1d||"dy" in _1d){if("dk" in _1d){fn=_12;}else{fn=_f;}}else{if("dh" in _1d||"ds" in _1d){if("dv" in _1d){fn=_18;}else{fn=_15;}}}}var _1e=this;for(var p in _1d){if(p=="use"){continue;}_1e=fn(_1e,p,_1d[p]);}return _1e;},clone:function(){return new _7.Palette(this);}});_4.mixin(_7.Palette,{generators:{analogous:function(_1f){var _20=_1f.high||60,low=_1f.low||18,_21=_4.isString(_1f.base)?new _6.color.Color(_1f.base):_1f.base,hsv=_21.toHsv();var h=[(hsv.h+low+360)%360,(hsv.h+Math.round(low/2)+360)%360,hsv.h,(hsv.h-Math.round(_20/2)+360)%360,(hsv.h-_20+360)%360];var s1=Math.max(10,(hsv.s<=95)?hsv.s+5:(100-(hsv.s-95))),s2=(hsv.s>1)?hsv.s-1:21-hsv.s,v1=(hsv.v>=92)?hsv.v-9:Math.max(hsv.v+9,20),v2=(hsv.v<=90)?Math.max(hsv.v+5,20):(95+Math.ceil((hsv.v-90)/2)),s=[s1,s2,hsv.s,s1,s1],v=[v1,v2,hsv.v,v1,v2];return new _7.Palette(_4.map(h,function(hue,i){return _6.color.fromHsv(hue,s[i],v[i]);}));},monochromatic:function(_22){var _23=_4.isString(_22.base)?new _6.color.Color(_22.base):_22.base,hsv=_23.toHsv();var s1=(hsv.s-30>9)?hsv.s-30:hsv.s+30,s2=hsv.s,v1=_1b(hsv.v,20,100),v2=(hsv.v-20>20)?hsv.v-20:hsv.v+60,v3=(hsv.v-50>20)?hsv.v-50:hsv.v+30;return new _7.Palette([_6.color.fromHsv(hsv.h,s1,v1),_6.color.fromHsv(hsv.h,s2,v3),_23,_6.color.fromHsv(hsv.h,s1,v3),_6.color.fromHsv(hsv.h,s2,v2)]);},triadic:function(_24){var _25=_4.isString(_24.base)?new _6.color.Color(_24.base):_24.base,hsv=_25.toHsv();var h1=(hsv.h+57+360)%360,h2=(hsv.h-157+360)%360,s1=(hsv.s>20)?hsv.s-10:hsv.s+10,s2=(hsv.s>90)?hsv.s-10:hsv.s+10,s3=(hsv.s>95)?hsv.s-5:hsv.s+5,v1=(hsv.v-20>20)?hsv.v-20:hsv.v+20,v2=(hsv.v-30>20)?hsv.v-30:hsv.v+30,v3=(hsv.v-30>70)?hsv.v-30:hsv.v+30;return new _7.Palette([_6.color.fromHsv(h1,s1,hsv.v),_6.color.fromHsv(hsv.h,s2,v2),_25,_6.color.fromHsv(h2,s2,v1),_6.color.fromHsv(h2,s3,v3)]);},complementary:function(_26){var _27=_4.isString(_26.base)?new _6.color.Color(_26.base):_26.base,hsv=_27.toHsv();var h1=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,s1=Math.max(hsv.s-10,0),s2=_1b(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;return new _7.Palette([_6.color.fromHsv(hsv.h,s1,v1),_6.color.fromHsv(hsv.h,s2,v2),_27,_6.color.fromHsv(h1,s3,v2),_6.color.fromHsv(h1,hsv.s,hsv.v)]);},splitComplementary:function(_28){var _29=_4.isString(_28.base)?new _6.color.Color(_28.base):_28.base,_2a=_28.da||30,hsv=_29.toHsv();var _2b=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,h1=(_2b-_2a+360)%360,h2=(_2b+_2a)%360,s1=Math.max(hsv.s-10,0),s2=_1b(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;return new _7.Palette([_6.color.fromHsv(h1,s1,v1),_6.color.fromHsv(h1,s2,v2),_29,_6.color.fromHsv(h2,s3,v2),_6.color.fromHsv(h2,hsv.s,hsv.v)]);},compound:function(_2c){var _2d=_4.isString(_2c.base)?new _6.color.Color(_2c.base):_2c.base,hsv=_2d.toHsv();var h1=((hsv.h*2)+18<360)?(hsv.h*2)+18:Math.floor(hsv.h/2)-18,h2=((hsv.h*2)+120<360)?(hsv.h*2)+120:Math.floor(hsv.h/2)-120,h3=((hsv.h*2)+99<360)?(hsv.h*2)+99:Math.floor(hsv.h/2)-99,s1=(hsv.s-40>10)?hsv.s-40:hsv.s+40,s2=(hsv.s-10>80)?hsv.s-10:hsv.s+10,s3=(hsv.s-25>10)?hsv.s-25:hsv.s+25,v1=(hsv.v-40>10)?hsv.v-40:hsv.v+40,v2=(hsv.v-20>80)?hsv.v-20:hsv.v+20,v3=Math.max(hsv.v,20);return new _7.Palette([_6.color.fromHsv(h1,s1,v1),_6.color.fromHsv(h1,s2,v2),_2d,_6.color.fromHsv(h2,s3,v3),_6.color.fromHsv(h3,s2,v2)]);},shades:function(_2e){var _2f=_4.isString(_2e.base)?new _6.color.Color(_2e.base):_2e.base,hsv=_2f.toHsv();var s=(hsv.s==100&&hsv.v==0)?0:hsv.s,v1=(hsv.v-50>20)?hsv.v-50:hsv.v+30,v2=(hsv.v-25>=20)?hsv.v-25:hsv.v+55,v3=(hsv.v-75>=20)?hsv.v-75:hsv.v+5,v4=Math.max(hsv.v-10,20);return new _7.Palette([new _6.color.fromHsv(hsv.h,s,v1),new _6.color.fromHsv(hsv.h,s,v2),_2f,new _6.color.fromHsv(hsv.h,s,v3),new _6.color.fromHsv(hsv.h,s,v4)]);}},generate:function(_30,_31){if(_4.isFunction(_31)){return _31({base:_30});}else{if(_7.Palette.generators[_31]){return _7.Palette.generators[_31]({base:_30});}}throw new Error("dojox.color.Palette.generate: the specified generator ('"+_31+"') does not exist.");}});})();}}};});