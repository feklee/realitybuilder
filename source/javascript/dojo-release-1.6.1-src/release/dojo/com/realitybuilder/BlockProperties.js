/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["com.realitybuilder.BlockProperties"]){dojo._hasResource["com.realitybuilder.BlockProperties"]=true;dojo.provide("com.realitybuilder.BlockProperties");dojo.require("com.realitybuilder.Block");dojo.declare("com.realitybuilder.BlockProperties",com.realitybuilder.Block,{_versionOnServer:"-1",_blockPositionSpacingXY:null,_blockPositionSpacingZ:null,_outlineB:null,_collisionOffsetsB:null,_attachmentOffsetsB:null,versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_1){this._versionOnServer=_1.version;this._positionSpacingXY=_1.positionSpacingXY;this._positionSpacingZ=_1.positionSpacingZ;this._outlineB=_1.outlineB;this._collisionOffsetsB=_1.collisionOffsetsB;this._attachmentOffsetsB=_1.attachmentOffsetsB;dojo.publish("com/realitybuilder/BlockProperties/changed");},positionSpacingXY:function(){return this._positionSpacingXY;},positionSpacingZ:function(){return this._positionSpacingZ;},outlineB:function(){return this._outlineB;},collisionOffsetsB:function(){return this._collisionOffsetsB;},attachmentOffsetsB:function(){return this._attachmentOffsetsB;}});}