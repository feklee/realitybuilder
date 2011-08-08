/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojo.date.locale"],["require","dojo.date"],["require","dojo.cldr.supplemental"],["require","dojo.regexp"],["require","dojo.string"],["require","dojo.i18n"],["requireLocalization","dojo.cldr","gregorian",null,"ROOT,ar,ca,cs,da,de,el,en,en-au,en-ca,en-gb,es,fi,fr,fr-ch,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-hant,zh-hk,zh-tw","ROOT,ar,ca,cs,da,de,el,en,en-au,en-ca,en-gb,es,fi,fr,fr-ch,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-hant,zh-hk,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojo.date.locale"]){_4._hasResource["dojo.date.locale"]=true;_4.provide("dojo.date.locale");_4.require("dojo.date");_4.require("dojo.cldr.supplemental");_4.require("dojo.regexp");_4.require("dojo.string");_4.require("dojo.i18n");_4.getObject("date.locale",true,_4);(function(){function _7(_8,_9,_a,_b){return _b.replace(/([a-z])\1*/ig,function(_c){var s,_d,c=_c.charAt(0),l=_c.length,_e=["abbr","wide","narrow"];switch(c){case "G":s=_9[(l<4)?"eraAbbr":"eraNames"][_8.getFullYear()<0?0:1];break;case "y":s=_8.getFullYear();switch(l){case 1:break;case 2:if(!_a.fullYear){s=String(s);s=s.substr(s.length-2);break;}default:_d=true;}break;case "Q":case "q":s=Math.ceil((_8.getMonth()+1)/3);_d=true;break;case "M":var m=_8.getMonth();if(l<3){s=m+1;_d=true;}else{var _f=["months","format",_e[l-3]].join("-");s=_9[_f][m];}break;case "w":var _10=0;s=_4.date.locale._getWeekOfYear(_8,_10);_d=true;break;case "d":s=_8.getDate();_d=true;break;case "D":s=_4.date.locale._getDayOfYear(_8);_d=true;break;case "E":var d=_8.getDay();if(l<3){s=d+1;_d=true;}else{var _11=["days","format",_e[l-3]].join("-");s=_9[_11][d];}break;case "a":var _12=(_8.getHours()<12)?"am":"pm";s=_a[_12]||_9["dayPeriods-format-wide-"+_12];break;case "h":case "H":case "K":case "k":var h=_8.getHours();switch(c){case "h":s=(h%12)||12;break;case "H":s=h;break;case "K":s=(h%12);break;case "k":s=h||24;break;}_d=true;break;case "m":s=_8.getMinutes();_d=true;break;case "s":s=_8.getSeconds();_d=true;break;case "S":s=Math.round(_8.getMilliseconds()*Math.pow(10,l-3));_d=true;break;case "v":case "z":s=_4.date.locale._getZone(_8,true,_a);if(s){break;}l=4;case "Z":var _13=_4.date.locale._getZone(_8,false,_a);var tz=[(_13<=0?"+":"-"),_4.string.pad(Math.floor(Math.abs(_13)/60),2),_4.string.pad(Math.abs(_13)%60,2)];if(l==4){tz.splice(0,0,"GMT");tz.splice(3,0,":");}s=tz.join("");break;default:throw new Error("dojo.date.locale.format: invalid pattern char: "+_b);}if(_d){s=_4.string.pad(s,l);}return s;});};_4.date.locale._getZone=function(_14,_15,_16){if(_15){return _4.date.getTimezoneName(_14);}else{return _14.getTimezoneOffset();}};_4.date.locale.format=function(_17,_18){_18=_18||{};var _19=_4.i18n.normalizeLocale(_18.locale),_1a=_18.formatLength||"short",_1b=_4.date.locale._getGregorianBundle(_19),str=[],_1c=_4.hitch(this,_7,_17,_1b,_18);if(_18.selector=="year"){return _1d(_1b["dateFormatItem-yyyy"]||"yyyy",_1c);}var _1e;if(_18.selector!="date"){_1e=_18.timePattern||_1b["timeFormat-"+_1a];if(_1e){str.push(_1d(_1e,_1c));}}if(_18.selector!="time"){_1e=_18.datePattern||_1b["dateFormat-"+_1a];if(_1e){str.push(_1d(_1e,_1c));}}return str.length==1?str[0]:_1b["dateTimeFormat-"+_1a].replace(/\{(\d+)\}/g,function(_1f,key){return str[key];});};_4.date.locale.regexp=function(_20){return _4.date.locale._parseInfo(_20).regexp;};_4.date.locale._parseInfo=function(_21){_21=_21||{};var _22=_4.i18n.normalizeLocale(_21.locale),_23=_4.date.locale._getGregorianBundle(_22),_24=_21.formatLength||"short",_25=_21.datePattern||_23["dateFormat-"+_24],_26=_21.timePattern||_23["timeFormat-"+_24],_27;if(_21.selector=="date"){_27=_25;}else{if(_21.selector=="time"){_27=_26;}else{_27=_23["dateTimeFormat-"+_24].replace(/\{(\d+)\}/g,function(_28,key){return [_26,_25][key];});}}var _29=[],re=_1d(_27,_4.hitch(this,_2a,_29,_23,_21));return {regexp:re,tokens:_29,bundle:_23};};_4.date.locale.parse=function(_2b,_2c){var _2d=/[\u200E\u200F\u202A\u202E]/g,_2e=_4.date.locale._parseInfo(_2c),_2f=_2e.tokens,_30=_2e.bundle,re=new RegExp("^"+_2e.regexp.replace(_2d,"")+"$",_2e.strict?"":"i"),_31=re.exec(_2b&&_2b.replace(_2d,""));if(!_31){return null;}var _32=["abbr","wide","narrow"],_33=[1970,0,1,0,0,0,0],_34="",_35=_4.every(_31,function(v,i){if(!i){return true;}var _36=_2f[i-1];var l=_36.length;switch(_36.charAt(0)){case "y":if(l!=2&&_2c.strict){_33[0]=v;}else{if(v<100){v=Number(v);var _37=""+new Date().getFullYear(),_38=_37.substring(0,2)*100,_39=Math.min(Number(_37.substring(2,4))+20,99),num=(v<_39)?_38+v:_38-100+v;_33[0]=num;}else{if(_2c.strict){return false;}_33[0]=v;}}break;case "M":if(l>2){var _3a=_30["months-format-"+_32[l-3]].concat();if(!_2c.strict){v=v.replace(".","").toLowerCase();_3a=_4.map(_3a,function(s){return s.replace(".","").toLowerCase();});}v=_4.indexOf(_3a,v);if(v==-1){return false;}}else{v--;}_33[1]=v;break;case "E":case "e":var _3b=_30["days-format-"+_32[l-3]].concat();if(!_2c.strict){v=v.toLowerCase();_3b=_4.map(_3b,function(d){return d.toLowerCase();});}v=_4.indexOf(_3b,v);if(v==-1){return false;}break;case "D":_33[1]=0;case "d":_33[2]=v;break;case "a":var am=_2c.am||_30["dayPeriods-format-wide-am"],pm=_2c.pm||_30["dayPeriods-format-wide-pm"];if(!_2c.strict){var _3c=/\./g;v=v.replace(_3c,"").toLowerCase();am=am.replace(_3c,"").toLowerCase();pm=pm.replace(_3c,"").toLowerCase();}if(_2c.strict&&v!=am&&v!=pm){return false;}_34=(v==pm)?"p":(v==am)?"a":"";break;case "K":if(v==24){v=0;}case "h":case "H":case "k":if(v>23){return false;}_33[3]=v;break;case "m":_33[4]=v;break;case "s":_33[5]=v;break;case "S":_33[6]=v;}return true;});var _3d=+_33[3];if(_34==="p"&&_3d<12){_33[3]=_3d+12;}else{if(_34==="a"&&_3d==12){_33[3]=0;}}var _3e=new Date(_33[0],_33[1],_33[2],_33[3],_33[4],_33[5],_33[6]);if(_2c.strict){_3e.setFullYear(_33[0]);}var _3f=_2f.join(""),_40=_3f.indexOf("d")!=-1,_41=_3f.indexOf("M")!=-1;if(!_35||(_41&&_3e.getMonth()>_33[1])||(_40&&_3e.getDate()>_33[2])){return null;}if((_41&&_3e.getMonth()<_33[1])||(_40&&_3e.getDate()<_33[2])){_3e=_4.date.add(_3e,"hour",1);}return _3e;};function _1d(_42,_43,_44,_45){var _46=function(x){return x;};_43=_43||_46;_44=_44||_46;_45=_45||_46;var _47=_42.match(/(''|[^'])+/g),_48=_42.charAt(0)=="'";_4.forEach(_47,function(_49,i){if(!_49){_47[i]="";}else{_47[i]=(_48?_44:_43)(_49.replace(/''/g,"'"));_48=!_48;}});return _45(_47.join(""));};function _2a(_4a,_4b,_4c,_4d){_4d=_4.regexp.escapeString(_4d);if(!_4c.strict){_4d=_4d.replace(" a"," ?a");}return _4d.replace(/([a-z])\1*/ig,function(_4e){var s,c=_4e.charAt(0),l=_4e.length,p2="",p3="";if(_4c.strict){if(l>1){p2="0"+"{"+(l-1)+"}";}if(l>2){p3="0"+"{"+(l-2)+"}";}}else{p2="0?";p3="0{0,2}";}switch(c){case "y":s="\\d{2,4}";break;case "M":s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";break;case "D":s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p3+"[1-9][0-9]|"+p2+"[1-9]";break;case "d":s="3[01]|[12]\\d|"+p2+"[1-9]";break;case "w":s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";break;case "E":s="\\S+";break;case "h":s="1[0-2]|"+p2+"[1-9]";break;case "k":s="1[01]|"+p2+"\\d";break;case "H":s="1\\d|2[0-3]|"+p2+"\\d";break;case "K":s="1\\d|2[0-4]|"+p2+"[1-9]";break;case "m":case "s":s="[0-5]\\d";break;case "S":s="\\d{"+l+"}";break;case "a":var am=_4c.am||_4b["dayPeriods-format-wide-am"],pm=_4c.pm||_4b["dayPeriods-format-wide-pm"];s=am+"|"+pm;if(!_4c.strict){if(am!=am.toLowerCase()){s+="|"+am.toLowerCase();}if(pm!=pm.toLowerCase()){s+="|"+pm.toLowerCase();}if(s.indexOf(".")!=-1){s+="|"+s.replace(/\./g,"");}}s=s.replace(/\./g,"\\.");break;default:s=".*";}if(_4a){_4a.push(_4e);}return "("+s+")";}).replace(/[\xa0 ]/g,"[\\s\\xa0]");};})();(function(){var _4f=[];_4.date.locale.addCustomFormats=function(_50,_51){_4f.push({pkg:_50,name:_51});};_4.date.locale._getGregorianBundle=function(_52){var _53={};_4.forEach(_4f,function(_54){var _55=_4.i18n.getLocalization(_54.pkg,_54.name,_52);_53=_4.mixin(_53,_55);},this);return _53;};})();_4.date.locale.addCustomFormats("dojo.cldr","gregorian");_4.date.locale.getNames=function(_56,_57,_58,_59){var _5a,_5b=_4.date.locale._getGregorianBundle(_59),_5c=[_56,_58,_57];if(_58=="standAlone"){var key=_5c.join("-");_5a=_5b[key];if(_5a[0]==1){_5a=undefined;}}_5c[1]="format";return (_5a||_5b[_5c.join("-")]).concat();};_4.date.locale.isWeekend=function(_5d,_5e){var _5f=_4.cldr.supplemental.getWeekend(_5e),day=(_5d||new Date()).getDay();if(_5f.end<_5f.start){_5f.end+=7;if(day<_5f.start){day+=7;}}return day>=_5f.start&&day<=_5f.end;};_4.date.locale._getDayOfYear=function(_60){return _4.date.difference(new Date(_60.getFullYear(),0,1,_60.getHours()),_60)+1;};_4.date.locale._getWeekOfYear=function(_61,_62){if(arguments.length==1){_62=0;}var _63=new Date(_61.getFullYear(),0,1).getDay(),adj=(_63-_62+7)%7,_64=Math.floor((_4.date.locale._getDayOfYear(_61)+adj-1)/7);if(_63==_62){_64++;}return _64;};}}};});