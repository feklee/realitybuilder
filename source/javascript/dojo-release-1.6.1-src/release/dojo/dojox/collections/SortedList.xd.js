/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.collections.SortedList"],["require","dojox.collections._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.collections.SortedList"]){_4._hasResource["dojox.collections.SortedList"]=true;_4.provide("dojox.collections.SortedList");_4.require("dojox.collections._base");_6.collections.SortedList=function(_7){var _8=this;var _9={};var q=[];var _a=function(a,b){if(a.key>b.key){return 1;}if(a.key<b.key){return -1;}return 0;};var _b=function(){q=[];var e=_8.getIterator();while(!e.atEnd()){q.push(e.get());}q.sort(_a);};var _c={};this.count=q.length;this.add=function(k,v){if(!_9[k]){_9[k]=new _6.collections.DictionaryEntry(k,v);this.count=q.push(_9[k]);q.sort(_a);}};this.clear=function(){_9={};q=[];this.count=q.length;};this.clone=function(){return new _6.collections.SortedList(this);};this.contains=this.containsKey=function(k){if(_c[k]){return false;}return (_9[k]!=null);};this.containsValue=function(o){var e=this.getIterator();while(!e.atEnd()){var _d=e.get();if(_d.value==o){return true;}}return false;};this.copyTo=function(_e,i){var e=this.getIterator();var _f=i;while(!e.atEnd()){_e.splice(_f,0,e.get());_f++;}};this.entry=function(k){return _9[k];};this.forEach=function(fn,_10){_4.forEach(q,fn,_10);};this.getByIndex=function(i){return q[i].valueOf();};this.getIterator=function(){return new _6.collections.DictionaryIterator(_9);};this.getKey=function(i){return q[i].key;};this.getKeyList=function(){var arr=[];var e=this.getIterator();while(!e.atEnd()){arr.push(e.get().key);}return arr;};this.getValueList=function(){var arr=[];var e=this.getIterator();while(!e.atEnd()){arr.push(e.get().value);}return arr;};this.indexOfKey=function(k){for(var i=0;i<q.length;i++){if(q[i].key==k){return i;}}return -1;};this.indexOfValue=function(o){for(var i=0;i<q.length;i++){if(q[i].value==o){return i;}}return -1;};this.item=function(k){if(k in _9&&!_c[k]){return _9[k].valueOf();}return undefined;};this.remove=function(k){delete _9[k];_b();this.count=q.length;};this.removeAt=function(i){delete _9[q[i].key];_b();this.count=q.length;};this.replace=function(k,v){if(!_9[k]){this.add(k,v);return false;}else{_9[k]=new _6.collections.DictionaryEntry(k,v);_b();return true;}};this.setByIndex=function(i,o){_9[q[i].key].value=o;_b();this.count=q.length;};if(_7){var e=_7.getIterator();while(!e.atEnd()){var _11=e.get();q[q.length]=_9[_11.key]=new _6.collections.DictionaryEntry(_11.key,_11.value);}q.sort(_a);}};}}};});