/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.widget.Loader"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.widget.Loader"]){_4._hasResource["dojox.widget.Loader"]=true;_4.provide("dojox.widget.Loader");_4.deprecated("dojox.widget.Loader","","2.0");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.declare("dojox.widget.Loader",[_5._Widget,_5._Templated],{loadIcon:_4.moduleUrl("dojox.widget.Loader","icons/loading.gif"),loadMessage:"Loading ...",hasVisuals:true,attachToPointer:true,duration:125,_offset:16,_pointerConnect:null,_xhrStart:null,_xhrEnd:null,templateString:"<div dojoAttachPoint=\"loadNode\" class=\"dojoxLoader\">"+"<img src=\"${loadIcon}\" class=\"dojoxLoaderIcon\"> <span dojoAttachPoint=\"loadMessageNode\" class=\"dojoxLoaderMessage\"></span>"+"</div>",postCreate:function(){if(!this.hasVisuals){this.loadNode.style.display="none";}else{if(this.attachToPointer){_4.removeClass(this.loadNode,"dojoxLoader");_4.addClass(this.loadNode,"dojoxLoaderPointer");}this._hide();}this._setMessage(this.loadMessage);this._xhrStart=this.connect(_4,"_ioSetArgs","_show");this._xhrEnd=this.connect(_4.Deferred.prototype,"_fire","_hide");},_setMessage:function(_7){this.loadMessageNode.innerHTML=_7;},_putLoader:function(e){_5.placeOnScreen(this.loadNode,{x:e.clientX+this._offset,y:e.clientY+this._offset},["TL","BR"]);},_show:function(){_4.publish("Loader",[{message:"started"}]);if(this.hasVisuals){if(this.attachToPointer){this._pointerConnect=this.connect(document,"onmousemove","_putLoader");}_4.style(this.loadNode,{opacity:0,display:""});_4.fadeIn({node:this.loadNode,duration:this.duration}).play();}},_hide:function(){_4.publish("Loader",[{message:"ended"}]);if(this.hasVisuals){if(this.attachToPointer){this.disconnect(this._pointerConnect);}_4.fadeOut({node:this.loadNode,duration:this.duration,onEnd:_4.partial(_4.style,this.loadNode,"display","none")}).play();}}});}}};});