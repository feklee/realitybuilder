/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.charting.widget.Sparkline"],["require","dojox.charting.widget.Chart2D"],["require","dojox.charting.themes.GreySkies"],["require","dojox.charting.plot2d.Lines"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.charting.widget.Sparkline"]){_4._hasResource["dojox.charting.widget.Sparkline"]=true;_4.provide("dojox.charting.widget.Sparkline");_4.require("dojox.charting.widget.Chart2D");_4.require("dojox.charting.themes.GreySkies");_4.require("dojox.charting.plot2d.Lines");(function(){var d=_4;_4.declare("dojox.charting.widget.Sparkline",_6.charting.widget.Chart2D,{theme:_6.charting.themes.GreySkies,margins:{l:0,r:0,t:0,b:0},type:"Lines",valueFn:"Number(x)",store:"",field:"",query:"",queryOptions:"",start:"0",count:"Infinity",sort:"",data:"",name:"default",buildRendering:function(){var n=this.srcNodeRef;if(!n.childNodes.length||!d.query("> .axis, > .plot, > .action, > .series",n).length){var _7=document.createElement("div");d.attr(_7,{"class":"plot","name":"default","type":this.type});n.appendChild(_7);var _8=document.createElement("div");d.attr(_8,{"class":"series",plot:"default",name:this.name,start:this.start,count:this.count,valueFn:this.valueFn});d.forEach(["store","field","query","queryOptions","sort","data"],function(i){if(this[i].length){d.attr(_8,i,this[i]);}},this);n.appendChild(_8);}this.inherited(arguments);}});})();}}};});