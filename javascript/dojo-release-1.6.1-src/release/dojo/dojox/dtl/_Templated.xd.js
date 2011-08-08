/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.dtl._Templated"],["require","dijit._Templated"],["require","dojox.dtl._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.dtl._Templated"]){_4._hasResource["dojox.dtl._Templated"]=true;_4.provide("dojox.dtl._Templated");_4.require("dijit._Templated");_4.require("dojox.dtl._base");_4.declare("dojox.dtl._Templated",_5._Templated,{_dijitTemplateCompat:false,buildRendering:function(){var _7;if(this.domNode&&!this._template){return;}if(!this._template){var t=this.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);if(t instanceof _6.dtl.Template){this._template=t;}else{_7=t;}}if(!_7){var _8=new _6.dtl._Context(this);if(!this._created){delete _8._getter;}var _9=_4._toDom(this._template.render(_8));if(_9.nodeType!==1&&_9.nodeType!==3){for(var i=0,l=_9.childNodes.length;i<l;++i){_7=_9.childNodes[i];if(_7.nodeType==1){break;}}}else{_7=_9;}}this._attachTemplateNodes(_7);if(this.widgetsInTemplate){var _a=_4.parser,_b,_c;if(_a._query!="[dojoType]"){_b=_a._query;_c=_a._attrName;_a._query="[dojoType]";_a._attrName="dojoType";}var cw=(this._startupWidgets=_4.parser.parse(_7,{noStart:!this._earlyTemplatedStartup,inherited:{dir:this.dir,lang:this.lang}}));if(_b){_a._query=_b;_a._attrName=_c;}this._supportingWidgets=_5.findWidgets(_7);this._attachTemplateNodes(cw,function(n,p){return n[p];});}if(this.domNode){_4.place(_7,this.domNode,"before");this.destroyDescendants();_4.destroy(this.domNode);}this.domNode=_7;this._fillContent(this.srcNodeRef);},_templateCache:{},getCachedTemplate:function(_d,_e,_f){var _10=this._templateCache;var key=_e||_d;if(_10[key]){return _10[key];}_e=_4.string.trim(_e||_4.cache(_d,{sanitize:true}));if(this._dijitTemplateCompat&&(_f||_e.match(/\$\{([^\}]+)\}/g))){_e=this._stringRepl(_e);}if(_f||!_e.match(/\{[{%]([^\}]+)[%}]\}/g)){return _10[key]=_4._toDom(_e);}else{return _10[key]=new _6.dtl.Template(_e);}},render:function(){this.buildRendering();},startup:function(){_4.forEach(this._startupWidgets,function(w){if(w&&!w._started&&w.startup){w.startup();}});this.inherited(arguments);}});}}};});