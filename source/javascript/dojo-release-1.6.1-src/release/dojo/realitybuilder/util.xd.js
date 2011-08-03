/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","realitybuilder.util"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["realitybuilder.util"]){_4._hasResource["realitybuilder.util"]=true;_4.provide("realitybuilder.util");realitybuilder.util.TOLERANCE_S=0.5;realitybuilder.util.TOLERANCE_V=0.00001;realitybuilder.util.TOLERANCE_VXZ=0.00001;realitybuilder.util.blockToWorld=function(pB,_7){var _8=_7.positionSpacingXY(),_9=_7.positionSpacingXY(),_a=_7.positionSpacingZ();return [pB[0]*_8,pB[1]*_9,pB[2]*_a];};realitybuilder.util.intersectionLinePlaneVXZ=function(_b){var _c,p1=_b[0],p2=_b[1];_c=realitybuilder.util.subtractVectors3D(p2,p1);if(Math.abs(_c[1])<realitybuilder.util.TOLERANCE_V){return false;}else{return [p1[0]-p1[1]*_c[0]/_c[1],p1[2]-p1[1]*_c[2]/_c[1]];}};realitybuilder.util.intersectionSegmentLineVXZ=function(_d,_e){var x1=_d[0][0],z1=_d[0][1],x2=_d[1][0],z2=_d[1][1],x3=_e[0][0],y3=_e[0][1],x4=_e[1][0],y4=_e[1][1],u1=(x4-x3)*(z1-y3)-(y4-y3)*(x1-x3),u2=(y4-y3)*(x2-x1)-(x4-x3)*(z2-z1),_f=0.01,u,x,y;if(Math.abs(u2)<_f){return false;}else{u=u1/u2;if(u>-_f&&u<1+_f){x=x1+u*(x2-x1);y=z1+u*(z2-z1);return [x,y];}else{return false;}}};realitybuilder.util.relationPointSegmentVXZ=function(_10,_11){var _12,_13,_14,_15;_15=realitybuilder.util;_12=[0,0];_13=[_12,_10];_14=_15.intersectionSegmentLineVXZ(_11,_13);if(_14===false){return 0;}else{if(_15.pointsIdenticalVXZ(_14,_10)){return 0;}else{return _15.pointIsBetween2D(_10,_12,_14)?-1:1;}}};realitybuilder.util.pointIsBetween2D=function(p,p1,p2){var _16=(p[0]>=p1[0]&&p[0]<=p2[0])||(p[0]<=p1[0]&&p[0]>=p2[0]),_17=(p[1]>=p1[1]&&p[1]<=p2[1])||(p[1]<=p1[1]&&p[1]>=p2[1]);return _16&&_17;};realitybuilder.util.pointsIdentical2D=function(p1,p2,_18){return (Math.abs(p1[0]-p2[0])<_18&&Math.abs(p1[1]-p2[1])<_18);};realitybuilder.util.pointsIdenticalS=function(p1S,p2S){var _19=realitybuilder.util.TOLERANCE_S;return realitybuilder.util.pointsIdentical2D(p1S,p2S,_19);};realitybuilder.util.pointsIdenticalVXZ=function(_1a,_1b){var _1c=realitybuilder.util.TOLERANCE_VXZ;return realitybuilder.util.pointsIdentical2D(_1a,_1b,_1c);};realitybuilder.util.pointsIdenticalB=function(p1B,p2B){return ((p1B[0]-p2B[0])===0&&(p1B[1]-p2B[1])===0&&(p1B[2]-p2B[2])===0);};realitybuilder.util.subtractVectors3D=function(_1d,_1e){return [_1d[0]-_1e[0],_1d[1]-_1e[1],_1d[2]-_1e[2]];};realitybuilder.util.addVectorsB=function(_1f,_20){return [_1f[0]+_20[0],_1f[1]+_20[1],_1f[2]+_20[2]];};realitybuilder.util.subtractVectorsB=function(_21,_22){return [_21[0]-_22[0],_21[1]-_22[1],_21[2]-_22[2]];};realitybuilder.util.withDuplicatesRemoved=function(ps){var _23=[],i,j,p1,p2,_24;for(i=0;i<ps.length;i+=1){p1=ps[i];_24=false;for(j=i+1;j<ps.length;j+=1){p2=ps[j];if(realitybuilder.util.pointsIdenticalS(p1,p2)){_24=true;break;}}if(!_24){_23.push(p1);}}return _23;};realitybuilder.util.cartesianToPolar=function(pS){var x=pS[0],y=pS[1],_25=Math.atan2(y,x),_26=Math.sqrt(x*x+y*y);return [_25,_26];};realitybuilder.util.polarToCartesian=function(_27){var _28=_27[0],_29=_27[1],x=_29*Math.cos(_28),y=_29*Math.sin(_28);return [x,y];};realitybuilder.util.addS=function(p1S,p2S){return [p1S[0]+p2S[0],p1S[1]+p2S[1]];};realitybuilder.util.rotatePointBXY=function(_2a,_2b,a){var _2c,_2d,cXB,cYB;if(a%4===0){return _2a;}else{cXB=_2b[0];cYB=_2b[1];_2c=_2a[0]-cXB;_2d=_2a[1]-cYB;if(a%4===1){return [Math.round(cXB-_2d),Math.round(cYB+_2c)];}else{if(a%4===2){return [Math.round(cXB-_2c),Math.round(cYB-_2d)];}else{return [Math.round(cXB+_2d),Math.round(cYB-_2c)];}}}};realitybuilder.util.addPrefix=function(_2e,_2f){var tmp=[],i;for(i in _2f){if(_2f.hasOwnProperty(i)){tmp[_2e.toString()+i.toString()]=_2f[i];}}return tmp;};realitybuilder.util.isFlashCanvasActive=function(){return (typeof FlashCanvas!=="undefined");};realitybuilder.util.isFlashReadyForFlashCanvas=function(){return (typeof swfobject!=="undefined")&&swfobject.hasFlashPlayerVersion("9");};realitybuilder.util.isCanvasSupported=function(){return (document.createElement("canvas").getContext||(realitybuilder.util.isFlashCanvasActive()&&realitybuilder.util.isFlashReadyForFlashCanvas()));};realitybuilder.util.showNoCanvasErrorMessage=function(){_4.attr("noCanvasErrorMessage","innerHTML","<p class=\"first\">The Reality Builder does not work because your "+"browser does not support the <a "+"href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas "+"element</a>.</p>");};realitybuilder.util.showNoImagesErrorMessage=function(){_4.attr("noImagesErrorMessage","innerHTML","<p class=\"first\">The Reality Builder does not work because your "+"browser does not load images.</p>");};realitybuilder.util.clearCanvas=function(_30){if(_30.getContext){var _31=_30.getContext("2d");_31.clearRect(0,0,_30.width,_30.height);}};realitybuilder.util.fillCanvas=function(_32,_33){if(_32.getContext){var _34=_32.getContext("2d");_34.fillStyle=_33;_34.fillRect(0,0,_32.width,_32.height);}};realitybuilder.util.rootUrl=function(){if(_4.config.isDebug){return _4.baseUrl+"../../../../";}else{return _4.baseUrl+"../../";}};if(!("query" in _4)&&typeof acme!=="undefined"&&"query" in acme){_4.query=acme.query;}}}};});