/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.themes.Tom"],["require","dojox.gfx.gradutils"],["require","dojox.charting.Theme"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.themes.Tom"]){_4._hasResource["dojox.charting.themes.Tom"]=true;_4.provide("dojox.charting.themes.Tom");_4.require("dojox.gfx.gradutils");_4.require("dojox.charting.Theme");(function(){var dc=_6.charting,_7=dc.themes,_8=dc.Theme,g=_8.generateGradient,_9={type:"linear",space:"shape",x1:0,y1:0,x2:0,y2:100};_7.Tom=new dc.Theme({chart:{fill:"#181818",stroke:{color:"#181818"},pageStyle:{backgroundColor:"#181818",backgroundImage:"none",color:"#eaf2cb"}},plotarea:{fill:"#181818"},axis:{stroke:{color:"#a0a68b",width:1},tick:{color:"#888c76",position:"center",font:"normal normal normal 7pt Helvetica, Arial, sans-serif",fontColor:"#888c76"}},series:{stroke:{width:2.5,color:"#eaf2cb"},outline:null,font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#eaf2cb"},marker:{stroke:{width:1.25,color:"#eaf2cb"},outline:{width:1.25,color:"#eaf2cb"},font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#eaf2cb"},seriesThemes:[{fill:g(_9,"#bf9e0a","#ecc20c")},{fill:g(_9,"#73b086","#95e5af")},{fill:g(_9,"#c7212d","#ed2835")},{fill:g(_9,"#87ab41","#b6e557")},{fill:g(_9,"#b86c25","#d37d2a")}],markerThemes:[{fill:"#bf9e0a",stroke:{color:"#ecc20c"}},{fill:"#73b086",stroke:{color:"#95e5af"}},{fill:"#c7212d",stroke:{color:"#ed2835"}},{fill:"#87ab41",stroke:{color:"#b6e557"}},{fill:"#b86c25",stroke:{color:"#d37d2a"}}]});_7.Tom.next=function(_a,_b,_c){var _d=_a=="line";if(_d||_a=="area"){var s=this.seriesThemes[this._current%this.seriesThemes.length];s.fill.space="plot";if(_d){s.stroke={width:4,color:s.fill.colors[0].color};}var _e=_8.prototype.next.apply(this,arguments);delete s.outline;delete s.stroke;s.fill.space="shape";return _e;}return _8.prototype.next.apply(this,arguments);};_7.Tom.post=function(_f,_10){_f=_8.prototype.post.apply(this,arguments);if((_10=="slice"||_10=="circle")&&_f.series.fill&&_f.series.fill.type=="radial"){_f.series.fill=_6.gfx.gradutils.reverse(_f.series.fill);}return _f;};})();}}};});