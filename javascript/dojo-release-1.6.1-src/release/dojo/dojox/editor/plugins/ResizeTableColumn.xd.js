/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.editor.plugins.ResizeTableColumn"],["require","dojox.editor.plugins.TablePlugins"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.editor.plugins.ResizeTableColumn"]){_4._hasResource["dojox.editor.plugins.ResizeTableColumn"]=true;_4.provide("dojox.editor.plugins.ResizeTableColumn");_4.require("dojox.editor.plugins.TablePlugins");_4.declare("dojox.editor.plugins.ResizeTableColumn",_6.editor.plugins.TablePlugins,{constructor:function(){this.isLtr=this.dir?(this.dir=="ltr"):_4._isBodyLtr();this.ruleDiv=_4.create("div",{style:"top: -10000px; z-index: 10001"},_4.body(),"last");},setEditor:function(_7){var _8=this.ruleDiv;this.editor=_7;this.editor.customUndo=true;this.onEditorLoaded();_7.onLoadDeferred.addCallback(_4.hitch(this,function(){this.connect(this.editor.editNode,"onmousemove",function(_9){var _a=_4.coords(_7.iframe,true),ex=_a.x,cx=_9.clientX;if(!this.isDragging){var _b=_9.target;if(_b.tagName&&_b.tagName.toLowerCase()=="td"){var _c=_4.coords(_b),ox=_c.x,ow=_c.w,_d=ex+_c.x-2;if(this.isLtr){_8.headerColumn=true;if(!_24(_b,"first")||cx>ox+ow/2){_d+=ow;_8.headerColumn=false;}}else{_8.headerColumn=false;if(_24(_b,"first")&&cx>ox+ow/2){_d+=ow;_8.headerColumn=true;}}_4.style(_8,{position:"absolute",cursor:"col-resize",display:"block",width:"4px",backgroundColor:"transparent",top:_a.y+_c.y+"px",left:_d+"px",height:_c.h+"px"});this.activeCell=_b;}else{_4.style(_8,{display:"none",top:"-10000px"});}}else{var _e=this.activeCell,_f=_4.coords(_e),ax=_f.x,aw=_f.w,_10=_18(_e),_11,sx,sw,_12=_4.coords(_1c(_e).parentNode),ctx=_12.x,ctw=_12.w;if(_10){_11=_4.coords(_10);sx=_11.x;sw=_11.w;}if(this.isLtr&&((_8.headerColumn&&_10&&ctx<cx&&cx<ax+aw)||((!_10&&ax<cx&&cx<ctx+ctw)||(_10&&ax<cx&&cx<sx+sw)))||!this.isLtr&&((_8.headerColumn&&_10&&ctx>cx&&cx>ax)||((!_10&&ax+aw>cx&&cx>ctx)||(_10&&ax+aw>cx&&cx>sx)))){_4.style(_8,{left:ex+cx+"px"});}}});this.connect(_8,"onmousedown",function(evt){var _13=_4.coords(_7.iframe,true),_14=_4.coords(_1c(this.activeCell));this.isDragging=true;_4.style(_7.editNode,{cursor:"col-resize"});_4.style(_8,{width:"1px",left:evt.clientX+"px",top:_13.y+_14.y+"px",height:_14.h+"px",backgroundColor:"#777"});});this.connect(_8,"onmouseup",function(evt){var _15=this.activeCell,_16=_4.coords(_15),aw=_16.w,ax=_16.x,_17=_18(_15),_19,sx,sw,_1a=_4.coords(_7.iframe),ex=_1a.x,_1b=_1c(_15),_1d=_4.coords(_1b),cs=_1b.getAttribute("cellspacing"),cx=evt.clientX,_1e=_1f(_15),_20,_21,_22;if(!cs||(cs=parseInt(cs,10))<0){cs=2;}if(_17){_19=_4.coords(_17);sx=_19.x;sw=_19.w;_20=_1f(_17);}if(this.isLtr){if(_8.headerColumn){_21=ex+ax+aw-cx;}else{_21=cx-ex-ax;if(_17){_22=ex+sx+sw-cx-cs;}}}else{if(_8.headerColumn){_21=cx-ex-ax;}else{_21=ex+ax+aw-cx;if(_17){_22=cx-ex-sx-cs;}}}this.isDragging=false;_23(_1e,_21);if(_17){if(!_8.headerColumn){_23(_20,_22);}}if(_8.headerColumn&&_24(_15,"first")||_24(_15,"last")){_4.marginBox(_1b,{w:_1d.w+_21-aw});}_23(_1e,_4.coords(_15).w);if(_17){_23(_20,_4.coords(_17).w);}_4.style(_7.editNode,{cursor:"auto"});_4.style(_8,{display:"none",top:"-10000px"});this.activeCell=null;});}));function _24(n,b){var _25=_4.withGlobal(_7.window,"query",_4,["> td",n.parentNode]);switch(b){case "first":return _25[0]==n;case "last":return _25[_25.length-1]==n;default:return false;}};function _18(_26){_26=_26.nextSibling;while(_26){if(_26.tagName&&_26.tagName.toLowerCase()=="td"){break;}_26=_26.nextSibling;}return _26;};function _1c(t){while((t=t.parentNode)&&t.tagName.toLowerCase()!="table"){}return t;};function _1f(t){var tds=_4.withGlobal(_7.window,"query",_4,["td",_1c(t)]),len=tds.length;for(var i=0;i<len;i++){if(_4.coords(tds[i]).x==_4.coords(t).x){return tds[i];}}return null;};function _23(_27,_28){if(_4.isIE){var s=_27.currentStyle,bl=px(_27,s.borderLeftWidth),br=px(_27,s.borderRightWidth),pl=px(_27,s.paddingLeft),pr=px(_27,s.paddingRight);_27.style.width=_28-bl-br-pl-pr;}else{_4.marginBox(_27,{w:_28});}function px(_29,_2a){if(!_2a){return 0;}if(_2a=="medium"){return 1;}if(_2a.slice&&_2a.slice(-2)=="px"){return parseFloat(_2a);}with(_29){var _2b=style.left;var _2c=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=_2a;_2a=style.pixelLeft;}catch(e){_2a=0;}style.left=_2b;runtimeStyle.left=_2c;}return _2a;};};}});_4.subscribe(_5._scopeName+".Editor.getPlugin",null,function(o){if(o.plugin){return;}if(o.args&&o.args.command){var cmd=o.args.command.charAt(0).toLowerCase()+o.args.command.substring(1,o.args.command.length);if(cmd=="resizeTableColumn"){o.plugin=new _6.editor.plugins.ResizeTableColumn({commandName:cmd});}}});}}};});