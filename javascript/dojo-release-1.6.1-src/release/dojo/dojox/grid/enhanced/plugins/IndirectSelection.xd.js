/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.IndirectSelection"],["require","dojo.string"],["require","dojox.grid.cells.dijit"],["require","dojox.grid.enhanced._Plugin"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.IndirectSelection"]){_4._hasResource["dojox.grid.enhanced.plugins.IndirectSelection"]=true;_4.provide("dojox.grid.enhanced.plugins.IndirectSelection");_4.require("dojo.string");_4.require("dojox.grid.cells.dijit");_4.require("dojox.grid.enhanced._Plugin");_4.declare("dojox.grid.enhanced.plugins.IndirectSelection",_6.grid.enhanced._Plugin,{name:"indirectSelection",constructor:function(){var _7=this.grid.layout;this.connect(_7,"setStructure",_4.hitch(_7,this.addRowSelectCell,this.option));},addRowSelectCell:function(_8){if(!this.grid.indirectSelection||this.grid.selectionMode=="none"){return;}var _9=false,_a=["get","formatter","field","fields"],_b={type:_6.grid.cells.MultipleRowSelector,name:"",width:"30px",styles:"text-align: center;"};if(_8.headerSelector){_8.name="";}if(this.grid.rowSelectCell){this.grid.rowSelectCell.destroy();}_4.forEach(this.structure,function(_c){var _d=_c.cells;if(_d&&_d.length>0&&!_9){var _e=_d[0];if(_e[0]&&_e[0].isRowSelector){console.debug("addRowSelectCell() - row selector cells already added, return.");_9=true;return;}var _f,_10=this.grid.selectionMode=="single"?_6.grid.cells.SingleRowSelector:_6.grid.cells.MultipleRowSelector;_f=_4.mixin(_b,_8,{type:_10,editable:false,notselectable:true,filterable:false,navigatable:true,nosort:true});_4.forEach(_a,function(_11){if(_11 in _f){delete _f[_11];}});if(_d.length>1){_f.rowSpan=_d.length;}_4.forEach(this.cells,function(_12,i){if(_12.index>=0){_12.index+=1;}else{console.warn("Error:IndirectSelection.addRowSelectCell()-  cell "+i+" has no index!");}});var _13=this.addCellDef(0,0,_f);_13.index=0;_e.unshift(_13);this.cells.unshift(_13);this.grid.rowSelectCell=_13;_9=true;}},this);this.cellCount=this.cells.length;},destroy:function(){this.grid.rowSelectCell.destroy();delete this.grid.rowSelectCell;this.inherited(arguments);}});_4.declare("dojox.grid.cells.RowSelector",_6.grid.cells._Widget,{inputType:"",map:null,disabledMap:null,isRowSelector:true,_connects:null,_subscribes:null,checkedText:"&#8730;",unCheckedText:"O",constructor:function(){this.map={};this.disabledMap={},this.disabledCount=0;this._connects=[];this._subscribes=[];this.inA11YMode=_4.hasClass(_4.body(),"dijit_a11y");this.baseClass="dojoxGridRowSelector dijitReset dijitInline dijit"+this.inputType;this.checkedClass=" dijit"+this.inputType+"Checked";this.disabledClass=" dijit"+this.inputType+"Disabled";this.checkedDisabledClass=" dijit"+this.inputType+"CheckedDisabled";this.statusTextClass=" dojoxGridRowSelectorStatusText";this._connects.push(_4.connect(this.grid,"dokeyup",this,"_dokeyup"));this._connects.push(_4.connect(this.grid.selection,"onSelected",this,"_onSelected"));this._connects.push(_4.connect(this.grid.selection,"onDeselected",this,"_onDeselected"));this._connects.push(_4.connect(this.grid.scroller,"invalidatePageNode",this,"_pageDestroyed"));this._connects.push(_4.connect(this.grid,"onCellClick",this,"_onClick"));this._connects.push(_4.connect(this.grid,"updateRow",this,"_onUpdateRow"));},formatter:function(_14,_15){var _16=this.baseClass;var _17=this.getValue(_15);var _18=!!this.disabledMap[_15];if(_17){_16+=this.checkedClass;if(_18){_16+=this.checkedDisabledClass;}}else{if(_18){_16+=this.disabledClass;}}return ["<div tabindex = -1 ","id = '"+this.grid.id+"_rowSelector_"+_15+"' ","name = '"+this.grid.id+"_rowSelector' class = '"+_16+"' ","role = 'presentation' aria-pressed = '"+_17+"' aria-disabled = '"+_18+"' aria-label = '"+_4.string.substitute(this.grid._nls["indirectSelection"+this.inputType],[_15+1])+"'>","<span class = '"+this.statusTextClass+"'>"+(_17?this.checkedText:this.unCheckedText)+"</span>","</div>"].join("");},setValue:function(_19,_1a){},getValue:function(_1b){return this.grid.selection.isSelected(_1b);},toggleRow:function(_1c,_1d){this._nativeSelect(_1c,_1d);},setDisabled:function(_1e,_1f){if(_1e<0){return;}this._toggleDisabledStyle(_1e,_1f);},disabled:function(_20){return !!this.disabledMap[_20];},_onClick:function(e){if(e.cell===this){this._selectRow(e);}},_dokeyup:function(e){if(e.cellIndex==this.index&&e.rowIndex>=0&&e.keyCode==_4.keys.SPACE){this._selectRow(e);}},focus:function(_21){var _22=this.map[_21];if(_22){_22.focus();}},_focusEndingCell:function(_23,_24){var _25=this.grid.getCell(_24);this.grid.focus.setFocusCell(_25,_23);},_nativeSelect:function(_26,_27){this.grid.selection[_27?"select":"deselect"](_26);},_onSelected:function(_28){this._toggleCheckedStyle(_28,true);},_onDeselected:function(_29){this._toggleCheckedStyle(_29,false);},_onUpdateRow:function(_2a){delete this.map[_2a];},_toggleCheckedStyle:function(_2b,_2c){var _2d=this._getSelector(_2b);if(_2d){_4.toggleClass(_2d,this.checkedClass,_2c);if(this.disabledMap[_2b]){_4.toggleClass(_2d,this.checkedDisabledClass,_2c);}_5.setWaiState(_2d,"pressed",_2c);if(this.inA11YMode){_4.attr(_2d.firstChild,"innerHTML",_2c?this.checkedText:this.unCheckedText);}}},_toggleDisabledStyle:function(_2e,_2f){var _30=this._getSelector(_2e);if(_30){_4.toggleClass(_30,this.disabledClass,_2f);if(this.getValue(_2e)){_4.toggleClass(_30,this.checkedDisabledClass,_2f);}_5.setWaiState(_30,"disabled",_2f);}this.disabledMap[_2e]=_2f;if(_2e>=0){this.disabledCount+=_2f?1:-1;}},_getSelector:function(_31){var _32=this.map[_31];if(!_32){var _33=this.view.rowNodes[_31];if(_33){_32=_4.query(".dojoxGridRowSelector",_33)[0];if(_32){this.map[_31]=_32;}}}return _32;},_pageDestroyed:function(_34){var _35=this.grid.scroller.rowsPerPage;var _36=_34*_35,end=_36+_35-1;for(var i=_36;i<=end;i++){if(!this.map[i]){continue;}_4.destroy(this.map[i]);delete this.map[i];}},destroy:function(){for(var i in this.map){_4.destroy(this.map[i]);delete this.map[i];}for(i in this.disabledMap){delete this.disabledMap[i];}_4.forEach(this._connects,_4.disconnect);_4.forEach(this._subscribes,_4.unsubscribe);delete this._connects;delete this._subscribes;}});_4.declare("dojox.grid.cells.SingleRowSelector",_6.grid.cells.RowSelector,{inputType:"Radio",_selectRow:function(e){var _37=e.rowIndex;if(this.disabledMap[_37]){return;}this._focusEndingCell(_37,0);this._nativeSelect(_37,!this.grid.selection.selected[_37]);}});_4.declare("dojox.grid.cells.MultipleRowSelector",_6.grid.cells.RowSelector,{inputType:"CheckBox",swipeStartRowIndex:-1,swipeMinRowIndex:-1,swipeMaxRowIndex:-1,toSelect:false,lastClickRowIdx:-1,toggleAllTrigerred:false,unCheckedText:"&#9633;",constructor:function(){this._connects.push(_4.connect(_4.doc,"onmouseup",this,"_domouseup"));this._connects.push(_4.connect(this.grid,"onRowMouseOver",this,"_onRowMouseOver"));this._connects.push(_4.connect(this.grid.focus,"move",this,"_swipeByKey"));this._connects.push(_4.connect(this.grid,"onCellMouseDown",this,"_onMouseDown"));if(this.headerSelector){this._connects.push(_4.connect(this.grid.views,"render",this,"_addHeaderSelector"));this._connects.push(_4.connect(this.grid,"onSelectionChanged",this,"_onSelectionChanged"));this._connects.push(_4.connect(this.grid,"onKeyDown",this,function(e){if(e.rowIndex==-1&&e.cellIndex==this.index&&e.keyCode==_4.keys.SPACE){this._toggletHeader();}}));}},toggleAllSelection:function(_38){var _39=this.grid,_3a=_39.selection;if(_38){_3a.selectRange(0,_39.rowCount-1);}else{_3a.deselectAll();}this.toggleAllTrigerred=true;},_onMouseDown:function(e){if(e.cell==this){this._startSelection(e.rowIndex);_4.stopEvent(e);}},_onRowMouseOver:function(e){this._updateSelection(e,0);},_domouseup:function(e){if(_4.isIE){this.view.content.decorateEvent(e);}var _3b=e.cellIndex>=0&&this.inSwipeSelection()&&!this.grid.edit.isEditRow(e.rowIndex);if(_3b){this._focusEndingCell(e.rowIndex,e.cellIndex);}this._finishSelect();},_dokeyup:function(e){this.inherited(arguments);if(!e.shiftKey){this._finishSelect();}},_startSelection:function(_3c){this.swipeStartRowIndex=this.swipeMinRowIndex=this.swipeMaxRowIndex=_3c;this.toSelect=!this.getValue(_3c);},_updateSelection:function(e,_3d){if(!this.inSwipeSelection()){return;}var _3e=_3d!==0;var _3f=e.rowIndex,_40=_3f-this.swipeStartRowIndex+_3d;if(_40>0&&this.swipeMaxRowIndex<_3f+_3d){this.swipeMaxRowIndex=_3f+_3d;}if(_40<0&&this.swipeMinRowIndex>_3f+_3d){this.swipeMinRowIndex=_3f+_3d;}var min=_40>0?this.swipeStartRowIndex:_3f+_3d;var max=_40>0?_3f+_3d:this.swipeStartRowIndex;for(var i=this.swipeMinRowIndex;i<=this.swipeMaxRowIndex;i++){if(this.disabledMap[i]||i<0){continue;}if(i>=min&&i<=max){this._nativeSelect(i,this.toSelect);}else{if(!_3e){this._nativeSelect(i,!this.toSelect);}}}},_swipeByKey:function(_41,_42,e){if(!e||_41===0||!e.shiftKey||e.cellIndex!=this.index||this.grid.focus.rowIndex<0){return;}var _43=e.rowIndex;if(this.swipeStartRowIndex<0){this.swipeStartRowIndex=_43;if(_41>0){this.swipeMaxRowIndex=_43+_41;this.swipeMinRowIndex=_43;}else{this.swipeMinRowIndex=_43+_41;this.swipeMaxRowIndex=_43;}this.toSelect=this.getValue(_43);}this._updateSelection(e,_41);},_finishSelect:function(){this.swipeStartRowIndex=-1;this.swipeMinRowIndex=-1;this.swipeMaxRowIndex=-1;this.toSelect=false;},inSwipeSelection:function(){return this.swipeStartRowIndex>=0;},_nativeSelect:function(_44,_45){this.grid.selection[_45?"addToSelection":"deselect"](_44);},_selectRow:function(e){var _46=e.rowIndex;if(this.disabledMap[_46]){return;}_4.stopEvent(e);this._focusEndingCell(_46,0);var _47=_46-this.lastClickRowIdx;var _48=!this.grid.selection.selected[_46];if(this.lastClickRowIdx>=0&&!e.ctrlKey&&!e.altKey&&e.shiftKey){var min=_47>0?this.lastClickRowIdx:_46;var max=_47>0?_46:this.lastClickRowIdx;for(var i=min;i>=0&&i<=max;i++){this._nativeSelect(i,_48);}}else{this._nativeSelect(_46,_48);}this.lastClickRowIdx=_46;},getValue:function(_49){if(_49==-1){var g=this.grid;return g.rowCount>0&&g.rowCount<=g.selection.getSelectedCount();}return this.inherited(arguments);},_addHeaderSelector:function(){var _4a=this.view.getHeaderCellNode(this.index);if(!_4a){return;}_4.empty(_4a);var g=this.grid;var _4b=_4a.appendChild(_4.create("div",{"tabindex":-1,"id":g.id+"_rowSelector_-1","class":this.baseClass,"role":"presentation","innerHTML":"<span class = '"+this.statusTextClass+"'></span><span style='height: 0; width: 0; overflow: hidden; display: block;'>"+g._nls["selectAll"]+"</span>"}));this.map[-1]=_4b;var idx=this._headerSelectorConnectIdx;if(idx!==undefined){_4.disconnect(this._connects[idx]);this._connects.splice(idx,1);}this._headerSelectorConnectIdx=this._connects.length;this._connects.push(_4.connect(_4b,"onclick",this,"_toggletHeader"));this._onSelectionChanged();},_toggletHeader:function(){if(!!this.disabledMap[-1]){return;}this.grid._selectingRange=true;this.toggleAllSelection(!this.getValue(-1));this._onSelectionChanged();this.grid._selectingRange=false;},_onSelectionChanged:function(){var g=this.grid;if(!this.map[-1]||g._selectingRange){return;}this._toggleCheckedStyle(-1,this.getValue(-1));},_toggleDisabledStyle:function(_4c,_4d){this.inherited(arguments);if(this.headerSelector){var _4e=(this.grid.rowCount==this.disabledCount);if(_4e!=!!this.disabledMap[-1]){arguments[0]=-1;arguments[1]=_4e;this.inherited(arguments);}}}});_6.grid.EnhancedGrid.registerPlugin(_6.grid.enhanced.plugins.IndirectSelection,{"preInit":true});}}};});