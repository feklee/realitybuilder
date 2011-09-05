/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realityBuilder.ConstructionBlocks"]){dojo._hasResource["realityBuilder.ConstructionBlocks"]=true;dojo.provide("realityBuilder.ConstructionBlocks");dojo.require("realityBuilder.ConstructionBlock");dojo.require("realityBuilder.util");dojo.declare("realityBuilder.ConstructionBlocks",null,{_versionOnServer:"-1",_camera:null,_blockProperties:null,_blocks:null,_realBlocksSorted:null,_pendingBlocks:null,constructor:function(_1,_2){this._blockProperties=_1;this._blocks=[];this._realBlocksSorted=[];this._camera=_2;},blocks:function(){return this._blocks;},pendingBlocks:function(){return this._pendingBlocks;},realBlocksSorted:function(){return this._realBlocksSorted;},highestRealBlocksZB:function(){if(this._realBlocksSorted.length>0){return this._realBlocksSorted[0].zB();}else{return -1;}},realBlocksInLayer:function(zB){var _3=[],i,_4=this._realBlocksSorted,_5;for(i=0;i<_4.length;i+=1){_5=_4[i];if(_5.zB()===zB){_3.push(_5);}else{if(_5.zB()<zB){break;}}}return _3;},versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},_createBlockFromServerData:function(_6){var _7=this._camera,rb=realityBuilder;return new rb.ConstructionBlock(this._blockProperties,_7,_6.positionB,_6.a,_6.state,_6.timeStamp);},updateWithServerData:function(_8){if(this._versionOnServer!==_8.version){this._versionOnServer=_8.version;this._blocks=dojo.map(_8.blocks,dojo.hitch(this,this._createBlockFromServerData));this._updateRealBlocksSorted();this._updatePendingBlocks();dojo.publish("realityBuilder/ConstructionBlocks/changed");}},_sortByHeight:function(_9,_a){if(_9.zB()>_a.zB()){return -1;}else{if(_9.zB()<_a.zB()){return 1;}else{return 0;}}},_updateRealBlocksSorted:function(){var _b=dojo.filter(this._blocks,function(_c){return _c.isReal();});_b.sort(this._sortByHeight);this._realBlocksSorted=_b;},_updatePendingBlocks:function(){this._pendingBlocks=dojo.filter(this._blocks,function(_d){return _d.isPending();});},blockAt:function(_e,a){var _f=this.blocks(),_10,i;for(i=0;i<_f.length;i+=1){_10=_f[i];if(realityBuilder.util.pointsIdenticalB(_e,_10.positionB())&&a===_10.a()){return _10;}}return false;},realBlocksCollideWith:function(_11){var _12=this.realBlocksSorted(),_13,i;for(i=0;i<_12.length;i+=1){_13=_12[i];if(_13.collidesWith(_11)){return true;}}return false;},realBlocksAreAttachableTo:function(_14){var _15=this.realBlocksSorted(),_16,i;for(i=0;i<_15.length;i+=1){_16=_15[i];if(_16.attachableTo(_14)){return true;}}return false;},_makePendingOnServerSucceeded:function(){dojo.publish("realityBuilder/ConstructionBlocks/changedOnServer");},_makePendingOnServerFailed:function(){dojo.publish("realityBuilder/ConstructionBlocks/"+"changeOnServerFailed");},makePendingOnServer:function(_17,a){realityBuilder.util.jsonpGet({url:realityBuilder.util.rootUrl()+"admin/rpc/make_pending",content:{"xB":_17[0],"yB":_17[1],"zB":_17[2],"a":a},load:dojo.hitch(this,this._makePendingOnServerSucceeded)});},_deleteOnServerSucceeded:function(){dojo.publish("realityBuilder/ConstructionBlocks/changedOnServer");},deleteOnServer:function(_18,a){realityBuilder.util.jsonpGet({url:realityBuilder.util.rootUrl()+"admin/rpc/delete",content:{"xB":_18[0],"yB":_18[1],"zB":_18[2],"a":a},load:dojo.hitch(this,this._deleteOnServerSucceeded)});},_makeRealOnServerSucceeded:function(){dojo.publish("realityBuilder/ConstructionBlocks/changedOnServer");},_makeRealOnServerFailed:function(){dojo.publish("realityBuilder/ConstructionBlocks/"+"changeOnServerFailed");},makeRealOnServer:function(_19,a){realityBuilder.util.jsonpGet({url:realityBuilder.util.rootUrl()+"admin/rpc/make_real",content:{"xB":_19[0],"yB":_19[1],"zB":_19[2],"a":a},load:dojo.hitch(this,this._makeRealOnServerSucceeded)});},setBlockStateOnServer:function(_1a,a,_1b){switch(_1b){case 0:this.deleteOnServer(_1a,a);break;case 1:this.makePendingOnServer(_1a,a);break;case 2:this.makeRealOnServer(_1a,a);break;}},zBOfUpperSideOfRealBlockBelow:function(xB,yB,zB){var _1c,_1d,_1e,bXB,bYB,bZB;_1c=this._realBlocksSorted;_1d=zB-1;_1e=0;dojo.forEach(_1c,function(b){bXB=b.xB();bYB=b.yB();bZB=b.zB();if(bZB+1<=_1d&&xB>=bXB&&xB<=bXB+1&&yB>=bYB&&yB<=bYB+1&&bZB+1>_1e){_1e=bZB+1;}});return _1e;},_renderBlocks:function(_1f,_20){if(_1f.getContext){var _21=_1f.getContext("2d");realityBuilder.util.clearCanvas(_1f);dojo.forEach(_20,function(b){b.render(_21);});}},renderIfVisible:function(){var _22=this._camera.sensor();if(_22.realBlocksAreVisible()){this._renderBlocks(_22.realBlocksCanvas(),this._realBlocksSorted);}if(_22.pendingBlocksAreVisible()){this._renderBlocks(_22.pendingBlocksCanvas(),this._pendingBlocks);}}});}