/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realityBuilder.NewBlock"],["require","realityBuilder.Block"],["require","realityBuilder.Shadow"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realityBuilder.NewBlock"]){_4._hasResource["realityBuilder.NewBlock"]=true;_4.provide("realityBuilder.NewBlock");_4.require("realityBuilder.Block");_4.require("realityBuilder.Shadow");_4.declare("realityBuilder.NewBlock",realityBuilder.Block,{"-chains-":{constructor:"manual"},_versionOnServer:"-1",_moveSpace1B:null,_moveSpace2B:null,_buildSpace1B:null,_buildSpace2B:null,_isFrozen:null,_constructionBlocks:null,_shadow:null,_camera:null,_lastPosB:null,_wasFrozenWhenLastRendered:null,_lastConstructionBlocksVersion:null,_prerenderMode:null,constructor:function(_7,_8,_9,_a){this.inherited(arguments,[_7,_8,[0,0,0],0]);this._isFrozen=false;this._constructionBlocks=_9;this._shadow=new realityBuilder.Shadow(this,_7,_8,_9);this._camera=_8;this._prerenderMode=_a;},versionOnServer:function(){return this._versionOnServer;},isInitializedWithServerData:function(){return this._versionOnServer!=="-1";},updateWithServerData:function(_b){var _c;if(this._versionOnServer!==_b.version){if(!this.isInitializedWithServerData()){this._posB=_b.initPosB;this._a=_b.initA;_c=true;}else{_c=false;}this._moveSpace1B=_b.moveSpace1B;this._moveSpace2B=_b.moveSpace2B;this._buildSpace1B=_b.buildSpace1B;this._buildSpace2B=_b.buildSpace2B;this._versionOnServer=_b.version;if(_c){_4.publish("realityBuilder/NewBlock/"+"positionAngleInitialized");}_4.publish("realityBuilder/NewBlock/moveOrBuildSpaceChanged");}},_collidesWithRealBlock:function(){return this._constructionBlocks.realBlocksCollideWith(this);},move:function(_d){if(!this._wouldGoOutOfRange(_d,0)&&!this._isFrozen){this._posB=realityBuilder.util.addVectorsB(this._posB,_d);_4.publish("realityBuilder/NewBlock/movedOrRotated");}},rotate90:function(){if(!this._wouldGoOutOfRange([0,0,0],1)&&!this._isFrozen){this._a=(this._a+1)%4;_4.publish("realityBuilder/NewBlock/movedOrRotated");}},requestMakeReal:function(){if(this.canBeMadeReal()){this._freeze();this._createPendingOnServer();_4.publish("realityBuilder/NewBlock/makeRealRequested");}},isFrozen:function(){return this._isFrozen;},_freeze:function(){this._isFrozen=true;_4.publish("realityBuilder/NewBlock/frozen");},unfreeze:function(){this._isFrozen=false;_4.publish("realityBuilder/NewBlock/unfrozen");},_turnedIntoDeletedConstructionBlock:function(){var _e,_f;if(this.isFrozen()){if(this._prerenderMode.isEnabled()){return false;}else{_f=this._constructionBlocks.blockAt(this.posB(),this.a());if(_f){if(_f.isDeleted()){return true;}}}}},_moveOutOfTheWay:function(){var _10,cbs=this._constructionBlocks,xB=this.xB(),yB=this.yB(),_11;if(this._collidesWithRealBlock()){_11=this.zB();do{_11+=1;_10=new realityBuilder.Block(this._blockProperties,this._camera,[xB,yB,_11],this.a());}while(cbs.realBlocksCollideWith(_10));this._posB[2]=_11;return true;}return false;},updateState:function(){var _12,_13;_12=this._turnedIntoDeletedConstructionBlock();_13=this._moveOutOfTheWay();if(this.isFrozen()&&(_13||_12)){this.unfreeze();}},_wouldGoOutOfRange:function(_14,_15){var _16,_17,_18;_16=realityBuilder.util.addVectorsB(this.posB(),_14);_18=(this.a()+_15)%4;_17=new realityBuilder.Block(this._blockProperties,this._camera,_16,_18);return (this._constructionBlocks.realBlocksCollideWith(_17)||!this._wouldBeInMoveSpace(_16));},canBeRotated90:function(){return !this._wouldGoOutOfRange([0,0,0],1)&&!this._isFrozen;},canBeMoved:function(_19){return !this._wouldGoOutOfRange(_19,0)&&!this._isFrozen;},_wouldBeInMoveSpace:function(_1a){var m1B=this._moveSpace1B,m2B=this._moveSpace2B;return (_1a[0]>=m1B[0]&&_1a[0]<=m2B[0]&&_1a[1]>=m1B[1]&&_1a[1]<=m2B[1]&&_1a[2]>=0&&_1a[2]<=m2B[2]);},_isInBuildSpace:function(){var xB=this._posB[0],yB=this._posB[1],zB=this._posB[2],b1B=this._buildSpace1B,b2B=this._buildSpace2B;return (xB>=b1B[0]&&xB<=b2B[0]&&yB>=b1B[1]&&yB<=b2B[1]&&zB>=b1B[2]&&zB<=b2B[2]);},_isAttachable:function(){return (this._constructionBlocks.realBlocksAreAttachableTo(this)||this.zB()===0);},_isInPrerenderedBlockConfiguration:function(){var _1b=this._constructionBlocks.realBlocksSorted();return this._prerenderMode.matchingBlockConfigurationI(_1b,this)!==false;},canBeMadeReal:function(){return this._isInBuildSpace()&&this._isAttachable()&&(!this._prerenderMode.isEnabled()||this._isInPrerenderedBlockConfiguration())&&!this._isFrozen;},_boundingBoxesOverlap:function(_1c){var l,r,b,t,_1d,_1e,_1f,_20,_21,_22;this._updateCoordinates();l=this._boundingBoxS[0][0];r=this._boundingBoxS[1][0];b=this._boundingBoxS[0][1];t=this._boundingBoxS[1][1];_1c._updateCoordinates();_1d=_1c._boundingBoxS[0][0];_1e=_1c._boundingBoxS[1][0];_1f=_1c._boundingBoxS[0][1];_20=_1c._boundingBoxS[1][1];_21=(r>=_1d&&l<=_1e);_22=(t>=_1f&&b<=_20);return _21&&_22;},_relationVertexesEdges:function(_23,_24){var _25,len,i,j,_26,_27,_28,_29;_25=realityBuilder.util;len=_24.length;for(i=0;i<len;i+=1){_29=[_24[i],_24[(i+1)%len]];for(j=0;j<len;j+=1){_28=_23[j];_26=_25.relationPointSegmentVXZ(_28,_29);if(_26<0||_26>0){return _26;}}}return 0;},_isObscuredBySLO:function(_2a){var _2b,_2c,_2d;_2c=this.projectedVertexesVXZ();_2d=_2a.projectedVertexesVXZ();if(_2c===false||_2d===false){return false;}_2b=this._relationVertexesEdges(_2d,_2c);if(_2b===0){_2b=this._relationVertexesEdges(_2c,_2d);_2b=-_2b;}if(_2b<0){return true;}else{if(_2b>0){return false;}else{return false;}}},_subtractRealBlock:function(_2e,_2f){if(this._boundingBoxesOverlap(_2e)){_2e.subtract(_2f);}},_subtractRealBlocks:function(_30){var _31=this._constructionBlocks.realBlocksSorted(),i,_32,zB=this.zB();for(i=0;i<_31.length;i+=1){_32=_31[i];if(_32.zB()<zB){break;}else{if(_32.zB()===zB){if(this._isObscuredBySLO(_32)){this._subtractRealBlock(_32,_30);}}else{if(_32.zB()>zB){this._subtractRealBlock(_32,_30);}}}}},_renderShadow:function(){var _33,_34;if(this.isFrozen()){this._shadow.clear();}else{_33=realityBuilder.util.SETTINGS.colorOfNewBlockShadow;_34=realityBuilder.util.SETTINGS.alphaOfNewBlockShadow;this._shadow.render(_33,_34);}},_needsToBeRendered:function(){var _35,_36,_37;_35=this._coordinatesChangedAfterLastRendering;_36=(this._lastConstructionBlocksVersion!==this._constructionBlocks.versionOnServer());_37=(this._wasFrozenWhenLastRendered!==this._isFrozen);return _35||_36||_37;},_onRendered:function(){this._coordinatesChangedAfterLastRendering=false;this._wasFrozenWhenLastRendered=this._isFrozen;this._lastConstructionBlocksVersion=this._constructionBlocks.versionOnServer();},render:function(){var _38,_39,_3a;this._updateCoordinates();if(this._needsToBeRendered()){_38=this._camera.sensor().newBlockCanvas();if(_38.getContext){_39=_38.getContext("2d");_3a=this.isFrozen()?realityBuilder.util.SETTINGS.colorOfFrozenNewBlock:realityBuilder.util.SETTINGS.colorOfNewBlock;if(!realityBuilder.util.isFlashCanvasActive()){this._renderShadow();}realityBuilder.util.clearCanvas(_38);this.inherited(arguments,[_39,_3a]);this._subtractRealBlocks(_39);}this._onRendered();}},_createPendingOnServerSucceeded:function(){_4.publish("realityBuilder/NewBlock/createdPendingOnServer");if(this._prerenderMode.isEnabled()){setTimeout(_4.hitch(this,this._makeRealIfInPrerenderedBlockConfiguration),this._prerenderMode.makeRealAfter());}},_createPendingOnServer:function(){realityBuilder.util.jsonpGet({url:realityBuilder.util.rootUrl()+"rpc/create_pending",content:{"xB":this.xB(),"yB":this.yB(),"zB":this.zB(),"a":this.a()},load:_4.hitch(this,this._createPendingOnServerSucceeded)});},_makeRealIfInPrerenderedBlockConfiguration:function(){var i,_3b;_3b=this._constructionBlocks.realBlocksSorted();i=this._prerenderMode.matchingBlockConfigurationI(_3b,this);if(i!==false){this._prerenderMode.loadBlockConfigurationOnServer(i);}else{this.unfreeze();}}});}}};});