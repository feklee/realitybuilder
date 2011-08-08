/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.mobile.app.ImageThumbView"],["require","dijit._WidgetBase"],["require","dojo.string"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.mobile.app.ImageThumbView"]){_4._hasResource["dojox.mobile.app.ImageThumbView"]=true;_4.provide("dojox.mobile.app.ImageThumbView");_4.experimental("dojox.mobile.app.ImageThumbView");_4.require("dijit._WidgetBase");_4.require("dojo.string");_4.declare("dojox.mobile.app.ImageThumbView",_5._WidgetBase,{items:[],urlParam:"url",labelParam:null,itemTemplate:"<div class=\"mblThumbInner\">"+"<div class=\"mblThumbOverlay\"></div>"+"<div class=\"mblThumbMask\">"+"<div class=\"mblThumbSrc\" style=\"background-image:url(${url})\"></div>"+"</div>"+"</div>",minPadding:4,maxPerRow:3,maxRows:-1,baseClass:"mblImageThumbView",thumbSize:"medium",animationEnabled:true,selectedIndex:-1,cache:null,cacheMustMatch:false,clickEvent:"onclick",cacheBust:false,disableHide:false,constructor:function(_7,_8){},postCreate:function(){this.inherited(arguments);var _9=this;var _a="mblThumbHover";this.addThumb=_4.hitch(this,this.addThumb);this.handleImgLoad=_4.hitch(this,this.handleImgLoad);this.hideCached=_4.hitch(this,this.hideCached);this._onLoadImages={};this.cache=[];this.visibleImages=[];this._cacheCounter=0;this.connect(this.domNode,this.clickEvent,function(_b){var _c=_9._getItemNodeFromEvent(_b);if(_c&&!_c._cached){_9.onSelect(_c._item,_c._index,_9.items);_4.query(".selected",this.domNode).removeClass("selected");_4.addClass(_c,"selected");}});_4.addClass(this.domNode,this.thumbSize);this.resize();this.render();},onSelect:function(_d,_e,_f){},_setAnimationEnabledAttr:function(_10){this.animationEnabled=_10;_4[_10?"addClass":"removeClass"](this.domNode,"animated");},_setItemsAttr:function(_11){this.items=_11||[];var _12={};var i;for(i=0;i<this.items.length;i++){_12[this.items[i][this.urlParam]]=1;}var _13=[];for(var url in this._onLoadImages){if(!_12[url]&&this._onLoadImages[url]._conn){_4.disconnect(this._onLoadImages[url]._conn);this._onLoadImages[url].src=null;_13.push(url);}}for(i=0;i<_13.length;i++){delete this._onLoadImages[url];}this.render();},_getItemNode:function(_14){while(_14&&!_4.hasClass(_14,"mblThumb")&&_14!=this.domNode){_14=_14.parentNode;}return (_14==this.domNode)?null:_14;},_getItemNodeFromEvent:function(_15){if(_15.touches&&_15.touches.length>0){_15=_15.touches[0];}return this._getItemNode(_15.target);},resize:function(){this._thumbSize=null;this._size=_4.contentBox(this.domNode);this.disableHide=true;this.render();this.disableHide=false;},hideCached:function(){for(var i=0;i<this.cache.length;i++){if(this.cache[i]){_4.style(this.cache[i],"display","none");}}},render:function(){var i;var url;var _16;var _17;while(this.visibleImages&&this.visibleImages.length>0){_17=this.visibleImages.pop();this.cache.push(_17);if(!this.disableHide){_4.addClass(_17,"hidden");}_17._cached=true;}if(this.cache&&this.cache.length>0){setTimeout(this.hideCached,1000);}if(!this.items||this.items.length==0){return;}for(i=0;i<this.items.length;i++){_16=this.items[i];url=(_4.isString(_16)?_16:_16[this.urlParam]);this.addThumb(_16,url,i);if(this.maxRows>0&&(i+1)/this.maxPerRow>=this.maxRows){break;}}if(!this._thumbSize){return;}var _18=0;var row=-1;var _19=this._thumbSize.w+(this.padding*2);var _1a=this._thumbSize.h+(this.padding*2);var _1b=this.thumbNodes=_4.query(".mblThumb",this.domNode);var pos=0;_1b=this.visibleImages;for(i=0;i<_1b.length;i++){if(_1b[i]._cached){continue;}if(pos%this.maxPerRow==0){row++;}_18=pos%this.maxPerRow;this.place(_1b[i],(_18*_19)+this.padding,(row*_1a)+this.padding);if(!_1b[i]._loading){_4.removeClass(_1b[i],"hidden");}if(pos==this.selectedIndex){_4[pos==this.selectedIndex?"addClass":"removeClass"](_1b[i],"selected");}pos++;}var _1c=Math.ceil(pos/this.maxPerRow);this._numRows=_1c;this.setContainerHeight((_1c*(this._thumbSize.h+this.padding*2)));},setContainerHeight:function(_1d){_4.style(this.domNode,"height",_1d+"px");},addThumb:function(_1e,url,_1f){var _20;var _21=false;if(this.cache.length>0){var _22=false;for(var i=0;i<this.cache.length;i++){if(this.cache[i]._url==url){_20=this.cache.splice(i,1)[0];_22=true;break;}}if(!_20&&!this.cacheMustMatch){_20=this.cache.pop();_4.removeClass(_20,"selected");}else{_21=true;}}if(!_20){_20=_4.create("div",{"class":"mblThumb hidden",innerHTML:_4.string.substitute(this.itemTemplate,{url:url},null,this)},this.domNode);}if(this.labelParam){var _23=_4.query(".mblThumbLabel",_20)[0];if(!_23){_23=_4.create("div",{"class":"mblThumbLabel"},_20);}_23.innerHTML=_1e[this.labelParam]||"";}_4.style(_20,"display","");if(!this.disableHide){_4.addClass(_20,"hidden");}if(!_21){var _24=_4.create("img",{});_24._thumbDiv=_20;_24._conn=_4.connect(_24,"onload",this.handleImgLoad);_24._url=url;_20._loading=true;this._onLoadImages[url]=_24;if(_24){_24.src=url;}}this.visibleImages.push(_20);_20._index=_1f;_20._item=_1e;_20._url=url;_20._cached=false;if(!this._thumbSize){this._thumbSize=_4.marginBox(_20);if(this._thumbSize.h==0){this._thumbSize.h=100;this._thumbSize.w=100;}if(this.labelParam){this._thumbSize.h+=8;}this.calcPadding();}},handleImgLoad:function(_25){var img=_25.target;_4.disconnect(img._conn);_4.removeClass(img._thumbDiv,"hidden");img._thumbDiv._loading=false;img._conn=null;var url=img._url;if(this.cacheBust){url+=(url.indexOf("?")>-1?"&":"?")+"cacheBust="+(new Date()).getTime()+"_"+(this._cacheCounter++);}_4.query(".mblThumbSrc",img._thumbDiv).style("backgroundImage","url("+url+")");delete this._onLoadImages[img._url];},calcPadding:function(){var _26=this._size.w;var _27=this._thumbSize.w;var _28=_27+this.minPadding;this.maxPerRow=Math.floor(_26/_28);this.padding=Math.floor((_26-(_27*this.maxPerRow))/(this.maxPerRow*2));},place:function(_29,x,y){_4.style(_29,{"-webkit-transform":"translate("+x+"px,"+y+"px)"});},destroy:function(){var img;var _2a=0;for(var url in this._onLoadImages){img=this._onLoadImages[url];if(img){img.src=null;_2a++;}}this.inherited(arguments);}});}}};});