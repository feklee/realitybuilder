/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.TreeGrid"],["require","dojox.grid.DataGrid"],["require","dojox.grid._TreeView"],["require","dojox.grid.cells.tree"],["require","dojox.grid.TreeSelection"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.TreeGrid"]){_4._hasResource["dojox.grid.TreeGrid"]=true;_4.experimental("dojox.grid.TreeGrid");_4.provide("dojox.grid.TreeGrid");_4.require("dojox.grid.DataGrid");_4.require("dojox.grid._TreeView");_4.require("dojox.grid.cells.tree");_4.require("dojox.grid.TreeSelection");_4.declare("dojox.grid._TreeAggregator",null,{cells:[],grid:null,childFields:[],constructor:function(_7){this.cells=_7.cells||[];this.childFields=_7.childFields||[];this.grid=_7.grid;this.store=this.grid.store;},_cacheValue:function(_8,id,_9){_8[id]=_9;return _9;},clearSubtotalCache:function(){if(this.store){delete this.store._cachedAggregates;}},cnt:function(_a,_b,_c){var _d=0;var _e=this.store;var _f=this.childFields;if(_f[_b]){var _10=_e.getValues(_c,_f[_b]);if(_a.index<=_b+1){_d=_10.length;}else{_4.forEach(_10,function(c){_d+=this.getForCell(_a,_b+1,c,"cnt");},this);}}else{_d=1;}return _d;},sum:function(_11,_12,_13){var _14=0;var _15=this.store;var _16=this.childFields;if(_16[_12]){_4.forEach(_15.getValues(_13,_16[_12]),function(c){_14+=this.getForCell(_11,_12+1,c,"sum");},this);}else{_14+=_15.getValue(_13,_11.field);}return _14;},value:function(_17,_18,_19){},getForCell:function(_1a,_1b,_1c,_1d){var _1e=this.store;if(!_1e||!_1c||!_1e.isItem(_1c)){return "";}var _1f=_1e._cachedAggregates=_1e._cachedAggregates||{};var id=_1e.getIdentity(_1c);var _20=_1f[id]=_1f[id]||[];if(!_1a.getOpenState){_1a=this.grid.getCell(_1a.layoutIndex+_1b+1);}var idx=_1a.index;var _21=_20[idx]=_20[idx]||{};_1d=(_1d||(_1a.parentCell?_1a.parentCell.aggregate:"sum"))||"sum";var _22=_1a.field;if(_22==_1e.getLabelAttributes()[0]){_1d="cnt";}var _23=_21[_1d]=_21[_1d]||[];if(_23[_1b]!=undefined){return _23[_1b];}var _24=((_1a.parentCell&&_1a.parentCell.itemAggregates)?_1a.parentCell.itemAggregates[_1a.idxInParent]:"")||"";if(_24&&_1e.hasAttribute(_1c,_24)){return this._cacheValue(_23,_1b,_1e.getValue(_1c,_24));}else{if(_24){return this._cacheValue(_23,_1b,0);}}return this._cacheValue(_23,_1b,this[_1d](_1a,_1b,_1c));}});_4.declare("dojox.grid._TreeLayout",_6.grid._Layout,{_isCollapsable:false,_getInternalStructure:function(_25){var g=this.grid;var s=_25;var _26=s[0].cells[0];var _27={type:"dojox.grid._TreeView",cells:[[]]};var _28=[];var _29=0;var _2a=function(_2b,_2c){var _2d=_2b.children;var _2e=function(_2f,idx){var k,n={};for(k in _2f){n[k]=_2f[k];}n=_4.mixin(n,{level:_2c,idxInParent:_2c>0?idx:-1,parentCell:_2c>0?_2b:null});return n;};var ret=[];_4.forEach(_2d,function(c,idx){if("children" in c){_28.push(c.field);var _30=ret[ret.length-1];_30.isCollapsable=true;c.level=_2c;ret=ret.concat(_2a(c,_2c+1));}else{ret.push(_2e(c,idx));}});_29=Math.max(_29,_2c);return ret;};var _31={children:_26,itemAggregates:[]};_27.cells[0]=_2a(_31,0);g.aggregator=new _6.grid._TreeAggregator({cells:_27.cells[0],grid:g,childFields:_28});if(g.scroller&&g.defaultOpen){g.scroller.defaultRowHeight=g.scroller._origDefaultRowHeight*(2*_29+1);}return [_27];},setStructure:function(_32){var s=_32;var g=this.grid;if(g&&g.treeModel&&!_4.every(s,function(i){return ("cells" in i);})){s=arguments[0]=[{cells:[s]}];}if(s.length==1&&s[0].cells.length==1){if(g&&g.treeModel){s[0].type="dojox.grid._TreeView";this._isCollapsable=true;s[0].cells[0][(this.grid.treeModel?this.grid.expandoCell:0)].isCollapsable=true;}else{var _33=_4.filter(s[0].cells[0],function(c){return ("children" in c);});if(_33.length===1){this._isCollapsable=true;}}}if(this._isCollapsable&&(!g||!g.treeModel)){arguments[0]=this._getInternalStructure(s);}this.inherited(arguments);},addCellDef:function(_34,_35,_36){var obj=this.inherited(arguments);return _4.mixin(obj,_6.grid.cells.TreeCell);}});_4.declare("dojox.grid.TreePath",null,{level:0,_str:"",_arr:null,grid:null,store:null,cell:null,item:null,constructor:function(_37,_38){if(_4.isString(_37)){this._str=_37;this._arr=_4.map(_37.split("/"),function(_39){return parseInt(_39,10);});}else{if(_4.isArray(_37)){this._str=_37.join("/");this._arr=_37.slice(0);}else{if(typeof _37=="number"){this._str=String(_37);this._arr=[_37];}else{this._str=_37._str;this._arr=_37._arr.slice(0);}}}this.level=this._arr.length-1;this.grid=_38;this.store=this.grid.store;if(_38.treeModel){this.cell=_38.layout.cells[_38.expandoCell];}else{this.cell=_38.layout.cells[this.level];}},item:function(){if(!this._item){this._item=this.grid.getItem(this._arr);}return this._item;},compare:function(_3a){if(_4.isString(_3a)||_4.isArray(_3a)){if(this._str==_3a){return 0;}if(_3a.join&&this._str==_3a.join("/")){return 0;}_3a=new _6.grid.TreePath(_3a,this.grid);}else{if(_3a instanceof _6.grid.TreePath){if(this._str==_3a._str){return 0;}}}for(var i=0,l=(this._arr.length<_3a._arr.length?this._arr.length:_3a._arr.length);i<l;i++){if(this._arr[i]<_3a._arr[i]){return -1;}if(this._arr[i]>_3a._arr[i]){return 1;}}if(this._arr.length<_3a._arr.length){return -1;}if(this._arr.length>_3a._arr.length){return 1;}return 0;},isOpen:function(){return this.cell.openStates&&this.cell.getOpenState(this.item());},previous:function(){var _3b=this._arr.slice(0);if(this._str=="0"){return null;}var _3c=_3b.length-1;if(_3b[_3c]===0){_3b.pop();return new _6.grid.TreePath(_3b,this.grid);}_3b[_3c]--;var _3d=new _6.grid.TreePath(_3b,this.grid);return _3d.lastChild(true);},next:function(){var _3e=this._arr.slice(0);if(this.isOpen()){_3e.push(0);}else{_3e[_3e.length-1]++;for(var i=this.level;i>=0;i--){var _3f=this.grid.getItem(_3e.slice(0,i+1));if(i>0){if(!_3f){_3e.pop();_3e[i-1]++;}}else{if(!_3f){return null;}}}}return new _6.grid.TreePath(_3e,this.grid);},children:function(_40){if(!this.isOpen()&&!_40){return null;}var _41=[];var _42=this.grid.treeModel;if(_42){var _43=this.item();var _44=_42.store;if(!_42.mayHaveChildren(_43)){return null;}_4.forEach(_42.childrenAttrs,function(_45){_41=_41.concat(_44.getValues(_43,_45));});}else{_41=this.store.getValues(this.item(),this.grid.layout.cells[this.cell.level+1].parentCell.field);if(_41.length>1&&this.grid.sortChildItems){var _46=this.grid.getSortProps();if(_46&&_46.length){var _47=_46[0].attribute,_48=this.grid;if(_47&&_41[0][_47]){var _49=!!_46[0].descending;_41=_41.slice(0);_41.sort(function(a,b){return _48._childItemSorter(a,b,_47,_49);});}}}}return _41;},childPaths:function(){var _4a=this.children();if(!_4a){return [];}return _4.map(_4a,function(_4b,_4c){return new _6.grid.TreePath(this._str+"/"+_4c,this.grid);},this);},parent:function(){if(this.level===0){return null;}return new _6.grid.TreePath(this._arr.slice(0,this.level),this.grid);},lastChild:function(_4d){var _4e=this.children();if(!_4e||!_4e.length){return this;}var _4f=new _6.grid.TreePath(this._str+"/"+String(_4e.length-1),this.grid);if(!_4d){return _4f;}return _4f.lastChild(true);},toString:function(){return this._str;}});_4.declare("dojox.grid._TreeFocusManager",_6.grid._FocusManager,{setFocusCell:function(_50,_51){if(_50&&_50.getNode(_51)){this.inherited(arguments);}},isLastFocusCell:function(){if(this.cell&&this.cell.index==this.grid.layout.cellCount-1){var _52=new _6.grid.TreePath(this.grid.rowCount-1,this.grid);_52=_52.lastChild(true);return this.rowIndex==_52._str;}return false;},next:function(){if(this.cell){var row=this.rowIndex,col=this.cell.index+1,cc=this.grid.layout.cellCount-1;var _53=new _6.grid.TreePath(this.rowIndex,this.grid);if(col>cc){var _54=_53.next();if(!_54){col--;}else{col=0;_53=_54;}}if(this.grid.edit.isEditing()){var _55=this.grid.getCell(col);if(!this.isLastFocusCell()&&!_55.editable){this._focusifyCellNode(false);this.cell=_55;this.rowIndex=_53._str;this.next();return;}}this.setFocusIndex(_53._str,col);}},previous:function(){if(this.cell){var row=(this.rowIndex||0),col=(this.cell.index||0)-1;var _56=new _6.grid.TreePath(row,this.grid);if(col<0){var _57=_56.previous();if(!_57){col=0;}else{col=this.grid.layout.cellCount-1;_56=_57;}}if(this.grid.edit.isEditing()){var _58=this.grid.getCell(col);if(!this.isFirstFocusCell()&&!_58.editable){this._focusifyCellNode(false);this.cell=_58;this.rowIndex=_56._str;this.previous();return;}}this.setFocusIndex(_56._str,col);}},move:function(_59,_5a){if(this.isNavHeader()){this.inherited(arguments);return;}if(!this.cell){return;}var sc=this.grid.scroller,r=this.rowIndex,rc=this.grid.rowCount-1,_5b=new _6.grid.TreePath(this.rowIndex,this.grid);if(_59){var row;if(_59>0){_5b=_5b.next();row=_5b._arr[0];if(row>sc.getLastPageRow(sc.page)){this.grid.setScrollTop(this.grid.scrollTop+sc.findScrollTop(row)-sc.findScrollTop(r));}}else{if(_59<0){_5b=_5b.previous();row=_5b._arr[0];if(row<=sc.getPageRow(sc.page)){this.grid.setScrollTop(this.grid.scrollTop-sc.findScrollTop(r)-sc.findScrollTop(row));}}}}var cc=this.grid.layout.cellCount-1,i=this.cell.index,col=Math.min(cc,Math.max(0,i+_5a));var _5c=this.grid.getCell(col);var _5d=_5a<0?-1:1;while(col>=0&&col<cc&&_5c&&_5c.hidden===true){col+=_5d;_5c=this.grid.getCell(col);}if(!_5c||_5c.hidden===true){col=i;}if(_59){this.grid.updateRow(r);}this.setFocusIndex(_5b._str,col);}});_4.declare("dojox.grid.TreeGrid",_6.grid.DataGrid,{defaultOpen:true,sortChildItems:false,openAtLevels:[],treeModel:null,expandoCell:0,aggregator:null,_layoutClass:_6.grid._TreeLayout,createSelection:function(){this.selection=new _6.grid.TreeSelection(this);},_childItemSorter:function(a,b,_5e,_5f){var av=this.store.getValue(a,_5e);var bv=this.store.getValue(b,_5e);if(av!=bv){return av<bv==_5f?1:-1;}return 0;},_onNew:function(_60,_61){if(!_61||!_61.item){this.inherited(arguments);}else{var idx=this.getItemIndex(_61.item);if(typeof idx=="string"){this.updateRow(idx.split("/")[0]);}else{if(idx>-1){this.updateRow(idx);}}}},_onSet:function(_62,_63,_64,_65){this._checkUpdateStatus();if(this.aggregator){this.aggregator.clearSubtotalCache();}var idx=this.getItemIndex(_62);if(typeof idx=="string"){this.updateRow(idx.split("/")[0]);}else{if(idx>-1){this.updateRow(idx);}}},_onDelete:function(_66){this._cleanupExpandoCache(this._getItemIndex(_66,true),this.store.getIdentity(_66),_66);this.inherited(arguments);},_cleanupExpandoCache:function(_67,_68,_69){},_addItem:function(_6a,_6b,_6c,_6d){if(!_6d&&this.model&&_4.indexOf(this.model.root.children,_6a)==-1){this.model.root.children[_6b]=_6a;}this.inherited(arguments);},getItem:function(idx){var _6e=_4.isArray(idx);if(_4.isString(idx)&&idx.indexOf("/")){idx=idx.split("/");_6e=true;}if(_6e&&idx.length==1){idx=idx[0];_6e=false;}if(!_6e){return _6.grid.DataGrid.prototype.getItem.call(this,idx);}var s=this.store;var itm=_6.grid.DataGrid.prototype.getItem.call(this,idx[0]);var cf,i,j;if(this.aggregator){cf=this.aggregator.childFields||[];if(cf){for(i=0;i<idx.length-1&&itm;i++){if(cf[i]){itm=(s.getValues(itm,cf[i])||[])[idx[i+1]];}else{itm=null;}}}}else{if(this.treeModel){cf=this.treeModel.childrenAttrs||[];if(cf&&itm){for(i=1,il=idx.length;(i<il)&&itm;i++){for(j=0,jl=cf.length;j<jl;j++){if(cf[j]){itm=(s.getValues(itm,cf[j])||[])[idx[i]];}else{itm=null;}if(itm){break;}}}}}}return itm||null;},_getItemIndex:function(_6f,_70){if(!_70&&!this.store.isItem(_6f)){return -1;}var idx=this.inherited(arguments);if(idx==-1){var _71=this.store.getIdentity(_6f);return this._by_idty_paths[_71]||-1;}return idx;},postMixInProperties:function(){if(this.treeModel&&!("defaultOpen" in this.params)){this.defaultOpen=false;}var def=this.defaultOpen;this.openAtLevels=_4.map(this.openAtLevels,function(l){if(typeof l=="string"){switch(l.toLowerCase()){case "true":return true;break;case "false":return false;break;default:var r=parseInt(l,10);if(isNaN(r)){return def;}return r;break;}}return l;});this._by_idty_paths={};this.inherited(arguments);},postCreate:function(){this.inherited(arguments);if(this.treeModel){this._setModel(this.treeModel);}},setModel:function(_72){this._setModel(_72);this._refresh(true);},_setModel:function(_73){if(_73&&(!_5.tree.ForestStoreModel||!(_73 instanceof _5.tree.ForestStoreModel))){throw new Error("dojox.grid.TreeGrid: treeModel must be an instance of dijit.tree.ForestStoreModel");}this.treeModel=_73;_4.toggleClass(this.domNode,"dojoxGridTreeModel",this.treeModel?true:false);this._setQuery(_73?_73.query:null);this._setStore(_73?_73.store:null);},createScroller:function(){this.inherited(arguments);this.scroller._origDefaultRowHeight=this.scroller.defaultRowHeight;},createManagers:function(){this.rows=new _6.grid._RowManager(this);this.focus=new _6.grid._TreeFocusManager(this);this.edit=new _6.grid._EditManager(this);},_setStore:function(_74){this.inherited(arguments);if(this.treeModel&&!this.treeModel.root.children){this.treeModel.root.children=[];}if(this.aggregator){this.aggregator.store=_74;}},getDefaultOpenState:function(_75,_76){var cf;var _77=this.store;if(this.treeModel){return this.defaultOpen;}if(!_75||!_77||!_77.isItem(_76)||!(cf=this.aggregator.childFields[_75.level])){return this.defaultOpen;}if(this.openAtLevels.length>_75.level){var _78=this.openAtLevels[_75.level];if(typeof _78=="boolean"){return _78;}else{if(typeof _78=="number"){return (_77.getValues(_76,cf).length<=_78);}}}return this.defaultOpen;},onStyleRow:function(row){if(!this.layout._isCollapsable){this.inherited(arguments);return;}var _79=_4.attr(row.node,"dojoxTreeGridBaseClasses");if(_79){row.customClasses=_79;}var i=row;var _7a=i.node.tagName.toLowerCase();i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected&&_7a=="tr"?" dojoxGridRowSelected":"")+(i.over&&_7a=="tr"?" dojoxGridRowOver":"");this.focus.styleRow(i);this.edit.styleRow(i);},styleRowNode:function(_7b,_7c){if(_7c){if(_7c.tagName.toLowerCase()=="div"&&this.aggregator){_4.query("tr[dojoxTreeGridPath]",_7c).forEach(function(_7d){this.rows.styleRowNode(_4.attr(_7d,"dojoxTreeGridPath"),_7d);},this);}this.rows.styleRowNode(_7b,_7c);}},onCanSelect:function(_7e){var _7f=_4.query("tr[dojoxTreeGridPath='"+_7e+"']",this.domNode);if(_7f.length){if(_4.hasClass(_7f[0],"dojoxGridSummaryRow")){return false;}}return this.inherited(arguments);},onKeyDown:function(e){if(e.altKey||e.metaKey){return;}var dk=_4.keys;switch(e.keyCode){case dk.UP_ARROW:if(!this.edit.isEditing()&&this.focus.rowIndex!="0"){_4.stopEvent(e);this.focus.move(-1,0);}break;case dk.DOWN_ARROW:var _80=new _6.grid.TreePath(this.focus.rowIndex,this);var _81=new _6.grid.TreePath(this.rowCount-1,this);_81=_81.lastChild(true);if(!this.edit.isEditing()&&_80.toString()!=_81.toString()){_4.stopEvent(e);this.focus.move(1,0);}break;default:this.inherited(arguments);break;}},canEdit:function(_82,_83){var _84=_82.getNode(_83);return _84&&this._canEdit;},doApplyCellEdit:function(_85,_86,_87){var _88=this.getItem(_86);var _89=this.store.getValue(_88,_87);if(typeof _89=="number"){_85=isNaN(_85)?_85:parseFloat(_85);}else{if(typeof _89=="boolean"){_85=_85=="true"?true:_85=="false"?false:_85;}else{if(_89 instanceof Date){var _8a=new Date(_85);_85=isNaN(_8a.getTime())?_85:_8a;}}}this.store.setValue(_88,_87,_85);this.onApplyCellEdit(_85,_86,_87);}});_6.grid.TreeGrid.markupFactory=function(_8b,_8c,_8d,_8e){var d=_4;var _8f=function(n){var w=d.attr(n,"width")||"auto";if((w!="auto")&&(w.slice(-2)!="em")&&(w.slice(-1)!="%")){w=parseInt(w,10)+"px";}return w;};var _90=function(_91){var _92;if(_91.nodeName.toLowerCase()=="table"&&d.query("> colgroup",_91).length===0&&(_92=d.query("> thead > tr",_91)).length==1){var tr=_92[0];return d.query("> th",_92[0]).map(function(th){var _93={type:d.trim(d.attr(th,"cellType")||""),field:d.trim(d.attr(th,"field")||"")};if(_93.type){_93.type=d.getObject(_93.type);}var _94=d.query("> table",th)[0];if(_94){_93.name="";_93.children=_90(_94);if(d.hasAttr(th,"itemAggregates")){_93.itemAggregates=d.map(d.attr(th,"itemAggregates").split(","),function(v){return d.trim(v);});}else{_93.itemAggregates=[];}if(d.hasAttr(th,"aggregate")){_93.aggregate=d.attr(th,"aggregate");}_93.type=_93.type||_6.grid.cells.SubtableCell;}else{_93.name=d.trim(d.attr(th,"name")||th.innerHTML);if(d.hasAttr(th,"width")){_93.width=_8f(th);}if(d.hasAttr(th,"relWidth")){_93.relWidth=window.parseInt(d.attr(th,"relWidth"),10);}if(d.hasAttr(th,"hidden")){_93.hidden=d.attr(th,"hidden")=="true";}_93.field=_93.field||_93.name;_6.grid.DataGrid.cell_markupFactory(_8e,th,_93);_93.type=_93.type||_6.grid.cells.Cell;}if(_93.type&&_93.type.markupFactory){_93.type.markupFactory(th,_93);}return _93;});}return [];};var _95;if(!_8b.structure){var row=_90(_8c);if(row.length){_8b.structure=[{__span:Infinity,cells:[row]}];}}return _6.grid.DataGrid.markupFactory(_8b,_8c,_8d,_8e);};}}};});