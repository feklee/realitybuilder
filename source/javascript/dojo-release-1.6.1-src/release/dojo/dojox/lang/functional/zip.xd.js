/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.lang.functional.zip"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.lang.functional.zip"]){_4._hasResource["dojox.lang.functional.zip"]=true;_4.provide("dojox.lang.functional.zip");(function(){var df=_6.lang.functional;_4.mixin(df,{zip:function(){var n=arguments[0].length,m=arguments.length,i=1,t=new Array(n),j,p;for(;i<m;n=Math.min(n,arguments[i++].length)){}for(i=0;i<n;++i){p=new Array(m);for(j=0;j<m;p[j]=arguments[j][i],++j){}t[i]=p;}return t;},unzip:function(a){return df.zip.apply(null,a);}});})();}}};});