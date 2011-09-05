/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.rails"],["require","dojo.NodeList-traverse"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.rails"]){_4._hasResource["dojox.rails"]=true;_4.provide("dojox.rails");_4.require("dojo.NodeList-traverse");_6.rails.live=function(_7,_8,fn){if(_4.isIE&&_8.match(/^(on)?submit$/i)){_6.rails.live(_7,"click",function(_9){var _a=_9.target,_b=_a.tagName.toLowerCase();if((_b=="input"||_b=="button")&&_4.attr(_a,"type").toLowerCase()=="submit"){var _c=_4.query(_a).closest("form");if(_c.length){var h=_4.connect(_c[0],"submit",function(_d){_4.disconnect(h);fn.call(_d.target,_d);});}}});}else{_4.connect(_4.body(),_8,function(_e){var nl=_4.query(_e.target).closest(_7);if(nl.length){fn.call(nl[0],_e);}});}};_4.ready((function(d,dr,dg){return function(){var q=d.query,_f=dr.live,_10=q("meta[name=csrf-token]").attr("content"),_11=q("meta[name=csrf-param]").attr("content");var _12=function(url,_13){var _14="<form style=\"display:none\" method=\"post\" action=\""+url+"\">"+"<input type=\"hidden\" name=\"_method\" value=\""+_13+"\" />"+"<input type=\"hidden\" name=\""+_11+"\" value=\""+_10+"\" />"+"</form>";return _4.place(_14,_4.body());};var _15=function(_16){d.forEach(_16,function(_17){if(!d.attr(_17,"disabled")){var _18=_17.tagName.toLowerCase()=="input"?"value":"innerHTML";var _19=d.attr(_17,"data-disable-with");var _1a=d.attr(_17,_18);d.attr(_17,"disabled",true);d.attr(_17,"data-original-value",_1a);d.attr(_17,_18,_19);}});};var _1b={"text":"text","json":"application/json","json-comment-optional":"text","json-comment-filtered":"text","javascript":"application/javascript","xml":"text/xml"};var _1c=function(evt){var el=evt.target,tag=el.tagName.toLowerCase();var _1d=tag.toLowerCase()=="form"?d.formToObject(el):{},_1e=d.attr(el,"data-type")||"javascript",_1f=(d.attr(el,"method")||d.attr(el,"data-method")||"get").toLowerCase(),url=d.attr(el,"action")||d.attr(el,"href");if(tag!="form"&&_1f!="get"){el=_12(url,_1f);_1f="POST";}evt.preventDefault();d.publish("ajax:before",[el]);var _20=d.xhr(_1f,{url:url,headers:{"Accept":_1b[_1e]},content:_1d,handleAs:_1e,load:function(_21,_22){d.publish("ajax:success",[el,_21,_22]);},error:function(_23,_24){d.publish("ajax:failure",[el,_23,_24]);},handle:function(_25,_26){d.publish("ajax:complete",[el,_25,_26]);}});d.publish("ajax:after",[el]);};var _27=function(el){q("*[data-disable-with][disabled]",el).forEach(function(_28){var _29=_28.tagName.toLowerCase()=="input"?"value":"innerHTML";var _2a=d.attr(_28,"data-original-value");d.attr(_28,"disabled",false);d.attr(_28,"data-original-value",null);d.attr(_28,_29,_2a);});};var _2b=function(evt){var el=evt.target,_2c=_12(el.href,_4.attr(el,"data-method"));evt.preventDefault();_2c.submit();};var _2d=function(evt){var el=evt.target,_2e=q("*[data-disable-with]",el);if(_2e.length){_15(_2e);}if(d.attr(el,"data-remote")){evt.preventDefault();_1c(evt);}};var _2f=function(evt){var _30=dg.confirm(d.attr(evt.target,"data-confirm"));if(!_30){evt.preventDefault();}else{if(d.attr(evt.target,"data-remote")){_1c(evt);}}};_f("*[data-confirm]","click",_2f);d.subscribe("ajax:complete",_27);_f("a[data-remote]:not([data-confirm])","click",_1c);_f("a[data-method]:not([data-remote])","click",_2b);_f("form","submit",_2d);};})(_4,_6.rails,_4.global));}}};});