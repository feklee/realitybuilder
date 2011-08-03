/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.Printer"],["require","dojox.grid.enhanced._Plugin"],["require","dojox.grid.enhanced.plugins.exporter.TableWriter"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.Printer"]){_4._hasResource["dojox.grid.enhanced.plugins.Printer"]=true;_4.provide("dojox.grid.enhanced.plugins.Printer");_4.require("dojox.grid.enhanced._Plugin");_4.require("dojox.grid.enhanced.plugins.exporter.TableWriter");_4.declare("dojox.grid.enhanced.plugins.Printer",_6.grid.enhanced._Plugin,{name:"printer",constructor:function(_7){this.grid=_7;this._mixinGrid(_7);_7.setExportFormatter(function(_8,_9,_a,_b){return _9.format(_a,_b);});},_mixinGrid:function(){var g=this.grid;g.printGrid=_4.hitch(this,this.printGrid);g.printSelected=_4.hitch(this,this.printSelected);g.exportToHTML=_4.hitch(this,this.exportToHTML);g.exportSelectedToHTML=_4.hitch(this,this.exportSelectedToHTML);g.normalizePrintedGrid=_4.hitch(this,this.normalizeRowHeight);},printGrid:function(_c){this.exportToHTML(_c,_4.hitch(this,this._print));},printSelected:function(_d){this._print(this.exportSelectedToHTML(_d));},exportToHTML:function(_e,_f){_e=this._formalizeArgs(_e);var _10=this;this.grid.exportGrid("table",_e,function(str){_f(_10._wrapHTML(_e.title,_e.cssFiles,_e.titleInBody+str));});},exportSelectedToHTML:function(_11){_11=this._formalizeArgs(_11);var str=this.grid.exportSelected("table",_11.writerArgs);return this._wrapHTML(_11.title,_11.cssFiles,_11.titleInBody+str);},_print:function(_12){var win,_13=this,_14=function(w){var doc=win.document;doc.open();doc.write(_12);doc.close();_13.normalizeRowHeight(doc);};if(!window.print){return;}else{if(_4.isChrome||_4.isOpera){win=window.open("javascript: ''","","status=0,menubar=0,location=0,toolbar=0,width=1,height=1,resizable=0,scrollbars=0");_14(win);win.print();win.close();}else{var fn=this._printFrame,dn=this.grid.domNode;if(!fn){var _15=dn.id+"_print_frame";if(!(fn=_4.byId(_15))){fn=_4.create("iframe");fn.id=_15;fn.frameBorder=0;_4.style(fn,{width:"1px",height:"1px",position:"absolute",right:0,bottoom:0,border:"none",overflow:"hidden"});if(!_4.isIE){_4.style(fn,"visibility","hidden");}dn.appendChild(fn);}this._printFrame=fn;}win=fn.contentWindow;_14(win);_5.focus(fn);win.print();}}},_wrapHTML:function(_16,_17,_18){var _19=["<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">","<html><head><title>",_16,"</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></meta>"];for(var i=0;i<_17.length;++i){_19.push("<link rel=\"stylesheet\" type=\"text/css\" href=\""+_17[i]+"\" />");}_19.push("</head>");if(_18.search(/^\s*<body/i)<0){_18="<body>"+_18+"</body>";}_19.push(_18);return _19.join("\n");},normalizeRowHeight:function(doc){var _1a=_4.query("table.grid_view",doc.body);var _1b=_4.map(_1a,function(_1c){return _4.query("thead.grid_header",_1c)[0];});var _1d=_4.map(_1a,function(_1e){return _4.query("tbody.grid_row",_1e);});var _1f=_1d[0].length;var i,v,h,_20=0;for(v=_1a.length-1;v>=0;--v){h=_4.contentBox(_1b[v]).h;if(h>_20){_20=h;}}for(v=_1a.length-1;v>=0;--v){_4.style(_1b[v],"height",_20+"px");}for(i=0;i<_1f;++i){_20=0;for(v=_1a.length-1;v>=0;--v){h=_4.contentBox(_1d[v][i]).h;if(h>_20){_20=h;}}for(v=_1a.length-1;v>=0;--v){_4.style(_1d[v][i],"height",_20+"px");}}var _21=0;for(v=0;v<_1a.length;++v){_4.style(_1a[v],"left",_21+"px");_21+=_4.marginBox(_1a[v]).w;}},_formalizeArgs:function(_22){_22=(_22&&_4.isObject(_22))?_22:{};_22.title=String(_22.title)||"";if(!_4.isArray(_22.cssFiles)){_22.cssFiles=[_22.cssFiles];}_22.titleInBody=_22.title?["<h1>",_22.title,"</h1>"].join(""):"";return _22;}});_6.grid.EnhancedGrid.registerPlugin(_6.grid.enhanced.plugins.Printer,{"dependency":["exporter"]});}}};});