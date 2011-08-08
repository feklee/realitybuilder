/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.manager.Anchors"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.manager.Anchors"]){_4._hasResource["dojox.drawing.manager.Anchors"]=true;_4.provide("dojox.drawing.manager.Anchors");_6.drawing.manager.Anchors=_6.drawing.util.oo.declare(function(_7){this.mouse=_7.mouse;this.undo=_7.undo;this.util=_7.util;this.drawing=_7.drawing;this.items={};},{onAddAnchor:function(_8){},onReset:function(_9){var st=this.util.byId("drawing").stencils;st.onDeselect(_9);st.onSelect(_9);},onRenderStencil:function(){for(var nm in this.items){_4.forEach(this.items[nm].anchors,function(a){a.shape.moveToFront();});}},onTransformPoint:function(_a){var _b=this.items[_a.stencil.id].anchors;var _c=this.items[_a.stencil.id].item;var _d=[];_4.forEach(_b,function(a,i){if(_a.id==a.id||_a.stencil.anchorType!="group"){}else{if(_a.org.y==a.org.y){a.setPoint({dx:0,dy:_a.shape.getTransform().dy-a.shape.getTransform().dy});}else{if(_a.org.x==a.org.x){a.setPoint({dx:_a.shape.getTransform().dx-a.shape.getTransform().dx,dy:0});}}a.shape.moveToFront();}var mx=a.shape.getTransform();_d.push({x:mx.dx+a.org.x,y:mx.dy+a.org.y});if(a.point.t){_d[_d.length-1].t=a.point.t;}},this);_c.setPoints(_d);_c.onTransform(_a);this.onRenderStencil();},onAnchorUp:function(_e){},onAnchorDown:function(_f){},onAnchorDrag:function(_10){},onChangeStyle:function(_11){for(var nm in this.items){_4.forEach(this.items[nm].anchors,function(a){a.shape.moveToFront();});}},add:function(_12){this.items[_12.id]={item:_12,anchors:[]};if(_12.anchorType=="none"){return;}var pts=_12.points;_4.forEach(pts,function(p,i){if(p.noAnchor){return;}if(i==0||i==_12.points.length-1){console.log("ITEM TYPE:",_12.type,_12.shortType);}var a=new _6.drawing.manager.Anchor({stencil:_12,point:p,pointIdx:i,mouse:this.mouse,util:this.util});this.items[_12.id]._cons=[_4.connect(a,"onRenderStencil",this,"onRenderStencil"),_4.connect(a,"reset",this,"onReset"),_4.connect(a,"onAnchorUp",this,"onAnchorUp"),_4.connect(a,"onAnchorDown",this,"onAnchorDown"),_4.connect(a,"onAnchorDrag",this,"onAnchorDrag"),_4.connect(a,"onTransformPoint",this,"onTransformPoint"),_4.connect(_12,"onChangeStyle",this,"onChangeStyle")];this.items[_12.id].anchors.push(a);this.onAddAnchor(a);},this);if(_12.shortType=="path"){var f=pts[0],l=pts[pts.length-1],a=this.items[_12.id].anchors;if(f.x==l.x&&f.y==l.y){console.warn("LINK ANVHROS",a[0],a[a.length-1]);a[0].linkedAnchor=a[a.length-1];a[a.length-1].linkedAnchor=a[0];}}if(_12.anchorType=="group"){_4.forEach(this.items[_12.id].anchors,function(_13){_4.forEach(this.items[_12.id].anchors,function(a){if(_13.id!=a.id){if(_13.org.y==a.org.y){_13.x_anchor=a;}else{if(_13.org.x==a.org.x){_13.y_anchor=a;}}}},this);},this);}},remove:function(_14){if(!this.items[_14.id]){return;}_4.forEach(this.items[_14.id].anchors,function(a){a.destroy();});_4.forEach(this.items[_14.id]._cons,_4.disconnect,_4);this.items[_14.id].anchors=null;delete this.items[_14.id];}});_6.drawing.manager.Anchor=_6.drawing.util.oo.declare(function(_15){this.defaults=_6.drawing.defaults.copy();this.mouse=_15.mouse;this.point=_15.point;this.pointIdx=_15.pointIdx;this.util=_15.util;this.id=_15.id||this.util.uid("anchor");this.org=_4.mixin({},this.point);this.stencil=_15.stencil;if(this.stencil.anchorPositionCheck){this.anchorPositionCheck=_4.hitch(this.stencil,this.stencil.anchorPositionCheck);}if(this.stencil.anchorConstrain){this.anchorConstrain=_4.hitch(this.stencil,this.stencil.anchorConstrain);}this._zCon=_4.connect(this.mouse,"setZoom",this,"render");this.render();this.connectMouse();},{y_anchor:null,x_anchor:null,render:function(){this.shape&&this.shape.removeShape();var d=this.defaults.anchors,z=this.mouse.zoom,b=d.width*z,s=d.size*z,p=s/2,_16={width:b,style:d.style,color:d.color,cap:d.cap};var _17={x:this.point.x-p,y:this.point.y-p,width:s,height:s};this.shape=this.stencil.container.createRect(_17).setStroke(_16).setFill(d.fill);this.shape.setTransform({dx:0,dy:0});this.util.attr(this,"drawingType","anchor");this.util.attr(this,"id",this.id);},onRenderStencil:function(_18){},onTransformPoint:function(_19){},onAnchorDown:function(obj){this.selected=obj.id==this.id;},onAnchorUp:function(obj){this.selected=false;this.stencil.onTransformEnd(this);},onAnchorDrag:function(obj){if(this.selected){var mx=this.shape.getTransform();var pmx=this.shape.getParent().getParent().getTransform();var _1a=this.defaults.anchors.marginZero;var _1b=pmx.dx+this.org.x,_1c=pmx.dy+this.org.y,x=obj.x-_1b,y=obj.y-_1c,s=this.defaults.anchors.minSize;var _1d,_1e,_1f,_20;var chk=this.anchorPositionCheck(x,y,this);if(chk.x<0){console.warn("X<0 Shift");while(this.anchorPositionCheck(x,y,this).x<0){this.shape.getParent().getParent().applyTransform({dx:2,dy:0});}}if(chk.y<0){console.warn("Y<0 Shift");while(this.anchorPositionCheck(x,y,this).y<0){this.shape.getParent().getParent().applyTransform({dx:0,dy:2});}}if(this.y_anchor){if(this.org.y>this.y_anchor.org.y){_1f=this.y_anchor.point.y+s-this.org.y;_20=Infinity;if(y<_1f){y=_1f;}}else{_1f=-_1c+_1a;_20=this.y_anchor.point.y-s-this.org.y;if(y<_1f){y=_1f;}else{if(y>_20){y=_20;}}}}else{_1f=-_1c+_1a;if(y<_1f){y=_1f;}}if(this.x_anchor){if(this.org.x>this.x_anchor.org.x){_1d=this.x_anchor.point.x+s-this.org.x;_1e=Infinity;if(x<_1d){x=_1d;}}else{_1d=-_1b+_1a;_1e=this.x_anchor.point.x-s-this.org.x;if(x<_1d){x=_1d;}else{if(x>_1e){x=_1e;}}}}else{_1d=-_1b+_1a;if(x<_1d){x=_1d;}}var _21=this.anchorConstrain(x,y);if(_21!=null){x=_21.x;y=_21.y;}this.shape.setTransform({dx:x,dy:y});if(this.linkedAnchor){this.linkedAnchor.shape.setTransform({dx:x,dy:y});}this.onTransformPoint(this);}},anchorConstrain:function(x,y){return null;},anchorPositionCheck:function(x,y,_22){return {x:1,y:1};},setPoint:function(mx){this.shape.applyTransform(mx);},connectMouse:function(){this._mouseHandle=this.mouse.register(this);},disconnectMouse:function(){this.mouse.unregister(this._mouseHandle);},reset:function(_23){},destroy:function(){_4.disconnect(this._zCon);this.disconnectMouse();this.shape.removeShape();}});}}};});