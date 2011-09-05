/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.XmlStore"],["require","dojo.data.util.simpleFetch"],["require","dojo.data.util.filter"],["require","dojox.xml.parser"],["provide","dojox.data.XmlItem"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.XmlStore"]){_4._hasResource["dojox.data.XmlStore"]=true;_4.provide("dojox.data.XmlStore");_4.require("dojo.data.util.simpleFetch");_4.require("dojo.data.util.filter");_4.require("dojox.xml.parser");_4.provide("dojox.data.XmlItem");_4.declare("dojox.data.XmlStore",null,{constructor:function(_7){if(_7){this.url=_7.url;this.rootItem=(_7.rootItem||_7.rootitem||this.rootItem);this.keyAttribute=(_7.keyAttribute||_7.keyattribute||this.keyAttribute);this._attributeMap=(_7.attributeMap||_7.attributemap);this.label=_7.label||this.label;this.sendQuery=(_7.sendQuery||_7.sendquery||this.sendQuery);if("urlPreventCache" in _7){this.urlPreventCache=_7.urlPreventCache?true:false;}}this._newItems=[];this._deletedItems=[];this._modifiedItems=[];},url:"",rootItem:"",keyAttribute:"",label:"",sendQuery:false,attributeMap:null,urlPreventCache:true,getValue:function(_8,_9,_a){var _b=_8.element;var i;var _c;if(_9==="tagName"){return _b.nodeName;}else{if(_9==="childNodes"){for(i=0;i<_b.childNodes.length;i++){_c=_b.childNodes[i];if(_c.nodeType===1){return this._getItem(_c);}}return _a;}else{if(_9==="text()"){for(i=0;i<_b.childNodes.length;i++){_c=_b.childNodes[i];if(_c.nodeType===3||_c.nodeType===4){return _c.nodeValue;}}return _a;}else{_9=this._getAttribute(_b.nodeName,_9);if(_9.charAt(0)==="@"){var _d=_9.substring(1);var _e=_b.getAttribute(_d);return (_e)?_e:_a;}else{for(i=0;i<_b.childNodes.length;i++){_c=_b.childNodes[i];if(_c.nodeType===1&&_c.nodeName===_9){return this._getItem(_c);}}return _a;}}}}},getValues:function(_f,_10){var _11=_f.element;var _12=[];var i;var _13;if(_10==="tagName"){return [_11.nodeName];}else{if(_10==="childNodes"){for(i=0;i<_11.childNodes.length;i++){_13=_11.childNodes[i];if(_13.nodeType===1){_12.push(this._getItem(_13));}}return _12;}else{if(_10==="text()"){var ec=_11.childNodes;for(i=0;i<ec.length;i++){_13=ec[i];if(_13.nodeType===3||_13.nodeType===4){_12.push(_13.nodeValue);}}return _12;}else{_10=this._getAttribute(_11.nodeName,_10);if(_10.charAt(0)==="@"){var _14=_10.substring(1);var _15=_11.getAttribute(_14);return (_15!==undefined)?[_15]:[];}else{for(i=0;i<_11.childNodes.length;i++){_13=_11.childNodes[i];if(_13.nodeType===1&&_13.nodeName===_10){_12.push(this._getItem(_13));}}return _12;}}}}},getAttributes:function(_16){var _17=_16.element;var _18=[];var i;_18.push("tagName");if(_17.childNodes.length>0){var _19={};var _1a=true;var _1b=false;for(i=0;i<_17.childNodes.length;i++){var _1c=_17.childNodes[i];if(_1c.nodeType===1){var _1d=_1c.nodeName;if(!_19[_1d]){_18.push(_1d);_19[_1d]=_1d;}_1a=true;}else{if(_1c.nodeType===3){_1b=true;}}}if(_1a){_18.push("childNodes");}if(_1b){_18.push("text()");}}for(i=0;i<_17.attributes.length;i++){_18.push("@"+_17.attributes[i].nodeName);}if(this._attributeMap){for(var key in this._attributeMap){i=key.indexOf(".");if(i>0){var _1e=key.substring(0,i);if(_1e===_17.nodeName){_18.push(key.substring(i+1));}}else{_18.push(key);}}}return _18;},hasAttribute:function(_1f,_20){return (this.getValue(_1f,_20)!==undefined);},containsValue:function(_21,_22,_23){var _24=this.getValues(_21,_22);for(var i=0;i<_24.length;i++){if((typeof _23==="string")){if(_24[i].toString&&_24[i].toString()===_23){return true;}}else{if(_24[i]===_23){return true;}}}return false;},isItem:function(_25){if(_25&&_25.element&&_25.store&&_25.store===this){return true;}return false;},isItemLoaded:function(_26){return this.isItem(_26);},loadItem:function(_27){},getFeatures:function(){var _28={"dojo.data.api.Read":true,"dojo.data.api.Write":true};if(!this.sendQuery||this.keyAttribute!==""){_28["dojo.data.api.Identity"]=true;}return _28;},getLabel:function(_29){if((this.label!=="")&&this.isItem(_29)){var _2a=this.getValue(_29,this.label);if(_2a){return _2a.toString();}}return undefined;},getLabelAttributes:function(_2b){if(this.label!==""){return [this.label];}return null;},_fetchItems:function(_2c,_2d,_2e){var url=this._getFetchUrl(_2c);console.log("XmlStore._fetchItems(): url="+url);if(!url){_2e(new Error("No URL specified."));return;}var _2f=(!this.sendQuery?_2c:{});var _30=this;var _31={url:url,handleAs:"xml",preventCache:_30.urlPreventCache};var _32=_4.xhrGet(_31);_32.addCallback(function(_33){var _34=_30._getItems(_33,_2f);console.log("XmlStore._fetchItems(): length="+(_34?_34.length:0));if(_34&&_34.length>0){_2d(_34,_2c);}else{_2d([],_2c);}});_32.addErrback(function(_35){_2e(_35,_2c);});},_getFetchUrl:function(_36){if(!this.sendQuery){return this.url;}var _37=_36.query;if(!_37){return this.url;}if(_4.isString(_37)){return this.url+_37;}var _38="";for(var _39 in _37){var _3a=_37[_39];if(_3a){if(_38){_38+="&";}_38+=(_39+"="+_3a);}}if(!_38){return this.url;}var _3b=this.url;if(_3b.indexOf("?")<0){_3b+="?";}else{_3b+="&";}return _3b+_38;},_getItems:function(_3c,_3d){var _3e=null;if(_3d){_3e=_3d.query;}var _3f=[];var _40=null;if(this.rootItem!==""){_40=_4.query(this.rootItem,_3c);}else{_40=_3c.documentElement.childNodes;}var _41=_3d.queryOptions?_3d.queryOptions.deep:false;if(_41){_40=this._flattenNodes(_40);}for(var i=0;i<_40.length;i++){var _42=_40[i];if(_42.nodeType!=1){continue;}var _43=this._getItem(_42);if(_3e){var _44=_3d.queryOptions?_3d.queryOptions.ignoreCase:false;var _45;var _46=false;var j;var _47=true;var _48={};for(var key in _3e){_45=_3e[key];if(typeof _45==="string"){_48[key]=_4.data.util.filter.patternToRegExp(_45,_44);}}for(var _49 in _3e){_47=false;var _4a=this.getValues(_43,_49);for(j=0;j<_4a.length;j++){_45=_4a[j];if(_45){var _4b=_3e[_49];if((typeof _45)==="string"&&(_48[_49])){if((_45.match(_48[_49]))!==null){_46=true;}else{_46=false;}}else{if((typeof _45)==="object"){if(_45.toString&&(_48[_49])){var _4c=_45.toString();if((_4c.match(_48[_49]))!==null){_46=true;}else{_46=false;}}else{if(_4b==="*"||_4b===_45){_46=true;}else{_46=false;}}}}}if(_46){break;}}if(!_46){break;}}if(_47||_46){_3f.push(_43);}}else{_3f.push(_43);}}_4.forEach(_3f,function(_4d){if(_4d.element.parentNode){_4d.element.parentNode.removeChild(_4d.element);}},this);return _3f;},_flattenNodes:function(_4e){var _4f=[];if(_4e){var i;for(i=0;i<_4e.length;i++){var _50=_4e[i];_4f.push(_50);if(_50.childNodes&&_50.childNodes.length>0){_4f=_4f.concat(this._flattenNodes(_50.childNodes));}}}return _4f;},close:function(_51){},newItem:function(_52,_53){console.log("XmlStore.newItem()");_52=(_52||{});var _54=_52.tagName;if(!_54){_54=this.rootItem;if(_54===""){return null;}}var _55=this._getDocument();var _56=_55.createElement(_54);for(var _57 in _52){var _58;if(_57==="tagName"){continue;}else{if(_57==="text()"){_58=_55.createTextNode(_52[_57]);_56.appendChild(_58);}else{_57=this._getAttribute(_54,_57);if(_57.charAt(0)==="@"){var _59=_57.substring(1);_56.setAttribute(_59,_52[_57]);}else{var _5a=_55.createElement(_57);_58=_55.createTextNode(_52[_57]);_5a.appendChild(_58);_56.appendChild(_5a);}}}}var _5b=this._getItem(_56);this._newItems.push(_5b);var _5c=null;if(_53&&_53.parent&&_53.attribute){_5c={item:_53.parent,attribute:_53.attribute,oldValue:undefined};var _5d=this.getValues(_53.parent,_53.attribute);if(_5d&&_5d.length>0){var _5e=_5d.slice(0,_5d.length);if(_5d.length===1){_5c.oldValue=_5d[0];}else{_5c.oldValue=_5d.slice(0,_5d.length);}_5e.push(_5b);this.setValues(_53.parent,_53.attribute,_5e);_5c.newValue=this.getValues(_53.parent,_53.attribute);}else{this.setValues(_53.parent,_53.attribute,_5b);_5c.newValue=_5b;}}return _5b;},deleteItem:function(_5f){console.log("XmlStore.deleteItem()");var _60=_5f.element;if(_60.parentNode){this._backupItem(_5f);_60.parentNode.removeChild(_60);return true;}this._forgetItem(_5f);this._deletedItems.push(_5f);return true;},setValue:function(_61,_62,_63){if(_62==="tagName"){return false;}this._backupItem(_61);var _64=_61.element;var _65;var _66;if(_62==="childNodes"){_65=_63.element;_64.appendChild(_65);}else{if(_62==="text()"){while(_64.firstChild){_64.removeChild(_64.firstChild);}_66=this._getDocument(_64).createTextNode(_63);_64.appendChild(_66);}else{_62=this._getAttribute(_64.nodeName,_62);if(_62.charAt(0)==="@"){var _67=_62.substring(1);_64.setAttribute(_67,_63);}else{for(var i=0;i<_64.childNodes.length;i++){var _68=_64.childNodes[i];if(_68.nodeType===1&&_68.nodeName===_62){_65=_68;break;}}var _69=this._getDocument(_64);if(_65){while(_65.firstChild){_65.removeChild(_65.firstChild);}}else{_65=_69.createElement(_62);_64.appendChild(_65);}_66=_69.createTextNode(_63);_65.appendChild(_66);}}}return true;},setValues:function(_6a,_6b,_6c){if(_6b==="tagName"){return false;}this._backupItem(_6a);var _6d=_6a.element;var i;var _6e;var _6f;if(_6b==="childNodes"){while(_6d.firstChild){_6d.removeChild(_6d.firstChild);}for(i=0;i<_6c.length;i++){_6e=_6c[i].element;_6d.appendChild(_6e);}}else{if(_6b==="text()"){while(_6d.firstChild){_6d.removeChild(_6d.firstChild);}var _70="";for(i=0;i<_6c.length;i++){_70+=_6c[i];}_6f=this._getDocument(_6d).createTextNode(_70);_6d.appendChild(_6f);}else{_6b=this._getAttribute(_6d.nodeName,_6b);if(_6b.charAt(0)==="@"){var _71=_6b.substring(1);_6d.setAttribute(_71,_6c[0]);}else{for(i=_6d.childNodes.length-1;i>=0;i--){var _72=_6d.childNodes[i];if(_72.nodeType===1&&_72.nodeName===_6b){_6d.removeChild(_72);}}var _73=this._getDocument(_6d);for(i=0;i<_6c.length;i++){_6e=_73.createElement(_6b);_6f=_73.createTextNode(_6c[i]);_6e.appendChild(_6f);_6d.appendChild(_6e);}}}}return true;},unsetAttribute:function(_74,_75){if(_75==="tagName"){return false;}this._backupItem(_74);var _76=_74.element;if(_75==="childNodes"||_75==="text()"){while(_76.firstChild){_76.removeChild(_76.firstChild);}}else{_75=this._getAttribute(_76.nodeName,_75);if(_75.charAt(0)==="@"){var _77=_75.substring(1);_76.removeAttribute(_77);}else{for(var i=_76.childNodes.length-1;i>=0;i--){var _78=_76.childNodes[i];if(_78.nodeType===1&&_78.nodeName===_75){_76.removeChild(_78);}}}}return true;},save:function(_79){if(!_79){_79={};}var i;for(i=0;i<this._modifiedItems.length;i++){this._saveItem(this._modifiedItems[i],_79,"PUT");}for(i=0;i<this._newItems.length;i++){var _7a=this._newItems[i];if(_7a.element.parentNode){this._newItems.splice(i,1);i--;continue;}this._saveItem(this._newItems[i],_79,"POST");}for(i=0;i<this._deletedItems.length;i++){this._saveItem(this._deletedItems[i],_79,"DELETE");}},revert:function(){console.log("XmlStore.revert() _newItems="+this._newItems.length);console.log("XmlStore.revert() _deletedItems="+this._deletedItems.length);console.log("XmlStore.revert() _modifiedItems="+this._modifiedItems.length);this._newItems=[];this._restoreItems(this._deletedItems);this._deletedItems=[];this._restoreItems(this._modifiedItems);this._modifiedItems=[];return true;},isDirty:function(_7b){if(_7b){var _7c=this._getRootElement(_7b.element);return (this._getItemIndex(this._newItems,_7c)>=0||this._getItemIndex(this._deletedItems,_7c)>=0||this._getItemIndex(this._modifiedItems,_7c)>=0);}else{return (this._newItems.length>0||this._deletedItems.length>0||this._modifiedItems.length>0);}},_saveItem:function(_7d,_7e,_7f){var url;var _80;if(_7f==="PUT"){url=this._getPutUrl(_7d);}else{if(_7f==="DELETE"){url=this._getDeleteUrl(_7d);}else{url=this._getPostUrl(_7d);}}if(!url){if(_7e.onError){_80=_7e.scope||_4.global;_7e.onError.call(_80,new Error("No URL for saving content: "+this._getPostContent(_7d)));}return;}var _81={url:url,method:(_7f||"POST"),contentType:"text/xml",handleAs:"xml"};var _82;if(_7f==="PUT"){_81.putData=this._getPutContent(_7d);_82=_4.rawXhrPut(_81);}else{if(_7f==="DELETE"){_82=_4.xhrDelete(_81);}else{_81.postData=this._getPostContent(_7d);_82=_4.rawXhrPost(_81);}}_80=(_7e.scope||_4.global);var _83=this;_82.addCallback(function(_84){_83._forgetItem(_7d);if(_7e.onComplete){_7e.onComplete.call(_80);}});_82.addErrback(function(_85){if(_7e.onError){_7e.onError.call(_80,_85);}});},_getPostUrl:function(_86){return this.url;},_getPutUrl:function(_87){return this.url;},_getDeleteUrl:function(_88){var url=this.url;if(_88&&this.keyAttribute!==""){var _89=this.getValue(_88,this.keyAttribute);if(_89){var key=this.keyAttribute.charAt(0)==="@"?this.keyAttribute.substring(1):this.keyAttribute;url+=url.indexOf("?")<0?"?":"&";url+=key+"="+_89;}}return url;},_getPostContent:function(_8a){var _8b=_8a.element;var _8c="<?xml version=\"1.0\"?>";return _8c+_6.xml.parser.innerXML(_8b);},_getPutContent:function(_8d){var _8e=_8d.element;var _8f="<?xml version=\"1.0\"?>";return _8f+_6.xml.parser.innerXML(_8e);},_getAttribute:function(_90,_91){if(this._attributeMap){var key=_90+"."+_91;var _92=this._attributeMap[key];if(_92){_91=_92;}else{_92=this._attributeMap[_91];if(_92){_91=_92;}}}return _91;},_getItem:function(_93){try{var q=null;if(this.keyAttribute===""){q=this._getXPath(_93);}return new _6.data.XmlItem(_93,this,q);}catch(e){console.log(e);}return null;},_getItemIndex:function(_94,_95){for(var i=0;i<_94.length;i++){if(_94[i].element===_95){return i;}}return -1;},_backupItem:function(_96){var _97=this._getRootElement(_96.element);if(this._getItemIndex(this._newItems,_97)>=0||this._getItemIndex(this._modifiedItems,_97)>=0){return;}if(_97!=_96.element){_96=this._getItem(_97);}_96._backup=_97.cloneNode(true);this._modifiedItems.push(_96);},_restoreItems:function(_98){_4.forEach(_98,function(_99){if(_99._backup){_99.element=_99._backup;_99._backup=null;}},this);},_forgetItem:function(_9a){var _9b=_9a.element;var _9c=this._getItemIndex(this._newItems,_9b);if(_9c>=0){this._newItems.splice(_9c,1);}_9c=this._getItemIndex(this._deletedItems,_9b);if(_9c>=0){this._deletedItems.splice(_9c,1);}_9c=this._getItemIndex(this._modifiedItems,_9b);if(_9c>=0){this._modifiedItems.splice(_9c,1);}},_getDocument:function(_9d){if(_9d){return _9d.ownerDocument;}else{if(!this._document){return _6.xml.parser.parse();}}return null;},_getRootElement:function(_9e){while(_9e.parentNode){_9e=_9e.parentNode;}return _9e;},_getXPath:function(_9f){var _a0=null;if(!this.sendQuery){var _a1=_9f;_a0="";while(_a1&&_a1!=_9f.ownerDocument){var pos=0;var _a2=_a1;var _a3=_a1.nodeName;while(_a2){_a2=_a2.previousSibling;if(_a2&&_a2.nodeName===_a3){pos++;}}var _a4="/"+_a3+"["+pos+"]";if(_a0){_a0=_a4+_a0;}else{_a0=_a4;}_a1=_a1.parentNode;}}return _a0;},getIdentity:function(_a5){if(!this.isItem(_a5)){throw new Error("dojox.data.XmlStore: Object supplied to getIdentity is not an item");}else{var id=null;if(this.sendQuery&&this.keyAttribute!==""){id=this.getValue(_a5,this.keyAttribute).toString();}else{if(!this.serverQuery){if(this.keyAttribute!==""){id=this.getValue(_a5,this.keyAttribute).toString();}else{id=_a5.q;}}}return id;}},getIdentityAttributes:function(_a6){if(!this.isItem(_a6)){throw new Error("dojox.data.XmlStore: Object supplied to getIdentity is not an item");}else{if(this.keyAttribute!==""){return [this.keyAttribute];}else{return null;}}},fetchItemByIdentity:function(_a7){var _a8=null;var _a9=null;var _aa=this;var url=null;var _ab=null;var _ac=null;if(!_aa.sendQuery){_a8=function(_ad){if(_ad){if(_aa.keyAttribute!==""){var _ae={};_ae.query={};_ae.query[_aa.keyAttribute]=_a7.identity;_ae.queryOptions={deep:true};var _af=_aa._getItems(_ad,_ae);_a9=_a7.scope||_4.global;if(_af.length===1){if(_a7.onItem){_a7.onItem.call(_a9,_af[0]);}}else{if(_af.length===0){if(_a7.onItem){_a7.onItem.call(_a9,null);}}else{if(_a7.onError){_a7.onError.call(_a9,new Error("Items array size for identity lookup greater than 1, invalid keyAttribute."));}}}}else{var _b0=_a7.identity.split("/");var i;var _b1=_ad;for(i=0;i<_b0.length;i++){if(_b0[i]&&_b0[i]!==""){var _b2=_b0[i];_b2=_b2.substring(0,_b2.length-1);var _b3=_b2.split("[");var tag=_b3[0];var _b4=parseInt(_b3[1],10);var pos=0;if(_b1){var _b5=_b1.childNodes;if(_b5){var j;var _b6=null;for(j=0;j<_b5.length;j++){var _b7=_b5[j];if(_b7.nodeName===tag){if(pos<_b4){pos++;}else{_b6=_b7;break;}}}if(_b6){_b1=_b6;}else{_b1=null;}}else{_b1=null;}}else{break;}}}var _b8=null;if(_b1){_b8=_aa._getItem(_b1);if(_b8.element.parentNode){_b8.element.parentNode.removeChild(_b8.element);}}if(_a7.onItem){_a9=_a7.scope||_4.global;_a7.onItem.call(_a9,_b8);}}}};url=this._getFetchUrl(null);_ab={url:url,handleAs:"xml",preventCache:_aa.urlPreventCache};_ac=_4.xhrGet(_ab);_ac.addCallback(_a8);if(_a7.onError){_ac.addErrback(function(_b9){var s=_a7.scope||_4.global;_a7.onError.call(s,_b9);});}}else{if(_aa.keyAttribute!==""){var _ba={query:{}};_ba.query[_aa.keyAttribute]=_a7.identity;url=this._getFetchUrl(_ba);_a8=function(_bb){var _bc=null;if(_bb){var _bd=_aa._getItems(_bb,{});if(_bd.length===1){_bc=_bd[0];}else{if(_a7.onError){var _be=_a7.scope||_4.global;_a7.onError.call(_be,new Error("More than one item was returned from the server for the denoted identity"));}}}if(_a7.onItem){_be=_a7.scope||_4.global;_a7.onItem.call(_be,_bc);}};_ab={url:url,handleAs:"xml",preventCache:_aa.urlPreventCache};_ac=_4.xhrGet(_ab);_ac.addCallback(_a8);if(_a7.onError){_ac.addErrback(function(_bf){var s=_a7.scope||_4.global;_a7.onError.call(s,_bf);});}}else{if(_a7.onError){var s=_a7.scope||_4.global;_a7.onError.call(s,new Error("XmlStore is not told that the server to provides identity support.  No keyAttribute specified."));}}}}});_4.declare("dojox.data.XmlItem",null,{constructor:function(_c0,_c1,_c2){this.element=_c0;this.store=_c1;this.q=_c2;},toString:function(){var str="";if(this.element){for(var i=0;i<this.element.childNodes.length;i++){var _c3=this.element.childNodes[i];if(_c3.nodeType===3||_c3.nodeType===4){str+=_c3.nodeValue;}}}return str;}});_4.extend(_6.data.XmlStore,_4.data.util.simpleFetch);}}};});