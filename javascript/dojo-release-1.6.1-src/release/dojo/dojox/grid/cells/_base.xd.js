/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.cells._base"],["require","dojox.grid.util"],["require","dijit._Widget"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.cells._base"]){_4._hasResource["dojox.grid.cells._base"]=true;_4.provide("dojox.grid.cells._base");_4.require("dojox.grid.util");_4.require("dijit._Widget");_4.declare("dojox.grid._DeferredTextWidget",_5._Widget,{deferred:null,_destroyOnRemove:true,postCreate:function(){if(this.deferred){this.deferred.addBoth(_4.hitch(this,function(_7){if(this.domNode){this.domNode.innerHTML=_7;}}));}}});(function(){var _8=function(_9){try{_6.grid.util.fire(_9,"focus");_6.grid.util.fire(_9,"select");}catch(e){}};var _a=function(){setTimeout(_4.hitch.apply(_4,arguments),0);};var _b=_6.grid.cells;_4.declare("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:false,alwaysEditing:false,formatter:null,defaultValue:"...",value:null,hidden:false,noresize:false,draggable:true,_valueProp:"value",_formatPending:false,constructor:function(_c){this._props=_c||{};_4.mixin(this,_c);if(this.draggable===undefined){this.draggable=true;}},_defaultFormat:function(_d,_e){var s=this.grid.formatterScope||this;var f=this.formatter;if(f&&s&&typeof f=="string"){f=this.formatter=s[f];}var v=(_d!=this.defaultValue&&f)?f.apply(s,_e):_d;if(typeof v=="undefined"){return this.defaultValue;}if(v&&v.addBoth){v=new _6.grid._DeferredTextWidget({deferred:v},_4.create("span",{innerHTML:this.defaultValue}));}if(v&&v.declaredClass&&v.startup){return "<div class='dojoxGridStubNode' linkWidget='"+v.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>";}return v;},format:function(_f,_10){var f,i=this.grid.edit.info,d=this.get?this.get(_f,_10):(this.value||this.defaultValue);d=(d&&d.replace&&this.grid.escapeHTMLInData)?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;if(this.editable&&(this.alwaysEditing||(i.rowIndex==_f&&i.cell==this))){return this.formatEditing(d,_f);}else{return this._defaultFormat(d,[d,_f,this]);}},formatEditing:function(_11,_12){},getNode:function(_13){return this.view.getCellNode(_13,this.index);},getHeaderNode:function(){return this.view.getHeaderCellNode(this.index);},getEditNode:function(_14){return (this.getNode(_14)||0).firstChild||0;},canResize:function(){var uw=this.unitWidth;return uw&&(uw!=="auto");},isFlex:function(){var uw=this.unitWidth;return uw&&_4.isString(uw)&&(uw=="auto"||uw.slice(-1)=="%");},applyEdit:function(_15,_16){this.grid.edit.applyCellEdit(_15,this,_16);},cancelEdit:function(_17){this.grid.doCancelEdit(_17);},_onEditBlur:function(_18){if(this.grid.edit.isEditCell(_18,this.index)){this.grid.edit.apply();}},registerOnBlur:function(_19,_1a){if(this.commitOnBlur){_4.connect(_19,"onblur",function(e){setTimeout(_4.hitch(this,"_onEditBlur",_1a),250);});}},needFormatNode:function(_1b,_1c){this._formatPending=true;_a(this,"_formatNode",_1b,_1c);},cancelFormatNode:function(){this._formatPending=false;},_formatNode:function(_1d,_1e){if(this._formatPending){this._formatPending=false;_4.setSelectable(this.grid.domNode,true);this.formatNode(this.getEditNode(_1e),_1d,_1e);}},formatNode:function(_1f,_20,_21){if(_4.isIE){_a(this,"focus",_21,_1f);}else{this.focus(_21,_1f);}},dispatchEvent:function(m,e){if(m in this){return this[m](e);}},getValue:function(_22){return this.getEditNode(_22)[this._valueProp];},setValue:function(_23,_24){var n=this.getEditNode(_23);if(n){n[this._valueProp]=_24;}},focus:function(_25,_26){_8(_26||this.getEditNode(_25));},save:function(_27){this.value=this.value||this.getValue(_27);},restore:function(_28){this.setValue(_28,this.value);},_finish:function(_29){_4.setSelectable(this.grid.domNode,false);this.cancelFormatNode();},apply:function(_2a){this.applyEdit(this.getValue(_2a),_2a);this._finish(_2a);},cancel:function(_2b){this.cancelEdit(_2b);this._finish(_2b);}});_b._Base.markupFactory=function(_2c,_2d){var d=_4;var _2e=d.trim(d.attr(_2c,"formatter")||"");if(_2e){_2d.formatter=_4.getObject(_2e)||_2e;}var get=d.trim(d.attr(_2c,"get")||"");if(get){_2d.get=_4.getObject(get);}var _2f=function(_30,_31,_32){var _33=d.trim(d.attr(_2c,_30)||"");if(_33){_31[_32||_30]=!(_33.toLowerCase()=="false");}};_2f("sortDesc",_2d);_2f("editable",_2d);_2f("alwaysEditing",_2d);_2f("noresize",_2d);_2f("draggable",_2d);var _34=d.trim(d.attr(_2c,"loadingText")||d.attr(_2c,"defaultValue")||"");if(_34){_2d.defaultValue=_34;}var _35=function(_36,_37,_38){var _39=d.trim(d.attr(_2c,_36)||"")||undefined;if(_39){_37[_38||_36]=_39;}};_35("styles",_2d);_35("headerStyles",_2d);_35("cellStyles",_2d);_35("classes",_2d);_35("headerClasses",_2d);_35("cellClasses",_2d);};_4.declare("dojox.grid.cells.Cell",_b._Base,{constructor:function(){this.keyFilter=this.keyFilter;},keyFilter:null,formatEditing:function(_3a,_3b){this.needFormatNode(_3a,_3b);return "<input class=\"dojoxGridInput\" type=\"text\" value=\""+_3a+"\">";},formatNode:function(_3c,_3d,_3e){this.inherited(arguments);this.registerOnBlur(_3c,_3e);},doKey:function(e){if(this.keyFilter){var key=String.fromCharCode(e.charCode);if(key.search(this.keyFilter)==-1){_4.stopEvent(e);}}},_finish:function(_3f){this.inherited(arguments);var n=this.getEditNode(_3f);try{_6.grid.util.fire(n,"blur");}catch(e){}}});_b.Cell.markupFactory=function(_40,_41){_b._Base.markupFactory(_40,_41);var d=_4;var _42=d.trim(d.attr(_40,"keyFilter")||"");if(_42){_41.keyFilter=new RegExp(_42);}};_4.declare("dojox.grid.cells.RowIndex",_b.Cell,{name:"Row",postscript:function(){this.editable=false;},get:function(_43){return _43+1;}});_b.RowIndex.markupFactory=function(_44,_45){_b.Cell.markupFactory(_44,_45);};_4.declare("dojox.grid.cells.Select",_b.Cell,{options:null,values:null,returnIndex:-1,constructor:function(_46){this.values=this.values||this.options;},formatEditing:function(_47,_48){this.needFormatNode(_47,_48);var h=["<select class=\"dojoxGridSelect\">"];for(var i=0,o,v;((o=this.options[i])!==undefined)&&((v=this.values[i])!==undefined);i++){h.push("<option",(_47==v?" selected":"")," value=\""+v+"\"",">",o,"</option>");}h.push("</select>");return h.join("");},getValue:function(_49){var n=this.getEditNode(_49);if(n){var i=n.selectedIndex,o=n.options[i];return this.returnIndex>-1?i:o.value||o.innerHTML;}}});_b.Select.markupFactory=function(_4a,_4b){_b.Cell.markupFactory(_4a,_4b);var d=_4;var _4c=d.trim(d.attr(_4a,"options")||"");if(_4c){var o=_4c.split(",");if(o[0]!=_4c){_4b.options=o;}}var _4d=d.trim(d.attr(_4a,"values")||"");if(_4d){var v=_4d.split(",");if(v[0]!=_4d){_4b.values=v;}}};_4.declare("dojox.grid.cells.AlwaysEdit",_b.Cell,{alwaysEditing:true,_formatNode:function(_4e,_4f){this.formatNode(this.getEditNode(_4f),_4e,_4f);},applyStaticValue:function(_50){var e=this.grid.edit;e.applyCellEdit(this.getValue(_50),this,_50);e.start(this,_50,true);}});_b.AlwaysEdit.markupFactory=function(_51,_52){_b.Cell.markupFactory(_51,_52);};_4.declare("dojox.grid.cells.Bool",_b.AlwaysEdit,{_valueProp:"checked",formatEditing:function(_53,_54){return "<input class=\"dojoxGridInput\" type=\"checkbox\""+(_53?" checked=\"checked\"":"")+" style=\"width: auto\" />";},doclick:function(e){if(e.target.tagName=="INPUT"){this.applyStaticValue(e.rowIndex);}}});_b.Bool.markupFactory=function(_55,_56){_b.AlwaysEdit.markupFactory(_55,_56);};})();}}};});