/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.Julie"],["require","dojox.gfx.gradutils"],["require","dojox.charting.Theme"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.Julie"]){_4._hasResource["dojox.charting.themes.Julie"]=true;_4.provide("dojox.charting.themes.Julie");_4.require("dojox.gfx.gradutils");_4.require("dojox.charting.Theme");(function(){var dc=_6.charting,_7=dc.themes,_8=dc.Theme,g=_8.generateGradient,_9={type:"linear",space:"shape",x1:0,y1:0,x2:0,y2:100};_7.Julie=new dc.Theme({seriesThemes:[{fill:g(_9,"#59a0bd","#497c91"),stroke:{color:"#22627d"}},{fill:g(_9,"#8d88c7","#6c6d8e"),stroke:{color:"#8a84c5"}},{fill:g(_9,"#85a54a","#768b4e"),stroke:{color:"#5b6d1f"}},{fill:g(_9,"#e8e667","#c6c361"),stroke:{color:"#918e38"}},{fill:g(_9,"#e9c756","#c7a223"),stroke:{color:"#947b30"}},{fill:g(_9,"#a05a5a","#815454"),stroke:{color:"#572828"}},{fill:g(_9,"#b17044","#72543e"),stroke:{color:"#74482e"}},{fill:g(_9,"#a5a5a5","#727272"),stroke:{color:"#535353"}},{fill:g(_9,"#9dc7d9","#59a0bd"),stroke:{color:"#22627d"}},{fill:g(_9,"#b7b3da","#8681b3"),stroke:{color:"#8a84c5"}},{fill:g(_9,"#a8c179","#85a54a"),stroke:{color:"#5b6d1f"}},{fill:g(_9,"#eeea99","#d6d456"),stroke:{color:"#918e38"}},{fill:g(_9,"#ebcf81","#e9c756"),stroke:{color:"#947b30"}},{fill:g(_9,"#c99999","#a05a5a"),stroke:{color:"#572828"}},{fill:g(_9,"#c28b69","#7d5437"),stroke:{color:"#74482e"}},{fill:g(_9,"#bebebe","#8c8c8c"),stroke:{color:"#535353"}},{fill:g(_9,"#c7e0e9","#92baca"),stroke:{color:"#22627d"}},{fill:g(_9,"#c9c6e4","#ada9d6"),stroke:{color:"#8a84c5"}},{fill:g(_9,"#c0d0a0","#98ab74"),stroke:{color:"#5b6d1f"}},{fill:g(_9,"#f0eebb","#dcd87c"),stroke:{color:"#918e38"}},{fill:g(_9,"#efdeb0","#ebcf81"),stroke:{color:"#947b30"}},{fill:g(_9,"#ddc0c0","#c99999"),stroke:{color:"#572828"}},{fill:g(_9,"#cfb09b","#c28b69"),stroke:{color:"#74482e"}},{fill:g(_9,"#d8d8d8","#bebebe"),stroke:{color:"#535353"}},{fill:g(_9,"#ddeff5","#a5c4cd"),stroke:{color:"#22627d"}},{fill:g(_9,"#dedcf0","#b3afd3"),stroke:{color:"#8a84c5"}},{fill:g(_9,"#dfe9ca","#c0d0a0"),stroke:{color:"#5b6d1f"}},{fill:g(_9,"#f8f7db","#e5e28f"),stroke:{color:"#918e38"}},{fill:g(_9,"#f7f0d8","#cfbd88"),stroke:{color:"#947b30"}},{fill:g(_9,"#eedede","#caafaf"),stroke:{color:"#572828"}},{fill:g(_9,"#e3cdbf","#cfb09b"),stroke:{color:"#74482e"}},{fill:g(_9,"#efefef","#cacaca"),stroke:{color:"#535353"}}]});_7.Julie.next=function(_a,_b,_c){if(_a=="line"||_a=="area"){var s=this.seriesThemes[this._current%this.seriesThemes.length];s.fill.space="plot";var _d=_8.prototype.next.apply(this,arguments);s.fill.space="shape";return _d;}return _8.prototype.next.apply(this,arguments);};_7.Julie.post=function(_e,_f){_e=_8.prototype.post.apply(this,arguments);if(_f=="slice"&&_e.series.fill&&_e.series.fill.type=="radial"){_e.series.fill=_6.gfx.gradutils.reverse(_e.series.fill);}return _e;};})();}}};});