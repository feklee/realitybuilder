/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form.FilePickerTextBox"],["require","dojo.window"],["require","dijit.form.ValidationTextBox"],["require","dijit._HasDropDown"],["require","dojox.widget.FilePicker"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form.FilePickerTextBox"]){_4._hasResource["dojox.form.FilePickerTextBox"]=true;_4.provide("dojox.form.FilePickerTextBox");_4.require("dojo.window");_4.require("dijit.form.ValidationTextBox");_4.require("dijit._HasDropDown");_4.require("dojox.widget.FilePicker");_4.declare("dojox.form.FilePickerTextBox",[_5.form.ValidationTextBox,_5._HasDropDown],{baseClass:"dojoxFilePickerTextBox",templateString:_4.cache("dojox.form","resources/FilePickerTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\" tabIndex=\"-1\"\r\n\t><div style=\"overflow:hidden;\"\r\n\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton'\r\n\t\t\tdojoAttachPoint=\"downArrowNode,_buttonNode,_popupStateNode\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\">&thinsp;</div\r\n\t\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div\r\n\t\t></div\r\n\t\t><div class=\"dijitReset dijitValidationIcon\"><br></div\r\n\t\t><div class=\"dijitReset dijitValidationIconText\">&Chi;</div\r\n\t\t><div class=\"dijitReset dijitInputField\"\r\n\t\t\t><input type=\"text\" autocomplete=\"off\" ${!nameAttrSetting} class='dijitReset'\r\n\t\t\t\tdojoAttachEvent='onkeypress:_onKey' \r\n\t\t\t\tdojoAttachPoint='textbox,focusNode' role=\"textbox\" aria-haspopup=\"true\" aria-autocomplete=\"list\"\r\n\t\t/></div\r\n\t></div\r\n></div>\r\n"),searchDelay:500,valueItem:null,numPanes:2.25,postMixInProperties:function(){this.inherited(arguments);this.dropDown=new _6.widget.FilePicker(this.constraints);},postCreate:function(){this.inherited(arguments);this.connect(this.dropDown,"onChange",this._onWidgetChange);this.connect(this.focusNode,"onblur","_focusBlur");this.connect(this.focusNode,"onfocus","_focusFocus");this.connect(this.focusNode,"ondblclick",function(){_5.selectInputText(this.focusNode);});},_setValueAttr:function(_7,_8,_9){if(!this._searchInProgress){this.inherited(arguments);_7=_7||"";var _a=this.dropDown.get("pathValue")||"";if(_7!==_a){this._skip=true;var fx=_4.hitch(this,"_setBlurValue");this.dropDown._setPathValueAttr(_7,!_9,this._settingBlurValue?fx:null);}}},_onWidgetChange:function(_b){if(!_b&&this.focusNode.value){this._hasValidPath=false;this.focusNode.value="";}else{this.valueItem=_b;var _c=this.dropDown._getPathValueAttr(_b);if(_c){this._hasValidPath=true;}if(!this._skip){this._setValueAttr(_c,undefined,true);}delete this._skip;}this.validate();},startup:function(){if(!this.dropDown._started){this.dropDown.startup();}this.inherited(arguments);},openDropDown:function(){this.dropDown.domNode.style.width="0px";if(!("minPaneWidth" in (this.constraints||{}))){this.dropDown.set("minPaneWidth",(this.domNode.offsetWidth/this.numPanes));}this.inherited(arguments);},toggleDropDown:function(){this.inherited(arguments);if(this._opened){this.dropDown.set("pathValue",this.get("value"));}},_focusBlur:function(e){if(e.explicitOriginalTarget==this.focusNode&&!this._allowBlur){window.setTimeout(_4.hitch(this,function(){if(!this._allowBlur){this.focus();}}),1);}else{if(this._menuFocus){this.dropDown._updateClass(this._menuFocus,"Item",{"Hover":false});delete this._menuFocus;}}},_focusFocus:function(e){if(this._menuFocus){this.dropDown._updateClass(this._menuFocus,"Item",{"Hover":false});}delete this._menuFocus;var _d=_5.getFocus(this);if(_d&&_d.node){_d=_5.byNode(_d.node);if(_d){this._menuFocus=_d.domNode;}}if(this._menuFocus){this.dropDown._updateClass(this._menuFocus,"Item",{"Hover":true});}delete this._allowBlur;},_onBlur:function(){this._allowBlur=true;delete this.dropDown._savedFocus;this.inherited(arguments);},_setBlurValue:function(){if(this.dropDown&&!this._settingBlurValue){this._settingBlurValue=true;this.set("value",this.focusNode.value);}else{delete this._settingBlurValue;this.inherited(arguments);}},parse:function(_e,_f){if(this._hasValidPath||this._hasSelection){return _e;}var dd=this.dropDown,_10=dd.topDir,sep=dd.pathSeparator;var _11=dd.get("pathValue");var _12=function(v){if(_10.length&&v.indexOf(_10)===0){v=v.substring(_10.length);}if(sep&&v[v.length-1]==sep){v=v.substring(0,v.length-1);}return v;};_11=_12(_11);var val=_12(_e);if(val==_11){return _e;}return undefined;},_startSearchFromInput:function(){var dd=this.dropDown,fn=this.focusNode;var val=fn.value,_13=val,_14=dd.topDir;if(this._hasSelection){_5.selectInputText(fn,_13.length);}this._hasSelection=false;if(_14.length&&val.indexOf(_14)===0){val=val.substring(_14.length);}var _15=val.split(dd.pathSeparator);var _16=_4.hitch(this,function(idx){var dir=_15[idx];var _17=dd.getChildren()[idx];var _18;this._searchInProgress=true;var _19=_4.hitch(this,function(){delete this._searchInProgress;});if((dir||_17)&&!this._opened){this.toggleDropDown();}if(dir&&_17){var fx=_4.hitch(this,function(){if(_18){this.disconnect(_18);}delete _18;var _1a=_17._menu.getChildren();var _1b=_4.filter(_1a,function(i){return i.label==dir;})[0];var _1c=_4.filter(_1a,function(i){return (i.label.indexOf(dir)===0);})[0];if(_1b&&((_15.length>idx+1&&_1b.children)||(!_1b.children))){idx++;_17._menu.onItemClick(_1b,{type:"internal",stopPropagation:function(){},preventDefault:function(){}});if(_15[idx]){_16(idx);}else{_19();}}else{_17._setSelected(null);if(_1c&&_15.length===idx+1){dd._setInProgress=true;dd._removeAfter(_17);delete dd._setInProgress;var _1d=_1c.label;if(_1c.children){_1d+=dd.pathSeparator;}_1d=_1d.substring(dir.length);window.setTimeout(function(){_4.window.scrollIntoView(_1c.domNode);},1);fn.value=_13+_1d;_5.selectInputText(fn,_13.length);this._hasSelection=true;try{_1c.focusNode.focus();}catch(e){}}else{if(this._menuFocus){this.dropDown._updateClass(this._menuFocus,"Item",{"Hover":false,"Focus":false});}delete this._menuFocus;}_19();}});if(!_17.isLoaded){_18=this.connect(_17,"onLoad",fx);}else{fx();}}else{if(_17){_17._setSelected(null);dd._setInProgress=true;dd._removeAfter(_17);delete dd._setInProgress;}_19();}});_16(0);},_onKey:function(e){if(this.disabled||this.readOnly){return;}var dk=_4.keys;var c=e.charOrCode;if(c==dk.DOWN_ARROW){this._allowBlur=true;}if(c==dk.ENTER&&this._opened){this.dropDown.onExecute();_5.selectInputText(this.focusNode,this.focusNode.value.length);this._hasSelection=false;_4.stopEvent(e);return;}if((c==dk.RIGHT_ARROW||c==dk.LEFT_ARROW||c==dk.TAB)&&this._hasSelection){this._startSearchFromInput();_4.stopEvent(e);return;}this.inherited(arguments);var _1e=false;if((c==dk.BACKSPACE||c==dk.DELETE)&&this._hasSelection){this._hasSelection=false;}else{if(c==dk.BACKSPACE||c==dk.DELETE||c==" "){_1e=true;}else{_1e=e.keyChar!=="";}}if(this._searchTimer){window.clearTimeout(this._searchTimer);}delete this._searchTimer;if(_1e){this._hasValidPath=false;this._hasSelection=false;this._searchTimer=window.setTimeout(_4.hitch(this,"_startSearchFromInput"),this.searchDelay+1);}}});}}};});