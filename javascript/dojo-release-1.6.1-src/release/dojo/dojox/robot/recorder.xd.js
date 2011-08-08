/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realitybuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.robot.recorder"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.robot.recorder"]){_4._hasResource["dojox.robot.recorder"]=true;_4.provide("dojox.robot.recorder");_4.experimental("dojox.robot.recorder");(function(){var _7=1000;var _8=500;var _9=10000;var _a=[];var _b=0;var _c=null;var _d=null;var _e=function(){alert("Started recording.");_a=[];_c=new Date();_d=new Date();};var _f=function(_10,_11){if(_c==null||_10=="doh.robot.keyPress"&&_11[0]==_4.keys.ENTER&&eval("("+_11[2]+")").ctrl&&eval("("+_11[2]+")").alt){return;}var dt=Math.max(Math.min(Math.round((new Date()).getTime()-_d.getTime()),_9),1);if(_10=="doh.robot.mouseMove"){_11[2]=dt;}else{_11[1]=dt;}_a.push({name:_10,args:_11});_d=new Date();};var _12=function(){var c=_a;if(c[0].name=="doh.robot.keyPress"&&(c[0].args[0]==_4.keys.ENTER||c[0].args[0]==77)){c.splice(0,1);}for(var i=c.length-1;(i>=c.length-2)&&(i>=0);i--){if(c[i].name=="doh.robot.keyPress"&&c[i].args[0]==_4.keys.ALT||c[i].args[0]==_4.keys.CTRL){c.splice(i,1);}}for(i=0;i<c.length;i++){var _13,_14;if(c[i+1]&&c[i].name=="doh.robot.mouseMove"&&c[i+1].name==c[i].name&&c[i+1].args[2]<_8){_13=c[i+1];_14=0;while(_13&&_13.name==c[i].name&&_13.args[2]<_8){c.splice(i+1,1);_14+=_13.args[2];c[i].args[0]=_13.args[0];c[i].args[1]=_13.args[1];_13=c[i+1];}c[i].args[3]=_14;}else{if(c[i+1]&&c[i].name=="doh.robot.mouseWheel"&&c[i+1].name==c[i].name&&c[i+1].args[1]<_8){_13=c[i+1];_14=0;while(_13&&_13.name==c[i].name&&_13.args[1]<_8){c.splice(i+1,1);_14+=_13.args[1];c[i].args[0]+=_13.args[0];_13=c[i+1];}c[i].args[2]=_14;}else{if(c[i+2]&&c[i].name=="doh.robot.mouseMoveAt"&&c[i+2].name=="doh.robot.scrollIntoView"){var _15=c.splice(i+2,1)[0];c.splice(i,0,_15);}else{if(c[i+1]&&c[i].name=="doh.robot.mousePress"&&c[i+1].name=="doh.robot.mouseRelease"&&c[i].args[0]==c[i+1].args[0]){c[i].name="doh.robot.mouseClick";c.splice(i+1,1);if(c[i+1]&&c[i+1].name=="doh.robot.mouseClick"&&c[i].args[0]==c[i+1].args[0]){c.splice(i+1,1);}}else{if(c[i+1]&&c[i-1]&&c[i-1].name=="doh.robot.mouseMoveAt"&&c[i].name=="doh.robot.mousePress"&&c[i+1].name=="doh.robot.mouseMove"){var cmd={name:"doh.robot.mouseMoveAt",args:[c[i-1].args[0],1,100,c[i-1].args[3]+1,c[i-1].args[4]]};c.splice(i+1,0,cmd);}else{if(c[i+1]&&((c[i].name=="doh.robot.keyPress"&&typeof c[i].args[0]=="string")||c[i].name=="doh.robot.typeKeys")&&c[i+1].name=="doh.robot.keyPress"&&typeof c[i+1].args[0]=="string"&&c[i+1].args[1]<=_7&&!eval("("+c[i].args[2]+")").ctrl&&!eval("("+c[i].args[2]+")").alt&&!eval("("+c[i+1].args[2]+")").ctrl&&!eval("("+c[i+1].args[2]+")").alt){c[i].name="doh.robot.typeKeys";c[i].args.splice(3,1);_13=c[i+1];var _16=0;while(_13&&_13.name=="doh.robot.keyPress"&&typeof _13.args[0]=="string"&&_13.args[1]<=_7&&!eval("("+_13.args[2]+")").ctrl&&!eval("("+_13.args[2]+")").alt){c.splice(i+1,1);c[i].args[0]+=_13.args[0];_16+=_13.args[1];_13=c[i+1];}c[i].args[2]=_16;c[i].args[0]="'"+c[i].args[0]+"'";}else{if(c[i].name=="doh.robot.keyPress"){if(typeof c[i].args[0]=="string"){c[i].args[0]="'"+c[i].args[0]+"'";}else{if(c[i].args[0]==0){c.splice(i,1);}else{for(var j in _4.keys){if(_4.keys[j]==c[i].args[0]){c[i].args[0]="dojo.keys."+j;break;}}}}}}}}}}}}};var _17=function(){if(!_c){_e();}else{_18();}};var _18=function(){var dt=Math.round((new Date()).getTime()-_c.getTime());_c=null;_12();var c=_a;console.log("Stop called. Commands: "+c.length);if(c.length){var s="doh.register('dojox.robot.AutoGeneratedTestGroup',{\n";s+="     name: 'autotest"+(_b++)+"',\n";s+="     timeout: "+(dt+2000)+",\n";s+="     runTest: function(){\n";s+="          var d = new doh.Deferred();\n";for(var i=0;i<c.length;i++){s+="          "+c[i].name+"(";for(var j=0;j<c[i].args.length;j++){var arg=c[i].args[j];s+=arg;if(j!=c[i].args.length-1){s+=", ";}}s+=");\n";}s+="          doh.robot.sequence(function(){\n";s+="               if(/*Your condition here*/){\n";s+="                    d.callback(true);\n";s+="               }else{\n";s+="                    d.errback(new Error('We got a failure'));\n";s+="               }\n";s+="          }, 1000);\n";s+="          return d;\n";s+="     }\n";s+="});\n";var div=document.createElement("div");div.id="dojox.robot.recorder";div.style.backgroundColor="white";div.style.position="absolute";var _19={y:(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),x:(window.pageXOffset||(window["dojo"]?_4._fixIeBiDiScrollLeft(document.documentElement.scrollLeft):undefined)||document.body.scrollLeft||0)};div.style.left=_19.x+"px";div.style.top=_19.y+"px";var h1=document.createElement("h1");h1.innerHTML="Your code:";div.appendChild(h1);var pre=document.createElement("pre");if(pre.innerText!==undefined){pre.innerText=s;}else{pre.textContent=s;}div.appendChild(pre);var _1a=document.createElement("button");_1a.innerHTML="Close";var _1b=_4.connect(_1a,"onmouseup",function(e){_4.stopEvent(e);document.body.removeChild(div);_4.disconnect(_1b);});div.appendChild(_1a);document.body.appendChild(div);_a=[];}};var _1c=function(_1d){if(typeof _1d=="string"){return "'"+_1d+"'";}else{if(_1d.id){return "'"+_1d.id+"'";}else{var _1e=document.getElementsByTagName(_1d.nodeName);var i;for(i=0;i<_1e.length;i++){if(_1e[i]==_1d){break;}}return "function(){ return document.getElementsByTagName('"+_1d.nodeName+"')["+i+"]; }";}}};var _1f=function(b){return "{left:"+(b==0)+", middle:"+(b==1)+", right:"+(b==2)+"}";};var _20=function(e){return "{'shift':"+(e.shiftKey)+", 'ctrl':"+(e.ctrlKey)+", 'alt':"+(e.altKey)+"}";};_4.connect(document,"onkeydown",function(e){if((e.keyCode==_4.keys.ENTER||e.keyCode==77)&&e.ctrlKey&&e.altKey){_4.stopEvent(e);_17();}});var _21={type:""};var _22=function(e){if(!e||_21.type==e.type&&_21.button==e.button){return;}_21={type:e.type,button:e.button};var _23=_1c(e.target);var _24=_4.coords(e.target);_f("doh.robot.mouseMoveAt",[_23,0,100,e.clientX-_24.x,e.clientY-_24.y]);_f("doh.robot.mousePress",[_1f(e.button-(_4.isIE?1:0)),0]);};var _25=function(e){if(!e||_21.type==e.type&&_21.button==e.button){return;}_21={type:e.type,button:e.button};var _26=_1c(e.target);var _27=_4.coords(e.target);_f("doh.robot.mouseClick",[_1f(e.button-(_4.isIE?1:0)),0]);};var _28=function(e){if(!e||_21.type==e.type&&_21.button==e.button){return;}_21={type:e.type,button:e.button};var _29=_1c(e.target);var _2a=_4.coords(e.target);_f("doh.robot.mouseRelease",[_1f(e.button-(_4.isIE?1:0)),0]);};var _2b=function(e){if(!e||_21.type==e.type&&_21.pageX==e.pageX&&_21.pageY==e.pageY){return;}_21={type:e.type,pageX:e.pageX,pageY:e.pageY};_f("doh.robot.mouseMove",[e.pageX,e.pageY,0,100,true]);};var _2c=function(e){if(!e||_21.type==e.type&&_21.pageX==e.pageX&&_21.pageY==e.pageY){return;}_21={type:e.type,detail:(e.detail?(e.detail):(-e.wheelDelta/120))};_f("doh.robot.mouseWheel",[_21.detail]);};var _2d=function(e){if(!e||_21.type==e.type&&(_21.charCode==e.charCode&&_21.keyCode==e.keyCode)){return;}_21={type:e.type,charCode:e.charCode,keyCode:e.keyCode};_f("doh.robot.keyPress",[e.charOrCode==_4.keys.SPACE?" ":e.charOrCode,0,_20(e)]);};var _2e=function(e){if(!e||_21.type==e.type&&(_21.charCode==e.charCode&&_21.keyCode==e.keyCode)){return;}_21={type:e.type,charCode:e.charCode,keyCode:e.keyCode};};_4.connect(document,"onmousedown",_22);_4.connect(document,"onmouseup",_28);_4.connect(document,"onclick",_25);_4.connect(document,"onkeypress",_2d);_4.connect(document,"onkeyup",_2e);_4.connect(document,"onmousemove",_2b);_4.connect(document,!_4.isMozilla?"onmousewheel":"DOMMouseScroll",_2c);_4.addOnLoad(function(){if(_4.window){_4.connect(_4.window,"scrollIntoView",function(_2f){_f("doh.robot.scrollIntoView",[_1c(_2f)]);});}});_4.connect(_4,"connect",function(_30,_31,f){if(_30&&(!f||!f._mine)){var _32=null;if(_31.toLowerCase()=="onmousedown"){_32=_4.hitch(this,_22);}else{if(_31.toLowerCase()==(!_4.isMozilla?"onmousewheel":"dommousescroll")){_32=_4.hitch(this,_2c);}else{if(_31.toLowerCase()=="onclick"){_32=_4.hitch(this,_25);}else{if(_31.toLowerCase()=="onmouseup"){_32=_4.hitch(this,_28);}else{if(_31.toLowerCase()=="onkeypress"){_32=_4.hitch(this,_2d);}else{if(_31.toLowerCase()=="onkeyup"){_32=_4.hitch(this,_2e);}}}}}}if(_32==null){return;}_32._mine=true;_4.connect(_30,_31,_32);}});})();}}};});