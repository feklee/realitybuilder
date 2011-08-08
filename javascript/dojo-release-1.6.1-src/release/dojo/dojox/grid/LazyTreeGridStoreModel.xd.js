/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.LazyTreeGridStoreModel"],["require","dijit.tree.ForestStoreModel"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.LazyTreeGridStoreModel"]){_4._hasResource["dojox.grid.LazyTreeGridStoreModel"]=true;_4.provide("dojox.grid.LazyTreeGridStoreModel");_4.require("dijit.tree.ForestStoreModel");_4.declare("dojox.grid.LazyTreeGridStoreModel",_5.tree.ForestStoreModel,{serverStore:false,constructor:function(_7){this.serverStore=_7.serverStore===true?true:false;},mayHaveChildren:function(_8){var _9=null;return _4.some(this.childrenAttrs,function(_a){_9=this.store.getValue(_8,_a);if(_4.isString(_9)){return parseInt(_9,10)>0||_9.toLowerCase()==="true"?true:false;}else{if(typeof _9=="number"){return _9>0;}else{if(typeof _9=="boolean"){return _9;}else{if(this.store.isItem(_9)){_9=this.store.getValues(_8,_a);return _4.isArray(_9)?_9.length>0:false;}else{return false;}}}}},this);},getChildren:function(_b,_c,_d,_e){if(_e){var _f=_e.start||0,_10=_e.count,_11=_e.parentId,_12=_e.sort;if(_b===this.root){this.root.size=0;this.store.fetch({start:_f,count:_10,sort:_12,query:this.query,onBegin:_4.hitch(this,function(_13){this.root.size=_13;}),onComplete:_4.hitch(this,function(_14){_c(_14,_e,this.root.size);}),onError:_d});}else{var _15=this.store;if(!_15.isItemLoaded(_b)){var _16=_4.hitch(this,arguments.callee);_15.loadItem({item:_b,onItem:function(_17){_16(_17,_c,_d,_e);},onError:_d});return;}if(this.serverStore&&!this._isChildrenLoaded(_b)){this.childrenSize=0;this.store.fetch({start:_f,count:_10,sort:_12,query:_4.mixin({parentId:_11},this.query||{}),onBegin:_4.hitch(this,function(_18){this.childrenSize=_18;}),onComplete:_4.hitch(this,function(_19){_c(_19,_e,this.childrenSize);}),onError:_d});}else{this.inherited(arguments);}}}else{this.inherited(arguments);}},_isChildrenLoaded:function(_1a){var _1b=null;return _4.every(this.childrenAttrs,function(_1c){_1b=this.store.getValues(_1a,_1c);return _4.every(_1b,function(c){return this.store.isItemLoaded(c);},this);},this);}});}}};});