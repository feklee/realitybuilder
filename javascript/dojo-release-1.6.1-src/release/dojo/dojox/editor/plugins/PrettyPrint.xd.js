/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.PrettyPrint"],["require","dijit._editor._Plugin"],["require","dojox.html.format"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.PrettyPrint"]){_4._hasResource["dojox.editor.plugins.PrettyPrint"]=true;_4.provide("dojox.editor.plugins.PrettyPrint");_4.require("dijit._editor._Plugin");_4.require("dojox.html.format");_4.declare("dojox.editor.plugins.PrettyPrint",_5._editor._Plugin,{indentBy:-1,lineLength:-1,useDefaultCommand:false,entityMap:null,_initButton:function(){delete this.command;},setToolbar:function(_7){},setEditor:function(_8){this.inherited(arguments);var _9=this;this.editor.onLoadDeferred.addCallback(function(){_9.editor._prettyprint_getValue=_9.editor.getValue;_9.editor.getValue=function(){var _a=_9.editor._prettyprint_getValue(arguments);return _6.html.format.prettyPrint(_a,_9.indentBy,_9.lineLength,_9.entityMap,_9.xhtml);};_9.editor._prettyprint_endEditing=_9.editor._endEditing;_9.editor._prettyprint_onBlur=_9.editor._onBlur;_9.editor._endEditing=function(_b){var v=_9.editor._prettyprint_getValue(true);_9.editor._undoedSteps=[];_9.editor._steps.push({text:v,bookmark:_9.editor._getBookmark()});};_9.editor._onBlur=function(e){this.inherited("_onBlur",arguments);var _c=_9.editor._prettyprint_getValue(true);if(_c!=_9.editor.savedContent){_9.editor.onChange(_c);_9.editor.savedContent=_c;}};});}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}var _d=o.args.name.toLowerCase();if(_d==="prettyprint"){o.plugin=new _6.editor.plugins.PrettyPrint({indentBy:("indentBy" in o.args)?o.args.indentBy:-1,lineLength:("lineLength" in o.args)?o.args.lineLength:-1,entityMap:("entityMap" in o.args)?o.args.entityMap:_6.html.entities.html.concat([["¢","cent"],["£","pound"],["€","euro"],["¥","yen"],["©","copy"],["§","sect"],["…","hellip"],["®","reg"]]),xhtml:("xhtml" in o.args)?o.args.xhtml:false});}});}}};});