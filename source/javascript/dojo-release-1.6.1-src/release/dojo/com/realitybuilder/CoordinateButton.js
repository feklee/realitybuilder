/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["com.realitybuilder.CoordinateButton"]){dojo._hasResource["com.realitybuilder.CoordinateButton"]=true;dojo.provide("com.realitybuilder.CoordinateButton");dojo.declare("com.realitybuilder.CoordinateButton",null,{_highlightColor:"red",_standardColor:"white",_sideLengthS:37,_radiusS:17.5,centerS:null,_canvas:null,_group:null,_plus:null,_newBlock:null,_coordinate:null,_disabled:true,_onclickHandle:null,_deltaB:null,constructor:function(_1,_2,_3,_4,_5){this.centerS=_2;this._plus=_4;this._newBlock=_1;this._coordinate=_3;this._computeDeltaB();this._createNode();},highlight:function(){if(!this._disabled){this._render(this._highlightColor);}},unhighlight:function(){this._render(this._standardColor);},radiusS:function(){return this._radiusS;},move:function(_6){var l=this._sideLengthS;this._canvas.style.left=(_6[0]-l/2)+"px";this._canvas.style.top=(_6[1]-l/2)+"px";this.centerS=_6;},update:function(_7){var _8,i;if(_7){this._disable();}else{_8=[];for(i=0;i<3;i+=1){_8[i]=(i===this._coordinate)?this._delta():0;}if(this._newBlock.wouldGoOutOfRange(_8)){this._disable();}else{this._enable();}}},moveNewBlock:function(){this._newBlock.move(this._deltaB);},_computeDeltaB:function(){var i;this._deltaB=[];for(i=0;i<3;i+=1){this._deltaB[i]=(i===this._coordinate)?this._delta():0;}},_direction:function(){return (this._plus?1:-1);},_delta:function(){return this._direction();},_disable:function(){if(!this._disabled){dojo.disconnect(this._onclickHandle);this._render(this._standardColor);this._disabled=true;}},_enable:function(){if(this._disabled){this._onclickHandle=dojo.connect(this._canvas,"onclick",this,this.moveNewBlock);this._disabled=false;}},_drawRectangle:function(_9){_9.createRect({x1:0,y1:0,x2:_9.width,y2:_9.height}).setFill([0,0,0,0]);},_createNode:function(){var l=this._sideLengthS;this._canvas=dojo.create("canvas",{width:l,height:l,style:{position:"absolute",left:(this.centerS[0]-l/2)+"px",top:(this.centerS[1]-l/2)+"px"}},"coordinateControls");if(com.realitybuilder.util.isFlashCanvasActive()){FlashCanvas.initElement(this._canvas);}dojo.connect(this._canvas,"onmouseover",this,this.highlight);dojo.connect(this._canvas,"onmouseout",this,this.unhighlight);this._render(this._standardColor);},_render:function(_a){var _b=this._canvas,l=this._sideLengthS,_c;if(_b.getContext){_c=_b.getContext("2d");com.realitybuilder.util.clearCanvas(_b);_c.strokeStyle=_a;_c.beginPath();_c.arc(l/2,l/2,this._radiusS,0,2*Math.PI,false);_c.stroke();if(this._plus){_c.moveTo(l/2,4);_c.lineTo(l/2,l-4);_c.stroke();}_c.moveTo(4,l/2);_c.lineTo(l-4,l/2);_c.stroke();}}});}