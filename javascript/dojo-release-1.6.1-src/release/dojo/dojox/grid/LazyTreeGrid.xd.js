/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.LazyTreeGrid"],["require","dojox.grid._View"],["require","dojox.grid.TreeGrid"],["require","dojox.grid.cells.tree"],["require","dojox.grid.LazyTreeGridStoreModel"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.LazyTreeGrid"]){_4._hasResource["dojox.grid.LazyTreeGrid"]=true;_4.provide("dojox.grid.LazyTreeGrid");_4.require("dojox.grid._View");_4.require("dojox.grid.TreeGrid");_4.require("dojox.grid.cells.tree");_4.require("dojox.grid.LazyTreeGridStoreModel");_4.declare("dojox.grid._LazyExpando",[_5._Widget,_5._Templated],{itemId:"",cellIdx:-1,view:null,rowIdx:-1,expandoCell:null,level:0,open:false,templateString:"<div class=\"dojoxGridExpando\"\r\n\t><div class=\"dojoxGridExpandoNode\" dojoAttachEvent=\"onclick:onToggle\"\r\n\t\t><div class=\"dojoxGridExpandoNodeInner\" dojoAttachPoint=\"expandoInner\"></div\r\n\t></div\r\n></div>\r\n",onToggle:function(_7){this.setOpen(!this.view.grid.cache.getExpandoStatusByRowIndex(this.rowIdx));try{_4.stopEvent(_7);}catch(e){}},setOpen:function(_8){var g=this.view.grid,_9=g.cache.getItemByRowIndex(this.rowIdx);if(!g.treeModel.mayHaveChildren(_9)){g.stateChangeNode=null;return;}if(_9&&!g._loading){g.stateChangeNode=this.domNode;g.cache.updateCache(this.rowIdx,{"expandoStatus":_8});g.expandoFetch(this.rowIdx,_8);this.open=_8;}this._updateOpenState(_9);},_updateOpenState:function(_a){var _b=this.view.grid;if(_a&&_b.treeModel.mayHaveChildren(_a)){var _c=_b.cache.getExpandoStatusByRowIndex(this.rowIdx);this.expandoInner.innerHTML=_c?"-":"+";_4.toggleClass(this.domNode,"dojoxGridExpandoOpened",_c);_5.setWaiState(this.domNode.parentNode,"expanded",_c);}},setRowNode:function(_d,_e,_f){if(this.cellIdx<0||!this.itemId){return false;}this._initialized=false;this.view=_f;this.rowIdx=_d;this.expandoCell=_f.structure.cells[0][this.cellIdx];var d=this.domNode;if(d&&d.parentNode&&d.parentNode.parentNode){this._tableRow=d.parentNode.parentNode;}_4.style(this.domNode,"marginLeft",(this.level*1.125)+"em");this._updateOpenState(_f.grid.cache.getItemByRowIndex(this.rowIdx));return true;}});_4.declare("dojox.grid._TreeGridContentBuilder",_6.grid._ContentBuilder,{generateHtml:function(_10,_11){var _12=this.getTableArray(),_13=this.grid,v=this.view,_14=v.structure.cells,_15=_13.getItem(_11),_16=0,_17=_13.cache.getTreePathByRowIndex(_11),_18=[],_19=[];_6.grid.util.fire(this.view,"onBeforeRow",[_11,_14]);if(_15!==null&&_17!==null){_18=_17.split("/");_16=_18.length-1;_19[0]="dojoxGridRowToggle-"+_18.join("-");if(!_13.treeModel.mayHaveChildren(_15)){_19.push("dojoxGridNoChildren");}}for(var j=0,row;(row=_14[j]);j++){if(row.hidden||row.header){continue;}var tr="<tr style=\"\" class=\""+_19.join(" ")+"\" dojoxTreeGridPath=\""+_18.join("/")+"\" dojoxTreeGridBaseClasses=\""+_19.join(" ")+"\">";_12.push(tr);var k=0,_1a=this._getColSpans(_16);var _1b=0,_1c=[];if(_1a){_4.forEach(_1a,function(c){for(var i=0,_1d;(_1d=row[i]);i++){if(i>=c.start&&i<=c.end){_1b+=this._getCellWidth(row,i);}}_1c.push(_1b);_1b=0;},this);}for(var i=0,_1e,m,cc,cs;(_1e=row[i]);i++){m=_1e.markup;cc=_1e.customClasses=[];cs=_1e.customStyles=[];if(_1a&&_1a[k]&&(i>=_1a[k].start&&i<=_1a[k].end)){var _1f=_1a[k].primary?_1a[k].primary:_1a[k].start;if(i==_1f){m[5]=_1e.formatAtLevel(_18,_15,_16,false,_19[0],cc,_11);m[1]=cc.join(" ");var pbm=_4.marginBox(_1e.getHeaderNode()).w-_4.contentBox(_1e.getHeaderNode()).w;cs=_1e.customStyles=["width:"+(_1c[k]-pbm)+"px"];m[3]=cs.join(";");_12.push.apply(_12,m);}else{if(i==_1a[k].end){k++;continue;}else{continue;}}}else{m[5]=_1e.formatAtLevel(_18,_15,_16,false,_19[0],cc,_11);m[1]=cc.join(" ");m[3]=cs.join(";");_12.push.apply(_12,m);}}_12.push("</tr>");}_12.push("</table>");return _12.join("");},_getColSpans:function(_20){var _21=this.grid.colSpans;if(_21&&(_21[_20])){return _21[_20];}else{return null;}},_getCellWidth:function(_22,_23){var _24=_22[_23].getHeaderNode();if(_23==_22.length-1||_4.every(_22.slice(_23+1),function(_25){return _25.hidden;})){var _26=_4.position(_22[_23].view.headerContentNode.firstChild);return _26.x+_26.w-_4.position(_24).x;}else{var _27=_22[_23+1].getHeaderNode();return _4.position(_27).x-_4.position(_24).x;}}});_4.declare("dojox.grid._TreeGridView",[_6.grid._View],{_contentBuilderClass:_6.grid._TreeGridContentBuilder,postCreate:function(){this.inherited(arguments);this._expandos={};this.connect(this.grid,"_cleanupExpandoCache","_cleanupExpandoCache");},_cleanupExpandoCache:function(_28,_29,_2a){if(_28==-1){return;}_4.forEach(this.grid.layout.cells,function(_2b){if(_2b.openStates&&_29 in _2b.openStates){delete _2b.openStates[_29];}});for(var i in this._expandos){if(this._expandos[i]){this._expandos[i].destroy();}}this._expandos={};},onAfterRow:function(_2c,_2d,_2e){_4.query("span.dojoxGridExpando",_2e).forEach(function(n){if(n&&n.parentNode){var _2f,_30,_31=this.grid._by_idx;if(_31&&_31[_2c]&&_31[_2c].idty){_2f=_31[_2c].idty;_30=this._expandos[_2f];}if(_30){_4.place(_30.domNode,n,"replace");_30.itemId=n.getAttribute("itemId");_30.cellIdx=parseInt(n.getAttribute("cellIdx"),10);if(isNaN(_30.cellIdx)){_30.cellIdx=-1;}}else{_30=_4.parser.parse(n.parentNode)[0];if(_2f){this._expandos[_2f]=_30;}}if(!_30.setRowNode(_2c,_2e,this)){_30.domNode.parentNode.removeChild(_30.domNode);}}},this);this.inherited(arguments);}});_6.grid.cells.LazyTreeCell=_4.mixin(_4.clone(_6.grid.cells.TreeCell),{formatAtLevel:function(_32,_33,_34,_35,_36,_37,_38){if(!_33){return this.formatIndexes(_38,_32,_33,_34);}if(!_4.isArray(_32)){_32=[_32];}var _39="";var ret="";if(this.isCollapsable){var _3a=this.grid.store,id="";if(_33&&_3a.isItem(_33)){id=_3a.getIdentity(_33);}_37.push("dojoxGridExpandoCell");ret="<span "+_4._scopeName+"Type=\"dojox.grid._LazyExpando\" level=\""+_34+"\" class=\"dojoxGridExpando\""+"\" toggleClass=\""+_36+"\" itemId=\""+id+"\" cellIdx=\""+this.index+"\"></span>";}_39=ret+this.formatIndexes(_38,_32,_33,_34);if(this.grid.focus.cell&&this.index==this.grid.focus.cell.index&&_32.join("/")==this.grid.focus.rowIndex){_37.push(this.grid.focus.focusClass);}return _39;},formatIndexes:function(_3b,_3c,_3d,_3e){var _3f=this.grid.edit.info,d=this.get?this.get(_3c[0],_3d,_3c):(this.value||this.defaultValue);if(this.editable&&(this.alwaysEditing||(_3f.rowIndex==_3c[0]&&_3f.cell==this))){return this.formatEditing(d,_3b,_3c);}else{return this._defaultFormat(d,[d,_3b,_3e,this]);}}});_4.declare("dojox.grid._LazyTreeLayout",_6.grid._Layout,{setStructure:function(_40){var s=_40;var g=this.grid;if(g&&!_4.every(s,function(i){return ("cells" in i);})){s=arguments[0]=[{cells:[s]}];}if(s.length==1&&s[0].cells.length==1){s[0].type="dojox.grid._TreeGridView";this._isCollapsable=true;s[0].cells[0][this.grid.expandoCell].isCollapsable=true;}this.inherited(arguments);},addCellDef:function(_41,_42,_43){var obj=this.inherited(arguments);return _4.mixin(obj,_6.grid.cells.LazyTreeCell);}});_4.declare("dojox.grid.TreeGridItemCache",null,{unInit:true,items:null,constructor:function(_44){this.rowsPerPage=_44.rowsPerPage;this._buildCache(_44.rowsPerPage);},_buildCache:function(_45){this.items=[];for(var i=0;i<_45;i++){this.cacheItem(i,{item:null,treePath:i+"",expandoStatus:false});}},cacheItem:function(_46,_47){this.items[_46]=_4.mixin({item:null,treePath:"",expandoStatus:false},_47);},insertItem:function(_48,_49){this.items.splice(_48,0,_4.mixin({item:null,treePath:"",expandoStatus:false},_49));},initCache:function(_4a){if(!this.unInit){return;}this._buildCache(_4a);this.unInit=false;},getItemByRowIndex:function(_4b){return this.items[_4b]?this.items[_4b].item:null;},getItemByTreePath:function(_4c){for(var i=0,len=this.items.length;i<len;i++){if(this.items[i].treePath===_4c){return this.items[i].item;}}return null;},getTreePathByRowIndex:function(_4d){return this.items[_4d]?this.items[_4d].treePath:null;},getExpandoStatusByRowIndex:function(_4e){return this.items[_4e]?this.items[_4e].expandoStatus:null;},getInfoByItem:function(_4f){for(var i=0,len=this.items.length;i<len;i++){if(this.items[i].item==_4f){return _4.mixin({rowIdx:i},this.items[i]);}}return null;},updateCache:function(_50,_51){if(this.items[_50]){_4.mixin(this.items[_50],_51);}},deleteItem:function(_52){if(this.items[_52]){this.items.splice(_52,1);}},cleanChildren:function(_53){var _54=this.getTreePathByRowIndex(_53);for(var i=this.items.length-1;i>=0;i--){if(this.items[i].treePath.indexOf(_54)===0&&this.items[i].treePath!==_54){this.items.splice(i,1);}}},emptyCache:function(){this.unInit=true;this._buildCache(this.rowsPerPage);},cleanupCache:function(){this.items=null;}});_4.declare("dojox.grid.LazyTreeGrid",_6.grid.TreeGrid,{treeModel:null,_layoutClass:_6.grid._LazyTreeLayout,colSpans:null,postCreate:function(){this.inherited(arguments);this.cache=new _6.grid.TreeGridItemCache(this);if(!this.treeModel||!(this.treeModel instanceof _5.tree.ForestStoreModel)){throw new Error("dojox.grid.LazyTreeGrid: must use a treeModel and treeModel must be an instance of dijit.tree.ForestStoreModel");}_4.addClass(this.domNode,"dojoxGridTreeModel");_4.setSelectable(this.domNode,this.selectable);},createManagers:function(){this.rows=new _6.grid._RowManager(this);this.focus=new _6.grid._FocusManager(this);this.edit=new _6.grid._EditManager(this);},createSelection:function(){this.selection=new _6.grid.DataSelection(this);},setModel:function(_55){if(!_55){return;}this._setModel(_55);this._refresh(true);},setStore:function(_56,_57,_58){if(!_56){return;}this._setQuery(_57,_58);this.treeModel.query=_57;this.treeModel.store=_56;this.treeModel.root.children=[];this.setModel(this.treeModel);},_setQuery:function(_59,_5a){this.inherited(arguments);this.treeModel.query=_59;},destroy:function(){this._cleanup();this.inherited(arguments);},_cleanup:function(){this.cache.emptyCache();this._cleanupExpandoCache();},setSortIndex:function(_5b,_5c){if(this.canSort(_5b+1)){this._cleanup();}this.inherited(arguments);},_refresh:function(_5d){this._cleanup();this.inherited(arguments);},render:function(){this.inherited(arguments);this.setScrollTop(this.scrollTop);},_onNew:function(_5e,_5f){var _60=false;var _61;if(_5f&&this.store.isItem(_5f.item)&&_4.some(this.treeModel.childrenAttrs,function(c){return c===_5f.attribute;})){_60=true;_61=this.cache.getInfoByItem(_5f.item);}if(!_60){this.inherited(arguments);var _62=this.cache.items;var _63=(parseInt(_62[_62.length-1].treePath.split("/")[0],10)+1)+"";this.cache.insertItem(this.get("rowCount"),{item:_5e,treePath:_63,expandoStatus:false});}else{if(_61&&_61.expandoStatus&&_61.rowIdx>=0){this.expandoFetch(_61.rowIdx,false);this.expandoFetch(_61.rowIdx,true);}else{if(_61&&_61.rowIdx){this.updateRow(_61.rowIdx);}}}},_onDelete:function(_64){this._pages=[];this._bop=-1;this._eop=-1;this._refresh();},_cleanupExpandoCache:function(_65,_66,_67){},_fetch:function(_68,_69){_68=_68||0;this.reqQueue=[];var i=0,_6a=[];var _6b=Math.min(this.rowsPerPage,this.cache.items.length-_68);for(i=_68;i<_6b;i++){if(this.cache.getItemByRowIndex(i)){_6a.push(this.cache.getItemByRowIndex(i));}else{break;}}if(_6a.length===_6b){this._onFetchComplete(_6a,{startRowIdx:_68,count:_6b});}else{this.reqQueueIndex=0;var _6c="",_6d="",_6e=_68,_6f=this.cache.getTreePathByRowIndex(_68);_6b=0;for(i=_68+1;i<_68+this.rowsPerPage;i++){if(!this.cache.getTreePathByRowIndex(i)){break;}_6c=this.cache.getTreePathByRowIndex(i-1).split("/").length-1;_6d=this.cache.getTreePathByRowIndex(i).split("/").length-1;if(_6c!==_6d){this.reqQueue.push({startTreePath:_6f,startRowIdx:_6e,count:_6b+1});_6b=0;_6e=i;_6f=this.cache.getTreePathByRowIndex(i);}else{_6b++;}}this.reqQueue.push({startTreePath:_6f,startRowIdx:_6e,count:_6b+1});var len=this.reqQueue.length;for(i=0;i<len;i++){this._fetchItems(i,_4.hitch(this,"_onFetchBegin"),_4.hitch(this,"_onFetchComplete"),_4.hitch(this,"_onFetchError"));}}},_fetchItems:function(idx,_70,_71,_72){if(!this._loading){this._loading=true;this.showMessage(this.loadingMessage);}var _73=this.reqQueue[idx].startTreePath.split("/").length-1;this._pending_requests[this.reqQueue[idx].startRowIdx]=true;if(_73===0){this.store.fetch({start:parseInt(this.reqQueue[idx].startTreePath,10),startRowIdx:this.reqQueue[idx].startRowIdx,count:this.reqQueue[idx].count,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,onBegin:_70,onComplete:_71,onError:_72});}else{var _74=this.reqQueue[idx].startTreePath;var _75=_74.substring(0,_74.lastIndexOf("/"));var _76=_74.substring(_74.lastIndexOf("/")+1);var _77=this.cache.getItemByTreePath(_75);if(!_77){throw new Error("Lazy loading TreeGrid on fetch error:");}var _78=this.store.getIdentity(_77);this.queryObj={start:parseInt(_76,10),startRowIdx:this.reqQueue[idx].startRowIdx,count:this.reqQueue[idx].count,parentId:_78,sort:this.getSortProps()};this.treeModel.getChildren(_77,_71,_72,this.queryObj);}},_onFetchBegin:function(_79,_7a){this.cache.initCache(_79);_79=this.cache.items.length;this.inherited(arguments);},filter:function(_7b,_7c){this.cache.emptyCache();this.inherited(arguments);},_onFetchComplete:function(_7d,_7e,_7f){var _80="",_81,_82,_83;if(_7e){_81=_7e.startRowIdx;_82=_7e.count;_83=0;}else{_81=this.queryObj.startRowIdx;_82=this.queryObj.count;_83=this.queryObj.start;}for(var i=0;i<_82;i++){_80=this.cache.getTreePathByRowIndex(_81+i);if(_80){if(!this.cache.getItemByRowIndex(_81+i)){this.cache.cacheItem(_81+i,{item:_7d[_83+i],treePath:_80,expandoStatus:false});}}}this._pending_requests[_81]=false;if(!this.scroller){return;}var len=Math.min(_82,_7d.length);for(i=0;i<len;i++){this._addItem(_7d[_83+i],_81+i,true);}this.updateRows(_81,len);if(this._lastScrollTop){this.setScrollTop(this._lastScrollTop);}if(this._loading){this._loading=false;if(!this.cache.items.length){this.showMessage(this.noDataMessage);}else{this.showMessage();}}},expandoFetch:function(_84,_85){if(this._loading){return;}this._loading=true;this.toggleLoadingClass(true);var _86=this.cache.getItemByRowIndex(_84);this.expandoRowIndex=_84;this._pages=[];if(_85){var _87=this.store.getIdentity(_86);var _88={start:0,count:this.keepRows,parentId:_87,sort:this.getSortProps()};this.treeModel.getChildren(_86,_4.hitch(this,"_onExpandoComplete"),_4.hitch(this,"_onFetchError"),_88);}else{this.cache.cleanChildren(_84);for(var i=_84+1,len=this._by_idx.length;i<len;i++){delete this._by_idx[i];}this.updateRowCount(this.cache.items.length);if(this.cache.getTreePathByRowIndex(_84+1)){this._fetch(_84+1);}else{this._fetch(_84);}this.toggleLoadingClass(false);}},_onExpandoComplete:function(_89,_8a,_8b){var _8c=this.cache.getTreePathByRowIndex(this.expandoRowIndex);if(_8b&&!isNaN(parseInt(_8b,10))){_8b=parseInt(_8b,10);}else{_8b=_89.length;}var i,j=0,len=this._by_idx.length;for(i=this.expandoRowIndex+1;j<_8b;i++,j++){this.cache.insertItem(i,{item:null,treePath:_8c+"/"+j,expandoStatus:false});}this.updateRowCount(this.cache.items.length);for(i=this.expandoRowIndex+1;i<len;i++){delete this._by_idx[i];}this.cache.updateCache(this.expandoRowIndex,{childrenNum:_8b});for(i=0;i<_8b;i++){this.cache.updateCache(this.expandoRowIndex+1+i,{item:_89[i]});}for(i=0;i<Math.min(_8b,this.keepRows);i++){this._addItem(_89[i],this.expandoRowIndex+1+i,false);this.updateRow(this.expandoRowIndex+1+i);}this.toggleLoadingClass(false);this.stateChangeNode=null;if(this._loading){this._loading=false;}if(_8b<this.keepRows&&this.cache.getTreePathByRowIndex(this.expandoRowIndex+1+_8b)){this._fetch(this.expandoRowIndex+1+_8b);}},toggleLoadingClass:function(_8d){if(this.stateChangeNode){_4.toggleClass(this.stateChangeNode,"dojoxGridExpandoLoading",_8d);}},styleRowNode:function(_8e,_8f){if(_8f){this.rows.styleRowNode(_8e,_8f);}},onStyleRow:function(row){if(!this.layout._isCollapsable){this.inherited(arguments);return;}var _90=_4.attr(row.node,"dojoxTreeGridBaseClasses");if(_90){row.customClasses=_90;}var i=row;i.customClasses+=(i.odd?" dojoxGridRowOdd":"")+(i.selected?" dojoxGridRowSelected":"")+(i.over?" dojoxGridRowOver":"");this.focus.styleRow(i);this.edit.styleRow(i);},dokeydown:function(e){if(e.altKey||e.metaKey){return;}var dk=_4.keys,_91=e.target,_92=_91&&_91.firstChild?_5.byId(_91.firstChild.id):null;if(e.keyCode===dk.ENTER&&_92 instanceof _6.grid._LazyExpando){_92.onToggle();}this.onKeyDown(e);}});_6.grid.LazyTreeGrid.markupFactory=function(_93,_94,_95,_96){return _6.grid.TreeGrid.markupFactory(_93,_94,_95,_96);};}}};});