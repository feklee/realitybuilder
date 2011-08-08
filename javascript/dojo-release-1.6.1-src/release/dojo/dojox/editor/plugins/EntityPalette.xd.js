/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.EntityPalette"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._PaletteMixin"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","latinEntities",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.EntityPalette"]){_4._hasResource["dojox.editor.plugins.EntityPalette"]=true;_4.provide("dojox.editor.plugins.EntityPalette");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dijit._PaletteMixin");_4.require("dojo.i18n");_4.experimental("dojox.editor.plugins.EntityPalette");_4.declare("dojox.editor.plugins.EntityPalette",[_5._Widget,_5._Templated,_5._PaletteMixin],{templateString:"<div class=\"dojoxEntityPalette\">\n"+"\t<table>\n"+"\t\t<tbody>\n"+"\t\t\t<tr>\n"+"\t\t\t\t<td>\n"+"\t\t\t\t\t<table class=\"dijitPaletteTable\">\n"+"\t\t\t\t\t\t<tbody dojoAttachPoint=\"gridNode\"></tbody>\n"+"\t\t\t\t   </table>\n"+"\t\t\t\t</td>\n"+"\t\t\t</tr>\n"+"\t\t\t<tr>\n"+"\t\t\t\t<td>\n"+"\t\t\t\t\t<table dojoAttachPoint=\"previewPane\" class=\"dojoxEntityPalettePreviewTable\">\n"+"\t\t\t\t\t\t<tbody>\n"+"\t\t\t\t\t\t\t<tr>\n"+"\t\t\t\t\t\t\t\t<th class=\"dojoxEntityPalettePreviewHeader\">Preview</th>\n"+"\t\t\t\t\t\t\t\t<th class=\"dojoxEntityPalettePreviewHeader\" dojoAttachPoint=\"codeHeader\">Code</th>\n"+"\t\t\t\t\t\t\t\t<th class=\"dojoxEntityPalettePreviewHeader\" dojoAttachPoint=\"entityHeader\">Name</th>\n"+"\t\t\t\t\t\t\t\t<th class=\"dojoxEntityPalettePreviewHeader\">Description</th>\n"+"\t\t\t\t\t\t\t</tr>\n"+"\t\t\t\t\t\t\t<tr>\n"+"\t\t\t\t\t\t\t\t<td class=\"dojoxEntityPalettePreviewDetailEntity\" dojoAttachPoint=\"previewNode\"></td>\n"+"\t\t\t\t\t\t\t\t<td class=\"dojoxEntityPalettePreviewDetail\" dojoAttachPoint=\"codeNode\"></td>\n"+"\t\t\t\t\t\t\t\t<td class=\"dojoxEntityPalettePreviewDetail\" dojoAttachPoint=\"entityNode\"></td>\n"+"\t\t\t\t\t\t\t\t<td class=\"dojoxEntityPalettePreviewDetail\" dojoAttachPoint=\"descNode\"></td>\n"+"\t\t\t\t\t\t\t</tr>\n"+"\t\t\t\t\t\t</tbody>\n"+"\t\t\t\t\t</table>\n"+"\t\t\t\t</td>\n"+"\t\t\t</tr>\n"+"\t\t</tbody>\n"+"\t</table>\n"+"</div>",baseClass:"dojoxEntityPalette",showPreview:true,showCode:false,showEntityName:false,palette:"latin",dyeClass:"dojox.editor.plugins.LatinEntity",paletteClass:"editorLatinEntityPalette",cellClass:"dojoxEntityPaletteCell",postMixInProperties:function(){var _7=_4.i18n.getLocalization("dojox.editor.plugins","latinEntities");var _8=0;var _9;for(_9 in _7){_8++;}var _a=Math.floor(Math.sqrt(_8));var _b=_a;var _c=0;var _d=[];var _e=[];for(_9 in _7){_c++;_e.push(_9);if(_c%_b===0){_d.push(_e);_e=[];}}if(_e.length>0){_d.push(_e);}this._palette=_d;},buildRendering:function(){this.inherited(arguments);var _f=_4.i18n.getLocalization("dojox.editor.plugins","latinEntities");this._preparePalette(this._palette,_f);var _10=_4.query(".dojoxEntityPaletteCell",this.gridNode);_4.forEach(_10,function(_11){this.connect(_11,"onmouseenter","_onCellMouseEnter");},this);},_onCellMouseEnter:function(e){this._displayDetails(e.target);},postCreate:function(){this.inherited(arguments);_4.style(this.codeHeader,"display",this.showCode?"":"none");_4.style(this.codeNode,"display",this.showCode?"":"none");_4.style(this.entityHeader,"display",this.showEntityName?"":"none");_4.style(this.entityNode,"display",this.showEntityName?"":"none");if(!this.showPreview){_4.style(this.previewNode,"display","none");}},_setCurrent:function(_12){this.inherited(arguments);if(this.showPreview){this._displayDetails(_12);}},_displayDetails:function(_13){var dye=this._getDye(_13);if(dye){var _14=dye.getValue();var _15=dye._alias;this.previewNode.innerHTML=_14;this.codeNode.innerHTML="&amp;#"+parseInt(_14.charCodeAt(0),10)+";";this.entityNode.innerHTML="&amp;"+_15+";";var _16=_4.i18n.getLocalization("dojox.editor.plugins","latinEntities");this.descNode.innerHTML=_16[_15].replace("\n","<br>");}else{this.previewNode.innerHTML="";this.codeNode.innerHTML="";this.entityNode.innerHTML="";this.descNode.innerHTML="";}}});_4.declare("dojox.editor.plugins.LatinEntity",null,{constructor:function(_17){this._alias=_17;},getValue:function(){return "&"+this._alias+";";},fillCell:function(_18){_18.innerHTML=this.getValue();}});}}};});