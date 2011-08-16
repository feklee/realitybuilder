/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realityBuilder.NewBlock"]){dojo._hasResource["realityBuilder.NewBlock"]=true;dojo.provide("realityBuilder.NewBlock");dojo.require("realityBuilder.Block");dojo.require("realityBuilder.Shadow");dojo.declare("realityBuilder.NewBlock",realityBuilder.Block,{"-chains-":{constructor:"manual"},_versionOnServer:"-1",_moveSpace1B:null,_moveSpace2B:null,_buildSpace1B:null,_buildSpace2B:null,_isFrozen:null,_constructionBlocks:null,_shadow:null,_camera:null,_lastPositionB:null,_wasFrozenWhenLastRendered:null,_lastConstructionBlocksVersion:null,_prerenderMode:null,constructor:function(_1,_2,_3,_4){this.inherited(arguments,[_1,_2,[0,0,0],0]);this._isFrozen=false;this._constructionBlocks=_3;this._shadow=new realityBuilder.Shadow(this,_1,_2,_3);this._camera=_2;this._prerenderMode=_4;},versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_5){var _6;if(this._versionOnServer!==_5.version){if(!this.isInitializedWithServerData()){this._positionB=_5.initPositionB;this._a=_5.initA;_6=true;}else{_6=false;}this._moveSpace1B=_5.moveSpace1B;this._moveSpace2B=_5.moveSpace2B;this._buildSpace1B=_5.buildSpace1B;this._buildSpace2B=_5.buildSpace2B;this._versionOnServer=_5.version;if(_6){dojo.publish("realityBuilder/NewBlock/"+"positionAngleInitialized");}dojo.publish("realityBuilder/NewBlock/moveOrBuildSpaceChanged");}},_collidesWithRealBlock:function(){return this._constructionBlocks.realBlocksCollideWith(this);},move:function(_7){if(!this._wouldGoOutOfRange(_7,0)&&!this._isFrozen){this._positionB=realityBuilder.util.addVectorsB(this._positionB,_7);dojo.publish("realityBuilder/NewBlock/movedOrRotated");}},rotate90:function(){if(!this._wouldGoOutOfRange([0,0,0],1)&&!this._isFrozen){this._a=(this._a+1)%4;dojo.publish("realityBuilder/NewBlock/movedOrRotated");}},requestMakeReal:function(){if(this.canBeMadeReal()){this._freeze();this._createPendingOnServer();dojo.publish("realityBuilder/NewBlock/makeRealRequested");}},isFrozen:function(){return this._isFrozen;},_freeze:function(){this._isFrozen=true;dojo.publish("realityBuilder/NewBlock/frozen");},_unfreeze:function(){this._isFrozen=false;dojo.publish("realityBuilder/NewBlock/unfrozen");},_turnedIntoDeletedConstructionBlock:function(){var _8,_9;if(this.isFrozen()){if(this._prerenderMode.isEnabled()){return false;}else{_9=this._constructionBlocks.blockAt(this.positionB(),this.a());if(_9){if(_9.isDeleted()){return true;}}}}},_moveOutOfTheWay:function(){var _a,_b=this._constructionBlocks,xB=this.xB(),yB=this.yB(),_c;if(this._collidesWithRealBlock()){_c=this.zB();do{_c+=1;_a=new realityBuilder.Block(this._blockProperties,this._camera,[xB,yB,_c],this.a());}while(_b.realBlocksCollideWith(_a));this._positionB[2]=_c;return true;}return false;},updateState:function(){var _d,_e;_d=this._turnedIntoDeletedConstructionBlock();_e=this._moveOutOfTheWay();if(this.isFrozen()&&(_e||_d)){this._unfreeze();}},_wouldGoOutOfRange:function(_f,_10){var _11,_12,_13;_11=realityBuilder.util.addVectorsB(this.positionB(),_f);_13=(this.a()+_10)%4;_12=new realityBuilder.Block(this._blockProperties,this._camera,_11,_13);return (this._constructionBlocks.realBlocksCollideWith(_12)||!this._wouldBeInMoveSpace(_11));},canBeRotated90:function(){return !this._wouldGoOutOfRange([0,0,0],1)&&!this._isFrozen;},canBeMoved:function(_14){return !this._wouldGoOutOfRange(_14,0)&&!this._isFrozen;},_wouldBeInMoveSpace:function(_15){var m1B=this._moveSpace1B,m2B=this._moveSpace2B;return (_15[0]>=m1B[0]&&_15[0]<=m2B[0]&&_15[1]>=m1B[1]&&_15[1]<=m2B[1]&&_15[2]>=0&&_15[2]<=m2B[2]);},_isInBuildSpace:function(){var xB=this._positionB[0],yB=this._positionB[1],zB=this._positionB[2],b1B=this._buildSpace1B,b2B=this._buildSpace2B;return (xB>=b1B[0]&&xB<=b2B[0]&&yB>=b1B[1]&&yB<=b2B[1]&&zB>=b1B[2]&&zB<=b2B[2]);},_isAttachable:function(){return (this._constructionBlocks.realBlocksAreAttachableTo(this)||this.zB()===0);},_isInPrerenderedBlockConfiguration:function(){var _16=this._constructionBlocks.realBlocksSorted();return this._prerenderMode.matchingBlockConfigurationI(_16,this)!==false;},canBeMadeReal:function(){return this._isInBuildSpace()&&this._isAttachable()&&(!this._prerenderMode.isEnabled()||this._isInPrerenderedBlockConfiguration())&&!this._isFrozen;},_boundingBoxesOverlap:function(_17){var l,r,b,t,_18,_19,_1a,_1b,_1c,_1d;this._updateCoordinates();l=this._boundingBoxS[0][0];r=this._boundingBoxS[1][0];b=this._boundingBoxS[0][1];t=this._boundingBoxS[1][1];_17._updateCoordinates();_18=_17._boundingBoxS[0][0];_19=_17._boundingBoxS[1][0];_1a=_17._boundingBoxS[0][1];_1b=_17._boundingBoxS[1][1];_1c=(r>=_18&&l<=_19);_1d=(t>=_1a&&b<=_1b);return _1c&&_1d;},_relationVertexesEdges:function(_1e,_1f){var _20,len,i,j,_21,_22,_23,_24;_20=realityBuilder.util;len=_1f.length;for(i=0;i<len;i+=1){_24=[_1f[i],_1f[(i+1)%len]];for(j=0;j<len;j+=1){_23=_1e[j];_21=_20.relationPointSegmentVXZ(_23,_24);if(_21<0||_21>0){return _21;}}}return 0;},_isObscuredBySLO:function(_25){var _26,_27,_28;_27=this.projectedVertexesVXZ();_28=_25.projectedVertexesVXZ();if(_27===false||_28===false){return false;}_26=this._relationVertexesEdges(_28,_27);if(_26===0){_26=this._relationVertexesEdges(_27,_28);_26=-_26;}if(_26<0){return true;}else{if(_26>0){return false;}else{return false;}}},_subtractRealBlock:function(_29,_2a){if(this._boundingBoxesOverlap(_29)){_29.subtract(_2a);}},_subtractRealBlocks:function(_2b){var _2c=this._constructionBlocks.realBlocksSorted(),i,_2d,zB=this.zB();for(i=0;i<_2c.length;i+=1){_2d=_2c[i];if(_2d.zB()<zB){break;}else{if(_2d.zB()===zB){if(this._isObscuredBySLO(_2d)){this._subtractRealBlock(_2d,_2b);}}else{if(_2d.zB()>zB){this._subtractRealBlock(_2d,_2b);}}}}},_renderShadow:function(){var _2e,_2f;if(this.isFrozen()){this._shadow.clear();}else{_2e=realityBuilder.util.SETTINGS.colorOfNewBlockShadow;_2f=realityBuilder.util.SETTINGS.alphaOfNewBlockShadow;this._shadow.render(_2e,_2f);}},_needsToBeRendered:function(){var _30,_31,_32;_30=this._coordinatesChangedAfterLastRendering;_31=(this._lastConstructionBlocksVersion!==this._constructionBlocks.versionOnServer());_32=(this._wasFrozenWhenLastRendered!==this._isFrozen);return _30||_31||_32;},_onRendered:function(){this._coordinatesChangedAfterLastRendering=false;this._wasFrozenWhenLastRendered=this._isFrozen;this._lastConstructionBlocksVersion=this._constructionBlocks.versionOnServer();},render:function(){var _33,_34,_35;this._updateCoordinates();if(this._needsToBeRendered()){_33=this._camera.sensor().newBlockCanvas();if(_33.getContext){_34=_33.getContext("2d");_35=this.isFrozen()?realityBuilder.util.SETTINGS.colorOfFrozenNewBlock:realityBuilder.util.SETTINGS.colorOfNewBlock;if(!realityBuilder.util.isFlashCanvasActive()){this._renderShadow();}realityBuilder.util.clearCanvas(_33);this.inherited(arguments,[_34,_35]);this._subtractRealBlocks(_34);}this._onRendered();}},_createPendingOnServerSucceeded:function(){dojo.publish("realityBuilder/NewBlock/createdPendingOnServer");if(this._prerenderMode.isEnabled()){setTimeout(dojo.hitch(this,this._makeRealIfInPrerenderedBlockConfiguration),this._prerenderMode.makeRealAfter());}},_createPendingOnServer:function(){realityBuilder.util.jsonpGet({url:realityBuilder.util.rootUrl()+"rpc/create_pending",content:{"xB":this.xB(),"yB":this.yB(),"zB":this.zB(),"a":this.a()},load:dojo.hitch(this,this._createPendingOnServerSucceeded)});},_makeRealIfInPrerenderedBlockConfiguration:function(){var i,_36;_36=this._constructionBlocks.realBlocksSorted();i=this._prerenderMode.matchingBlockConfigurationI(_36,this);if(i!==false){this._prerenderMode.loadBlockConfigurationOnServer(i);}else{this._unfreeze();}}});}