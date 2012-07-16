/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.drawing.manager.Stencil"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.drawing.manager.Stencil"]){_4._hasResource["dojox.drawing.manager.Stencil"]=true;_4.provide("dojox.drawing.manager.Stencil");(function(){var _7,_8;_6.drawing.manager.Stencil=_6.drawing.util.oo.declare(function(_9){_7=_9.surface;this.canvas=_9.canvas;this.defaults=_6.drawing.defaults.copy();this.undo=_9.undo;this.mouse=_9.mouse;this.keys=_9.keys;this.anchors=_9.anchors;this.stencils={};this.selectedStencils={};this._mouseHandle=this.mouse.register(this);_4.connect(this.keys,"onArrow",this,"onArrow");_4.connect(this.keys,"onEsc",this,"deselect");_4.connect(this.keys,"onDelete",this,"onDelete");},{_dragBegun:false,_wasDragged:false,_secondClick:false,_isBusy:false,setRecentStencil:function(_a){this.recent=_a;},getRecentStencil:function(){return this.recent;},register:function(_b){console.log("Selection.register ::::::",_b.id);if(_b.isText&&!_b.editMode&&_b.deleteEmptyCreate&&!_b.getText()){console.warn("EMPTY CREATE DELETE",_b);_b.destroy();return false;}this.stencils[_b.id]=_b;this.setRecentStencil(_b);if(_b.execText){if(_b._text&&!_b.editMode){console.log("select text");this.selectItem(_b);}_b.connect("execText",this,function(){if(_b.isText&&_b.deleteEmptyModify&&!_b.getText()){console.warn("EMPTY MOD DELETE",_b);this.deleteItem(_b);}else{if(_b.selectOnExec){this.selectItem(_b);}}});}_b.connect("deselect",this,function(){if(!this._isBusy&&this.isSelected(_b)){this.deselectItem(_b);}});_b.connect("select",this,function(){if(!this._isBusy&&!this.isSelected(_b)){this.selectItem(_b);}});return _b;},unregister:function(_c){console.log("Selection.unregister ::::::",_c.id,"sel:",_c.selected);if(_c){_c.selected&&this.onDeselect(_c);delete this.stencils[_c.id];}},onArrow:function(_d){if(this.hasSelected()){this.saveThrottledState();this.group.applyTransform({dx:_d.x,dy:_d.y});}},_throttleVrl:null,_throttle:false,throttleTime:400,_lastmxx:-1,_lastmxy:-1,saveMoveState:function(){var mx=this.group.getTransform();if(mx.dx==this._lastmxx&&mx.dy==this._lastmxy){return;}this._lastmxx=mx.dx;this._lastmxy=mx.dy;this.undo.add({before:_4.hitch(this.group,"setTransform",mx)});},saveThrottledState:function(){clearTimeout(this._throttleVrl);clearInterval(this._throttleVrl);this._throttleVrl=setTimeout(_4.hitch(this,function(){this._throttle=false;this.saveMoveState();}),this.throttleTime);if(this._throttle){return;}this._throttle=true;this.saveMoveState();},unDelete:function(_e){console.log("unDelete:",_e);for(var s in _e){_e[s].render();this.onSelect(_e[s]);}},onDelete:function(_f){console.log("Stencil onDelete",_f);if(_f!==true){this.undo.add({before:_4.hitch(this,"unDelete",this.selectedStencils),after:_4.hitch(this,"onDelete",true)});}this.withSelected(function(m){this.anchors.remove(m);var id=m.id;console.log("delete:",m);m.destroy();delete this.stencils[id];});this.selectedStencils={};},deleteItem:function(_10){if(this.hasSelected()){var _11=[];for(var m in this.selectedStencils){if(this.selectedStencils.id==_10.id){if(this.hasSelected()==1){this.onDelete();return;}}else{_11.push(this.selectedStencils.id);}}this.deselect();this.selectItem(_10);this.onDelete();_4.forEach(_11,function(id){this.selectItem(id);},this);}else{this.selectItem(_10);this.onDelete();}},removeAll:function(){this.selectAll();this._isBusy=true;this.onDelete();this.stencils={};this._isBusy=false;},setSelectionGroup:function(){this.withSelected(function(m){this.onDeselect(m,true);});if(this.group){_7.remove(this.group);this.group.removeShape();}this.group=_7.createGroup();this.group.setTransform({dx:0,dy:0});this.withSelected(function(m){this.group.add(m.container);m.select();});},setConstraint:function(){var t=Infinity,l=Infinity;this.withSelected(function(m){var o=m.getBounds();t=Math.min(o.y1,t);l=Math.min(o.x1,l);});this.constrain={l:-l,t:-t};},onDeselect:function(_12,_13){if(!_13){delete this.selectedStencils[_12.id];}this.anchors.remove(_12);_7.add(_12.container);_12.selected&&_12.deselect();_12.applyTransform(this.group.getTransform());},deselectItem:function(_14){this.onDeselect(_14);},deselect:function(){this.withSelected(function(m){this.onDeselect(m);});this._dragBegun=false;this._wasDragged=false;},onSelect:function(_15){if(!_15){console.error("null stencil is not selected:",this.stencils);}if(this.selectedStencils[_15.id]){return;}this.selectedStencils[_15.id]=_15;this.group.add(_15.container);_15.select();if(this.hasSelected()==1){this.anchors.add(_15,this.group);}},selectAll:function(){this._isBusy=true;for(var m in this.stencils){this.selectItem(m);}this._isBusy=false;},selectItem:function(_16){var id=typeof (_16)=="string"?_16:_16.id;var _17=this.stencils[id];this.setSelectionGroup();this.onSelect(_17);this.group.moveToFront();this.setConstraint();},onLabelDoubleClick:function(obj){console.info("mgr.onLabelDoubleClick:",obj);if(this.selectedStencils[obj.id]){this.deselect();}},onStencilDoubleClick:function(obj){console.info("mgr.onStencilDoubleClick:",obj);if(this.selectedStencils[obj.id]){if(this.selectedStencils[obj.id].edit){console.info("Mgr Stencil Edit -> ",this.selectedStencils[obj.id]);var m=this.selectedStencils[obj.id];m.editMode=true;this.deselect();m.edit();}}},onAnchorUp:function(){this.setConstraint();},onStencilDown:function(obj,evt){console.info(" >>> onStencilDown:",obj.id,this.keys.meta);if(!this.stencils[obj.id]){return;}this.setRecentStencil(this.stencils[obj.id]);this._isBusy=true;if(this.selectedStencils[obj.id]&&this.keys.meta){if(_4.isMac&&this.keys.cmmd){}console.log("    shift remove");this.onDeselect(this.selectedStencils[obj.id]);if(this.hasSelected()==1){this.withSelected(function(m){this.anchors.add(m,this.group);});}this.group.moveToFront();this.setConstraint();return;}else{if(this.selectedStencils[obj.id]){console.log("    clicked on selected");var mx=this.group.getTransform();this._offx=obj.x-mx.dx;this._offy=obj.y-mx.dy;return;}else{if(!this.keys.meta){console.log("    deselect all");this.deselect();}else{}}}console.log("    add stencil to selection");this.selectItem(obj.id);mx=this.group.getTransform();this._offx=obj.x-mx.dx;this._offy=obj.y-mx.dx;this.orgx=obj.x;this.orgy=obj.y;this._isBusy=false;this.undo.add({before:function(){},after:function(){}});},onLabelDown:function(obj,evt){this.onStencilDown(obj,evt);},onStencilUp:function(obj){},onLabelUp:function(obj){this.onStencilUp(obj);},onStencilDrag:function(obj){if(!this._dragBegun){this.onBeginDrag(obj);this._dragBegun=true;}else{this.saveThrottledState();var x=obj.x-obj.last.x,y=obj.y-obj.last.y,c=this.constrain,mz=this.defaults.anchors.marginZero;x=obj.x-this._offx;y=obj.y-this._offy;if(x<c.l+mz){x=c.l+mz;}if(y<c.t+mz){y=c.t+mz;}this.group.setTransform({dx:x,dy:y});}},onLabelDrag:function(obj){this.onStencilDrag(obj);},onDragEnd:function(obj){this._dragBegun=false;},onBeginDrag:function(obj){this._wasDragged=true;},onDown:function(obj){this.deselect();},onStencilOver:function(obj){_4.style(obj.id,"cursor","move");},onStencilOut:function(obj){_4.style(obj.id,"cursor","crosshair");},exporter:function(){var _18=[];for(var m in this.stencils){this.stencils[m].enabled&&_18.push(this.stencils[m].exporter());}return _18;},listStencils:function(){return this.stencils;},toSelected:function(_19){var _1a=Array.prototype.slice.call(arguments).splice(1);for(var m in this.selectedStencils){var _1b=this.selectedStencils[m];_1b[_19].apply(_1b,_1a);}},withSelected:function(_1c){var f=_4.hitch(this,_1c);for(var m in this.selectedStencils){f(this.selectedStencils[m]);}},withUnselected:function(_1d){var f=_4.hitch(this,_1d);for(var m in this.stencils){!this.stencils[m].selected&&f(this.stencils[m]);}},withStencils:function(_1e){var f=_4.hitch(this,_1e);for(var m in this.stencils){f(this.stencils[m]);}},hasSelected:function(){var ln=0;for(var m in this.selectedStencils){ln++;}return ln;},isSelected:function(_1f){return !!this.selectedStencils[_1f.id];}});})();}}};});