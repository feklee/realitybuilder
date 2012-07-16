/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins._SmileyPalette"],["require","dijit._Widget"],["require","dijit._PaletteMixin"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","Smiley",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins._SmileyPalette"]){_4._hasResource["dojox.editor.plugins._SmileyPalette"]=true;_4.provide("dojox.editor.plugins._SmileyPalette");_4.require("dijit._Widget");_4.require("dijit._PaletteMixin");_4.require("dojo.i18n");_4.experimental("dojox.editor.plugins._SmileyPalette");_4.declare("dojox.editor.plugins._SmileyPalette",[_5._Widget,_5._Templated,_5._PaletteMixin],{templateString:"<table class=\"dijitInline dijitEditorSmileyPalette dijitPaletteTable\""+" cellSpacing=0 cellPadding=0><tbody dojoAttachPoint=\"gridNode\"></tbody></table>",baseClass:"dijitEditorSmileyPalette",_palette:[["smile","laughing","wink","grin"],["cool","angry","half","eyebrow"],["frown","shy","goofy","oops"],["tongue","idea","angel","happy"],["yes","no","crying",""]],dyeClass:"dojox.editor.plugins.Emoticon",buildRendering:function(){this.inherited(arguments);var _7=_4.i18n.getLocalization("dojox.editor.plugins","Smiley");var _8={};for(var _9 in _7){if(_9.substr(0,8)=="emoticon"){_8[_9.substr(8).toLowerCase()]=_7[_9];}}this._preparePalette(this._palette,_8);}});_4.declare("dojox.editor.plugins.Emoticon",null,{constructor:function(id){this.id=id;},getValue:function(){return _6.editor.plugins.Emoticon.ascii[this.id];},imgHtml:function(_a){var _b="emoticon"+this.id.substr(0,1).toUpperCase()+this.id.substr(1),_c=_4.moduleUrl("dojox.editor.plugins","resources/emoticons/"+_b+".gif"),_d=_4.i18n.getLocalization("dojox.editor.plugins","Smiley")[_b],_e=["<img src=\"",_c,"\" class=\"",_a,"\" alt=\"",this.getValue(),"\" title=\"",_d,"\">"];return _e.join("");},fillCell:function(_f,_10){_4.place(this.imgHtml("dijitPaletteImg"),_f);}});_6.editor.plugins.Emoticon.ascii={smile:":-)",laughing:"lol",wink:";-)",grin:":-D",cool:"8-)",angry:":-@",half:":-/",eyebrow:"/:)",frown:":-(",shy:":-$",goofy:":-S",oops:":-O",tongue:":-P",idea:"(i)",yes:"(y)",no:"(n)",angel:"0:-)",crying:":'(",happy:"=)"};_6.editor.plugins.Emoticon.fromAscii=function(str){var _11=_6.editor.plugins.Emoticon.ascii;for(var i in _11){if(str==_11[i]){return new _6.editor.plugins.Emoticon(i);}}return null;};}}};});