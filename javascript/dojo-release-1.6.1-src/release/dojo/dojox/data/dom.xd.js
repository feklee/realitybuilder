/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.data.dom"],["require","dojox.xml.parser"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.data.dom"]){_4._hasResource["dojox.data.dom"]=true;_4.provide("dojox.data.dom");_4.require("dojox.xml.parser");_4.deprecated("dojox.data.dom","Use dojox.xml.parser instead.","2.0");_6.data.dom.createDocument=function(_7,_8){_4.deprecated("dojox.data.dom.createDocument()","Use dojox.xml.parser.parse() instead.","2.0");try{return _6.xml.parser.parse(_7,_8);}catch(e){return null;}};_6.data.dom.textContent=function(_9,_a){_4.deprecated("dojox.data.dom.textContent()","Use dojox.xml.parser.textContent() instead.","2.0");if(arguments.length>1){return _6.xml.parser.textContent(_9,_a);}else{return _6.xml.parser.textContent(_9);}};_6.data.dom.replaceChildren=function(_b,_c){_4.deprecated("dojox.data.dom.replaceChildren()","Use dojox.xml.parser.replaceChildren() instead.","2.0");_6.xml.parser.replaceChildren(_b,_c);};_6.data.dom.removeChildren=function(_d){_4.deprecated("dojox.data.dom.removeChildren()","Use dojox.xml.parser.removeChildren() instead.","2.0");return _6.xml.parser.removeChildren(_d);};_6.data.dom.innerXML=function(_e){_4.deprecated("dojox.data.dom.innerXML()","Use dojox.xml.parser.innerXML() instead.","2.0");return _6.xml.parser.innerXML(_e);};}}};});