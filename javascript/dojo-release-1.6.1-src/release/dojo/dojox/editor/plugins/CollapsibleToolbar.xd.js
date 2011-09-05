/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.CollapsibleToolbar"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._editor._Plugin"],["require","dijit.form.Button"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","CollapsibleToolbar",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.CollapsibleToolbar"]){_4._hasResource["dojox.editor.plugins.CollapsibleToolbar"]=true;_4.provide("dojox.editor.plugins.CollapsibleToolbar");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dijit._editor._Plugin");_4.require("dijit.form.Button");_4.require("dojo.i18n");_4.declare("dojox.editor.plugins._CollapsibleToolbarButton",[_5._Widget,_5._Templated],{templateString:"<div tabindex='0' role='button' title='${title}' class='${buttonClass}' "+"dojoAttachEvent='ondijitclick: onClick'><span class='${textClass}'>${text}</span></div>",title:"",buttonClass:"",text:"",textClass:"",onClick:function(e){}});_4.declare("dojox.editor.plugins.CollapsibleToolbar",_5._editor._Plugin,{_myWidgets:null,setEditor:function(_7){this.editor=_7;this._constructContainer();},_constructContainer:function(){var _8=_4.i18n.getLocalization("dojox.editor.plugins","CollapsibleToolbar");this._myWidgets=[];var _9=_4.create("table",{style:{width:"100%"},tabindex:-1,"class":"dojoxCollapsibleToolbarContainer"});var _a=_4.create("tbody",{tabindex:-1},_9);var _b=_4.create("tr",{tabindex:-1},_a);var _c=_4.create("td",{"class":"dojoxCollapsibleToolbarControl",tabindex:-1},_b);var _d=_4.create("td",{"class":"dojoxCollapsibleToolbarControl",tabindex:-1},_b);var _e=_4.create("td",{style:{width:"100%"},tabindex:-1},_b);var m=_4.create("span",{style:{width:"100%"},tabindex:-1},_e);var _f=new _6.editor.plugins._CollapsibleToolbarButton({buttonClass:"dojoxCollapsibleToolbarCollapse",title:_8.collapse,text:"-",textClass:"dojoxCollapsibleToolbarCollapseText"});_4.place(_f.domNode,_c);var _10=new _6.editor.plugins._CollapsibleToolbarButton({buttonClass:"dojoxCollapsibleToolbarExpand",title:_8.expand,text:"+",textClass:"dojoxCollapsibleToolbarExpandText"});_4.place(_10.domNode,_d);this._myWidgets.push(_f);this._myWidgets.push(_10);_4.style(_d,"display","none");_4.place(_9,this.editor.toolbar.domNode,"after");_4.place(this.editor.toolbar.domNode,m);this.openTd=_c;this.closeTd=_d;this.menu=m;this.connect(_f,"onClick","_onClose");this.connect(_10,"onClick","_onOpen");},_onClose:function(e){if(e){_4.stopEvent(e);}var _11=_4.marginBox(this.editor.domNode);_4.style(this.openTd,"display","none");_4.style(this.closeTd,"display","");_4.style(this.menu,"display","none");this.editor.resize({h:_11.h});if(_4.isIE){this.editor.header.className=this.editor.header.className;this.editor.footer.className=this.editor.footer.className;}_5.focus(this.closeTd.firstChild);},_onOpen:function(e){if(e){_4.stopEvent(e);}var _12=_4.marginBox(this.editor.domNode);_4.style(this.closeTd,"display","none");_4.style(this.openTd,"display","");_4.style(this.menu,"display","");this.editor.resize({h:_12.h});if(_4.isIE){this.editor.header.className=this.editor.header.className;this.editor.footer.className=this.editor.footer.className;}_5.focus(this.openTd.firstChild);},destroy:function(){this.inherited(arguments);if(this._myWidgets){while(this._myWidgets.length){this._myWidgets.pop().destroy();}delete this._myWidgets;}}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _13=o.args.name.toLowerCase();if(_13==="collapsibletoolbar"){o.plugin=new _6.editor.plugins.CollapsibleToolbar({});}});}}};});