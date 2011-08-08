/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.action2d.MoveSlice"],["require","dojox.charting.action2d.Base"],["require","dojox.gfx.matrix"],["require","dojox.lang.functional"],["require","dojox.lang.functional.scan"],["require","dojox.lang.functional.fold"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.action2d.MoveSlice"]){_4._hasResource["dojox.charting.action2d.MoveSlice"]=true;_4.provide("dojox.charting.action2d.MoveSlice");_4.require("dojox.charting.action2d.Base");_4.require("dojox.gfx.matrix");_4.require("dojox.lang.functional");_4.require("dojox.lang.functional.scan");_4.require("dojox.lang.functional.fold");(function(){var _7=1.05,_8=7,m=_6.gfx.matrix,gf=_6.gfx.fx,df=_6.lang.functional;_4.declare("dojox.charting.action2d.MoveSlice",_6.charting.action2d.Base,{defaultParams:{duration:400,easing:_4.fx.easing.backOut,scale:_7,shift:_8},optionalParams:{},constructor:function(_9,_a,_b){if(!_b){_b={};}this.scale=typeof _b.scale=="number"?_b.scale:_7;this.shift=typeof _b.shift=="number"?_b.shift:_8;this.connect();},process:function(o){if(!o.shape||o.element!="slice"||!(o.type in this.overOutEvents)){return;}if(!this.angles){var _c=m._degToRad(o.plot.opt.startAngle);if(typeof o.run.data[0]=="number"){this.angles=df.map(df.scanl(o.run.data,"+",_c),"* 2 * Math.PI / this",df.foldl(o.run.data,"+",0));}else{this.angles=df.map(df.scanl(o.run.data,"a + b.y",_c),"* 2 * Math.PI / this",df.foldl(o.run.data,"a + b.y",0));}}var _d=o.index,_e,_f,_10,_11,_12,_13=(this.angles[_d]+this.angles[_d+1])/2,_14=m.rotateAt(-_13,o.cx,o.cy),_15=m.rotateAt(_13,o.cx,o.cy);_e=this.anim[_d];if(_e){_e.action.stop(true);}else{this.anim[_d]=_e={};}if(o.type=="onmouseover"){_11=0;_12=this.shift;_f=1;_10=this.scale;}else{_11=this.shift;_12=0;_f=this.scale;_10=1;}_e.action=_6.gfx.fx.animateTransform({shape:o.shape,duration:this.duration,easing:this.easing,transform:[_15,{name:"translate",start:[_11,0],end:[_12,0]},{name:"scaleAt",start:[_f,o.cx,o.cy],end:[_10,o.cx,o.cy]},_14]});if(o.type=="onmouseout"){_4.connect(_e.action,"onEnd",this,function(){delete this.anim[_d];});}_e.action.play();},reset:function(){delete this.angles;}});})();}}};});