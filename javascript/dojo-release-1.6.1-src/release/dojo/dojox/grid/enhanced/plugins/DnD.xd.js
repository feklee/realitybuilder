/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.DnD"],["require","dojox.grid.enhanced._Plugin"],["require","dojox.grid.enhanced.plugins.Selector"],["require","dojox.grid.enhanced.plugins.Rearrange"],["require","dojo.dnd.move"],["require","dojo.dnd.Source"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.DnD"]){_4._hasResource["dojox.grid.enhanced.plugins.DnD"]=true;_4.provide("dojox.grid.enhanced.plugins.DnD");_4.require("dojox.grid.enhanced._Plugin");_4.require("dojox.grid.enhanced.plugins.Selector");_4.require("dojox.grid.enhanced.plugins.Rearrange");_4.require("dojo.dnd.move");_4.require("dojo.dnd.Source");(function(){var _7=function(a){a.sort(function(v1,v2){return v1-v2;});var _8=[[a[0]]];for(var i=1,j=0;i<a.length;++i){if(a[i]==a[i-1]+1){_8[j].push(a[i]);}else{_8[++j]=[a[i]];}}return _8;},_9=function(_a){var a=_a[0];for(var i=1;i<_a.length;++i){a=a.concat(_a[i]);}return a;};_4.declare("dojox.grid.enhanced.plugins.DnD",_6.grid.enhanced._Plugin,{name:"dnd",_targetAnchorBorderWidth:2,_copyOnly:false,_config:{"row":{"within":true,"in":true,"out":true},"col":{"within":true,"in":true,"out":true},"cell":{"within":true,"in":true,"out":true}},constructor:function(_b,_c){this.grid=_b;this._config=_4.clone(this._config);_c=_4.isObject(_c)?_c:{};this.setupConfig(_c.dndConfig);this._copyOnly=!!_c.copyOnly;this._mixinGrid();this.selector=_b.pluginMgr.getPlugin("selector");this.rearranger=_b.pluginMgr.getPlugin("rearrange");this.rearranger.setArgs(_c);this._clear();this._elem=new _6.grid.enhanced.plugins.GridDnDElement(this);this._source=new _6.grid.enhanced.plugins.GridDnDSource(this._elem.node,{"grid":_b,"dndElem":this._elem,"dnd":this});this._container=_4.query(".dojoxGridMasterView",this.grid.domNode)[0];this._initEvents();},destroy:function(){this.inherited(arguments);this._clear();this._source.destroy();this._elem.destroy();this._container=null;this.grid=null;this.selector=null;this.rearranger=null;this._config=null;},_mixinGrid:function(){this.grid.setupDnDConfig=_4.hitch(this,"setupConfig");this.grid.dndCopyOnly=_4.hitch(this,"copyOnly");},setupConfig:function(_d){if(_d&&_4.isObject(_d)){var _e=["row","col","cell"],_f=["within","in","out"],cfg=this._config;_4.forEach(_e,function(_10){if(_10 in _d){var t=_d[_10];if(t&&_4.isObject(t)){_4.forEach(_f,function(_11){if(_11 in t){cfg[_10][_11]=!!t[_11];}});}else{_4.forEach(_f,function(_12){cfg[_10][_12]=!!t;});}}});_4.forEach(_f,function(_13){if(_13 in _d){var m=_d[_13];if(m&&_4.isObject(m)){_4.forEach(_e,function(_14){if(_14 in m){cfg[_14][_13]=!!m[_14];}});}else{_4.forEach(_e,function(_15){cfg[_15][_13]=!!m;});}}});}},copyOnly:function(_16){if(typeof _16!="undefined"){this._copyOnly=!!_16;}return this._copyOnly;},_isOutOfGrid:function(evt){var _17=_4.position(this.grid.domNode),x=evt.clientX,y=evt.clientY;return y<_17.y||y>_17.y+_17.h||x<_17.x||x>_17.x+_17.w;},_onMouseMove:function(evt){if(this._dndRegion&&!this._dnding&&!this._externalDnd){this._dnding=true;this._startDnd(evt);}else{if(this._isMouseDown&&!this._dndRegion){delete this._isMouseDown;this._oldCursor=_4.style(_4.body(),"cursor");_4.style(_4.body(),"cursor","not-allowed");}var _18=this._isOutOfGrid(evt);if(!this._alreadyOut&&_18){this._alreadyOut=true;if(this._dnding){this._destroyDnDUI(true,false);}this._moveEvent=evt;this._source.onOutEvent();}else{if(this._alreadyOut&&!_18){this._alreadyOut=false;if(this._dnding){this._createDnDUI(evt,true);}this._moveEvent=evt;this._source.onOverEvent();}}}},_onMouseUp:function(){if(!this._extDnding&&!this._isSource){var _19=this._dnding&&!this._alreadyOut;if(_19&&this._config[this._dndRegion.type]["within"]){this._rearrange();}this._endDnd(_19);}_4.style(_4.body(),"cursor",this._oldCursor||"");delete this._isMouseDown;},_initEvents:function(){var g=this.grid,s=this.selector;this.connect(_4.doc,"onmousemove","_onMouseMove");this.connect(_4.doc,"onmouseup","_onMouseUp");this.connect(g,"onCellMouseOver",function(evt){if(!this._dnding&&!s.isSelecting()&&!evt.ctrlKey){this._dndReady=s.isSelected("cell",evt.rowIndex,evt.cell.index);s.selectEnabled(!this._dndReady);}});this.connect(g,"onHeaderCellMouseOver",function(evt){if(this._dndReady){s.selectEnabled(true);}});this.connect(g,"onRowMouseOver",function(evt){if(this._dndReady&&!evt.cell){s.selectEnabled(true);}});this.connect(g,"onCellMouseDown",function(evt){if(!evt.ctrlKey&&this._dndReady){this._dndRegion=this._getDnDRegion(evt.rowIndex,evt.cell.index);this._isMouseDown=true;}});this.connect(g,"onCellMouseUp",function(evt){if(!this._dndReady&&!s.isSelecting()&&evt.cell){this._dndReady=s.isSelected("cell",evt.rowIndex,evt.cell.index);s.selectEnabled(!this._dndReady);}});this.connect(g,"onCellClick",function(evt){if(this._dndReady&&!evt.ctrlKey&&!evt.shiftKey){s.select("cell",evt.rowIndex,evt.cell.index);}});this.connect(g,"onEndAutoScroll",function(_1a,_1b,_1c,_1d,evt){if(this._dnding){this._markTargetAnchor(evt);}});this.connect(_4.doc,"onkeydown",function(evt){if(evt.keyCode==_4.keys.ESCAPE){this._endDnd(false);}else{if(evt.keyCode==_4.keys.CTRL){s.selectEnabled(true);this._isCopy=true;}}});this.connect(_4.doc,"onkeyup",function(evt){if(evt.keyCode==_4.keys.CTRL){s.selectEnabled(!this._dndReady);this._isCopy=false;}});},_clear:function(){this._dndRegion=null;this._target=null;this._moveEvent=null;this._targetAnchor={};this._dnding=false;this._externalDnd=false;this._isSource=false;this._alreadyOut=false;this._extDnding=false;},_getDnDRegion:function(_1e,_1f){var s=this.selector,_20=s._selected,_21=(!!_20.cell.length)|(!!_20.row.length<<1)|(!!_20.col.length<<2),_22;switch(_21){case 1:_22="cell";if(!this._config[_22]["within"]&&!this._config[_22]["out"]){return null;}var _23=this.grid.layout.cells,_24=function(_25){var _26=0;for(var i=_25.min.col;i<=_25.max.col;++i){if(_23[i].hidden){++_26;}}return (_25.max.row-_25.min.row+1)*(_25.max.col-_25.min.col+1-_26);},_27=function(_28,_29){return _28.row>=_29.min.row&&_28.row<=_29.max.row&&_28.col>=_29.min.col&&_28.col<=_29.max.col;},_2a={max:{row:-1,col:-1},min:{row:Infinity,col:Infinity}};_4.forEach(_20[_22],function(_2b){if(_2b.row<_2a.min.row){_2a.min.row=_2b.row;}if(_2b.row>_2a.max.row){_2a.max.row=_2b.row;}if(_2b.col<_2a.min.col){_2a.min.col=_2b.col;}if(_2b.col>_2a.max.col){_2a.max.col=_2b.col;}});if(_4.some(_20[_22],function(_2c){return _2c.row==_1e&&_2c.col==_1f;})){if(_24(_2a)==_20[_22].length&&_4.every(_20[_22],function(_2d){return _27(_2d,_2a);})){return {"type":_22,"selected":[_2a],"handle":{"row":_1e,"col":_1f}};}}return null;case 2:case 4:_22=_21==2?"row":"col";if(!this._config[_22]["within"]&&!this._config[_22]["out"]){return null;}var res=s.getSelected(_22);if(res.length){return {"type":_22,"selected":_7(res),"handle":_21==2?_1e:_1f};}return null;}return null;},_startDnd:function(evt){this._createDnDUI(evt);},_endDnd:function(_2e){this._destroyDnDUI(false,_2e);this._clear();},_createDnDUI:function(evt,_2f){var _30=_4.position(this.grid.views.views[0].domNode);_4.style(this._container,"height",_30.h+"px");try{if(!_2f){this._createSource(evt);}this._createMoveable(evt);this._oldCursor=_4.style(_4.body(),"cursor");_4.style(_4.body(),"cursor","default");}catch(e){console.warn("DnD._createDnDUI() error:",e);}},_destroyDnDUI:function(_31,_32){try{if(_32){this._destroySource();}this._unmarkTargetAnchor();if(!_31){this._destroyMoveable();}_4.style(_4.body(),"cursor",this._oldCursor);}catch(e){console.warn("DnD._destroyDnDUI() error:",this.grid.id,e);}},_createSource:function(evt){this._elem.createDnDNodes(this._dndRegion);var m=_4.dnd.manager();var _33=m.makeAvatar;m._dndPlugin=this;m.makeAvatar=function(){var _34=new _6.grid.enhanced.plugins.GridDnDAvatar(m);delete m._dndPlugin;return _34;};m.startDrag(this._source,this._elem.getDnDNodes(),evt.ctrlKey);m.makeAvatar=_33;m.onMouseMove(evt);},_destroySource:function(){_4.publish("/dnd/cancel");this._elem.destroyDnDNodes();},_createMoveable:function(evt){if(!this._markTagetAnchorHandler){this._markTagetAnchorHandler=this.connect(_4.doc,"onmousemove","_markTargetAnchor");}},_destroyMoveable:function(){this.disconnect(this._markTagetAnchorHandler);delete this._markTagetAnchorHandler;},_calcColTargetAnchorPos:function(evt,_35){var i,_36,_37,_38,ex=evt.clientX,_39=this.grid.layout.cells,ltr=_4._isBodyLtr(),_3a=this._getVisibleHeaders();for(i=0;i<_3a.length;++i){_36=_4.position(_3a[i].node);if(ltr?((i===0||ex>=_36.x)&&ex<_36.x+_36.w):((i===0||ex<_36.x+_36.w)&&ex>=_36.x)){_37=_36.x+(ltr?0:_36.w);break;}else{if(ltr?(i===_3a.length-1&&ex>=_36.x+_36.w):(i===_3a.length-1&&ex<_36.x)){++i;_37=_36.x+(ltr?_36.w:0);break;}}}if(i<_3a.length){_38=_3a[i].cell.index;if(this.selector.isSelected("col",_38)&&this.selector.isSelected("col",_38-1)){var _3b=this._dndRegion.selected;for(i=0;i<_3b.length;++i){if(_4.indexOf(_3b[i],_38)>=0){_38=_3b[i][0];_36=_4.position(_39[_38].getHeaderNode());_37=_36.x+(ltr?0:_36.w);break;}}}}else{_38=_39.length;}this._target=_38;return _37-_35.x;},_calcRowTargetAnchorPos:function(evt,_3c){var g=this.grid,top,i=0,_3d=g.layout.cells;while(_3d[i].hidden){++i;}var _3e=g.layout.cells[i],_3f=g.scroller.firstVisibleRow,_40=_4.position(_3e.getNode(_3f));while(_40.y+_40.h<evt.clientY){if(++_3f>=g.rowCount){break;}_40=_4.position(_3e.getNode(_3f));}if(_3f<g.rowCount){if(this.selector.isSelected("row",_3f)&&this.selector.isSelected("row",_3f-1)){var _41=this._dndRegion.selected;for(i=0;i<_41.length;++i){if(_4.indexOf(_41[i],_3f)>=0){_3f=_41[i][0];_40=_4.position(_3e.getNode(_3f));break;}}}top=_40.y;}else{top=_40.y+_40.h;}this._target=_3f;return top-_3c.y;},_calcCellTargetAnchorPos:function(evt,_42,_43){var s=this._dndRegion.selected[0],_44=this._dndRegion.handle,g=this.grid,ltr=_4._isBodyLtr(),_45=g.layout.cells,_46,_47,_48,_49,_4a,_4b,_4c,top,_4d,_4e,i,_4f=_44.col-s.min.col,_50=s.max.col-_44.col,_51,_52;if(!_43.childNodes.length){_51=_4.create("div",{"class":"dojoxGridCellBorderLeftTopDIV"},_43);_52=_4.create("div",{"class":"dojoxGridCellBorderRightBottomDIV"},_43);}else{_51=_4.query(".dojoxGridCellBorderLeftTopDIV",_43)[0];_52=_4.query(".dojoxGridCellBorderRightBottomDIV",_43)[0];}for(i=s.min.col+1;i<_44.col;++i){if(_45[i].hidden){--_4f;}}for(i=_44.col+1;i<s.max.col;++i){if(_45[i].hidden){--_50;}}_49=this._getVisibleHeaders();for(i=_4f;i<_49.length-_50;++i){_46=_4.position(_49[i].node);if((evt.clientX>=_46.x&&evt.clientX<_46.x+_46.w)||(i==_4f&&(ltr?evt.clientX<_46.x:evt.clientX>=_46.x+_46.w))||(i==_49.length-_50-1&&(ltr?evt.clientX>=_46.x+_46.w:evt<_46.x))){_4d=_49[i-_4f];_4e=_49[i+_50];_47=_4.position(_4d.node);_48=_4.position(_4e.node);_4d=_4d.cell.index;_4e=_4e.cell.index;_4c=ltr?_47.x:_48.x;_4b=ltr?(_48.x+_48.w-_47.x):(_47.x+_47.w-_48.x);break;}}i=0;while(_45[i].hidden){++i;}var _53=_45[i],_54=g.scroller.firstVisibleRow,_55=_4.position(_53.getNode(_54));while(_55.y+_55.h<evt.clientY){if(++_54<g.rowCount){_55=_4.position(_53.getNode(_54));}else{break;}}var _56=_54>=_44.row-s.min.row?_54-_44.row+s.min.row:0;var _57=_56+s.max.row-s.min.row;if(_57>=g.rowCount){_57=g.rowCount-1;_56=_57-s.max.row+s.min.row;}_47=_4.position(_53.getNode(_56));_48=_4.position(_53.getNode(_57));top=_47.y;_4a=_48.y+_48.h-_47.y;this._target={"min":{"row":_56,"col":_4d},"max":{"row":_57,"col":_4e}};var _58=(_4.marginBox(_51).w-_4.contentBox(_51).w)/2;var _59=_4.position(_45[_4d].getNode(_56));_4.style(_51,{"width":(_59.w-_58)+"px","height":(_59.h-_58)+"px"});var _5a=_4.position(_45[_4e].getNode(_57));_4.style(_52,{"width":(_5a.w-_58)+"px","height":(_5a.h-_58)+"px"});return {h:_4a,w:_4b,l:_4c-_42.x,t:top-_42.y};},_markTargetAnchor:function(evt){try{var t=this._dndRegion.type;if(this._alreadyOut||(this._dnding&&!this._config[t]["within"])||(this._extDnding&&!this._config[t]["in"])){return;}var _5b,_5c,_5d,top,_5e=this._targetAnchor[t],pos=_4.position(this._container);if(!_5e){_5e=this._targetAnchor[t]=_4.create("div",{"class":(t=="cell")?"dojoxGridCellBorderDIV":"dojoxGridBorderDIV"});_4.style(_5e,"display","none");this._container.appendChild(_5e);}switch(t){case "col":_5b=pos.h;_5c=this._targetAnchorBorderWidth;_5d=this._calcColTargetAnchorPos(evt,pos);top=0;break;case "row":_5b=this._targetAnchorBorderWidth;_5c=pos.w;_5d=0;top=this._calcRowTargetAnchorPos(evt,pos);break;case "cell":var _5f=this._calcCellTargetAnchorPos(evt,pos,_5e);_5b=_5f.h;_5c=_5f.w;_5d=_5f.l;top=_5f.t;}if(typeof _5b=="number"&&typeof _5c=="number"&&typeof _5d=="number"&&typeof top=="number"){_4.style(_5e,{"height":_5b+"px","width":_5c+"px","left":_5d+"px","top":top+"px"});_4.style(_5e,"display","");}else{this._target=null;}}catch(e){console.warn("DnD._markTargetAnchor() error:",e);}},_unmarkTargetAnchor:function(){if(this._dndRegion){var _60=this._targetAnchor[this._dndRegion.type];if(_60){_4.style(this._targetAnchor[this._dndRegion.type],"display","none");}}},_getVisibleHeaders:function(){return _4.map(_4.filter(this.grid.layout.cells,function(_61){return !_61.hidden;}),function(_62){return {"node":_62.getHeaderNode(),"cell":_62};});},_rearrange:function(){if(this._target===null){return;}var t=this._dndRegion.type;var _63=this._dndRegion.selected;if(t==="cell"){this.rearranger[(this._isCopy||this._copyOnly)?"copyCells":"moveCells"](_63[0],this._target);}else{this.rearranger[t=="col"?"moveColumns":"moveRows"](_9(_63),this._target);}this._target=null;},onDraggingOver:function(_64){if(!this._dnding&&_64){_64._isSource=true;this._extDnding=true;if(!this._externalDnd){this._externalDnd=true;this._dndRegion=this._mapRegion(_64.grid,_64._dndRegion);}this._createDnDUI(this._moveEvent,true);this.grid.pluginMgr.getPlugin("autoScroll").readyForAutoScroll=true;}},_mapRegion:function(_65,_66){if(_66.type==="cell"){var _67=_66.selected[0];var _68=this.grid.layout.cells;var _69=_65.layout.cells;var c,cnt=0;for(c=_67.min.col;c<=_67.max.col;++c){if(!_69[c].hidden){++cnt;}}for(c=0;cnt>0;++c){if(!_68[c].hidden){--cnt;}}var _6a=_4.clone(_66);_6a.selected[0].min.col=0;_6a.selected[0].max.col=c-1;for(c=_67.min.col;c<=_66.handle.col;++c){if(!_69[c].hidden){++cnt;}}for(c=0;cnt>0;++c){if(!_68[c].hidden){--cnt;}}_6a.handle.col=c;}return _66;},onDraggingOut:function(_6b){if(this._externalDnd){this._extDnding=false;this._destroyDnDUI(true,false);if(_6b){_6b._isSource=false;}}},onDragIn:function(_6c,_6d){var _6e=false;if(this._target!==null){var _6f=_6c._dndRegion.type;var _70=_6c._dndRegion.selected;switch(_6f){case "cell":this.rearranger.changeCells(_6c.grid,_70[0],this._target);break;case "row":var _71=_9(_70);this.rearranger.insertRows(_6c.grid,_71,this._target);break;}_6e=true;}this._endDnd(true);if(_6c.onDragOut){_6c.onDragOut(_6e&&!_6d);}},onDragOut:function(_72){if(_72&&!this._copyOnly){var _73=this._dndRegion.type;var _74=this._dndRegion.selected;switch(_73){case "cell":this.rearranger.clearCells(_74[0]);break;case "row":this.rearranger.removeRows(_9(_74));break;}}this._endDnd(true);},_canAccept:function(_75){if(!_75){return false;}var _76=_75._dndRegion;var _77=_76.type;if(!this._config[_77]["in"]||!_75._config[_77]["out"]){return false;}var g=this.grid;var _78=_76.selected;var _79=_4.filter(g.layout.cells,function(_7a){return !_7a.hidden;}).length;var _7b=g.rowCount;var res=true;switch(_77){case "cell":_78=_78[0];res=g.store.getFeatures()["dojo.data.api.Write"]&&(_78.max.row-_78.min.row)<=_7b&&_4.filter(_75.grid.layout.cells,function(_7c){return _7c.index>=_78.min.col&&_7c.index<=_78.max.col&&!_7c.hidden;}).length<=_79;case "row":if(_75._allDnDItemsLoaded()){return res;}}return false;},_allDnDItemsLoaded:function(){if(this._dndRegion){var _7d=this._dndRegion.type,_7e=this._dndRegion.selected,_7f=[];switch(_7d){case "cell":for(var i=_7e[0].min.row,max=_7e[0].max.row;i<=max;++i){_7f.push(i);}break;case "row":_7f=_9(_7e);break;default:return false;}var _80=this.grid._by_idx;return _4.every(_7f,function(_81){return !!_80[_81];});}return false;}});_4.declare("dojox.grid.enhanced.plugins.GridDnDElement",null,{constructor:function(_82){this.plugin=_82;this.node=_4.create("div");this._items={};},destroy:function(){this.plugin=null;_4.destroy(this.node);this.node=null;this._items=null;},createDnDNodes:function(_83){this.destroyDnDNodes();var _84=["grid/"+_83.type+"s"];var _85=this.plugin.grid.id+"_dndItem";_4.forEach(_83.selected,function(_86,i){var id=_85+i;this._items[id]={"type":_84,"data":_86,"dndPlugin":this.plugin};this.node.appendChild(_4.create("div",{"id":id}));},this);},getDnDNodes:function(){return _4.map(this.node.childNodes,function(_87){return _87;});},destroyDnDNodes:function(){_4.empty(this.node);this._items={};},getItem:function(_88){return this._items[_88];}});_4.declare("dojox.grid.enhanced.plugins.GridDnDSource",_4.dnd.Source,{accept:["grid/cells","grid/rows","grid/cols"],constructor:function(_89,_8a){this.grid=_8a.grid;this.dndElem=_8a.dndElem;this.dndPlugin=_8a.dnd;this.sourcePlugin=null;},destroy:function(){this.inherited(arguments);this.grid=null;this.dndElem=null;this.dndPlugin=null;this.sourcePlugin=null;},getItem:function(_8b){return this.dndElem.getItem(_8b);},checkAcceptance:function(_8c,_8d){if(this!=_8c&&_8d[0]){var _8e=_8c.getItem(_8d[0].id);if(_8e.dndPlugin){var _8f=_8e.type;for(var j=0;j<_8f.length;++j){if(_8f[j] in this.accept){if(this.dndPlugin._canAccept(_8e.dndPlugin)){this.sourcePlugin=_8e.dndPlugin;}else{return false;}break;}}}else{if("grid/rows" in this.accept){var _90=[];_4.forEach(_8d,function(_91){var _92=_8c.getItem(_91.id);if(_92.data&&_4.indexOf(_92.type,"grid/rows")>=0){var _93=_92.data;if(typeof _92.data=="string"){_93=_4.fromJson(_92.data);}if(_93){_90.push(_93);}}});if(_90.length){this.sourcePlugin={_dndRegion:{type:"row",selected:[_90]}};}else{return false;}}}}return this.inherited(arguments);},onDraggingOver:function(){this.dndPlugin.onDraggingOver(this.sourcePlugin);},onDraggingOut:function(){this.dndPlugin.onDraggingOut(this.sourcePlugin);},onDndDrop:function(_94,_95,_96,_97){this.onDndCancel();if(this!=_94&&this==_97){this.dndPlugin.onDragIn(this.sourcePlugin,_96);}}});_4.declare("dojox.grid.enhanced.plugins.GridDnDAvatar",_4.dnd.Avatar,{construct:function(){this._itemType=this.manager._dndPlugin._dndRegion.type;this._itemCount=this._getItemCount();this.isA11y=_4.hasClass(_4.body(),"dijit_a11y");var a=_4.create("table",{"border":"0","cellspacing":"0","class":"dojoxGridDndAvatar","style":{position:"absolute",zIndex:"1999",margin:"0px"}}),_98=this.manager.source,b=_4.create("tbody",null,a),tr=_4.create("tr",null,b),td=_4.create("td",{"class":"dojoxGridDnDIcon"},tr);if(this.isA11y){_4.create("span",{"id":"a11yIcon","innerHTML":this.manager.copy?"+":"<"},td);}td=_4.create("td",{"class":"dojoxGridDnDItemIcon "+this._getGridDnDIconClass()},tr);td=_4.create("td",null,tr);_4.create("span",{"class":"dojoxGridDnDItemCount","innerHTML":_98.generateText?this._generateText():""},td);_4.style(tr,{"opacity":0.9});this.node=a;},_getItemCount:function(){var _99=this.manager._dndPlugin._dndRegion.selected,_9a=0;switch(this._itemType){case "cell":_99=_99[0];var _9b=this.manager._dndPlugin.grid.layout.cells,_9c=_99.max.col-_99.min.col+1,_9d=_99.max.row-_99.min.row+1;if(_9c>1){for(var i=_99.min.col;i<=_99.max.col;++i){if(_9b[i].hidden){--_9c;}}}_9a=_9c*_9d;break;case "row":case "col":_9a=_9(_99).length;}return _9a;},_getGridDnDIconClass:function(){return {"row":["dojoxGridDnDIconRowSingle","dojoxGridDnDIconRowMulti"],"col":["dojoxGridDnDIconColSingle","dojoxGridDnDIconColMulti"],"cell":["dojoxGridDnDIconCellSingle","dojoxGridDnDIconCellMulti"]}[this._itemType][this._itemCount==1?0:1];},_generateText:function(){return "("+this._itemCount+")";}});_6.grid.EnhancedGrid.registerPlugin(_6.grid.enhanced.plugins.DnD,{"dependency":["selector","rearrange"]});})();}}};});