/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.cometd.longPollTransportJsonEncoded"],["require","dojox.cometd._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.cometd.longPollTransportJsonEncoded"]){_4._hasResource["dojox.cometd.longPollTransportJsonEncoded"]=true;_4.provide("dojox.cometd.longPollTransportJsonEncoded");_4.require("dojox.cometd._base");_6.cometd.longPollTransportJsonEncoded=new function(){this._connectionType="long-polling";this._cometd=null;this.check=function(_7,_8,_9){return ((!_9)&&(_4.indexOf(_7,"long-polling")>=0));};this.tunnelInit=function(){var _a={channel:"/meta/connect",clientId:this._cometd.clientId,connectionType:this._connectionType,id:""+this._cometd.messageId++};_a=this._cometd._extendOut(_a);this.openTunnelWith([_a]);};this.tunnelCollapse=function(){if(!this._cometd._initialized){return;}if(this._cometd._advice&&this._cometd._advice["reconnect"]=="none"){return;}if(this._cometd._status=="connected"){setTimeout(_4.hitch(this,function(){this._connect();}),this._cometd._interval());}else{setTimeout(_4.hitch(this._cometd,function(){this.init(this.url,this._props);}),this._cometd._interval());}};this._connect=function(){if(!this._cometd._initialized){return;}if(this._cometd._polling){return;}if((this._cometd._advice)&&(this._cometd._advice["reconnect"]=="handshake")){this._cometd._status="unconnected";this._initialized=false;this._cometd.init(this._cometd.url,this._cometd._props);}else{if(this._cometd._status=="connected"){var _b={channel:"/meta/connect",connectionType:this._connectionType,clientId:this._cometd.clientId,id:""+this._cometd.messageId++};if(this._cometd.connectTimeout>=this._cometd.expectedNetworkDelay){_b.advice={timeout:(this._cometd.connectTimeout-this._cometd.expectedNetworkDelay)};}_b=this._cometd._extendOut(_b);this.openTunnelWith([_b]);}}};this.deliver=function(_c){};this.openTunnelWith=function(_d,_e){this._cometd._polling=true;var _f={url:(_e||this._cometd.url),postData:_4.toJson(_d),contentType:"text/json;charset=UTF-8",handleAs:this._cometd.handleAs,load:_4.hitch(this,function(_10){this._cometd._polling=false;this._cometd.deliver(_10);this._cometd._backon();this.tunnelCollapse();}),error:_4.hitch(this,function(err){this._cometd._polling=false;var _11={failure:true,error:err,advice:this._cometd._advice};this._cometd._publishMeta("connect",false,_11);this._cometd._backoff();this.tunnelCollapse();})};var _12=this._cometd._connectTimeout();if(_12>0){_f.timeout=_12;}this._poll=_4.rawXhrPost(_f);};this.sendMessages=function(_13){for(var i=0;i<_13.length;i++){_13[i].clientId=this._cometd.clientId;_13[i].id=""+this._cometd.messageId++;_13[i]=this._cometd._extendOut(_13[i]);}return _4.rawXhrPost({url:this._cometd.url||_4.config["cometdRoot"],handleAs:this._cometd.handleAs,load:_4.hitch(this._cometd,"deliver"),postData:_4.toJson(_13),contentType:"text/json;charset=UTF-8",error:_4.hitch(this,function(err){this._cometd._publishMeta("publish",false,{messages:_13});}),timeout:this._cometd.expectedNetworkDelay});};this.startup=function(_14){if(this._cometd._status=="connected"){return;}this.tunnelInit();};this.disconnect=function(){var _15={channel:"/meta/disconnect",clientId:this._cometd.clientId,id:""+this._cometd.messageId++};_15=this._cometd._extendOut(_15);_4.rawXhrPost({url:this._cometd.url||_4.config["cometdRoot"],handleAs:this._cometd.handleAs,postData:_4.toJson([_15]),contentType:"text/json;charset=UTF-8"});};this.cancelConnect=function(){if(this._poll){this._poll.cancel();this._cometd._polling=false;this._cometd._publishMeta("connect",false,{cancel:true});this._cometd._backoff();this.disconnect();this.tunnelCollapse();}};};_6.cometd.longPollTransport=_6.cometd.longPollTransportJsonEncoded;_6.cometd.connectionTypes.register("long-polling",_6.cometd.longPollTransport.check,_6.cometd.longPollTransportJsonEncoded);_6.cometd.connectionTypes.register("long-polling-json-encoded",_6.cometd.longPollTransport.check,_6.cometd.longPollTransportJsonEncoded);}}};});