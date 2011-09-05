/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.date.islamic.locale"],["require","dojox.date.islamic.Date"],["require","dojo.regexp"],["require","dojo.string"],["require","dojo.i18n"],["require","dojo.date"],["requireLocalization","dojo.cldr","islamic",null,"ROOT,ar,da,de,en,en-gb,es,fi,he,zh-hant","ROOT,ar,da,de,en,en-gb,es,fi,he,zh-hant"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.date.islamic.locale"]){_4._hasResource["dojox.date.islamic.locale"]=true;_4.provide("dojox.date.islamic.locale");_4.require("dojox.date.islamic.Date");_4.require("dojo.regexp");_4.require("dojo.string");_4.require("dojo.i18n");_4.require("dojo.date");(function(){function _7(_8,_9,_a,_b,_c){return _c.replace(/([a-z])\1*/ig,function(_d){var s,_e;var c=_d.charAt(0);var l=_d.length;var _f=["abbr","wide","narrow"];switch(c){case "G":s=_9["eraAbbr"][0];break;case "y":s=String(_8.getFullYear());break;case "M":var m=_8.getMonth();if(l<3){s=m+1;_e=true;}else{var _10=["months","format",_f[l-3]].join("-");s=_9[_10][m];}break;case "d":s=_8.getDate(true);_e=true;break;case "E":var d=_8.getDay();if(l<3){s=d+1;_e=true;}else{var _11=["days","format",_f[l-3]].join("-");s=_9[_11][d];}break;case "a":var _12=(_8.getHours()<12)?"am":"pm";s=_9["dayPeriods-format-wide-"+_12];break;case "h":case "H":case "K":case "k":var h=_8.getHours();switch(c){case "h":s=(h%12)||12;break;case "H":s=h;break;case "K":s=(h%12);break;case "k":s=h||24;break;}_e=true;break;case "m":s=_8.getMinutes();_e=true;break;case "s":s=_8.getSeconds();_e=true;break;case "S":s=Math.round(_8.getMilliseconds()*Math.pow(10,l-3));_e=true;break;case "z":s=_4.date.getTimezoneName(_8.toGregorian());if(s){break;}l=4;case "Z":var _13=_8.toGregorian().getTimezoneOffset();var tz=[(_13<=0?"+":"-"),_4.string.pad(Math.floor(Math.abs(_13)/60),2),_4.string.pad(Math.abs(_13)%60,2)];if(l==4){tz.splice(0,0,"GMT");tz.splice(3,0,":");}s=tz.join("");break;default:throw new Error("dojox.date.islamic.locale.formatPattern: invalid pattern char: "+_c);}if(_e){s=_4.string.pad(s,l);}return s;});};_6.date.islamic.locale.format=function(_14,_15){_15=_15||{};var _16=_4.i18n.normalizeLocale(_15.locale);var _17=_15.formatLength||"short";var _18=_6.date.islamic.locale._getIslamicBundle(_16);var str=[];var _19=_4.hitch(this,_7,_14,_18,_16,_15.fullYear);if(_15.selector=="year"){var _1a=_14.getFullYear();return _1a;}if(_15.selector!="time"){var _1b=_15.datePattern||_18["dateFormat-"+_17];if(_1b){str.push(_1c(_1b,_19));}}if(_15.selector!="date"){var _1d=_15.timePattern||_18["timeFormat-"+_17];if(_1d){str.push(_1c(_1d,_19));}}var _1e=str.join(" ");return _1e;};_6.date.islamic.locale.regexp=function(_1f){return _6.date.islamic.locale._parseInfo(_1f).regexp;};_6.date.islamic.locale._parseInfo=function(_20){_20=_20||{};var _21=_4.i18n.normalizeLocale(_20.locale);var _22=_6.date.islamic.locale._getIslamicBundle(_21);var _23=_20.formatLength||"short";var _24=_20.datePattern||_22["dateFormat-"+_23];var _25=_20.timePattern||_22["timeFormat-"+_23];var _26;if(_20.selector=="date"){_26=_24;}else{if(_20.selector=="time"){_26=_25;}else{_26=(typeof (_25)=="undefined")?_24:_24+" "+_25;}}var _27=[];var re=_1c(_26,_4.hitch(this,_28,_27,_22,_20));return {regexp:re,tokens:_27,bundle:_22};};_6.date.islamic.locale.parse=function(_29,_2a){_29=_29.replace(/[\u200E\u200F\u202A\u202E]/g,"");if(!_2a){_2a={};}var _2b=_6.date.islamic.locale._parseInfo(_2a);var _2c=_2b.tokens,_2d=_2b.bundle;var _2e=_2b.regexp.replace(/[\u200E\u200F\u202A\u202E]/g,"");var re=new RegExp("^"+_2e+"$");var _2f=re.exec(_29);var _30=_4.i18n.normalizeLocale(_2a.locale);if(!_2f){console.debug("dojox.date.islamic.locale.parse: value  "+_29+" doesn't match pattern   "+re);return null;}var _31,_32;var _33=[1389,0,1,0,0,0,0];var _34="";var _35=0;var _36=["abbr","wide","narrow"];var _37=_4.every(_2f,function(v,i){if(!i){return true;}var _38=_2c[i-1];var l=_38.length;switch(_38.charAt(0)){case "y":_33[0]=Number(v);break;case "M":if(l>2){var _39=_2d["months-format-"+_36[l-3]].concat();if(!_2a.strict){v=v.replace(".","").toLowerCase();_39=_4.map(_39,function(s){return s?s.replace(".","").toLowerCase():s;});}v=_4.indexOf(_39,v);if(v==-1){return false;}_35=l;}else{v--;}_33[1]=Number(v);break;case "D":_33[1]=0;case "d":_33[2]=Number(v);break;case "a":var am=_2a.am||_2d["dayPeriods-format-wide-am"],pm=_2a.pm||_2d["dayPeriods-format-wide-pm"];if(!_2a.strict){var _3a=/\./g;v=v.replace(_3a,"").toLowerCase();am=am.replace(_3a,"").toLowerCase();pm=pm.replace(_3a,"").toLowerCase();}if(_2a.strict&&v!=am&&v!=pm){return false;}_34=(v==pm)?"p":(v==am)?"a":"";break;case "K":if(v==24){v=0;}case "h":case "H":case "k":_33[3]=Number(v);break;case "m":_33[4]=Number(v);break;case "s":_33[5]=Number(v);break;case "S":_33[6]=Number(v);}return true;});var _3b=+_33[3];if(_34==="p"&&_3b<12){_33[3]=_3b+12;}else{if(_34==="a"&&_3b==12){_33[3]=0;}}var _3c=new _6.date.islamic.Date(_33[0],_33[1],_33[2],_33[3],_33[4],_33[5],_33[6]);return _3c;};function _1c(_3d,_3e,_3f,_40){var _41=function(x){return x;};_3e=_3e||_41;_3f=_3f||_41;_40=_40||_41;var _42=_3d.match(/(''|[^'])+/g);var _43=_3d.charAt(0)=="'";_4.forEach(_42,function(_44,i){if(!_44){_42[i]="";}else{_42[i]=(_43?_3f:_3e)(_44);_43=!_43;}});return _40(_42.join(""));};function _28(_45,_46,_47,_48){_48=_4.regexp.escapeString(_48);var _49=_4.i18n.normalizeLocale(_47.locale);return _48.replace(/([a-z])\1*/ig,function(_4a){var s;var c=_4a.charAt(0);var l=_4a.length;var p2="",p3="";if(_47.strict){if(l>1){p2="0"+"{"+(l-1)+"}";}if(l>2){p3="0"+"{"+(l-2)+"}";}}else{p2="0?";p3="0{0,2}";}switch(c){case "y":s="\\d+";break;case "M":s=(l>2)?"\\S+ ?\\S+":p2+"[1-9]|1[0-2]";break;case "d":s="[12]\\d|"+p2+"[1-9]|3[01]";break;case "E":s="\\S+";break;case "h":s=p2+"[1-9]|1[0-2]";break;case "k":s=p2+"\\d|1[01]";break;case "H":s=p2+"\\d|1\\d|2[0-3]";break;case "K":s=p2+"[1-9]|1\\d|2[0-4]";break;case "m":case "s":s=p2+"\\d|[0-5]\\d";break;case "S":s="\\d{"+l+"}";break;case "a":var am=_47.am||_46["dayPeriods-format-wide-am"],pm=_47.pm||_46["dayPeriods-format-wide-pm"];if(_47.strict){s=am+"|"+pm;}else{s=am+"|"+pm;if(am!=am.toLowerCase()){s+="|"+am.toLowerCase();}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase();}}break;default:s=".*";}if(_45){_45.push(_4a);}return "("+s+")";}).replace(/[\xa0 ]/g,"[\\s\\xa0]");};})();(function(){var _4b=[];_6.date.islamic.locale.addCustomFormats=function(_4c,_4d){_4b.push({pkg:_4c,name:_4d});};_6.date.islamic.locale._getIslamicBundle=function(_4e){var _4f={};_4.forEach(_4b,function(_50){var _51=_4.i18n.getLocalization(_50.pkg,_50.name,_4e);_4f=_4.mixin(_4f,_51);},this);return _4f;};})();_6.date.islamic.locale.addCustomFormats("dojo.cldr","islamic");_6.date.islamic.locale.getNames=function(_52,_53,_54,_55,_56){var _57;var _58=_6.date.islamic.locale._getIslamicBundle(_55);var _59=[_52,_54,_53];if(_54=="standAlone"){var key=_59.join("-");_57=_58[key];if(_57[0]==1){_57=undefined;}}_59[1]="format";return (_57||_58[_59.join("-")]).concat();};_6.date.islamic.locale.weekDays=_6.date.islamic.locale.getNames("days","wide","format");_6.date.islamic.locale.months=_6.date.islamic.locale.getNames("months","wide","format");}}};});