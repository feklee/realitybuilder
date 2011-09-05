/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.grid.enhanced.plugins.exporter.CSVWriter"],["require","dojox.grid.enhanced.plugins.exporter._ExportWriter"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.grid.enhanced.plugins.exporter.CSVWriter"]){_4._hasResource["dojox.grid.enhanced.plugins.exporter.CSVWriter"]=true;_4.provide("dojox.grid.enhanced.plugins.exporter.CSVWriter");_4.require("dojox.grid.enhanced.plugins.exporter._ExportWriter");_6.grid.enhanced.plugins.Exporter.registerWriter("csv","dojox.grid.enhanced.plugins.exporter.CSVWriter");_4.declare("dojox.grid.enhanced.plugins.exporter.CSVWriter",_6.grid.enhanced.plugins.exporter._ExportWriter,{_separator:",",_newline:"\r\n",constructor:function(_7){if(_7){this._separator=_7.separator?_7.separator:this._separator;this._newline=_7.newline?_7.newline:this._newline;}this._headers=[];this._dataRows=[];},_formatCSVCell:function(_8){if(_8===null||_8===undefined){return "";}var _9=String(_8).replace(/"/g,"\"\"");if(_9.indexOf(this._separator)>=0||_9.search(/[" \t\r\n]/)>=0){_9="\""+_9+"\"";}return _9;},beforeContentRow:function(_a){var _b=[],_c=this._formatCSVCell;_4.forEach(_a.grid.layout.cells,function(_d){if(!_d.hidden&&_4.indexOf(_a.spCols,_d.index)<0){_b.push(_c(this._getExportDataForCell(_a.rowIndex,_a.row,_d,_a.grid)));}},this);this._dataRows.push(_b);return false;},handleCell:function(_e){var _f=_e.cell;if(_e.isHeader&&!_f.hidden&&_4.indexOf(_e.spCols,_f.index)<0){this._headers.push(_f.name||_f.field);}},toString:function(){var _10=this._headers.join(this._separator);for(var i=this._dataRows.length-1;i>=0;--i){this._dataRows[i]=this._dataRows[i].join(this._separator);}return _10+this._newline+this._dataRows.join(this._newline);}});}}};});