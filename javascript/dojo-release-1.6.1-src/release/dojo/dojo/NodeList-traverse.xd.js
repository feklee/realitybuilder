/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.NodeList-traverse"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.NodeList-traverse"]){_4._hasResource["dojo.NodeList-traverse"]=true;_4.provide("dojo.NodeList-traverse");_4.extend(_4.NodeList,{_buildArrayFromCallback:function(_7){var _8=[];for(var i=0;i<this.length;i++){var _9=_7.call(this[i],this[i],_8);if(_9){_8=_8.concat(_9);}}return _8;},_getUniqueAsNodeList:function(_a){var _b=[];for(var i=0,_c;_c=_a[i];i++){if(_c.nodeType==1&&_4.indexOf(_b,_c)==-1){_b.push(_c);}}return this._wrap(_b,null,this._NodeListCtor);},_getUniqueNodeListWithParent:function(_d,_e){var _f=this._getUniqueAsNodeList(_d);_f=(_e?_4._filterQueryResult(_f,_e):_f);return _f._stash(this);},_getRelatedUniqueNodes:function(_10,_11){return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(_11),_10);},children:function(_12){return this._getRelatedUniqueNodes(_12,function(_13,ary){return _4._toArray(_13.childNodes);});},closest:function(_14,_15){return this._getRelatedUniqueNodes(null,function(_16,ary){do{if(_4._filterQueryResult([_16],_14,_15).length){return _16;}}while(_16!=_15&&(_16=_16.parentNode)&&_16.nodeType==1);return null;});},parent:function(_17){return this._getRelatedUniqueNodes(_17,function(_18,ary){return _18.parentNode;});},parents:function(_19){return this._getRelatedUniqueNodes(_19,function(_1a,ary){var _1b=[];while(_1a.parentNode){_1a=_1a.parentNode;_1b.push(_1a);}return _1b;});},siblings:function(_1c){return this._getRelatedUniqueNodes(_1c,function(_1d,ary){var _1e=[];var _1f=(_1d.parentNode&&_1d.parentNode.childNodes);for(var i=0;i<_1f.length;i++){if(_1f[i]!=_1d){_1e.push(_1f[i]);}}return _1e;});},next:function(_20){return this._getRelatedUniqueNodes(_20,function(_21,ary){var _22=_21.nextSibling;while(_22&&_22.nodeType!=1){_22=_22.nextSibling;}return _22;});},nextAll:function(_23){return this._getRelatedUniqueNodes(_23,function(_24,ary){var _25=[];var _26=_24;while((_26=_26.nextSibling)){if(_26.nodeType==1){_25.push(_26);}}return _25;});},prev:function(_27){return this._getRelatedUniqueNodes(_27,function(_28,ary){var _29=_28.previousSibling;while(_29&&_29.nodeType!=1){_29=_29.previousSibling;}return _29;});},prevAll:function(_2a){return this._getRelatedUniqueNodes(_2a,function(_2b,ary){var _2c=[];var _2d=_2b;while((_2d=_2d.previousSibling)){if(_2d.nodeType==1){_2c.push(_2d);}}return _2c;});},andSelf:function(){return this.concat(this._parent);},first:function(){return this._wrap(((this[0]&&[this[0]])||[]),this);},last:function(){return this._wrap((this.length?[this[this.length-1]]:[]),this);},even:function(){return this.filter(function(_2e,i){return i%2!=0;});},odd:function(){return this.filter(function(_2f,i){return i%2==0;});}});}}};});