/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.action2d.Magnify"],["require","dojox.charting.action2d.Base"],["require","dojox.gfx.matrix"],["require","dojo.fx"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.action2d.Magnify"]){_4._hasResource["dojox.charting.action2d.Magnify"]=true;_4.provide("dojox.charting.action2d.Magnify");_4.require("dojox.charting.action2d.Base");_4.require("dojox.gfx.matrix");_4.require("dojo.fx");(function(){var _7=2,m=_6.gfx.matrix,gf=_6.gfx.fx;_4.declare("dojox.charting.action2d.Magnify",_6.charting.action2d.Base,{defaultParams:{duration:400,easing:_4.fx.easing.backOut,scale:_7},optionalParams:{},constructor:function(_8,_9,_a){this.scale=_a&&typeof _a.scale=="number"?_a.scale:_7;this.connect();},process:function(o){if(!o.shape||!(o.type in this.overOutEvents)||!("cx" in o)||!("cy" in o)){return;}var _b=o.run.name,_c=o.index,_d=[],_e,_f,_10;if(_b in this.anim){_e=this.anim[_b][_c];}else{this.anim[_b]={};}if(_e){_e.action.stop(true);}else{this.anim[_b][_c]=_e={};}if(o.type=="onmouseover"){_f=m.identity;_10=this.scale;}else{_f=m.scaleAt(this.scale,o.cx,o.cy);_10=1/this.scale;}var _11={shape:o.shape,duration:this.duration,easing:this.easing,transform:[{name:"scaleAt",start:[1,o.cx,o.cy],end:[_10,o.cx,o.cy]},_f]};if(o.shape){_d.push(gf.animateTransform(_11));}if(o.oultine){_11.shape=o.outline;_d.push(gf.animateTransform(_11));}if(o.shadow){_11.shape=o.shadow;_d.push(gf.animateTransform(_11));}if(!_d.length){delete this.anim[_b][_c];return;}_e.action=_4.fx.combine(_d);if(o.type=="onmouseout"){_4.connect(_e.action,"onEnd",this,function(){if(this.anim[_b]){delete this.anim[_b][_c];}});}_e.action.play();}});})();}}};});