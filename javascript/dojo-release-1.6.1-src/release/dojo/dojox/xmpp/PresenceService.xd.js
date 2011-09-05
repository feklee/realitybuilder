/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.xmpp.PresenceService"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.xmpp.PresenceService"]){_4._hasResource["dojox.xmpp.PresenceService"]=true;_4.provide("dojox.xmpp.PresenceService");_6.xmpp.presence={UPDATE:201,SUBSCRIPTION_REQUEST:202,SUBSCRIPTION_SUBSTATUS_NONE:204,SUBSCRIPTION_NONE:"none",SUBSCRIPTION_FROM:"from",SUBSCRIPTION_TO:"to",SUBSCRIPTION_BOTH:"both",SUBSCRIPTION_REQUEST_PENDING:"pending",STATUS_ONLINE:"online",STATUS_AWAY:"away",STATUS_CHAT:"chat",STATUS_DND:"dnd",STATUS_EXTENDED_AWAY:"xa",STATUS_OFFLINE:"offline",STATUS_INVISIBLE:"invisible"};_4.declare("dojox.xmpp.PresenceService",null,{constructor:function(_7){this.session=_7;this.isInvisible=false;this.avatarHash=null;this.presence=null;this.restrictedContactjids={};},publish:function(_8){this.presence=_8;this._setPresence();},sendAvatarHash:function(_9){this.avatarHash=_9;this._setPresence();},_setPresence:function(){var _a=this.presence;var p={xmlns:"jabber:client"};if(_a&&_a.to){p.to=_a.to;}if(_a.show&&_a.show==_6.xmpp.presence.STATUS_OFFLINE){p.type="unavailable";}if(_a.show&&_a.show==_6.xmpp.presence.STATUS_INVISIBLE){this._setInvisible();this.isInvisible=true;return;}if(this.isInvisible){this._setVisible();}var _b=new _6.string.Builder(_6.xmpp.util.createElement("presence",p,false));if(_a.show&&_a.show!=_6.xmpp.presence.STATUS_OFFLINE){_b.append(_6.xmpp.util.createElement("show",{},false));_b.append(_a.show);_b.append("</show>");}if(_a.status){_b.append(_6.xmpp.util.createElement("status",{},false));_b.append(_a.status);_b.append("</status>");}if(this.avatarHash){_b.append(_6.xmpp.util.createElement("x",{xmlns:"vcard-temp:x:update"},false));_b.append(_6.xmpp.util.createElement("photo",{},false));_b.append(this.avatarHash);_b.append("</photo>");_b.append("</x>");}if(_a.priority&&_a.show!=_6.xmpp.presence.STATUS_OFFLINE){if(_a.priority>127||_a.priority<-128){_a.priority=5;}_b.append(_6.xmpp.util.createElement("priority",{},false));_b.append(_a.priority);_b.append("</priority>");}_b.append("</presence>");this.session.dispatchPacket(_b.toString());},toggleBlockContact:function(_c){if(!this.restrictedContactjids[_c]){this.restrictedContactjids[_c]=this._createRestrictedJid();}this.restrictedContactjids[_c].blocked=!this.restrictedContactjids[_c].blocked;this._updateRestricted();return this.restrictedContactjids;},toggleContactInvisiblity:function(_d){if(!this.restrictedContactjids[_d]){this.restrictedContactjids[_d]=this._createRestrictedJid();}this.restrictedContactjids[_d].invisible=!this.restrictedContactjids[_d].invisible;this._updateRestricted();return this.restrictedContactjids;},_createRestrictedJid:function(){return {invisible:false,blocked:false};},_updateRestricted:function(){var _e={id:this.session.getNextIqId(),from:this.session.jid+"/"+this.session.resource,type:"set"};var _f=new _6.string.Builder(_6.xmpp.util.createElement("iq",_e,false));_f.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:privacy"},false));_f.append(_6.xmpp.util.createElement("list",{name:"iwcRestrictedContacts"},false));var _10=1;for(var jid in this.restrictedContactjids){var _11=this.restrictedContactjids[jid];if(_11.blocked||_11.invisible){_f.append(_6.xmpp.util.createElement("item",{value:_6.xmpp.util.encodeJid(jid),action:"deny",order:_10++},false));if(_11.blocked){_f.append(_6.xmpp.util.createElement("message",{},true));}if(_11.invisible){_f.append(_6.xmpp.util.createElement("presence-out",{},true));}_f.append("</item>");}else{delete this.restrictedContactjids[jid];}}_f.append("</list>");_f.append("</query>");_f.append("</iq>");var _12=new _6.string.Builder(_6.xmpp.util.createElement("iq",_e,false));_12.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:privacy"},false));_12.append(_6.xmpp.util.createElement("active",{name:"iwcRestrictedContacts"},true));_12.append("</query>");_12.append("</iq>");this.session.dispatchPacket(_f.toString());this.session.dispatchPacket(_12.toString());},_setVisible:function(){var _13={id:this.session.getNextIqId(),from:this.session.jid+"/"+this.session.resource,type:"set"};var req=new _6.string.Builder(_6.xmpp.util.createElement("iq",_13,false));req.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:privacy"},false));req.append(_6.xmpp.util.createElement("active",{},true));req.append("</query>");req.append("</iq>");this.session.dispatchPacket(req.toString());},_setInvisible:function(){var _14={id:this.session.getNextIqId(),from:this.session.jid+"/"+this.session.resource,type:"set"};var req=new _6.string.Builder(_6.xmpp.util.createElement("iq",_14,false));req.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:privacy"},false));req.append(_6.xmpp.util.createElement("list",{name:"invisible"},false));req.append(_6.xmpp.util.createElement("item",{action:"deny",order:"1"},false));req.append(_6.xmpp.util.createElement("presence-out",{},true));req.append("</item>");req.append("</list>");req.append("</query>");req.append("</iq>");_14={id:this.session.getNextIqId(),from:this.session.jid+"/"+this.session.resource,type:"set"};var _15=new _6.string.Builder(_6.xmpp.util.createElement("iq",_14,false));_15.append(_6.xmpp.util.createElement("query",{xmlns:"jabber:iq:privacy"},false));_15.append(_6.xmpp.util.createElement("active",{name:"invisible"},true));_15.append("</query>");_15.append("</iq>");this.session.dispatchPacket(req.toString());this.session.dispatchPacket(_15.toString());},_manageSubscriptions:function(_16,_17){if(!_16){return;}if(_16.indexOf("@")==-1){_16+="@"+this.session.domain;}var req=_6.xmpp.util.createElement("presence",{to:_16,type:_17},true);this.session.dispatchPacket(req);},subscribe:function(_18){this._manageSubscriptions(_18,"subscribe");},approveSubscription:function(_19){this._manageSubscriptions(_19,"subscribed");},unsubscribe:function(_1a){this._manageSubscriptions(_1a,"unsubscribe");},declineSubscription:function(_1b){this._manageSubscriptions(_1b,"unsubscribed");},cancelSubscription:function(_1c){this._manageSubscriptions(_1c,"unsubscribed");}});}}};});