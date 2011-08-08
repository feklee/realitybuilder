/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.highlight._base"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.highlight._base"]){_4._hasResource["dojox.highlight._base"]=true;_4.provide("dojox.highlight._base");(function(){var dh=_6.highlight,_7="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";dh.constants={IDENT_RE:"[a-zA-Z][a-zA-Z0-9_]*",UNDERSCORE_IDENT_RE:"[a-zA-Z_][a-zA-Z0-9_]*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:_7,APOS_STRING_MODE:{className:"string",begin:"'",end:"'",illegal:"\\n",contains:["escape"],relevance:0},QUOTE_STRING_MODE:{className:"string",begin:"\"",end:"\"",illegal:"\\n",contains:["escape"],relevance:0},BACKSLASH_ESCAPE:{className:"escape",begin:"\\\\.",end:"^",relevance:0},C_LINE_COMMENT_MODE:{className:"comment",begin:"//",end:"$",relevance:0},C_BLOCK_COMMENT_MODE:{className:"comment",begin:"/\\*",end:"\\*/"},HASH_COMMENT_MODE:{className:"comment",begin:"#",end:"$"},C_NUMBER_MODE:{className:"number",begin:_7,end:"^",relevance:0}};function _8(_9){return _9.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;");};function _a(_b){return _4.every(_b.childNodes,function(_c){return _c.nodeType==3||String(_c.nodeName).toLowerCase()=="br";});};function _d(_e){var _f=[];_4.forEach(_e.childNodes,function(_10){if(_10.nodeType==3){_f.push(_10.nodeValue);}else{if(String(_10.nodeName).toLowerCase()=="br"){_f.push("\n");}else{throw "Complex markup";}}});return _f.join("");};function _11(_12){if(!_12.keywordGroups){for(var key in _12.keywords){var kw=_12.keywords[key];if(kw instanceof Object){_12.keywordGroups=_12.keywords;}else{_12.keywordGroups={keyword:_12.keywords};}break;}}};function _13(_14){if(_14.defaultMode&&_14.modes){_11(_14.defaultMode);_4.forEach(_14.modes,_11);}};var _15=function(_16,_17){this.langName=_16;this.lang=dh.languages[_16];this.modes=[this.lang.defaultMode];this.relevance=0;this.keywordCount=0;this.result=[];if(!this.lang.defaultMode.illegalRe){this.buildRes();_13(this.lang);}try{this.highlight(_17);this.result=this.result.join("");}catch(e){if(e=="Illegal"){this.relevance=0;this.keywordCount=0;this.partialResult=this.result.join("");this.result=_8(_17);}else{throw e;}}};_4.extend(_15,{buildRes:function(){_4.forEach(this.lang.modes,function(_18){if(_18.begin){_18.beginRe=this.langRe("^"+_18.begin);}if(_18.end){_18.endRe=this.langRe("^"+_18.end);}if(_18.illegal){_18.illegalRe=this.langRe("^(?:"+_18.illegal+")");}},this);this.lang.defaultMode.illegalRe=this.langRe("^(?:"+this.lang.defaultMode.illegal+")");},subMode:function(_19){var _1a=this.modes[this.modes.length-1].contains;if(_1a){var _1b=this.lang.modes;for(var i=0;i<_1a.length;++i){var _1c=_1a[i];for(var j=0;j<_1b.length;++j){var _1d=_1b[j];if(_1d.className==_1c&&_1d.beginRe.test(_19)){return _1d;}}}}return null;},endOfMode:function(_1e){for(var i=this.modes.length-1;i>=0;--i){var _1f=this.modes[i];if(_1f.end&&_1f.endRe.test(_1e)){return this.modes.length-i;}if(!_1f.endsWithParent){break;}}return 0;},isIllegal:function(_20){var _21=this.modes[this.modes.length-1].illegalRe;return _21&&_21.test(_20);},langRe:function(_22,_23){var _24="m"+(this.lang.case_insensitive?"i":"")+(_23?"g":"");return new RegExp(_22,_24);},buildTerminators:function(){var _25=this.modes[this.modes.length-1],_26={};if(_25.contains){_4.forEach(this.lang.modes,function(_27){if(_4.indexOf(_25.contains,_27.className)>=0){_26[_27.begin]=1;}});}for(var i=this.modes.length-1;i>=0;--i){var m=this.modes[i];if(m.end){_26[m.end]=1;}if(!m.endsWithParent){break;}}if(_25.illegal){_26[_25.illegal]=1;}var t=[];for(i in _26){t.push(i);}_25.terminatorsRe=this.langRe("("+t.join("|")+")");},eatModeChunk:function(_28,_29){var _2a=this.modes[this.modes.length-1];if(!_2a.terminatorsRe){this.buildTerminators();}_28=_28.substr(_29);var _2b=_2a.terminatorsRe.exec(_28);if(!_2b){return {buffer:_28,lexeme:"",end:true};}return {buffer:_2b.index?_28.substr(0,_2b.index):"",lexeme:_2b[0],end:false};},keywordMatch:function(_2c,_2d){var _2e=_2d[0];if(this.lang.case_insensitive){_2e=_2e.toLowerCase();}for(var _2f in _2c.keywordGroups){if(_2e in _2c.keywordGroups[_2f]){return _2f;}}return "";},buildLexemes:function(_30){var _31={};_4.forEach(_30.lexems,function(_32){_31[_32]=1;});var t=[];for(var i in _31){t.push(i);}_30.lexemsRe=this.langRe("("+t.join("|")+")",true);},processKeywords:function(_33){var _34=this.modes[this.modes.length-1];if(!_34.keywords||!_34.lexems){return _8(_33);}if(!_34.lexemsRe){this.buildLexemes(_34);}_34.lexemsRe.lastIndex=0;var _35=[],_36=0,_37=_34.lexemsRe.exec(_33);while(_37){_35.push(_8(_33.substr(_36,_37.index-_36)));var _38=this.keywordMatch(_34,_37);if(_38){++this.keywordCount;_35.push("<span class=\""+_38+"\">"+_8(_37[0])+"</span>");}else{_35.push(_8(_37[0]));}_36=_34.lexemsRe.lastIndex;_37=_34.lexemsRe.exec(_33);}_35.push(_8(_33.substr(_36,_33.length-_36)));return _35.join("");},processModeInfo:function(_39,_3a,end){var _3b=this.modes[this.modes.length-1];if(end){this.result.push(this.processKeywords(_3b.buffer+_39));return;}if(this.isIllegal(_3a)){throw "Illegal";}var _3c=this.subMode(_3a);if(_3c){_3b.buffer+=_39;this.result.push(this.processKeywords(_3b.buffer));if(_3c.excludeBegin){this.result.push(_3a+"<span class=\""+_3c.className+"\">");_3c.buffer="";}else{this.result.push("<span class=\""+_3c.className+"\">");_3c.buffer=_3a;}this.modes.push(_3c);this.relevance+=typeof _3c.relevance=="number"?_3c.relevance:1;return;}var _3d=this.endOfMode(_3a);if(_3d){_3b.buffer+=_39;if(_3b.excludeEnd){this.result.push(this.processKeywords(_3b.buffer)+"</span>"+_3a);}else{this.result.push(this.processKeywords(_3b.buffer+_3a)+"</span>");}while(_3d>1){this.result.push("</span>");--_3d;this.modes.pop();}this.modes.pop();this.modes[this.modes.length-1].buffer="";return;}},highlight:function(_3e){var _3f=0;this.lang.defaultMode.buffer="";do{var _40=this.eatModeChunk(_3e,_3f);this.processModeInfo(_40.buffer,_40.lexeme,_40.end);_3f+=_40.buffer.length+_40.lexeme.length;}while(!_40.end);if(this.modes.length>1){throw "Illegal";}}});function _41(_42,_43,_44){if(String(_42.tagName).toLowerCase()=="code"&&String(_42.parentNode.tagName).toLowerCase()=="pre"){var _45=document.createElement("div"),_46=_42.parentNode.parentNode;_45.innerHTML="<pre><code class=\""+_43+"\">"+_44+"</code></pre>";_46.replaceChild(_45.firstChild,_42.parentNode);}else{_42.className=_43;_42.innerHTML=_44;}};function _47(_48,str){var _49=new _15(_48,str);return {result:_49.result,langName:_48,partialResult:_49.partialResult};};function _4a(_4b,_4c){var _4d=_47(_4c,_d(_4b));_41(_4b,_4b.className,_4d.result);};function _4e(str){var _4f="",_50="",_51=2,_52=str;for(var key in dh.languages){if(!dh.languages[key].defaultMode){continue;}var _53=new _15(key,_52),_54=_53.keywordCount+_53.relevance,_55=0;if(!_4f||_54>_55){_55=_54;_4f=_53.result;_50=_53.langName;}}return {result:_4f,langName:_50};};function _56(_57){var _58=_4e(_d(_57));if(_58.result){_41(_57,_58.langName,_58.result);}};_6.highlight.processString=function(str,_59){return _59?_47(_59,str):_4e(str);};_6.highlight.init=function(_5a){_5a=_4.byId(_5a);if(_4.hasClass(_5a,"no-highlight")){return;}if(!_a(_5a)){return;}var _5b=_5a.className.split(/\s+/),_5c=_4.some(_5b,function(_5d){if(_5d.charAt(0)!="_"&&dh.languages[_5d]){_4a(_5a,_5d);return true;}return false;});if(!_5c){_56(_5a);}};dh.Code=function(p,n){dh.init(n);};})();}}};});