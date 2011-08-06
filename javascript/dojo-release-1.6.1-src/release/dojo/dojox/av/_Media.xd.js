/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.av._Media"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.av._Media"]){_4._hasResource["dojox.av._Media"]=true;_4.provide("dojox.av._Media");_4.declare("dojox.av._Media",null,{mediaUrl:"",initialVolume:1,autoPlay:false,bufferTime:2000,minBufferTime:300,updateTime:100,id:"",isDebug:false,percentDownloaded:0,_flashObject:null,flashMedia:null,allowScriptAccess:"always",allowNetworking:"all",wmode:"transparent",allowFullScreen:true,_initStatus:function(){this.status="ready";this._positionHandle=_4.connect(this,"onPosition",this,"_figureStatus");},getTime:function(){return this.flashMedia.getTime();},onLoad:function(_7){},onDownloaded:function(_8){},onClick:function(_9){},onSwfSized:function(_a){},onMetaData:function(_b,_c){this.duration=_b.duration;},onPosition:function(_d){},onStart:function(_e){},onPlay:function(_f){},onPause:function(_10){},onEnd:function(_11){},onStop:function(){},onBuffer:function(_12){this.isBuffering=_12;},onError:function(_13,url){console.warn("ERROR-"+_13.type.toUpperCase()+":",_13.info.code," - URL:",url);},onStatus:function(_14){},onPlayerStatus:function(_15){},onResize:function(){},_figureStatus:function(){var pos=this.getTime();if(this.status=="stopping"){this.status="stopped";this.onStop(this._eventFactory());}else{if(this.status=="ending"&&pos==this._prevPos){this.status="ended";this.onEnd(this._eventFactory());}else{if(this.duration&&pos>this.duration-0.5){this.status="ending";}else{if(pos===0){if(this.status=="ready"){}else{this.status="stopped";if(this._prevStatus!="stopped"){this.onStop(this._eventFactory());}}}else{if(this.status=="ready"){this.status="started";this.onStart(this._eventFactory());this.onPlay(this._eventFactory());}else{if(this.isBuffering){this.status="buffering";}else{if(this.status=="started"||(this.status=="playing"&&pos!=this._prevPos)){this.status="playing";}else{if(!this.isStopped&&this.status=="playing"&&pos==this._prevPos){this.status="paused";console.warn("pause",pos,this._prevPos);if(this.status!=this._prevStatus){this.onPause(this._eventFactory());}}else{if((this.status=="paused"||this.status=="stopped")&&pos!=this._prevPos){this.status="started";this.onPlay(this._eventFactory());}}}}}}}}}this._prevPos=pos;this._prevStatus=this.status;this.onStatus(this.status);},_eventFactory:function(){var evt={status:this.status};return evt;},_sub:function(_16,_17){_4.subscribe(this.id+"/"+_16,this,_17);},_normalizeVolume:function(vol){if(vol>1){while(vol>1){vol*=0.1;}}return vol;},_normalizeUrl:function(_18){console.log("  url:",_18);if(_18&&(_18.toLowerCase().indexOf("http")<0||_18.indexOf("/")==0)){var loc=window.location.href.split("/");loc.pop();loc=loc.join("/")+"/";console.log("  loc:",loc);_18=loc+_18;}return _18;},destroy:function(){if(!this.flashMedia){this._cons.push(_4.connect(this,"onLoad",this,"destroy"));return;}_4.forEach(this._subs,function(s){_4.unsubscribe(s);});_4.forEach(this._cons,function(c){_4.disconnect(c);});this._flashObject.destroy();}});}}};});