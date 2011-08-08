/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo._base.event"],["require","dojo._base.connect"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo._base.event"]){_4._hasResource["dojo._base.event"]=true;_4.provide("dojo._base.event");_4.require("dojo._base.connect");(function(){var _7=(_4._event_listener={add:function(_8,_9,fp){if(!_8){return;}_9=_7._normalizeEventName(_9);fp=_7._fixCallback(_9,fp);if(!_4.isIE&&(_9=="mouseenter"||_9=="mouseleave")){var _a=fp;_9=(_9=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(!_4.isDescendant(e.relatedTarget,_8)){return _a.call(this,e);}};}_8.addEventListener(_9,fp,false);return fp;},remove:function(_b,_c,_d){if(_b){_c=_7._normalizeEventName(_c);if(!_4.isIE&&(_c=="mouseenter"||_c=="mouseleave")){_c=(_c=="mouseenter")?"mouseover":"mouseout";}_b.removeEventListener(_c,_d,false);}},_normalizeEventName:function(_e){return _e.slice(0,2)=="on"?_e.slice(2):_e;},_fixCallback:function(_f,fp){return _f!="keypress"?fp:function(e){return fp.call(this,_7._fixEvent(e,this));};},_fixEvent:function(evt,_10){switch(evt.type){case "keypress":_7._setKeyChar(evt);break;}return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode>=32?String.fromCharCode(evt.charCode):"";evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});_4.fixEvent=function(evt,_11){return _7._fixEvent(evt,_11);};_4.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};var _12=_4._listener;_4._connect=function(obj,_13,_14,_15,_16){var _17=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=_17?(_16?2:1):0,l=[_4._listener,_7,_12][lid];var h=l.add(obj,_13,_4.hitch(_14,_15));return [obj,_13,h,lid];};_4._disconnect=function(obj,_18,_19,_1a){([_4._listener,_7,_12][_1a]).remove(obj,_18,_19);};_4.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:_4.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:_4.isMac&&!_4.isAIR?(_4.isSafari?91:224):17};var _1b=_4.isMac?"metaKey":"ctrlKey";_4.isCopyKey=function(e){return e[_1b];};if(_4.isIE<9||(_4.isIE&&_4.isQuirks)){_4.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_1c){return e.button&_1c;},isLeft:function(e){return e.button&1;},isMiddle:function(e){return e.button&4;},isRight:function(e){return e.button&2;}};}else{_4.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_1d){return e.button==_1d;},isLeft:function(e){return e.button==0;},isMiddle:function(e){return e.button==1;},isRight:function(e){return e.button==2;}};}if(_4.isIE){var _1e=function(e,_1f){try{return (e.keyCode=_1f);}catch(e){return 0;}};var iel=_4._listener;var _20=(_4._ieListenersName="_"+_4._scopeName+"_listeners");if(!_4.config._allow_leaks){_12=iel=_4._ie_listener={handlers:[],add:function(_21,_22,_23){_21=_21||_4.global;var f=_21[_22];if(!f||!f[_20]){var d=_4._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[_20]=[];f=_21[_22]=d;}return f[_20].push(ieh.push(_23)-1);},remove:function(_24,_25,_26){var f=(_24||_4.global)[_25],l=f&&f[_20];if(f&&l&&_26--){delete ieh[l[_26]];delete l[_26];}}};var ieh=iel.handlers;}_4.mixin(_7,{add:function(_27,_28,fp){if(!_27){return;}_28=_7._normalizeEventName(_28);if(_28=="onkeypress"){var kd=_27.onkeydown;if(!kd||!kd[_20]||!kd._stealthKeydownHandle){var h=_7.add(_27,"onkeydown",_7._stealthKeyDown);kd=_27.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}return iel.add(_27,_28,_7._fixCallback(fp));},remove:function(_29,_2a,_2b){_2a=_7._normalizeEventName(_2a);iel.remove(_29,_2a,_2b);if(_2a=="onkeypress"){var kd=_29.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(_29,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(_2c){return _2c.slice(0,2)!="on"?"on"+_2c:_2c;},_nop:function(){},_fixEvent:function(evt,_2d){if(!evt){var w=_2d&&(_2d.ownerDocument||_2d.document||_2d).parentWindow||window;evt=w.event;}if(!evt){return (evt);}evt.target=evt.srcElement;evt.currentTarget=(_2d||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var _2e=((_4.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var _2f=_4._getIeDocumentElementOffset();evt.pageX=evt.clientX+_4._fixIeBiDiScrollLeft(_2e.scrollLeft||0)-_2f.x;evt.pageY=evt.clientY+(_2e.scrollTop||0)-_2f.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}if(_4.isIE<9||_4.isQuirks){evt.stopPropagation=_7._stopPropagation;evt.preventDefault=_7._preventDefault;}return _7._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case "keypress":var c=("charCode" in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else{if(c==13||c==27){c=0;}else{if(c==3){c=99;}}}evt.charCode=c;_7._setKeyChar(evt);break;}return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[_20]){return;}var k=evt.keyCode;var _30=(k!=13||(_4.isIE>=9&&!_4.isQuirks))&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_30||evt.ctrlKey){var c=_30?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=_7._punctMap[c]||c;}}}}var _31=_7._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});kp.call(evt.currentTarget,_31);if(_4.isIE<9||(_4.isIE&&_4.isQuirks)){evt.cancelBubble=_31.cancelBubble;}evt.returnValue=_31.returnValue;_1e(evt,_31.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_1e(this,0);}this.returnValue=false;}});_4.stopEvent=(_4.isIE<9||_4.isQuirks)?function(evt){evt=evt||window.event;_7._stopPropagation.call(evt);_7._preventDefault.call(evt);}:_4.stopEvent;}_7._synthesizeEvent=function(evt,_32){var _33=_4.mixin({},evt,_32);_7._setKeyChar(_33);_33.preventDefault=function(){evt.preventDefault();};_33.stopPropagation=function(){evt.stopPropagation();};return _33;};if(_4.isOpera){_4.mixin(_7,{_fixEvent:function(evt,_34){switch(evt.type){case "keypress":var c=evt.which;if(c==3){c=99;}c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}return _7._synthesizeEvent(evt,{charCode:c});}return evt;}});}if(_4.isWebKit){_7._add=_7.add;_7._remove=_7.remove;_4.mixin(_7,{add:function(_35,_36,fp){if(!_35){return;}var _37=_7._add(_35,_36,fp);if(_7._normalizeEventName(_36)=="keypress"){_37._stealthKeyDownHandle=_7._add(_35,"keydown",function(evt){var k=evt.keyCode;var _38=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_38||evt.ctrlKey){var c=_38?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=_7._punctMap[c]||c;}}}}var _39=_7._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});fp.call(evt.currentTarget,_39);}});}return _37;},remove:function(_3a,_3b,_3c){if(_3a){if(_3c._stealthKeyDownHandle){_7._remove(_3a,"keydown",_3c._stealthKeyDownHandle);}_7._remove(_3a,_3b,_3c);}},_fixEvent:function(evt,_3d){switch(evt.type){case "keypress":if(evt.faux){return evt;}var c=evt.charCode;c=c>=32?c:0;return _7._synthesizeEvent(evt,{charCode:c,faux:true});}return evt;}});}})();if(_4.isIE){_4._ieDispatcher=function(_3e,_3f){var ap=Array.prototype,h=_4._ie_listener.handlers,c=_3e.callee,ls=c[_4._ieListenersName],t=h[c.target];var r=t&&t.apply(_3f,_3e);var lls=[].concat(ls);for(var i in lls){var f=h[lls[i]];if(!(i in ap)&&f){f.apply(_3f,_3e);}}return r;};_4._getIeDispatcher=function(){return new Function(_4._scopeName+"._ieDispatcher(arguments, this)");};_4._event_listener._fixCallback=function(fp){var f=_4._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};};}}}};});