/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.gantt.GanttProjectItem"],["require","dojox.gantt.GanttTaskItem"],["require","dojo.date.locale"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.gantt.GanttProjectItem"]){_4._hasResource["dojox.gantt.GanttProjectItem"]=true;_4.provide("dojox.gantt.GanttProjectItem");_4.require("dojox.gantt.GanttTaskItem");_4.require("dojo.date.locale");_4.declare("dojox.gantt.GanttProjectControl",null,{constructor:function(_7,_8){this.project=_8;this.ganttChart=_7;this.descrProject=null;this.projectItem=null;this.projectNameItem=null;this.posY=0;this.posX=0;this.nextProject=null;this.previousProject=null;this.arrTasks=[];this.percentage=0;this.duration=0;},checkWidthProjectNameItem:function(){if(this.projectNameItem.offsetWidth+this.projectNameItem.offsetLeft>this.ganttChart.maxWidthTaskNames){var _9=this.projectNameItem.offsetWidth+this.projectNameItem.offsetLeft-this.ganttChart.maxWidthTaskNames;var _a=Math.round(_9/(this.projectNameItem.offsetWidth/this.projectNameItem.firstChild.length));var _b=this.project.name.substring(0,this.projectNameItem.firstChild.length-_a-3);_b+="...";this.projectNameItem.innerHTML=_b;}},refreshProjectItem:function(_c){this.percentage=this.getPercentCompleted();_4.style(_c,{"left":this.posX+"px","width":this.duration*this.ganttChart.pixelsPerWorkHour+"px"});var _d=_c.firstChild;var _e=this.duration*this.ganttChart.pixelsPerWorkHour;_d.width=((_e==0)?1:_e)+"px";_d.style.width=((_e==0)?1:_e)+"px";var _f=_d.rows[0];if(this.percentage!=-1){if(this.percentage!=0){var _10=_f.firstChild;_10.width=this.percentage+"%";var _11=_10.firstChild;_4.style(_11,{width:(!this.duration?1:(this.percentage*this.duration*this.ganttChart.pixelsPerWorkHour/100))+"px",height:this.ganttChart.heightTaskItem+"px"});}if(this.percentage!=100){var _10=_f.lastChild;_10.width=(100-this.percentage)+"%";var _11=_10.firstChild;_4.style(_11,{width:(!this.duration?1:((100-this.percentage)*this.duration*this.ganttChart.pixelsPerWorkHour/100))+"px",height:this.ganttChart.heightTaskItem+"px"});}}else{var _10=_f.firstChild;_10.width="1px";var _11=_10.firstChild;_4.style(_11,{width:"1px",height:this.ganttChart.heightTaskItem+"px"});}var _12=_c.lastChild;var _13=_12.firstChild;_4.style(_13,{height:this.ganttChart.heightTaskItem+"px",width:(!this.duration?1:(this.duration*this.ganttChart.pixelsPerWorkHour))+"px"});var _14=_13.rows[0];var _15=_14.firstChild;_15.height=this.ganttChart.heightTaskItem+"px";if(this.project.parentTasks.length==0){_c.style.display="none";}return _c;},refreshDescrProject:function(_16){var _17=(this.posX+this.duration*this.ganttChart.pixelsPerWorkHour+10);_4.style(_16,{"left":_17+"px"});if(this.project.parentTasks.length==0){this.descrProject.style.visibility="hidden";}return _16;},postLoadData:function(){},refresh:function(){var _18=this.ganttChart.contentData.firstChild;this.posX=(this.project.startDate-this.ganttChart.startDate)/(60*60*1000)*this.ganttChart.pixelsPerHour;this.refreshProjectItem(this.projectItem[0]);this.refreshDescrProject(this.projectItem[0].nextSibling);return this;},create:function(){var _19=this.ganttChart.contentData.firstChild;this.posX=(this.project.startDate-this.ganttChart.startDate)/(60*60*1000)*this.ganttChart.pixelsPerHour;if(this.previousProject){if(this.previousProject.arrTasks.length>0){var _1a=this.ganttChart.getLastChildTask(this.previousProject.arrTasks[this.previousProject.arrTasks.length-1]);this.posY=parseInt(_1a.cTaskItem[0].style.top)+this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;}else{this.posY=parseInt(this.previousProject.projectItem[0].style.top)+this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;}}else{this.posY=6;}var _1b=this.ganttChart.panelNames.firstChild;this.projectNameItem=this.createProjectNameItem();_1b.appendChild(this.projectNameItem);this.checkWidthProjectNameItem();this.projectItem=[this.createProjectItem(),[]];_19.appendChild(this.projectItem[0]);_19.appendChild(this.createDescrProject());this.adjustPanelTime();},getTaskById:function(id){for(var i=0;i<this.arrTasks.length;i++){var _1c=this.arrTasks[i];var _1d=this.searchTaskInTree(_1c,id);if(_1d){return _1d;}}return null;},searchTaskInTree:function(_1e,id){if(_1e.taskItem.id==id){return _1e;}else{for(var i=0;i<_1e.childTask.length;i++){var _1f=_1e.childTask[i];if(_1f.taskItem.id==id){return _1f;}else{if(_1f.childTask.length>0){var _1f=this.searchTaskInTree(_1f,id);if(_1f){return _1f;}}}}}return null;},shiftProjectItem:function(){var _20=null;var _21=null;var _22=parseInt(this.projectItem[0].style.left);var _23=parseInt(this.projectItem[0].firstChild.style.width)+parseInt(this.projectItem[0].style.left);var _24=parseInt(this.projectItem[0].firstChild.style.width);for(var i=0;i<this.arrTasks.length;i++){var _25=this.arrTasks[i];var _26=parseInt(_25.cTaskItem[0].style.left);var _27=parseInt(_25.cTaskItem[0].style.left)+parseInt(_25.cTaskItem[0].firstChild.firstChild.width);if(!_20){_20=_26;}if(!_21){_21=_27;}if(_20>_26){_20=_26;}if(_21<_27){_21=_27;}}if(_20!=_22){this.project.startDate=new Date(this.ganttChart.startDate);this.project.startDate.setHours(this.project.startDate.getHours()+(_20/this.ganttChart.pixelsPerHour));}this.projectItem[0].style.left=_20+"px";this.resizeProjectItem(_21-_20);this.duration=Math.round(parseInt(this.projectItem[0].firstChild.width)/(this.ganttChart.pixelsPerWorkHour));this.shiftDescrProject();this.adjustPanelTime();},adjustPanelTime:function(){var _28=this.projectItem[0];var _29=parseInt(_28.style.left)+parseInt(_28.firstChild.style.width)+this.ganttChart.panelTimeExpandDelta;_29+=this.descrProject.offsetWidth;this.ganttChart.adjustPanelTime(_29);},resizeProjectItem:function(_2a){var _2b=this.percentage,_2c=this.projectItem[0];if(_2b>0&&_2b<100){_2c.firstChild.style.width=_2a+"px";_2c.firstChild.width=_2a+"px";_2c.style.width=_2a+"px";var _2d=_2c.firstChild.rows[0];_2d.cells[0].firstChild.style.width=Math.round(_2a*_2b/100)+"px";_2d.cells[0].firstChild.style.height=this.ganttChart.heightTaskItem+"px";_2d.cells[1].firstChild.style.width=Math.round(_2a*(100-_2b)/100)+"px";_2d.cells[1].firstChild.style.height=this.ganttChart.heightTaskItem+"px";_2c.lastChild.firstChild.width=_2a+"px";}else{if(_2b==0||_2b==100){_2c.firstChild.style.width=_2a+"px";_2c.firstChild.width=_2a+"px";_2c.style.width=_2a+"px";var _2d=_2c.firstChild.rows[0];_2d.cells[0].firstChild.style.width=_2a+"px";_2d.cells[0].firstChild.style.height=this.ganttChart.heightTaskItem+"px";_2c.lastChild.firstChild.width=_2a+"px";}}},shiftDescrProject:function(){var _2e=(parseInt(this.projectItem[0].style.left)+this.duration*this.ganttChart.pixelsPerWorkHour+10);this.descrProject.style.left=_2e+"px";this.descrProject.innerHTML=this.getDescStr();},showDescrProject:function(){var _2f=(parseInt(this.projectItem[0].style.left)+this.duration*this.ganttChart.pixelsPerWorkHour+10);this.descrProject.style.left=_2f+"px";this.descrProject.style.visibility="visible";this.descrProject.innerHTML=this.getDescStr();},hideDescrProject:function(){this.descrProject.style.visibility="hidden";},getDescStr:function(){return this.duration/this.ganttChart.hsPerDay+" days,  "+this.duration+" hours";},createDescrProject:function(){var _30=(this.posX+this.duration*this.ganttChart.pixelsPerWorkHour+10);var _31=_4.create("div",{innerHTML:this.getDescStr(),className:"ganttDescProject"});_4.style(_31,{left:_30+"px",top:this.posY+"px"});this.descrProject=_31;if(this.project.parentTasks.length==0){this.descrProject.style.visibility="hidden";}return _31;},createProjectItem:function(){this.percentage=this.getPercentCompleted();this.duration=this.getDuration();var _32=_4.create("div",{id:this.project.id,className:"ganttProjectItem"});_4.style(_32,{left:this.posX+"px",top:this.posY+"px",width:this.duration*this.ganttChart.pixelsPerWorkHour+"px"});var _33=_4.create("table",{cellPadding:"0",cellSpacing:"0",className:"ganttTblProjectItem"},_32);var _34=this.duration*this.ganttChart.pixelsPerWorkHour;_33.width=((_34==0)?1:_34)+"px";_33.style.width=((_34==0)?1:_34)+"px";var _35=_33.insertRow(_33.rows.length);if(this.percentage!=-1){if(this.percentage!=0){var _36=_4.create("td",{width:this.percentage+"%"},_35);_36.style.lineHeight="1px";var _37=_4.create("div",{className:"ganttImageProgressFilled"},_36);_4.style(_37,{width:(this.percentage*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});}if(this.percentage!=100){var _36=_4.create("td",{width:(100-this.percentage)+"%"},_35);_36.style.lineHeight="1px";var _37=_4.create("div",{className:"ganttImageProgressBg"},_36);_4.style(_37,{width:((100-this.percentage)*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});}}else{var _36=_4.create("td",{width:"1px"},_35);_36.style.lineHeight="1px";var _37=_4.create("div",{className:"ganttImageProgressBg"},_36);_4.style(_37,{width:"1px",height:this.ganttChart.heightTaskItem+"px"});}var _38=_4.create("div",{className:"ganttDivTaskInfo"});var _39=_4.create("table",{cellPadding:"0",cellSpacing:"0",height:this.ganttChart.heightTaskItem+"px",width:((this.duration*this.ganttChart.pixelsPerWorkHour==0)?1:this.duration*this.ganttChart.pixelsPerWorkHour)+"px"},_38);var _3a=_39.insertRow(0);var _3b=_4.create("td",{align:"center",vAlign:"top",height:this.ganttChart.heightTaskItem+"px",className:"ganttMoveInfo"},_3a);_32.appendChild(_38);if(this.project.parentTasks.length==0){_32.style.display="none";}return _32;},createProjectNameItem:function(){var _3c=_4.create("div",{className:"ganttProjectNameItem",innerHTML:this.project.name,title:this.project.name});_4.style(_3c,{left:"5px",top:this.posY+"px"});_4.attr(_3c,"tabIndex",0);if(this.ganttChart.isShowConMenu){this.ganttChart._events.push(_4.connect(_3c,"onmouseover",this,function(_3d){_4.addClass(_3c,"ganttProjectNameItemHover");clearTimeout(this.ganttChart.menuTimer);this.ganttChart.tabMenu.clear();this.ganttChart.tabMenu.show(_3d.target,this);}));this.ganttChart._events.push(_4.connect(_3c,"onkeydown",this,function(_3e){if(_3e.keyCode==_4.keys.ENTER){this.ganttChart.tabMenu.clear();this.ganttChart.tabMenu.show(_3e.target,this);}if(this.ganttChart.tabMenu.isShow&&(_3e.keyCode==_4.keys.LEFT_ARROW||_3e.keyCode==_4.keys.RIGHT_ARROW)){_5.focus(this.ganttChart.tabMenu.menuPanel.firstChild.rows[0].cells[0]);}if(this.ganttChart.tabMenu.isShow&&_3e.keyCode==_4.keys.ESCAPE){this.ganttChart.tabMenu.hide();}}));this.ganttChart._events.push(_4.connect(_3c,"onmouseout",this,function(){_4.removeClass(_3c,"ganttProjectNameItemHover");clearTimeout(this.ganttChart.menuTimer);this.ganttChart.menuTimer=setTimeout(_4.hitch(this,function(){this.ganttChart.tabMenu.hide();}),200);}));this.ganttChart._events.push(_4.connect(this.ganttChart.tabMenu.menuPanel,"onmouseover",this,function(){clearTimeout(this.ganttChart.menuTimer);}));this.ganttChart._events.push(_4.connect(this.ganttChart.tabMenu.menuPanel,"onkeydown",this,function(_3f){if(this.ganttChart.tabMenu.isShow&&_3f.keyCode==_4.keys.ESCAPE){this.ganttChart.tabMenu.hide();}}));this.ganttChart._events.push(_4.connect(this.ganttChart.tabMenu.menuPanel,"onmouseout",this,function(){clearTimeout(this.ganttChart.menuTimer);this.ganttChart.menuTimer=setTimeout(_4.hitch(this,function(){this.ganttChart.tabMenu.hide();}),200);}));}return _3c;},getPercentCompleted:function(){var sum=0,_40=0;_4.forEach(this.project.parentTasks,function(_41){sum+=parseInt(_41.percentage);},this);if(this.project.parentTasks.length!=0){return _40=Math.round(sum/this.project.parentTasks.length);}else{return _40=-1;}},getDuration:function(){var _42=0,_43=0;if(this.project.parentTasks.length>0){_4.forEach(this.project.parentTasks,function(_44){_43=_44.duration*24/this.ganttChart.hsPerDay+(_44.startTime-this.ganttChart.startDate)/(60*60*1000);if(_43>_42){_42=_43;}},this);return ((_42-this.posX)/24)*this.ganttChart.hsPerDay;}else{return 0;}},deleteTask:function(id){var _45=this.getTaskById(id);if(_45){this.deleteChildTask(_45);this.ganttChart.checkPosition();}},setName:function(_46){if(_46){this.project.name=_46;this.projectNameItem.innerHTML=_46;this.projectNameItem.title=_46;this.checkWidthProjectNameItem();this.descrProject.innerHTML=this.getDescStr();this.adjustPanelTime();}},setPercentCompleted:function(_47){_47=parseInt(_47);if(isNaN(_47)||_47>100||_47<0){return false;}var _48=this.projectItem[0].firstChild.rows[0],rc0=_48.cells[0],rc1=_48.cells[1];if((_47>0)&&(_47<100)&&(this.percentage>0)&&(this.percentage<100)){rc0.width=parseInt(_47)+"%";rc0.firstChild.style.width=(_47*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px";rc1.width=(100-parseInt(_47))+"%";rc1.firstChild.style.width=((100-_47)*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px";}else{if(((_47==0)||(_47==100))&&(this.percentage>0)&&(this.percentage<100)){if(_47==0){rc0.parentNode.removeChild(rc0);rc1.width=100+"%";rc1.firstChild.style.width=this.duration*this.ganttChart.pixelsPerWorkHour+"px";}else{if(_47==100){rc1.parentNode.removeChild(rc1);rc0.width=100+"%";rc0.firstChild.style.width=this.duration*this.ganttChart.pixelsPerWorkHour+"px";}}}else{if(((_47==0)||(_47==100))&&((this.percentage==0)||(this.percentage==100))){if((_47==0)&&(this.percentage==100)){_4.removeClass(rc0.firstChild,"ganttImageProgressFilled");_4.addClass(rc0.firstChild,"ganttImageProgressBg");}else{if((_47==100)&&(this.percentage==0)){_4.removeClass(rc0.firstChild,"ganttImageProgressBg");_4.addClass(rc0.firstChild,"ganttImageProgressFilled");}}}else{if(((_47>0)||(_47<100))&&((this.percentage==0)||(this.percentage==100))){rc0.parentNode.removeChild(rc0);var _49=_4.create("td",{width:_47+"%"},_48);_49.style.lineHeight="1px";var _4a=_4.create("div",{className:"ganttImageProgressFilled"},_49);_4.style(_4a,{width:(_47*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});_49=_4.create("td",{width:(100-_47)+"%"},_48);_49.style.lineHeight="1px";_4a=_4.create("div",{className:"ganttImageProgressBg"},_49);_4.style(_4a,{width:((100-_47)*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});}else{if(this.percentage==-1){if(_47==100){_4.removeClass(rc0.firstChild,"ganttImageProgressBg");_4.addClass(rc0.firstChild,"ganttImageProgressFilled");}else{if(_47<100&&_47>0){rc0.parentNode.removeChild(rc0);var _49=_4.create("td",{width:_47+"%"},_48);_49.style.lineHeight="1px";_4a=_4.create("div",{className:"ganttImageProgressFilled"},_49);_4.style(_4a,{width:(_47*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});_49=_4.create("td",{width:(100-_47)+"%"},_48);_49.style.lineHeight="1px";_4a=_4.create("div",{className:"ganttImageProgressBg"},_49);_4.style(_4a,{width:((100-_47)*this.duration*this.ganttChart.pixelsPerWorkHour)/100+"px",height:this.ganttChart.heightTaskItem+"px"});}}}}}}}this.percentage=_47;this.descrProject.innerHTML=this.getDescStr();return true;},deleteChildTask:function(_4b){if(_4b){var _4c=_4b.cTaskItem[0],_4d=_4b.cTaskNameItem[0],_4e=_4b.cTaskItem[1],_4f=_4b.cTaskNameItem[1],_50=_4b.cTaskItem[2],_51=_4b.cTaskNameItem[2];if(_4c.style.display=="none"){this.ganttChart.openTree(_4b.parentTask);}if(_4b.childPredTask.length>0){for(var i=0;i<_4b.childPredTask.length;i++){var _52=_4b.childPredTask[i];for(var t=0;t<_52.cTaskItem[1].length;t++){_52.cTaskItem[1][t].parentNode.removeChild(_52.cTaskItem[1][t]);}_52.cTaskItem[1]=[];_52.predTask=null;}}if(_4b.childTask.length>0){while(_4b.childTask.length>0){this.deleteChildTask(_4b.childTask[0]);}}var _53=this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;if(_4c.style.display!="none"){_4b.shiftCurrentTasks(_4b,-_53);}this.project.deleteTask(_4b.taskItem.id);if(_4c){_4c.parentNode.removeChild(_4c);}_4b.descrTask.parentNode.removeChild(_4b.descrTask);if(_4e.length>0){for(var j=0;j<_4e.length;j++){_4e[j].parentNode.removeChild(_4e[j]);}}if(_4d){_4d.parentNode.removeChild(_4d);}if(_4b.cTaskNameItem[1]){for(var j=0;j<_4f.length;j++){_4f[j].parentNode.removeChild(_4f[j]);}}if(_51&&_51.parentNode){_51.parentNode.removeChild(_51);}if(_4b.taskIdentifier){_4b.taskIdentifier.parentNode.removeChild(_4b.taskIdentifier);_4b.taskIdentifier=null;}if(_4b.parentTask){if(_4b.previousChildTask){if(_4b.nextChildTask){_4b.previousChildTask.nextChildTask=_4b.nextChildTask;}else{_4b.previousChildTask.nextChildTask=null;}}var _54=_4b.parentTask;for(var i=0;i<_54.childTask.length;i++){if(_54.childTask[i].taskItem.id==_4b.taskItem.id){_54.childTask[i]=null;_54.childTask.splice(i,1);break;}}if(_54.childTask.length==0){if(_54.cTaskNameItem[2]){_54.cTaskNameItem[2].parentNode.removeChild(_54.cTaskNameItem[2]);_54.cTaskNameItem[2]=null;}}}else{if(_4b.previousParentTask){if(_4b.nextParentTask){_4b.previousParentTask.nextParentTask=_4b.nextParentTask;}else{_4b.previousParentTask.nextParentTask=null;}}var _55=_4b.project;for(var i=0;i<_55.arrTasks.length;i++){if(_55.arrTasks[i].taskItem.id==_4b.taskItem.id){_55.arrTasks.splice(i,1);}}}if(_4b.predTask){var _56=_4b.predTask;for(var i=0;i<_56.childPredTask.length;i++){if(_56.childPredTask[i].taskItem.id==_4b.taskItem.id){_56.childPredTask[i]=null;_56.childPredTask.splice(i,1);}}}if(_4b.project.arrTasks.length!=0){_4b.project.shiftProjectItem();}else{_4b.project.projectItem[0].style.display="none";this.hideDescrProject();}this.ganttChart.contentDataHeight-=this.ganttChart.heightTaskItemExtra+this.ganttChart.heightTaskItem;}},insertTask:function(id,_57,_58,_59,_5a,_5b,_5c,_5d){var _5e=null;var _5f=null;if(this.project.getTaskById(id)){return false;}if((!_59)||(_59<this.ganttChart.minWorkLength)){_59=this.ganttChart.minWorkLength;}if((!_57)||(_57=="")){_57=id;}if((!_5a)||(_5a=="")){_5a=0;}else{_5a=parseInt(_5a);if(_5a<0||_5a>100){return false;}}var _60=false;if((_5d)&&(_5d!="")){var _61=this.project.getTaskById(_5d);if(!_61){return false;}_58=_58||_61.startTime;if(_58<_61.startTime){return false;}_5e=new _6.gantt.GanttTaskItem({id:id,name:_57,startTime:_58,duration:_59,percentage:_5a,previousTaskId:_5b,taskOwner:_5c});if(!this.ganttChart.checkPosParentTask(_61,_5e)){return false;}_5e.parentTask=_61;var _62=this.getTaskById(_61.id);var _63=false;if(_62.cTaskItem[0].style.display=="none"){_63=true;}else{if(_62.cTaskNameItem[2]){if(!_62.isExpanded){_63=true;}}}if(_63){if(_62.childTask.length==0){this.ganttChart.openTree(_62.parentTask);}else{this.ganttChart.openTree(_62);}}if(_5b!=""){var _64=this.project.getTaskById(_5b);if(!_64){return false;}if(_64.parentTask){if(_64.parentTask.id!=_5e.parentTask.id){return false;}}else{return false;}if(!this.ganttChart.checkPosPreviousTask(_64,_5e)){this.ganttChart.correctPosPreviousTask(_64,_5e);}_5e.previousTask=_64;}var _65=false;if(_60){for(var i=0;i<_61.cldTasks.length;i++){if(_5e.startTime<_61.cldTasks[i].startTime){_61.cldTasks.splice(i,0,_5e);if(i>0){_61.cldTasks[i-1].nextChildTask=_61.cldTasks[i];_61.cldTasks[i].previousChildTask=_61.cldTasks[i-1];}if(_61.cldTasks[i+1]){_61.cldTasks[i+1].previousChildTask=_61.cldTasks[i];_61.cldTasks[i].nextChildTask=_61.cldTasks[i+1];}_65=true;break;}}}if(!_65){if(_61.cldTasks.length>0){_61.cldTasks[_61.cldTasks.length-1].nextChildTask=_5e;_5e.previousChildTask=_61.cldTasks[_61.cldTasks.length-1];}_61.cldTasks.push(_5e);}if(_61.cldTasks.length==1){var _66=_62.createTreeImg();_62.cTaskNameItem[2]=_66;}_5f=new _6.gantt.GanttTaskControl(_5e,this,this.ganttChart);_5f.create();if(_5e.nextChildTask){_5f.nextChildTask=_5f.project.getTaskById(_5e.nextChildTask.id);}_5f.adjustPanelTime();var _67=this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;_5f.shiftCurrentTasks(_5f,_67);}else{_58=_58||this.project.startDate;_5e=new _6.gantt.GanttTaskItem({id:id,name:_57,startTime:_58,duration:_59,percentage:_5a,previousTaskId:_5b,taskOwner:_5c});if(_5e.startTime<=this.ganttChart.startDate){return false;}if(_5b!=""){var _64=this.project.getTaskById(_5b);if(!_64){return false;}if(!this.ganttChart.checkPosPreviousTask(_64,_5e)){this.ganttChart.correctPosPreviousTask(_64,_5e);}if(_64.parentTask){return false;}_5e.previousTask=_64;}var _65=false;if(_60){for(var i=0;i<this.project.parentTasks.length;i++){var _68=this.project.parentTasks[i];if(_58<_68.startTime){this.project.parentTasks.splice(i,0,_5e);if(i>0){this.project.parentTasks[i-1].nextParentTask=_5e;_5e.previousParentTask=this.project.parentTasks[i-1];}if(this.project.parentTasks[i+1]){this.project.parentTasks[i+1].previousParentTask=_5e;_5e.nextParentTask=this.project.parentTasks[i+1];}_65=true;break;}}}if(!_65){if(this.project.parentTasks.length>0){this.project.parentTasks[this.project.parentTasks.length-1].nextParentTask=_5e;_5e.previousParentTask=this.project.parentTasks[this.project.parentTasks.length-1];}this.project.parentTasks.push(_5e);}_5f=new _6.gantt.GanttTaskControl(_5e,this,this.ganttChart);_5f.create();if(_5e.nextParentTask){_5f.nextParentTask=_5f.project.getTaskById(_5e.nextParentTask.id);}_5f.adjustPanelTime();this.arrTasks.push(_5f);var _67=this.ganttChart.heightTaskItem+this.ganttChart.heightTaskItemExtra;_5f.shiftCurrentTasks(_5f,_67);this.projectItem[0].style.display="inline";this.setPercentCompleted(this.getPercentCompleted());this.shiftProjectItem();this.showDescrProject();}this.ganttChart.checkHeighPanelTasks();this.ganttChart.checkPosition();return _5f;},shiftNextProject:function(_69,_6a){if(_69.nextProject){_69.nextProject.shiftProject(_6a);this.shiftNextProject(_69.nextProject,_6a);}},shiftProject:function(_6b){this.posY=this.posY+_6b;this.projectItem[0].style.top=parseInt(this.projectItem[0].style.top)+_6b+"px";this.descrProject.style.top=parseInt(this.descrProject.style.top)+_6b+"px";this.projectNameItem.style.top=parseInt(this.projectNameItem.style.top)+_6b+"px";if(this.arrTasks.length>0){this.shiftNextParentTask(this.arrTasks[0],_6b);}},shiftTask:function(_6c,_6d){_6c.posY=_6c.posY+_6d;var _6e=_6c.cTaskNameItem[0],_6f=_6c.cTaskNameItem[1],_70=_6c.cTaskNameItem[2],_71=_6c.cTaskItem[0],_72=_6c.cTaskItem[1],_73=_6c.cTaskItem[2];_6e.style.top=parseInt(_6e.style.top)+_6d+"px";if(_70){_70.style.top=parseInt(_70.style.top)+_6d+"px";}if(_6c.parentTask){_6f[0].style.top=parseInt(_6f[0].style.top)+_6d+"px";_6f[1].style.top=parseInt(_6f[1].style.top)+_6d+"px";}_6c.cTaskItem[0].style.top=parseInt(_6c.cTaskItem[0].style.top)+_6d+"px";_6c.descrTask.style.top=parseInt(_6c.descrTask.style.top)+_6d+"px";if(_72[0]){_72[0].style.top=parseInt(_72[0].style.top)+_6d+"px";_72[1].style.top=parseInt(_72[1].style.top)+_6d+"px";_72[2].style.top=parseInt(_72[2].style.top)+_6d+"px";}},shiftNextParentTask:function(_74,_75){this.shiftTask(_74,_75);this.shiftChildTasks(_74,_75);if(_74.nextParentTask){this.shiftNextParentTask(_74.nextParentTask,_75);}},shiftChildTasks:function(_76,_77){_4.forEach(_76.childTask,function(_78){this.shiftTask(_78,_77);if(_78.childTask.length>0){this.shiftChildTasks(_78,_77);}},this);}});_4.declare("dojox.gantt.GanttProjectItem",null,{constructor:function(_79){this.id=_79.id;this.name=_79.name||this.id;this.startDate=_79.startDate||new Date();this.parentTasks=[];},getTaskById:function(id){for(var i=0;i<this.parentTasks.length;i++){var _7a=this.parentTasks[i];var _7b=this.getTaskByIdInTree(_7a,id);if(_7b){return _7b;}}return null;},getTaskByIdInTree:function(_7c,id){if(_7c.id==id){return _7c;}else{for(var i=0;i<_7c.cldTasks.length;i++){var _7d=_7c.cldTasks[i];if(_7d.id==id){return _7d;}if(_7d.cldTasks.length>0){if(_7d.cldTasks.length>0){var _7e=this.getTaskByIdInTree(_7d,id);if(_7e){return _7e;}}}}}return null;},addTask:function(_7f){this.parentTasks.push(_7f);_7f.setProject(this);},deleteTask:function(id){var _80=this.getTaskById(id);if(!_80){return;}if(!_80.parentTask){for(var i=0;i<this.parentTasks.length;i++){var _81=this.parentTasks[i];if(_81.id==id){if(_81.nextParentTask){if(_81.previousParentTask){_81.previousParentTask.nextParentTask=_81.nextParentTask;_81.nextParentTask.previousParentTask=_81.previousParentTask;}else{_81.nextParentTask.previousParentTask=null;}}else{if(_81.previousParentTask){_81.previousParentTask.nextParentTask=null;}}_81=null;this.parentTasks.splice(i,1);break;}}}else{var _82=_80.parentTask;for(var i=0;i<_82.cldTasks.length;i++){var _83=_82.cldTasks[i];if(_83.id==id){if(_83.nextChildTask){if(_83.previousChildTask){_83.previousChildTask.nextChildTask=_83.nextChildTask;_83.nextChildTask.previousChildTask=_83.previousChildTask;}else{_83.nextChildTask.previousChildTask=null;}}else{if(_83.previousChildTask){_83.previousChildTask.nextChildTask=null;}}_83=null;_82.cldTasks.splice(i,1);break;}}}}});}}};});