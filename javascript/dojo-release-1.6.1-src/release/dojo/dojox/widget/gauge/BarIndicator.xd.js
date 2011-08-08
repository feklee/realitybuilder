/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.widget.gauge.BarIndicator"],["require","dojox.widget.BarGauge"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.widget.gauge.BarIndicator"]){_4._hasResource["dojox.widget.gauge.BarIndicator"]=true;_4.provide("dojox.widget.gauge.BarIndicator");_4.require("dojox.widget.BarGauge");_4.experimental("dojox.widget.gauge.BarIndicator");_4.declare("dojox.widget.gauge.BarIndicator",[_6.widget.gauge.BarLineIndicator],{_getShapes:function(){if(!this._gauge){return null;}var v=this.value;if(v<this._gauge.min){v=this._gauge.min;}if(v>this._gauge.max){v=this._gauge.max;}var _7=this._gauge._getPosition(v);if(_7==this.dataX){_7=this.dataX+1;}var y=this._gauge.dataY+Math.floor((this._gauge.dataHeight-this.width)/2)+this.offset;var _8=[];_8[0]=this._gauge.surface.createRect({x:this._gauge.dataX,y:y,width:_7-this._gauge.dataX,height:this.width});_8[0].setStroke({color:this.color});_8[0].setFill(this.color);_8[1]=this._gauge.surface.createLine({x1:this._gauge.dataX,y1:y,x2:_7,y2:y});_8[1].setStroke({color:this.highlight});if(this.highlight2){y--;_8[2]=this._gauge.surface.createLine({x1:this._gauge.dataX,y1:y,x2:_7,y2:y});_8[2].setStroke({color:this.highlight2});}return _8;},_createShapes:function(_9){for(var i in this.shapes){i=this.shapes[i];var _a={};for(var j in i){_a[j]=i[j];}if(i.shape.type=="line"){_a.shape.x2=_9+_a.shape.x1;}else{if(i.shape.type=="rect"){_a.width=_9;}}i.setShape(_a);}},_move:function(_b){var _c=false;var c;var v=this.value;if(v<this.min){v=this.min;}if(v>this.max){v=this.max;}c=this._gauge._getPosition(this.currentValue);this.currentValue=v;v=this._gauge._getPosition(v)-this._gauge.dataX;if(_b){this._createShapes(v);}else{if(c!=v){var _d=new _4.Animation({curve:[c,v],duration:this.duration,easing:this.easing});_4.connect(_d,"onAnimate",_4.hitch(this,this._createShapes));_d.play();}}}});}}};});