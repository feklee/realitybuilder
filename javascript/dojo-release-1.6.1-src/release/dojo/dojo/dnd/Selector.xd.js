/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.dnd.Selector"],["require","dojo.dnd.common"],["require","dojo.dnd.Container"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.dnd.Selector"]){_4._hasResource["dojo.dnd.Selector"]=true;_4.provide("dojo.dnd.Selector");_4.require("dojo.dnd.common");_4.require("dojo.dnd.Container");_4.declare("dojo.dnd.Selector",_4.dnd.Container,{constructor:function(_7,_8){if(!_8){_8={};}this.singular=_8.singular;this.autoSync=_8.autoSync;this.selection={};this.anchor=null;this.simpleSelection=false;this.events.push(_4.connect(this.node,"onmousedown",this,"onMouseDown"),_4.connect(this.node,"onmouseup",this,"onMouseUp"));},singular:false,getSelectedNodes:function(){var t=new _4.NodeList();var e=_4.dnd._empty;for(var i in this.selection){if(i in e){continue;}t.push(_4.byId(i));}return t;},selectNone:function(){return this._removeSelection()._removeAnchor();},selectAll:function(){this.forInItems(function(_9,id){this._addItemClass(_4.byId(id),"Selected");this.selection[id]=1;},this);return this._removeAnchor();},deleteSelectedNodes:function(){var e=_4.dnd._empty;for(var i in this.selection){if(i in e){continue;}var n=_4.byId(i);this.delItem(i);_4.destroy(n);}this.anchor=null;this.selection={};return this;},forInSelectedItems:function(f,o){o=o||_4.global;var s=this.selection,e=_4.dnd._empty;for(var i in s){if(i in e){continue;}f.call(o,this.getItem(i),i,this);}},sync:function(){_4.dnd.Selector.superclass.sync.call(this);if(this.anchor){if(!this.getItem(this.anchor.id)){this.anchor=null;}}var t=[],e=_4.dnd._empty;for(var i in this.selection){if(i in e){continue;}if(!this.getItem(i)){t.push(i);}}_4.forEach(t,function(i){delete this.selection[i];},this);return this;},insertNodes:function(_a,_b,_c,_d){var _e=this._normalizedCreator;this._normalizedCreator=function(_f,_10){var t=_e.call(this,_f,_10);if(_a){if(!this.anchor){this.anchor=t.node;this._removeItemClass(t.node,"Selected");this._addItemClass(this.anchor,"Anchor");}else{if(this.anchor!=t.node){this._removeItemClass(t.node,"Anchor");this._addItemClass(t.node,"Selected");}}this.selection[t.node.id]=1;}else{this._removeItemClass(t.node,"Selected");this._removeItemClass(t.node,"Anchor");}return t;};_4.dnd.Selector.superclass.insertNodes.call(this,_b,_c,_d);this._normalizedCreator=_e;return this;},destroy:function(){_4.dnd.Selector.superclass.destroy.call(this);this.selection=this.anchor=null;},markupFactory:function(_11,_12){_11._skipStartup=true;return new _4.dnd.Selector(_12,_11);},onMouseDown:function(e){if(this.autoSync){this.sync();}if(!this.current){return;}if(!this.singular&&!_4.isCopyKey(e)&&!e.shiftKey&&(this.current.id in this.selection)){this.simpleSelection=true;if(e.button===_4.mouseButtons.LEFT){_4.stopEvent(e);}return;}if(!this.singular&&e.shiftKey){if(!_4.isCopyKey(e)){this._removeSelection();}var c=this.getAllNodes();if(c.length){if(!this.anchor){this.anchor=c[0];this._addItemClass(this.anchor,"Anchor");}this.selection[this.anchor.id]=1;if(this.anchor!=this.current){var i=0;for(;i<c.length;++i){var _13=c[i];if(_13==this.anchor||_13==this.current){break;}}for(++i;i<c.length;++i){var _13=c[i];if(_13==this.anchor||_13==this.current){break;}this._addItemClass(_13,"Selected");this.selection[_13.id]=1;}this._addItemClass(this.current,"Selected");this.selection[this.current.id]=1;}}}else{if(this.singular){if(this.anchor==this.current){if(_4.isCopyKey(e)){this.selectNone();}}else{this.selectNone();this.anchor=this.current;this._addItemClass(this.anchor,"Anchor");this.selection[this.current.id]=1;}}else{if(_4.isCopyKey(e)){if(this.anchor==this.current){delete this.selection[this.anchor.id];this._removeAnchor();}else{if(this.current.id in this.selection){this._removeItemClass(this.current,"Selected");delete this.selection[this.current.id];}else{if(this.anchor){this._removeItemClass(this.anchor,"Anchor");this._addItemClass(this.anchor,"Selected");}this.anchor=this.current;this._addItemClass(this.current,"Anchor");this.selection[this.current.id]=1;}}}else{if(!(this.current.id in this.selection)){this.selectNone();this.anchor=this.current;this._addItemClass(this.current,"Anchor");this.selection[this.current.id]=1;}}}}_4.stopEvent(e);},onMouseUp:function(e){if(!this.simpleSelection){return;}this.simpleSelection=false;this.selectNone();if(this.current){this.anchor=this.current;this._addItemClass(this.anchor,"Anchor");this.selection[this.current.id]=1;}},onMouseMove:function(e){this.simpleSelection=false;},onOverEvent:function(){this.onmousemoveEvent=_4.connect(this.node,"onmousemove",this,"onMouseMove");},onOutEvent:function(){_4.disconnect(this.onmousemoveEvent);delete this.onmousemoveEvent;},_removeSelection:function(){var e=_4.dnd._empty;for(var i in this.selection){if(i in e){continue;}var _14=_4.byId(i);if(_14){this._removeItemClass(_14,"Selected");}}this.selection={};return this;},_removeAnchor:function(){if(this.anchor){this._removeItemClass(this.anchor,"Anchor");this.anchor=null;}return this;}});}}};});