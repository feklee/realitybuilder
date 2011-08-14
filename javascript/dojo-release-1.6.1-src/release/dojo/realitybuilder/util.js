/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["realityBuilder.util"]){dojo._hasResource["realityBuilder.util"]=true;dojo.provide("realityBuilder.util");dojo.require("dojo.io.script");realityBuilder.util.TOLERANCE_S=0.5;realityBuilder.util.TOLERANCE_V=0.00001;realityBuilder.util.TOLERANCE_VXZ=0.00001;realityBuilder.util.SETTINGS=null;realityBuilder.util.blockToWorld=function(pB,_1){var _2=_1.positionSpacingXY(),_3=_1.positionSpacingXY(),_4=_1.positionSpacingZ();return [pB[0]*_2,pB[1]*_3,pB[2]*_4];};realityBuilder.util.intersectionLinePlaneVXZ=function(_5){var _6,p1=_5[0],p2=_5[1];_6=realityBuilder.util.subtractVectors3D(p2,p1);if(Math.abs(_6[1])<realityBuilder.util.TOLERANCE_V){return false;}else{return [p1[0]-p1[1]*_6[0]/_6[1],p1[2]-p1[1]*_6[2]/_6[1]];}};realityBuilder.util.intersectionSegmentLineVXZ=function(_7,_8){var x1=_7[0][0],z1=_7[0][1],x2=_7[1][0],z2=_7[1][1],x3=_8[0][0],y3=_8[0][1],x4=_8[1][0],y4=_8[1][1],u1=(x4-x3)*(z1-y3)-(y4-y3)*(x1-x3),u2=(y4-y3)*(x2-x1)-(x4-x3)*(z2-z1),_9=0.01,u,x,y;if(Math.abs(u2)<_9){return false;}else{u=u1/u2;if(u>-_9&&u<1+_9){x=x1+u*(x2-x1);y=z1+u*(z2-z1);return [x,y];}else{return false;}}};realityBuilder.util.relationPointSegmentVXZ=function(_a,_b){var _c,_d,_e,_f;_f=realityBuilder.util;_c=[0,0];_d=[_c,_a];_e=_f.intersectionSegmentLineVXZ(_b,_d);if(_e===false){return 0;}else{if(_f.pointsIdenticalVXZ(_e,_a)){return 0;}else{return _f.pointIsBetween2D(_a,_c,_e)?-1:1;}}};realityBuilder.util.pointIsBetween2D=function(p,p1,p2){var _10=(p[0]>=p1[0]&&p[0]<=p2[0])||(p[0]<=p1[0]&&p[0]>=p2[0]),_11=(p[1]>=p1[1]&&p[1]<=p2[1])||(p[1]<=p1[1]&&p[1]>=p2[1]);return _10&&_11;};realityBuilder.util.pointsIdentical2D=function(p1,p2,_12){return (Math.abs(p1[0]-p2[0])<_12&&Math.abs(p1[1]-p2[1])<_12);};realityBuilder.util.pointsIdenticalS=function(p1S,p2S){var _13=realityBuilder.util.TOLERANCE_S;return realityBuilder.util.pointsIdentical2D(p1S,p2S,_13);};realityBuilder.util.pointsIdenticalVXZ=function(_14,_15){var _16=realityBuilder.util.TOLERANCE_VXZ;return realityBuilder.util.pointsIdentical2D(_14,_15,_16);};realityBuilder.util.pointsIdenticalB=function(p1B,p2B){return ((p1B[0]-p2B[0])===0&&(p1B[1]-p2B[1])===0&&(p1B[2]-p2B[2])===0);};realityBuilder.util.subtractVectors3D=function(_17,_18){return [_17[0]-_18[0],_17[1]-_18[1],_17[2]-_18[2]];};realityBuilder.util.addVectorsB=function(_19,_1a){return [_19[0]+_1a[0],_19[1]+_1a[1],_19[2]+_1a[2]];};realityBuilder.util.addVectorsBXY=function(_1b,_1c){return [_1b[0]+_1c[0],_1b[1]+_1c[1]];};realityBuilder.util.subtractVectorsBXY=function(_1d,_1e){return [_1d[0]-_1e[0],_1d[1]-_1e[1]];};realityBuilder.util.multiplyVectorBXY=function(_1f,_20){return [_1f*_20[0],_1f*_20[1]];};realityBuilder.util.subtractVectorsB=function(_21,_22){return realityBuilder.util.subtractVectors3D(_21,_22);};realityBuilder.util.withDuplicatesRemoved=function(ps){var _23=[],i,j,p1,p2,_24;for(i=0;i<ps.length;i+=1){p1=ps[i];_24=false;for(j=i+1;j<ps.length;j+=1){p2=ps[j];if(realityBuilder.util.pointsIdenticalS(p1,p2)){_24=true;break;}}if(!_24){_23.push(p1);}}return _23;};realityBuilder.util.cartesianToPolar=function(pS){var x=pS[0],y=pS[1],_25=Math.atan2(y,x),_26=Math.sqrt(x*x+y*y);return [_25,_26];};realityBuilder.util.polarToCartesian=function(_27){var _28=_27[0],_29=_27[1],x=_29*Math.cos(_28),y=_29*Math.sin(_28);return [x,y];};realityBuilder.util.addS=function(p1S,p2S){return [p1S[0]+p2S[0],p1S[1]+p2S[1]];};realityBuilder.util.rotatePointBXY=function(_2a,_2b,a){var _2c,_2d,cXB,cYB;if(a%4===0){return _2a;}else{cXB=_2b[0];cYB=_2b[1];_2c=_2a[0]-cXB;_2d=_2a[1]-cYB;if(a%4===1){return [Math.round(cXB-_2d),Math.round(cYB+_2c)];}else{if(a%4===2){return [Math.round(cXB-_2c),Math.round(cYB-_2d)];}else{return [Math.round(cXB+_2d),Math.round(cYB-_2c)];}}}};realityBuilder.util.addPrefix=function(_2e,_2f){var tmp=[],i;for(i in _2f){if(_2f.hasOwnProperty(i)){tmp[_2e.toString()+i.toString()]=_2f[i];}}return tmp;};realityBuilder.util.isFlashCanvasActive=function(){return (typeof FlashCanvas!=="undefined");};realityBuilder.util.isFlashReadyForFlashCanvas=function(){return (typeof swfobject!=="undefined")&&swfobject.hasFlashPlayerVersion("9");};realityBuilder.util.isCanvasSupported=function(){return (document.createElement("canvas").getContext||(realityBuilder.util.isFlashCanvasActive()&&realityBuilder.util.isFlashReadyForFlashCanvas()));};realityBuilder.util.clearCanvas=function(_30){if(_30.getContext){var _31=_30.getContext("2d");_31.clearRect(0,0,_30.width,_30.height);}};realityBuilder.util.fillCanvas=function(_32,_33){if(_32.getContext){var _34=_32.getContext("2d");_34.fillStyle=_33;_34.fillRect(0,0,_32.width,_32.height);}};realityBuilder.util.rootUrl=function(){if(dojo.config.isDebug){return dojo.baseUrl+"../../../";}else{return dojo.baseUrl+"../../";}};realityBuilder.util.jsonpGet=function(_35){dojo.io.script.get(dojo.mixin({callbackParamName:"callback",timeout:realityBuilder.util.SETTINGS.jsonpTimeout,error:realityBuilder.util.SETTINGS.onJsonpError},_35));};}