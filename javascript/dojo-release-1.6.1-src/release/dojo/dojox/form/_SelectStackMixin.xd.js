/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.form._SelectStackMixin"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.form._SelectStackMixin"]){_4._hasResource["dojox.form._SelectStackMixin"]=true;_4.provide("dojox.form._SelectStackMixin");_4.declare("dojox.form._SelectStackMixin",null,{stackId:"",stackPrefix:"",_paneIdFromOption:function(_7){return (this.stackPrefix||"")+_7;},_optionValFromPane:function(id){var sp=this.stackPrefix;if(sp&&id.indexOf(sp)===0){return id.substring(sp.length);}return id;},_togglePane:function(_8,_9){if(_8._shown!=undefined&&_8._shown==_9){return;}var _a=_4.filter(_8.getDescendants(),"return item.name;");if(!_9){_b={};_4.forEach(_a,function(w){_b[w.id]=w.disabled;w.set("disabled",true);});_8._savedStates=_b;}else{var _b=_8._savedStates||{};_4.forEach(_a,function(w){var _c=_b[w.id];if(_c==undefined){_c=false;}w.set("disabled",_c);});delete _8._savedStates;}_8._shown=_9;},_connectTitle:function(_d,_e){var fx=_4.hitch(this,function(_f){this.updateOption({value:_e,label:_f});});if(_d._setTitleAttr){this.connect(_d,"_setTitleAttr",fx);}else{this.connect(_d,"attr",function(_10,val){if(_10=="title"&&arguments.length>1){fx(val);}});}},onAddChild:function(_11,_12){if(!this._panes[_11.id]){this._panes[_11.id]=_11;var v=this._optionValFromPane(_11.id);this.addOption({value:v,label:_11.title});this._connectTitle(_11,v);}if(!_11.onShow||!_11.onHide||_11._shown==undefined){_11.onShow=_4.hitch(this,"_togglePane",_11,true);_11.onHide=_4.hitch(this,"_togglePane",_11,false);_11.onHide();}},_setValueAttr:function(v){if("_savedValue" in this){return;}this.inherited(arguments);},attr:function(_13,_14){if(_13=="value"&&arguments.length==2&&"_savedValue" in this){this._savedValue=_14;}return this.inherited(arguments);},onRemoveChild:function(_15){if(this._panes[_15.id]){delete this._panes[_15.id];this.removeOption(this._optionValFromPane(_15.id));}},onSelectChild:function(_16){this._setValueAttr(this._optionValFromPane(_16.id));},onStartup:function(_17){var _18=_17.selected;this.addOption(_4.filter(_4.map(_17.children,function(c){var v=this._optionValFromPane(c.id);this._connectTitle(c,v);var _19=null;if(!this._panes[c.id]){this._panes[c.id]=c;_19={value:v,label:c.title};}if(!c.onShow||!c.onHide||c._shown==undefined){c.onShow=_4.hitch(this,"_togglePane",c,true);c.onHide=_4.hitch(this,"_togglePane",c,false);c.onHide();}if("_savedValue" in this&&v===this._savedValue){_18=c;}return _19;},this),function(i){return i;}));var _1a=this;var fx=function(){delete _1a._savedValue;_1a.onSelectChild(_18);if(!_18._shown){_1a._togglePane(_18,true);}};if(_18!==_17.selected){var _1b=_5.byId(this.stackId);var c=this.connect(_1b,"_showChild",function(sel){this.disconnect(c);fx();});}else{fx();}},postMixInProperties:function(){this._savedValue=this.value;this.inherited(arguments);this.connect(this,"onChange","_handleSelfOnChange");},postCreate:function(){this.inherited(arguments);this._panes={};this._subscriptions=[_4.subscribe(this.stackId+"-startup",this,"onStartup"),_4.subscribe(this.stackId+"-addChild",this,"onAddChild"),_4.subscribe(this.stackId+"-removeChild",this,"onRemoveChild"),_4.subscribe(this.stackId+"-selectChild",this,"onSelectChild")];var _1c=_5.byId(this.stackId);if(_1c&&_1c._started){this.onStartup({children:_1c.getChildren(),selected:_1c.selectedChildWidget});}},destroy:function(){_4.forEach(this._subscriptions,_4.unsubscribe);delete this._panes;this.inherited("destroy",arguments);},_handleSelfOnChange:function(val){var _1d=this._panes[this._paneIdFromOption(val)];if(_1d){var s=_5.byId(this.stackId);if(_1d==s.selectedChildWidget){s._transition(_1d);}else{s.selectChild(_1d);}}}});}}};});