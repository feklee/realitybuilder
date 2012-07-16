/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.FindReplace"],["require","dojo.string"],["require","dijit.TooltipDialog"],["require","dijit.Toolbar"],["require","dijit.form.CheckBox"],["require","dijit.form.TextBox"],["require","dijit._editor._Plugin"],["require","dijit.form.Button"],["require","dojox.editor.plugins.ToolbarLineBreak"],["require","dojo.i18n"],["requireLocalization","dojox.editor.plugins","FindReplace",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.FindReplace"]){_4._hasResource["dojox.editor.plugins.FindReplace"]=true;_4.provide("dojox.editor.plugins.FindReplace");_4.require("dojo.string");_4.require("dijit.TooltipDialog");_4.require("dijit.Toolbar");_4.require("dijit.form.CheckBox");_4.require("dijit.form.TextBox");_4.require("dijit._editor._Plugin");_4.require("dijit.form.Button");_4.require("dojox.editor.plugins.ToolbarLineBreak");_4.require("dojo.i18n");_4.experimental("dojox.editor.plugins.FindReplace");_4.declare("dojox.editor.plugins._FindReplaceCloseBox",[_5._Widget,_5._Templated],{btnId:"",widget:null,widgetsInTemplate:true,templateString:"<span style='float: right' class='dijitInline' tabindex='-1'>"+"<button class='dijit dijitReset dijitInline' "+"id='${btnId}' dojoAttachPoint='button' dojoType='dijit.form.Button' tabindex='-1' iconClass='dijitEditorIconsFindReplaceClose' showLabel='false'>X</button>"+"</span>",postMixInProperties:function(){this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.btnId=this.id+"_close";this.inherited(arguments);},startup:function(){this.connect(this.button,"onClick","onClick");},onClick:function(){}});_4.declare("dojox.editor.plugins._FindReplaceTextBox",[_5._Widget,_5._Templated],{textId:"",label:"",toolTip:"",widget:null,widgetsInTemplate:true,templateString:"<span style='white-space: nowrap' class='dijit dijitReset dijitInline dijitEditorFindReplaceTextBox' "+"title='${tooltip}' tabindex='-1'>"+"<label class='dijitLeft dijitInline' for='${textId}' tabindex='-1'>${label}</label>"+"<input dojoType='dijit.form.TextBox' required='false' intermediateChanges='true' class='focusTextBox'"+"tabIndex='0' id='${textId}' dojoAttachPoint='textBox, focusNode' value='' dojoAttachEvent='onKeyPress: _onKeyPress'/>"+"</span>",postMixInProperties:function(){this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.textId=this.id+"_text";this.inherited(arguments);},postCreate:function(){this.textBox.set("value","");this.disabled=this.textBox.get("disabled");this.connect(this.textBox,"onChange","onChange");},_setValueAttr:function(_7){this.value=_7;this.textBox.set("value",_7);},focus:function(){this.textBox.focus();},_setDisabledAttr:function(_8){this.disabled=_8;this.textBox.set("disabled",_8);},onChange:function(_9){this.value=_9;},_onKeyPress:function(_a){var _b=0;var _c=0;if(_a.target&&!_a.ctrlKey&&!_a.altKey&&!_a.shiftKey){if(_a.keyCode==_4.keys.LEFT_ARROW){_b=_a.target.selectionStart;_c=_a.target.selectionEnd;if(_b<_c){_5.selectInputText(_a.target,_b,_b);_4.stopEvent(_a);}}else{if(_a.keyCode==_4.keys.RIGHT_ARROW){_b=_a.target.selectionStart;_c=_a.target.selectionEnd;if(_b<_c){_5.selectInputText(_a.target,_c,_c);_4.stopEvent(_a);}}}}}});_4.declare("dojox.editor.plugins._FindReplaceCheckBox",[_5._Widget,_5._Templated],{checkId:"",label:"",tooltip:"",widget:null,widgetsInTemplate:true,templateString:"<span style='white-space: nowrap' tabindex='-1' "+"class='dijit dijitReset dijitInline dijitEditorFindReplaceCheckBox' title='${tooltip}' >"+"<input dojoType='dijit.form.CheckBox' required=false "+"tabIndex='0' id='${checkId}' dojoAttachPoint='checkBox, focusNode' value=''/>"+"<label tabindex='-1' class='dijitLeft dijitInline' for='${checkId}'>${label}</label>"+"</span>",postMixInProperties:function(){this.id=_5.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.checkId=this.id+"_check";this.inherited(arguments);},postCreate:function(){this.checkBox.set("checked",false);this.disabled=this.checkBox.get("disabled");this.checkBox.isFocusable=function(){return false;};},_setValueAttr:function(_d){this.checkBox.set("value",_d);},_getValueAttr:function(){return this.checkBox.get("value");},focus:function(){this.checkBox.focus();},_setDisabledAttr:function(_e){this.disabled=_e;this.checkBox.set("disabled",_e);}});_4.declare("dojox.editor.plugins._FindReplaceToolbar",_5.Toolbar,{postCreate:function(){this.connectKeyNavHandlers([],[]);this.connect(this.containerNode,"onclick","_onToolbarEvent");this.connect(this.containerNode,"onkeydown","_onToolbarEvent");_4.addClass(this.domNode,"dijitToolbar");},addChild:function(_f,_10){_5._KeyNavContainer.superclass.addChild.apply(this,arguments);},_onToolbarEvent:function(evt){evt.stopPropagation();}});_4.declare("dojox.editor.plugins.FindReplace",[_5._editor._Plugin],{buttonClass:_5.form.ToggleButton,iconClassPrefix:"dijitEditorIconsFindReplace",editor:null,button:null,_frToolbar:null,_closeBox:null,_findField:null,_replaceField:null,_findButton:null,_replaceButton:null,_replaceAllButton:null,_caseSensitive:null,_backwards:null,_promDialog:null,_promDialogTimeout:null,_strings:null,_initButton:function(){this._strings=_4.i18n.getLocalization("dojox.editor.plugins","FindReplace");this.button=new _5.form.ToggleButton({label:this._strings["findReplace"],showLabel:false,iconClass:this.iconClassPrefix+" dijitEditorIconFindString",tabIndex:"-1",onChange:_4.hitch(this,"_toggleFindReplace")});if(_4.isOpera){this.button.set("disabled",true);}this.connect(this.button,"set",_4.hitch(this,function(_11,val){if(_11==="disabled"){this._toggleFindReplace((!val&&this._displayed),true,true);}}));},setEditor:function(_12){this.editor=_12;this._initButton();},toggle:function(){this.button.set("checked",!this.button.get("checked"));},_toggleFindReplace:function(_13,_14,_15){var _16=_4.marginBox(this.editor.domNode);if(_13&&!_4.isOpera){_4.style(this._frToolbar.domNode,"display","block");this._populateFindField();if(!_14){this._displayed=true;}}else{_4.style(this._frToolbar.domNode,"display","none");if(!_14){this._displayed=false;}if(!_15){this.editor.focus();}}this.editor.resize({h:_16.h});},_populateFindField:function(){var ed=this.editor;var win=ed.window;var _17=_4.withGlobal(ed.window,"getSelectedText",_5._editor.selection,[null]);if(this._findField&&this._findField.textBox){if(_17){this._findField.textBox.set("value",_17);}this._findField.textBox.focus();_5.selectInputText(this._findField.textBox.focusNode);}},setToolbar:function(_18){this.inherited(arguments);if(!_4.isOpera){var _19=this._frToolbar=new _6.editor.plugins._FindReplaceToolbar();_4.style(_19.domNode,"display","none");_4.place(_19.domNode,_18.domNode,"after");_19.startup();this._closeBox=new _6.editor.plugins._FindReplaceCloseBox();_19.addChild(this._closeBox);this._findField=new _6.editor.plugins._FindReplaceTextBox({label:this._strings["findLabel"],tooltip:this._strings["findTooltip"]});_19.addChild(this._findField);this._replaceField=new _6.editor.plugins._FindReplaceTextBox({label:this._strings["replaceLabel"],tooltip:this._strings["replaceTooltip"]});_19.addChild(this._replaceField);_19.addChild(new _6.editor.plugins.ToolbarLineBreak());this._findButton=new _5.form.Button({label:this._strings["findButton"],showLabel:true,iconClass:this.iconClassPrefix+" dijitEditorIconFind"});this._findButton.titleNode.title=this._strings["findButtonTooltip"];_19.addChild(this._findButton);this._replaceButton=new _5.form.Button({label:this._strings["replaceButton"],showLabel:true,iconClass:this.iconClassPrefix+" dijitEditorIconReplace"});this._replaceButton.titleNode.title=this._strings["replaceButtonTooltip"];_19.addChild(this._replaceButton);this._replaceAllButton=new _5.form.Button({label:this._strings["replaceAllButton"],showLabel:true,iconClass:this.iconClassPrefix+" dijitEditorIconReplaceAll"});this._replaceAllButton.titleNode.title=this._strings["replaceAllButtonTooltip"];_19.addChild(this._replaceAllButton);this._caseSensitive=new _6.editor.plugins._FindReplaceCheckBox({label:this._strings["matchCase"],tooltip:this._strings["matchCaseTooltip"]});_19.addChild(this._caseSensitive);this._backwards=new _6.editor.plugins._FindReplaceCheckBox({label:this._strings["backwards"],tooltip:this._strings["backwardsTooltip"]});_19.addChild(this._backwards);this._findButton.set("disabled",true);this._replaceButton.set("disabled",true);this._replaceAllButton.set("disabled",true);this.connect(this._findField,"onChange","_checkButtons");this.connect(this._findField,"onKeyDown","_onFindKeyDown");this.connect(this._replaceField,"onKeyDown","_onReplaceKeyDown");this.connect(this._findButton,"onClick","_find");this.connect(this._replaceButton,"onClick","_replace");this.connect(this._replaceAllButton,"onClick","_replaceAll");this.connect(this._closeBox,"onClick","toggle");this._promDialog=new _5.TooltipDialog();this._promDialog.startup();this._promDialog.set("content","");}},_checkButtons:function(){var _1a=this._findField.get("value");if(_1a){this._findButton.set("disabled",false);this._replaceButton.set("disabled",false);this._replaceAllButton.set("disabled",false);}else{this._findButton.set("disabled",true);this._replaceButton.set("disabled",true);this._replaceAllButton.set("disabled",true);}},_onFindKeyDown:function(evt){if(evt.keyCode==_4.keys.ENTER){this._find();_4.stopEvent(evt);}},_onReplaceKeyDown:function(evt){if(evt.keyCode==_4.keys.ENTER){if(!this._replace()){this._replace();}_4.stopEvent(evt);}},_find:function(_1b){var txt=this._findField.get("value")||"";if(txt){var _1c=this._caseSensitive.get("value");var _1d=this._backwards.get("value");var _1e=this._findText(txt,_1c,_1d);if(!_1e&&_1b){this._promDialog.set("content",_4.string.substitute(this._strings["eofDialogText"],{"0":this._strings["eofDialogTextFind"]}));_5.popup.open({popup:this._promDialog,around:this._findButton.domNode});this._promDialogTimeout=setTimeout(_4.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;_5.popup.close(this._promDialog);}),3000);setTimeout(_4.hitch(this,function(){this.editor.focus();}),0);}return _1e;}return false;},_replace:function(_1f){var _20=false;var ed=this.editor;ed.focus();var txt=this._findField.get("value")||"";var _21=this._replaceField.get("value")||"";if(txt){var _22=this._caseSensitive.get("value");var _23=this._backwards.get("value");var _24=_4.withGlobal(ed.window,"getSelectedText",_5._editor.selection,[null]);if(_4.isMoz){txt=_4.trim(txt);_24=_4.trim(_24);}var _25=this._filterRegexp(txt,!_22);if(_24&&_25.test(_24)){ed.execCommand("inserthtml",_21);_20=true;if(_23){this._findText(_21,_22,_23);_4.withGlobal(ed.window,"collapse",_5._editor.selection,[true]);}}if(!this._find(false)&&_1f){this._promDialog.set("content",_4.string.substitute(this._strings["eofDialogText"],{"0":this._strings["eofDialogTextReplace"]}));_5.popup.open({popup:this._promDialog,around:this._replaceButton.domNode});this._promDialogTimeout=setTimeout(_4.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;_5.popup.close(this._promDialog);}),3000);setTimeout(_4.hitch(this,function(){this.editor.focus();}),0);}return _20;}return null;},_replaceAll:function(_26){var _27=0;var _28=this._backwards.get("value");if(_28){this.editor.placeCursorAtEnd();}else{this.editor.placeCursorAtStart();}if(this._replace(false)){_27++;}var _29=_4.hitch(this,function(){if(this._replace(false)){_27++;setTimeout(_29,10);}else{if(_26){this._promDialog.set("content",_4.string.substitute(this._strings["replaceDialogText"],{"0":""+_27}));_5.popup.open({popup:this._promDialog,around:this._replaceAllButton.domNode});this._promDialogTimeout=setTimeout(_4.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;_5.popup.close(this._promDialog);}),3000);setTimeout(_4.hitch(this,function(){this._findField.focus();this._findField.textBox.focusNode.select();}),0);}}});_29();},_findText:function(txt,_2a,_2b){var ed=this.editor;var win=ed.window;var _2c=false;if(txt){if(win.find){_2c=win.find(txt,_2a,_2b,false,false,false,false);}else{var doc=ed.document;if(doc.selection){this.editor.focus();var _2d=doc.body.createTextRange();var _2e=doc.selection?doc.selection.createRange():null;if(_2e){if(_2b){_2d.setEndPoint("EndToStart",_2e);}else{_2d.setEndPoint("StartToEnd",_2e);}}var _2f=_2a?4:0;if(_2b){_2f=_2f|1;}_2c=_2d.findText(txt,_2d.text.length,_2f);if(_2c){_2d.select();}}}}return _2c;},_filterRegexp:function(_30,_31){var rxp="";var c=null;for(var i=0;i<_30.length;i++){c=_30.charAt(i);switch(c){case "\\":rxp+=c;i++;rxp+=_30.charAt(i);break;case "$":case "^":case "/":case "+":case ".":case "|":case "(":case ")":case "{":case "}":case "[":case "]":rxp+="\\";default:rxp+=c;}}rxp="^"+rxp+"$";if(_31){return new RegExp(rxp,"mi");}else{return new RegExp(rxp,"m");}},updateState:function(){this.button.set("disabled",this.get("disabled"));},destroy:function(){this.inherited(arguments);if(this._promDialogTimeout){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;_5.popup.close(this._promDialog);}if(this._frToolbar){this._frToolbar.destroyRecursive();this._frToolbar=null;}if(this._promDialog){this._promDialog.destroyRecursive();this._promDialog=null;}}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _32=o.args.name.toLowerCase();if(_32==="findreplace"){o.plugin=new _6.editor.plugins.FindReplace({});}});}}};});