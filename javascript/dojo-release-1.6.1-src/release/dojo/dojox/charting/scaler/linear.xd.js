/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.scaler.linear"],["require","dojox.charting.scaler.common"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.scaler.linear"]){_4._hasResource["dojox.charting.scaler.linear"]=true;_4.provide("dojox.charting.scaler.linear");_4.require("dojox.charting.scaler.common");(function(){var _7=3,dc=_6.charting,_8=dc.scaler,_9=_8.common,_a=_9.findString,_b=_9.getNumericLabel;var _c=function(_d,_e,_f,_10,_11,_12,_13){_f=_4.delegate(_f);if(!_10){if(_f.fixUpper=="major"){_f.fixUpper="minor";}if(_f.fixLower=="major"){_f.fixLower="minor";}}if(!_11){if(_f.fixUpper=="minor"){_f.fixUpper="micro";}if(_f.fixLower=="minor"){_f.fixLower="micro";}}if(!_12){if(_f.fixUpper=="micro"){_f.fixUpper="none";}if(_f.fixLower=="micro"){_f.fixLower="none";}}var _14=_a(_f.fixLower,["major"])?Math.floor(_f.min/_10)*_10:_a(_f.fixLower,["minor"])?Math.floor(_f.min/_11)*_11:_a(_f.fixLower,["micro"])?Math.floor(_f.min/_12)*_12:_f.min,_15=_a(_f.fixUpper,["major"])?Math.ceil(_f.max/_10)*_10:_a(_f.fixUpper,["minor"])?Math.ceil(_f.max/_11)*_11:_a(_f.fixUpper,["micro"])?Math.ceil(_f.max/_12)*_12:_f.max;if(_f.useMin){_d=_14;}if(_f.useMax){_e=_15;}var _16=(!_10||_f.useMin&&_a(_f.fixLower,["major"]))?_d:Math.ceil(_d/_10)*_10,_17=(!_11||_f.useMin&&_a(_f.fixLower,["major","minor"]))?_d:Math.ceil(_d/_11)*_11,_18=(!_12||_f.useMin&&_a(_f.fixLower,["major","minor","micro"]))?_d:Math.ceil(_d/_12)*_12,_19=!_10?0:(_f.useMax&&_a(_f.fixUpper,["major"])?Math.round((_e-_16)/_10):Math.floor((_e-_16)/_10))+1,_1a=!_11?0:(_f.useMax&&_a(_f.fixUpper,["major","minor"])?Math.round((_e-_17)/_11):Math.floor((_e-_17)/_11))+1,_1b=!_12?0:(_f.useMax&&_a(_f.fixUpper,["major","minor","micro"])?Math.round((_e-_18)/_12):Math.floor((_e-_18)/_12))+1,_1c=_11?Math.round(_10/_11):0,_1d=_12?Math.round(_11/_12):0,_1e=_10?Math.floor(Math.log(_10)/Math.LN10):0,_1f=_11?Math.floor(Math.log(_11)/Math.LN10):0,_20=_13/(_e-_d);if(!isFinite(_20)){_20=1;}return {bounds:{lower:_14,upper:_15,from:_d,to:_e,scale:_20,span:_13},major:{tick:_10,start:_16,count:_19,prec:_1e},minor:{tick:_11,start:_17,count:_1a,prec:_1f},micro:{tick:_12,start:_18,count:_1b,prec:0},minorPerMajor:_1c,microPerMinor:_1d,scaler:_8.linear};};_4.mixin(_6.charting.scaler.linear,{buildScaler:function(min,max,_21,_22){var h={fixUpper:"none",fixLower:"none",natural:false};if(_22){if("fixUpper" in _22){h.fixUpper=String(_22.fixUpper);}if("fixLower" in _22){h.fixLower=String(_22.fixLower);}if("natural" in _22){h.natural=Boolean(_22.natural);}}if("min" in _22){min=_22.min;}if("max" in _22){max=_22.max;}if(_22.includeZero){if(min>0){min=0;}if(max<0){max=0;}}h.min=min;h.useMin=true;h.max=max;h.useMax=true;if("from" in _22){min=_22.from;h.useMin=false;}if("to" in _22){max=_22.to;h.useMax=false;}if(max<=min){return _c(min,max,h,0,0,0,_21);}var mag=Math.floor(Math.log(max-min)/Math.LN10),_23=_22&&("majorTickStep" in _22)?_22.majorTickStep:Math.pow(10,mag),_24=0,_25=0,_26;if(_22&&("minorTickStep" in _22)){_24=_22.minorTickStep;}else{do{_24=_23/10;if(!h.natural||_24>0.9){_26=_c(min,max,h,_23,_24,0,_21);if(_26.bounds.scale*_26.minor.tick>_7){break;}}_24=_23/5;if(!h.natural||_24>0.9){_26=_c(min,max,h,_23,_24,0,_21);if(_26.bounds.scale*_26.minor.tick>_7){break;}}_24=_23/2;if(!h.natural||_24>0.9){_26=_c(min,max,h,_23,_24,0,_21);if(_26.bounds.scale*_26.minor.tick>_7){break;}}return _c(min,max,h,_23,0,0,_21);}while(false);}if(_22&&("microTickStep" in _22)){_25=_22.microTickStep;_26=_c(min,max,h,_23,_24,_25,_21);}else{do{_25=_24/10;if(!h.natural||_25>0.9){_26=_c(min,max,h,_23,_24,_25,_21);if(_26.bounds.scale*_26.micro.tick>_7){break;}}_25=_24/5;if(!h.natural||_25>0.9){_26=_c(min,max,h,_23,_24,_25,_21);if(_26.bounds.scale*_26.micro.tick>_7){break;}}_25=_24/2;if(!h.natural||_25>0.9){_26=_c(min,max,h,_23,_24,_25,_21);if(_26.bounds.scale*_26.micro.tick>_7){break;}}_25=0;}while(false);}return _25?_26:_c(min,max,h,_23,_24,0,_21);},buildTicks:function(_27,_28){var _29,_2a,_2b,_2c=_27.major.start,_2d=_27.minor.start,_2e=_27.micro.start;if(_28.microTicks&&_27.micro.tick){_29=_27.micro.tick,_2a=_2e;}else{if(_28.minorTicks&&_27.minor.tick){_29=_27.minor.tick,_2a=_2d;}else{if(_27.major.tick){_29=_27.major.tick,_2a=_2c;}else{return null;}}}var _2f=1/_27.bounds.scale;if(_27.bounds.to<=_27.bounds.from||isNaN(_2f)||!isFinite(_2f)||_29<=0||isNaN(_29)||!isFinite(_29)){return null;}var _30=[],_31=[],_32=[];while(_2a<=_27.bounds.to+_2f){if(Math.abs(_2c-_2a)<_29/2){_2b={value:_2c};if(_28.majorLabels){_2b.label=_b(_2c,_27.major.prec,_28);}_30.push(_2b);_2c+=_27.major.tick;_2d+=_27.minor.tick;_2e+=_27.micro.tick;}else{if(Math.abs(_2d-_2a)<_29/2){if(_28.minorTicks){_2b={value:_2d};if(_28.minorLabels&&(_27.minMinorStep<=_27.minor.tick*_27.bounds.scale)){_2b.label=_b(_2d,_27.minor.prec,_28);}_31.push(_2b);}_2d+=_27.minor.tick;_2e+=_27.micro.tick;}else{if(_28.microTicks){_32.push({value:_2e});}_2e+=_27.micro.tick;}}_2a+=_29;}return {major:_30,minor:_31,micro:_32};},getTransformerFromModel:function(_33){var _34=_33.bounds.from,_35=_33.bounds.scale;return function(x){return (x-_34)*_35;};},getTransformerFromPlot:function(_36){var _37=_36.bounds.from,_38=_36.bounds.scale;return function(x){return x/_38+_37;};}});})();}}};});