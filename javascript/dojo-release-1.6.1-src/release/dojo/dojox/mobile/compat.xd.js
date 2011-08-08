/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.compat"],["require","dijit._base.sniff"],["require","dojo._base.fx"],["require","dojo.fx"],["require","dojox.fx.flip"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.compat"]){_4._hasResource["dojox.mobile.compat"]=true;_4.provide("dojox.mobile.compat");_4.require("dijit._base.sniff");_4.require("dojo._base.fx");_4.require("dojo.fx");_4.require("dojox.fx.flip");if(!_4.isWebKit){_4.extend(_6.mobile.View,{_doTransition:function(_7,_8,_9,_a){var _b;this.wakeUp(_8);if(!_9||_9=="none"){_8.style.display="";_7.style.display="none";_8.style.left="0px";this.invokeCallback();}else{if(_9=="slide"){var w=_7.offsetWidth;var s1=_4.fx.slideTo({node:_7,duration:400,left:-w*_a,top:_7.offsetTop});var s2=_4.fx.slideTo({node:_8,duration:400,left:0});_8.style.position="absolute";_8.style.left=w*_a+"px";_8.style.display="";_b=_4.fx.combine([s1,s2]);_4.connect(_b,"onEnd",this,function(){_7.style.display="none";_8.style.position="relative";this.invokeCallback();});_b.play();}else{if(_9=="flip"){_b=_6.fx.flip({node:_7,dir:"right",depth:0.5,duration:400});_8.style.position="absolute";_8.style.left="0px";_4.connect(_b,"onEnd",this,function(){_7.style.display="none";_8.style.position="relative";_8.style.display="";this.invokeCallback();});_b.play();}else{if(_9=="fade"){_b=_4.fx.chain([_4.fadeOut({node:_7,duration:600}),_4.fadeIn({node:_8,duration:600})]);_8.style.position="absolute";_8.style.left="0px";_8.style.display="";_4.style(_8,"opacity",0);_4.connect(_b,"onEnd",this,function(){_7.style.display="none";_8.style.position="relative";_4.style(_7,"opacity",1);this.invokeCallback();});_b.play();}}}}},wakeUp:function(_c){if(_4.isIE&&!_c._wokeup){_c._wokeup=true;var _d=_c.style.display;_c.style.display="";var _e=_c.getElementsByTagName("*");for(var i=0,_f=_e.length;i<_f;i++){var val=_e[i].style.display;_e[i].style.display="none";_e[i].style.display="";_e[i].style.display=val;}_c.style.display=_d;}}});_4.extend(_6.mobile.Switch,{buildRendering:function(){this.domNode=this.srcNodeRef||_4.doc.createElement("DIV");this.domNode.className="mblSwitch";this.domNode.innerHTML="<div class=\"mblSwitchInner\">"+"<div class=\"mblSwitchBg mblSwitchBgLeft\">"+"<div class=\"mblSwitchCorner mblSwitchCorner1T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3T\"></div>"+"<div class=\"mblSwitchText mblSwitchTextLeft\">"+this.leftLabel+"</div>"+"<div class=\"mblSwitchCorner mblSwitchCorner1B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3B\"></div>"+"</div>"+"<div class=\"mblSwitchBg mblSwitchBgRight\">"+"<div class=\"mblSwitchCorner mblSwitchCorner1T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3T\"></div>"+"<div class=\"mblSwitchText mblSwitchTextRight\">"+this.rightLabel+"</div>"+"<div class=\"mblSwitchCorner mblSwitchCorner1B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3B\"></div>"+"</div>"+"<div class=\"mblSwitchKnobContainer\">"+"<div class=\"mblSwitchCorner mblSwitchCorner1T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2T\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3T\"></div>"+"<div class=\"mblSwitchKnob\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner1B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner2B\"></div>"+"<div class=\"mblSwitchCorner mblSwitchCorner3B\"></div>"+"</div>"+"</div>";var n=this.inner=this.domNode.firstChild;this.left=n.childNodes[0];this.right=n.childNodes[1];this.knob=n.childNodes[2];_4.addClass(this.domNode,(this.value=="on")?"mblSwitchOn":"mblSwitchOff");this[this.value=="off"?"left":"right"].style.display="none";},_changeState:function(_10){if(!this.inner.parentNode||!this.inner.parentNode.tagName){_4.addClass(this.domNode,(_10=="on")?"mblSwitchOn":"mblSwitchOff");return;}var pos;if(this.inner.offsetLeft==0){if(_10=="on"){return;}pos=-53;}else{if(_10=="off"){return;}pos=0;}var a=_4.fx.slideTo({node:this.inner,duration:500,left:pos});var _11=this;_4.connect(a,"onEnd",function(){_11[_10=="off"?"left":"right"].style.display="none";});a.play();}});if(_4.isIE||_4.isBB){_4.extend(_6.mobile.RoundRect,{buildRendering:function(){_6.mobile.createRoundRect(this);this.domNode.className="mblRoundRect";}});_6.mobile.RoundRectList._addChild=_6.mobile.RoundRectList.prototype.addChild;_4.extend(_6.mobile.RoundRectList,{buildRendering:function(){_6.mobile.createRoundRect(this,true);this.domNode.className="mblRoundRectList";},postCreate:function(){this.redrawBorders();},addChild:function(_12){_6.mobile.RoundRectList._addChild.apply(this,arguments);this.redrawBorders();if(_6.mobile.applyPngFilter){_6.mobile.applyPngFilter(_12.domNode);}},redrawBorders:function(){var _13=false;for(var i=this.containerNode.childNodes.length-1;i>=0;i--){var c=this.containerNode.childNodes[i];if(c.tagName=="LI"){c.style.borderBottomStyle=_13?"solid":"none";_13=true;}}}});_4.extend(_6.mobile.EdgeToEdgeList,{buildRendering:function(){this.domNode=this.containerNode=this.srcNodeRef||_4.doc.createElement("UL");this.domNode.className="mblEdgeToEdgeList";}});if(_6.mobile.IconContainer){_6.mobile.IconContainer._addChild=_6.mobile.IconContainer.prototype.addChild;_4.extend(_6.mobile.IconContainer,{addChild:function(_14){_6.mobile.IconContainer._addChild.apply(this,arguments);if(_6.mobile.applyPngFilter){_6.mobile.applyPngFilter(_14.domNode);}}});}_4.mixin(_6.mobile,{createRoundRect:function(_15,_16){var i;_15.domNode=_4.doc.createElement("DIV");_15.domNode.style.padding="0px";_15.domNode.style.backgroundColor="transparent";_15.domNode.style.borderStyle="none";_15.containerNode=_4.doc.createElement(_16?"UL":"DIV");_15.containerNode.className="mblRoundRectContainer";if(_15.srcNodeRef){_15.srcNodeRef.parentNode.replaceChild(_15.domNode,_15.srcNodeRef);for(i=0,len=_15.srcNodeRef.childNodes.length;i<len;i++){_15.containerNode.appendChild(_15.srcNodeRef.removeChild(_15.srcNodeRef.firstChild));}_15.srcNodeRef=null;}_15.domNode.appendChild(_15.containerNode);for(i=0;i<=5;i++){var top=_4.create("DIV");top.className="mblRoundCorner mblRoundCorner"+i+"T";_15.domNode.insertBefore(top,_15.containerNode);var _17=_4.create("DIV");_17.className="mblRoundCorner mblRoundCorner"+i+"B";_15.domNode.appendChild(_17);}}});if(_6.mobile.ScrollableView){_4.extend(_6.mobile.ScrollableView,{postCreate:function(){var _18=_4.create("DIV",{className:"mblDummyForIE",innerHTML:"&nbsp;"},this.containerNode,"first");_4.style(_18,{position:"relative",marginBottom:"-2px",fontSize:"1px"});}});}}if(_4.isIE<=6){_6.mobile.applyPngFilter=function(_19){_19=_19||_4.body();var _1a=_19.getElementsByTagName("IMG");var _1b=_4.moduleUrl("dojo","resources/blank.gif");for(var i=0,len=_1a.length;i<len;i++){var img=_1a[i];var w=img.offsetWidth;var h=img.offsetHeight;if(w===0||h===0){if(_4.style(img,"display")!="none"){continue;}img.style.display="";w=img.offsetWidth;h=img.offsetHeight;img.style.display="none";if(w===0||h===0){continue;}}var src=img.src;if(src.indexOf("resources/blank.gif")!=-1){continue;}img.src=_1b;img.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"')";img.style.width=w+"px";img.style.height=h+"px";}};}_6.mobile.loadCss=function(_1c){if(!_4.global._loadedCss){var obj={};_4.forEach(_6.mobile.getCssPaths(),function(_1d){obj[_1d]=true;});_4.global._loadedCss=obj;}if(!_4.isArray(_1c)){_1c=[_1c];}for(var i=0;i<_1c.length;i++){var _1e=_1c[i];if(!_4.global._loadedCss[_1e]){_4.global._loadedCss[_1e]=true;if(_4.doc.createStyleSheet){setTimeout(function(_1f){return function(){_4.doc.createStyleSheet(_1f);};}(_1e),0);}else{var _20=_4.doc.createElement("link");_20.href=_1e;_20.type="text/css";_20.rel="stylesheet";var _21=_4.doc.getElementsByTagName("head")[0];_21.appendChild(_20);}}}};_6.mobile.getCssPaths=function(){var _22=[];var i,j;var s=_4.doc.styleSheets;for(i=0;i<s.length;i++){var r=s[i].cssRules||s[i].imports;if(!r){continue;}for(j=0;j<r.length;j++){if(r[j].href){_22.push(r[j].href);}}}var _23=_4.doc.getElementsByTagName("link");for(i=0,len=_23.length;i<len;i++){if(_23[i].href){_22.push(_23[i].href);}}return _22;};_6.mobile.loadCompatPattern=/\/themes\/(domButtons|buttons|iphone|android).*\.css$/;_6.mobile.loadCompatCssFiles=function(){var _24=_6.mobile.getCssPaths();for(var i=0;i<_24.length;i++){var _25=_24[i];if(_25.match(_6.mobile.loadCompatPattern)&&_25.indexOf("-compat.css")==-1){var _26=_25.substring(0,_25.length-4)+"-compat.css";_6.mobile.loadCss(_26);}}};_6.mobile.hideAddressBar=function(){};_4.addOnLoad(function(){if(_4.config["mblLoadCompatCssFiles"]!==false){_6.mobile.loadCompatCssFiles();}if(_6.mobile.applyPngFilter){_6.mobile.applyPngFilter();}});}}}};});