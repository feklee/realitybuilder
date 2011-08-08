/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.app.StageController"],["require","dojox.mobile.app.SceneController"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.app.StageController"]){_4._hasResource["dojox.mobile.app.StageController"]=true;_4.provide("dojox.mobile.app.StageController");_4.experimental("dojox.mobile.app.StageController");_4.require("dojox.mobile.app.SceneController");_4.declare("dojox.mobile.app.StageController",null,{scenes:null,effect:"fade",constructor:function(_7){this.domNode=_7;this.scenes=[];if(_4.config.mobileAnim){this.effect=_4.config.mobileAnim;}},getActiveSceneController:function(){return this.scenes[this.scenes.length-1];},pushScene:function(_8,_9){if(this._opInProgress){return;}this._opInProgress=true;var _a=_4.create("div",{"class":"scene-wrapper",style:{visibility:"hidden"}},this.domNode);var _b=new _6.mobile.app.SceneController({},_a);if(this.scenes.length>0){this.scenes[this.scenes.length-1].assistant.deactivate();}this.scenes.push(_b);var _c=this;_4.forEach(this.scenes,this.setZIndex);_b.stageController=this;_b.init(_8,_9).addCallback(function(){if(_c.scenes.length==1){_b.domNode.style.visibility="visible";_c.scenes[_c.scenes.length-1].assistant.activate(_9);_c._opInProgress=false;}else{_c.scenes[_c.scenes.length-2].performTransition(_c.scenes[_c.scenes.length-1].domNode,1,_c.effect,null,function(){_c.scenes[_c.scenes.length-1].assistant.activate(_9);_c._opInProgress=false;});}});},setZIndex:function(_d,_e){_4.style(_d.domNode,"zIndex",_e+1);},popScene:function(_f){if(this._opInProgress){return;}var _10=this;if(this.scenes.length>1){this._opInProgress=true;this.scenes[_10.scenes.length-2].assistant.activate(_f);this.scenes[_10.scenes.length-1].performTransition(_10.scenes[this.scenes.length-2].domNode,-1,this.effect,null,function(){_10._destroyScene(_10.scenes[_10.scenes.length-1]);_10.scenes.splice(_10.scenes.length-1,1);_10._opInProgress=false;});}else{console.log("cannot pop the scene if there is just one");}},popScenesTo:function(_11,_12){if(this._opInProgress){return;}while(this.scenes.length>2&&this.scenes[this.scenes.length-2].sceneName!=_11){this._destroyScene(this.scenes[this.scenes.length-2]);this.scenes.splice(this.scenes.length-2,1);}this.popScene(_12);},_destroyScene:function(_13){_13.assistant.deactivate();_13.assistant.destroy();_13.destroyRecursive();}});}}};});