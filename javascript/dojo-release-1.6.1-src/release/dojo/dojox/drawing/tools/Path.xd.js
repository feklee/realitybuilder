/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.tools.Path"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.tools.Path"]){_4._hasResource["dojox.drawing.tools.Path"]=true;_4.provide("dojox.drawing.tools.Path");_6.drawing.tools.Path=_6.drawing.util.oo.declare(_6.drawing.stencil.Path,function(){this.pathMode="";this.currentPathMode="";this._started=false;this.oddEvenClicks=0;},{draws:true,onDown:function(_7){if(!this._started){this.onStartPath(_7);}},makeSubPath:function(_8){if(_8){if(this.currentPathMode=="Q"){this.points.push({x:this.points[0].x,y:this.points[0].y});}this.points.push({t:"Z"});this.render();}this.currentPathMode="";this.pathMode="M";},onStartPath:function(_9){this._started=true;this.revertRenderHit=this.renderHit;this.renderHit=false;this.closePath=false;this.mouse.setEventMode("PathEdit");this.closePoint={x:_9.x,y:_9.y};this._kc1=this.connect(this.keys,"onEsc",this,function(){this.onCompletePath(false);});this._kc2=this.connect(this.keys,"onKeyUp",this,function(_a){switch(_a.letter){case "c":this.onCompletePath(true);break;case "l":this.pathMode="L";break;case "m":this.makeSubPath(false);break;case "q":this.pathMode="Q";break;case "s":this.pathMode="S";break;case "z":this.makeSubPath(true);break;}});},onCompletePath:function(_b){this.remove(this.closeGuide,this.guide);var _c=this.getBounds();if(_c.w<this.minimumSize&&_c.h<this.minimumSize){this.remove(this.hit,this.shape,this.closeGuide);this._started=false;this.mouse.setEventMode("");this.setPoints([]);return;}if(_b){if(this.currentPathMode=="Q"){this.points.push({x:this.points[0].x,y:this.points[0].y});}this.closePath=true;}this.renderHit=this.revertRenderHit;this.renderedOnce=true;this.onRender(this);this.disconnect([this._kc1,this._kc2]);this.mouse.setEventMode("");this.render();},onUp:function(_d){if(!this._started||!_d.withinCanvas){return;}if(this.points.length>2&&this.closeRadius>this.util.distance(_d.x,_d.y,this.closePoint.x,this.closePoint.y)){this.onCompletePath(true);}else{var p={x:_d.x,y:_d.y};this.oddEvenClicks++;if(this.currentPathMode!=this.pathMode){if(this.pathMode=="Q"){p.t="Q";this.oddEvenClicks=0;}else{if(this.pathMode=="L"){p.t="L";}else{if(this.pathMode=="M"){p.t="M";this.closePoint={x:_d.x,y:_d.y};}}}this.currentPathMode=this.pathMode;}this.points.push(p);if(this.points.length>1){this.remove(this.guide);this.render();}}},createGuide:function(_e){if(!this.points.length){return;}var _f=[].concat(this.points);var pt={x:_e.x,y:_e.y};if(this.currentPathMode=="Q"&&this.oddEvenClicks%2){pt.t="L";}this.points.push(pt);this.render();this.points=_f;var _10=this.util.distance(_e.x,_e.y,this.closePoint.x,this.closePoint.y);if(this.points.length>1){if(_10<this.closeRadius&&!this.closeGuide){var c={cx:this.closePoint.x,cy:this.closePoint.y,rx:this.closeRadius,ry:this.closeRadius};this.closeGuide=this.container.createEllipse(c).setFill(this.closeColor);}else{if(_10>this.closeRadius&&this.closeGuide){this.remove(this.closeGuide);this.closeGuide=null;}}}},onMove:function(obj){if(!this._started){return;}this.createGuide(obj);},onDrag:function(obj){if(!this._started){return;}this.createGuide(obj);}});_6.drawing.tools.Path.setup={name:"dojox.drawing.tools.Path",tooltip:"Path Tool",iconClass:"iconLine"};_6.drawing.register(_6.drawing.tools.Path.setup,"tool");}}};});