/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.stencil.Path"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.stencil.Path"]){_4._hasResource["dojox.drawing.stencil.Path"]=true;_4.provide("dojox.drawing.stencil.Path");_6.drawing.stencil.Path=_6.drawing.util.oo.declare(_6.drawing.stencil._Base,function(_7){_4.disconnect(this._postRenderCon);},{type:"dojox.drawing.stencil.Path",closePath:true,baseRender:true,closeRadius:10,closeColor:{r:255,g:255,b:0,a:0.5},_create:function(_8,_9){this.remove(this[_8]);if(!this.points.length){return;}if(_6.gfx.renderer=="svg"){var _a=[];_4.forEach(this.points,function(o,i){if(!o.skip){if(i==0){_a.push("M "+o.x+" "+o.y);}else{var _b=(o.t||"")+" ";if(o.x===undefined){_a.push(_b);}else{_a.push(_b+o.x+" "+o.y);}}}},this);if(this.closePath){_a.push("Z");}this.stringPath=_a.join(" ");this[_8]=this.container.createPath(_a.join(" ")).setStroke(_9);this.closePath&&this[_8].setFill(_9.fill);}else{this[_8]=this.container.createPath({}).setStroke(_9);this.closePath&&this[_8].setFill(_9.fill);_4.forEach(this.points,function(o,i){if(!o.skip){if(i==0||o.t=="M"){this[_8].moveTo(o.x,o.y);}else{if(o.t=="Z"){this.closePath&&this[_8].closePath();}else{this[_8].lineTo(o.x,o.y);}}}},this);this.closePath&&this[_8].closePath();}this._setNodeAtts(this[_8]);},render:function(){this.onBeforeRender(this);this.renderHit&&this._create("hit",this.style.currentHit);this._create("shape",this.style.current);},getBounds:function(_c){var _d=10000,_e=10000,_f=0,_10=0;_4.forEach(this.points,function(p){if(p.x!==undefined&&!isNaN(p.x)){_d=Math.min(_d,p.x);_e=Math.min(_e,p.y);_f=Math.max(_f,p.x);_10=Math.max(_10,p.y);}});return {x1:_d,y1:_e,x2:_f,y2:_10,x:_d,y:_e,w:_f-_d,h:_10-_e};},checkClosePoint:function(_11,_12,_13){var _14=this.util.distance(_11.x,_11.y,_12.x,_12.y);if(this.points.length>1){if(_14<this.closeRadius&&!this.closeGuide&&!_13){var c={cx:_11.x,cy:_11.y,rx:this.closeRadius,ry:this.closeRadius};this.closeGuide=this.container.createEllipse(c).setFill(this.closeColor);}else{if(_13||_14>this.closeRadius&&this.closeGuide){this.remove(this.closeGuide);this.closeGuide=null;}}}return _14<this.closeRadius;}});_6.drawing.register({name:"dojox.drawing.stencil.Path"},"stencil");}}};});