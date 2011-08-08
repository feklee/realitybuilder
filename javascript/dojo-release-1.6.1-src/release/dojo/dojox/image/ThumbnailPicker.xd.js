/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.image.ThumbnailPicker"],["require","dojox.fx.scroll"],["require","dojo.fx.easing"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.image.ThumbnailPicker"]){_4._hasResource["dojox.image.ThumbnailPicker"]=true;_4.provide("dojox.image.ThumbnailPicker");_4.experimental("dojox.image.ThumbnailPicker");_4.require("dojox.fx.scroll");_4.require("dojo.fx.easing");_4.require("dojo.fx");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.declare("dojox.image.ThumbnailPicker",[_5._Widget,_5._Templated],{imageStore:null,request:null,size:500,thumbHeight:75,thumbWidth:100,useLoadNotifier:false,useHyperlink:false,hyperlinkTarget:"new",isClickable:true,isScrollable:true,isHorizontal:true,autoLoad:true,linkAttr:"link",imageThumbAttr:"imageUrlThumb",imageLargeAttr:"imageUrl",pageSize:20,titleAttr:"title",templateString:_4.cache("dojox.image","resources/ThumbnailPicker.html","<div dojoAttachPoint=\"outerNode\" class=\"thumbOuter\">\r\n\t<div dojoAttachPoint=\"navPrev\" class=\"thumbNav thumbClickable\">\r\n\t  <img src=\"\" dojoAttachPoint=\"navPrevImg\"/>    \r\n\t</div>\r\n\t<div dojoAttachPoint=\"thumbScroller\" class=\"thumbScroller\">\r\n\t  <div dojoAttachPoint=\"thumbsNode\" class=\"thumbWrapper\"></div>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"navNext\" class=\"thumbNav thumbClickable\">\r\n\t  <img src=\"\" dojoAttachPoint=\"navNextImg\"/>  \r\n\t</div>\r\n</div>\r\n"),_thumbs:[],_thumbIndex:0,_maxPhotos:0,_loadedImages:{},postCreate:function(){this.widgetid=this.id;this.inherited(arguments);this.pageSize=Number(this.pageSize);this._scrollerSize=this.size-(51*2);var _7=this._sizeProperty=this.isHorizontal?"width":"height";_4.style(this.outerNode,"textAlign","center");_4.style(this.outerNode,_7,this.size+"px");_4.style(this.thumbScroller,_7,this._scrollerSize+"px");if(this.useHyperlink){_4.subscribe(this.getClickTopicName(),this,function(_8){var _9=_8.index;var _a=this.imageStore.getValue(_8.data,this.linkAttr);if(!_a){return;}if(this.hyperlinkTarget=="new"){window.open(_a);}else{window.location=_a;}});}if(this.isClickable){_4.addClass(this.thumbsNode,"thumbClickable");}this._totalSize=0;this.init();},init:function(){if(this.isInitialized){return false;}var _b=this.isHorizontal?"Horiz":"Vert";_4.addClass(this.navPrev,"prev"+_b);_4.addClass(this.navNext,"next"+_b);_4.addClass(this.thumbsNode,"thumb"+_b);_4.addClass(this.outerNode,"thumb"+_b);_4.attr(this.navNextImg,"src",this._blankGif);_4.attr(this.navPrevImg,"src",this._blankGif);this.connect(this.navPrev,"onclick","_prev");this.connect(this.navNext,"onclick","_next");this.isInitialized=true;if(this.isHorizontal){this._offsetAttr="offsetLeft";this._sizeAttr="offsetWidth";this._scrollAttr="scrollLeft";}else{this._offsetAttr="offsetTop";this._sizeAttr="offsetHeight";this._scrollAttr="scrollTop";}this._updateNavControls();if(this.imageStore&&this.request){this._loadNextPage();}return true;},getClickTopicName:function(){return (this.widgetId||this.id)+"/select";},getShowTopicName:function(){return (this.widgetId||this.id)+"/show";},setDataStore:function(_c,_d,_e){this.reset();this.request={query:{},start:_d.start||0,count:_d.count||10,onBegin:_4.hitch(this,function(_f){this._maxPhotos=_f;})};if(_d.query){_4.mixin(this.request.query,_d.query);}if(_e){_4.forEach(["imageThumbAttr","imageLargeAttr","linkAttr","titleAttr"],function(_10){if(_e[_10]){this[_10]=_e[_10];}},this);}this.request.start=0;this.request.count=this.pageSize;this.imageStore=_c;this._loadInProgress=false;if(!this.init()){this._loadNextPage();}},reset:function(){this._loadedImages={};_4.forEach(this._thumbs,function(img){if(img&&img.parentNode){_4.destroy(img);}});this._thumbs=[];this.isInitialized=false;this._noImages=true;},isVisible:function(_11){var img=this._thumbs[_11];if(!img){return false;}var pos=this.isHorizontal?"offsetLeft":"offsetTop";var _12=this.isHorizontal?"offsetWidth":"offsetHeight";var _13=this.isHorizontal?"scrollLeft":"scrollTop";var _14=img[pos]-this.thumbsNode[pos];return (_14>=this.thumbScroller[_13]&&_14+img[_12]<=this.thumbScroller[_13]+this._scrollerSize);},resize:function(dim){var _15=this.isHorizontal?"w":"h";var _16=0;if(this._thumbs.length>0&&_4.marginBox(this._thumbs[0]).w==0){return;}_4.forEach(this._thumbs,_4.hitch(this,function(_17){var mb=_4.marginBox(_17.firstChild);var _18=mb[_15];_16+=(Number(_18)+10);if(this.useLoadNotifier&&mb.w>0){_4.style(_17.lastChild,"width",(mb.w-4)+"px");}_4.style(_17,"width",mb.w+"px");}));_4.style(this.thumbsNode,this._sizeProperty,_16+"px");this._updateNavControls();},_next:function(){var pos=this.isHorizontal?"offsetLeft":"offsetTop";var _19=this.isHorizontal?"offsetWidth":"offsetHeight";var _1a=this.thumbsNode[pos];var _1b=this._thumbs[this._thumbIndex];var _1c=_1b[pos]-_1a;var _1d=-1,img;for(var i=this._thumbIndex+1;i<this._thumbs.length;i++){img=this._thumbs[i];if(img[pos]-_1a+img[_19]-_1c>this._scrollerSize){this._showThumbs(i);return;}}},_prev:function(){if(this.thumbScroller[this.isHorizontal?"scrollLeft":"scrollTop"]==0){return;}var pos=this.isHorizontal?"offsetLeft":"offsetTop";var _1e=this.isHorizontal?"offsetWidth":"offsetHeight";var _1f=this._thumbs[this._thumbIndex];var _20=_1f[pos]-this.thumbsNode[pos];var _21=-1,img;for(var i=this._thumbIndex-1;i>-1;i--){img=this._thumbs[i];if(_20-img[pos]>this._scrollerSize){this._showThumbs(i+1);return;}}this._showThumbs(0);},_checkLoad:function(img,_22){_4.publish(this.getShowTopicName(),[{index:_22}]);this._updateNavControls();this._loadingImages={};this._thumbIndex=_22;if(this.thumbsNode.offsetWidth-img.offsetLeft<(this._scrollerSize*2)){this._loadNextPage();}},_showThumbs:function(_23){_23=Math.min(Math.max(_23,0),this._maxPhotos);if(_23>=this._maxPhotos){return;}var img=this._thumbs[_23];if(!img){return;}var _24=img.offsetLeft-this.thumbsNode.offsetLeft;var top=img.offsetTop-this.thumbsNode.offsetTop;var _25=this.isHorizontal?_24:top;if((_25>=this.thumbScroller[this._scrollAttr])&&(_25+img[this._sizeAttr]<=this.thumbScroller[this._scrollAttr]+this._scrollerSize)){return;}if(this.isScrollable){var _26=this.isHorizontal?{x:_24,y:0}:{x:0,y:top};_6.fx.smoothScroll({target:_26,win:this.thumbScroller,duration:300,easing:_4.fx.easing.easeOut,onEnd:_4.hitch(this,"_checkLoad",img,_23)}).play(10);}else{if(this.isHorizontal){this.thumbScroller.scrollLeft=_24;}else{this.thumbScroller.scrollTop=top;}this._checkLoad(img,_23);}},markImageLoaded:function(_27){var _28=_4.byId("loadingDiv_"+this.widgetid+"_"+_27);if(_28){this._setThumbClass(_28,"thumbLoaded");}this._loadedImages[_27]=true;},_setThumbClass:function(_29,_2a){if(!this.autoLoad){return;}_4.addClass(_29,_2a);},_loadNextPage:function(){if(this._loadInProgress){return;}this._loadInProgress=true;var _2b=this.request.start+(this._noImages?0:this.pageSize);var pos=_2b;while(pos<this._thumbs.length&&this._thumbs[pos]){pos++;}var _2c=this.imageStore;var _2d=function(_2e,_2f){if(_2c!=this.imageStore){return;}if(_2e&&_2e.length){var _30=0;var _31=_4.hitch(this,function(){if(_30>=_2e.length){this._loadInProgress=false;return;}var _32=_30++;this._loadImage(_2e[_32],pos+_32,_31);});_31();this._updateNavControls();}else{this._loadInProgress=false;}};var _33=function(){this._loadInProgress=false;console.log("Error getting items");};this.request.onComplete=_4.hitch(this,_2d);this.request.onError=_4.hitch(this,_33);this.request.start=_2b;this._noImages=false;this.imageStore.fetch(this.request);},_loadImage:function(_34,_35,_36){var _37=this.imageStore;var url=_37.getValue(_34,this.imageThumbAttr);var _38=_4.create("div",{id:"img_"+this.widgetid+"_"+_35});var img=_4.create("img",{},_38);img._index=_35;img._data=_34;this._thumbs[_35]=_38;var _39;if(this.useLoadNotifier){_39=_4.create("div",{id:"loadingDiv_"+this.widgetid+"_"+_35},_38);this._setThumbClass(_39,this._loadedImages[_35]?"thumbLoaded":"thumbNotifier");}var _3a=_4.marginBox(this.thumbsNode);var _3b;var _3c;if(this.isHorizontal){_3b=this.thumbWidth;_3c="w";}else{_3b=this.thumbHeight;_3c="h";}_3a=_3a[_3c];var sl=this.thumbScroller.scrollLeft,st=this.thumbScroller.scrollTop;_4.style(this.thumbsNode,this._sizeProperty,(_3a+_3b+20)+"px");this.thumbScroller.scrollLeft=sl;this.thumbScroller.scrollTop=st;this.thumbsNode.appendChild(_38);_4.connect(img,"onload",this,_4.hitch(this,function(){if(_37!=this.imageStore){return false;}this.resize();setTimeout(_36,0);return false;}));_4.connect(img,"onclick",this,function(evt){_4.publish(this.getClickTopicName(),[{index:evt.target._index,data:evt.target._data,url:img.getAttribute("src"),largeUrl:this.imageStore.getValue(_34,this.imageLargeAttr),title:this.imageStore.getValue(_34,this.titleAttr),link:this.imageStore.getValue(_34,this.linkAttr)}]);return false;});_4.addClass(img,"imageGalleryThumb");img.setAttribute("src",url);var _3d=this.imageStore.getValue(_34,this.titleAttr);if(_3d){img.setAttribute("title",_3d);}this._updateNavControls();},_updateNavControls:function(){var _3e=[];var _3f=function(_40,add){var fn=add?"addClass":"removeClass";_4[fn](_40,"enabled");_4[fn](_40,"thumbClickable");};var pos=this.isHorizontal?"scrollLeft":"scrollTop";var _41=this.isHorizontal?"offsetWidth":"offsetHeight";_3f(this.navPrev,(this.thumbScroller[pos]>0));var _42=this._thumbs[this._thumbs.length-1];var _43=(this.thumbScroller[pos]+this._scrollerSize<this.thumbsNode[_41]);_3f(this.navNext,_43);}});}}};});