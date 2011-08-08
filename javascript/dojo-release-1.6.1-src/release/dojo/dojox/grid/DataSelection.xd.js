/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.DataSelection"],["require","dojox.grid.Selection"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.DataSelection"]){_4._hasResource["dojox.grid.DataSelection"]=true;_4.provide("dojox.grid.DataSelection");_4.require("dojox.grid.Selection");_4.declare("dojox.grid.DataSelection",_6.grid.Selection,{getFirstSelected:function(){var _7=_6.grid.Selection.prototype.getFirstSelected.call(this);if(_7==-1){return null;}return this.grid.getItem(_7);},getNextSelected:function(_8){var _9=this.grid.getItemIndex(_8);var _a=_6.grid.Selection.prototype.getNextSelected.call(this,_9);if(_a==-1){return null;}return this.grid.getItem(_a);},getSelected:function(){var _b=[];for(var i=0,l=this.selected.length;i<l;i++){if(this.selected[i]){_b.push(this.grid.getItem(i));}}return _b;},addToSelection:function(_c){if(this.mode=="none"){return;}var _d=null;if(typeof _c=="number"||typeof _c=="string"){_d=_c;}else{_d=this.grid.getItemIndex(_c);}_6.grid.Selection.prototype.addToSelection.call(this,_d);},deselect:function(_e){if(this.mode=="none"){return;}var _f=null;if(typeof _e=="number"||typeof _e=="string"){_f=_e;}else{_f=this.grid.getItemIndex(_e);}_6.grid.Selection.prototype.deselect.call(this,_f);},deselectAll:function(_10){var idx=null;if(_10||typeof _10=="number"){if(typeof _10=="number"||typeof _10=="string"){idx=_10;}else{idx=this.grid.getItemIndex(_10);}_6.grid.Selection.prototype.deselectAll.call(this,idx);}else{this.inherited(arguments);}}});}}};});