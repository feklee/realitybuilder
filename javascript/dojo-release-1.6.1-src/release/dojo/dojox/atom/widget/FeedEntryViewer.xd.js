/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


realityBuilderDojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dojox.atom.widget.FeedEntryViewer"],["require","dojo.fx"],["require","dijit._Widget"],["require","dijit._Templated"],["require","dijit._Container"],["require","dijit.layout.ContentPane"],["require","dojox.atom.io.Connection"],["requireLocalization","dojox.atom.widget","FeedEntryViewer",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dojox.atom.widget.FeedEntryViewer"]){_4._hasResource["dojox.atom.widget.FeedEntryViewer"]=true;_4.provide("dojox.atom.widget.FeedEntryViewer");_4.require("dojo.fx");_4.require("dijit._Widget");_4.require("dijit._Templated");_4.require("dijit._Container");_4.require("dijit.layout.ContentPane");_4.require("dojox.atom.io.Connection");_4.experimental("dojox.atom.widget.FeedEntryViewer");_4.declare("dojox.atom.widget.FeedEntryViewer",[_5._Widget,_5._Templated,_5._Container],{entrySelectionTopic:"",_validEntryFields:{},displayEntrySections:"",_displayEntrySections:null,enableMenu:false,enableMenuFade:false,_optionButtonDisplayed:true,templateString:_4.cache("dojox.atom","widget/templates/FeedEntryViewer.html","<div class=\"feedEntryViewer\">\r\n    <table border=\"0\" width=\"100%\" class=\"feedEntryViewerMenuTable\" dojoAttachPoint=\"feedEntryViewerMenu\" style=\"display: none;\">\r\n        <tr width=\"100%\"  dojoAttachPoint=\"entryCheckBoxDisplayOptions\">\r\n            <td align=\"right\">\r\n                <span class=\"feedEntryViewerMenu\" dojoAttachPoint=\"displayOptions\" dojoAttachEvent=\"onclick:_toggleOptions\"></span>\r\n            </td>\r\n        </tr>\r\n        <tr class=\"feedEntryViewerDisplayCheckbox\" dojoAttachPoint=\"entryCheckBoxRow\" width=\"100%\" style=\"display: none;\">\r\n            <td dojoAttachPoint=\"feedEntryCelltitle\">\r\n                <input type=\"checkbox\" name=\"title\" value=\"Title\" dojoAttachPoint=\"feedEntryCheckBoxTitle\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelTitle\"></label>\r\n            </td>\r\n            <td dojoAttachPoint=\"feedEntryCellauthors\">\r\n                <input type=\"checkbox\" name=\"authors\" value=\"Authors\" dojoAttachPoint=\"feedEntryCheckBoxAuthors\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelAuthors\"></label>\r\n            </td>\r\n            <td dojoAttachPoint=\"feedEntryCellcontributors\">\r\n                <input type=\"checkbox\" name=\"contributors\" value=\"Contributors\" dojoAttachPoint=\"feedEntryCheckBoxContributors\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelContributors\"></label>\r\n            </td>\r\n            <td dojoAttachPoint=\"feedEntryCellid\">\r\n                <input type=\"checkbox\" name=\"id\" value=\"Id\" dojoAttachPoint=\"feedEntryCheckBoxId\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelId\"></label>\r\n            </td>\r\n            <td rowspan=\"2\" align=\"right\">\r\n                <span class=\"feedEntryViewerMenu\" dojoAttachPoint=\"close\" dojoAttachEvent=\"onclick:_toggleOptions\"></span>\r\n            </td>\r\n\t\t</tr>\r\n\t\t<tr class=\"feedEntryViewerDisplayCheckbox\" dojoAttachPoint=\"entryCheckBoxRow2\" width=\"100%\" style=\"display: none;\">\r\n            <td dojoAttachPoint=\"feedEntryCellupdated\">\r\n                <input type=\"checkbox\" name=\"updated\" value=\"Updated\" dojoAttachPoint=\"feedEntryCheckBoxUpdated\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelUpdated\"></label>\r\n            </td>\r\n            <td dojoAttachPoint=\"feedEntryCellsummary\">\r\n                <input type=\"checkbox\" name=\"summary\" value=\"Summary\" dojoAttachPoint=\"feedEntryCheckBoxSummary\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelSummary\"></label>\r\n            </td>\r\n            <td dojoAttachPoint=\"feedEntryCellcontent\">\r\n                <input type=\"checkbox\" name=\"content\" value=\"Content\" dojoAttachPoint=\"feedEntryCheckBoxContent\" dojoAttachEvent=\"onclick:_toggleCheckbox\"/>\r\n\t\t\t\t<label for=\"title\" dojoAttachPoint=\"feedEntryCheckBoxLabelContent\"></label>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n    \r\n    <table class=\"feedEntryViewerContainer\" border=\"0\" width=\"100%\">\r\n        <tr class=\"feedEntryViewerTitle\" dojoAttachPoint=\"entryTitleRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryTitleHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryTitleNode\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n\r\n        <tr class=\"feedEntryViewerAuthor\" dojoAttachPoint=\"entryAuthorRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryAuthorHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryAuthorNode\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n\r\n        <tr class=\"feedEntryViewerContributor\" dojoAttachPoint=\"entryContributorRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryContributorHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryContributorNode\" class=\"feedEntryViewerContributorNames\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n        \r\n        <tr class=\"feedEntryViewerId\" dojoAttachPoint=\"entryIdRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryIdHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryIdNode\" class=\"feedEntryViewerIdText\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    \r\n        <tr class=\"feedEntryViewerUpdated\" dojoAttachPoint=\"entryUpdatedRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryUpdatedHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryUpdatedNode\" class=\"feedEntryViewerUpdatedText\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    \r\n        <tr class=\"feedEntryViewerSummary\" dojoAttachPoint=\"entrySummaryRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entrySummaryHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entrySummaryNode\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    \r\n        <tr class=\"feedEntryViewerContent\" dojoAttachPoint=\"entryContentRow\" style=\"display: none;\">\r\n            <td>\r\n                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                    <tr class=\"graphic-tab-lgray\">\r\n\t\t\t\t\t\t<td class=\"lp2\">\r\n\t\t\t\t\t\t\t<span class=\"lp\" dojoAttachPoint=\"entryContentHeader\"></span>\r\n\t\t\t\t\t\t</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td dojoAttachPoint=\"entryContentNode\">\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n"),_entry:null,_feed:null,_editMode:false,postCreate:function(){if(this.entrySelectionTopic!==""){this._subscriptions=[_4.subscribe(this.entrySelectionTopic,this,"_handleEvent")];}var _7=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");this.displayOptions.innerHTML=_7.displayOptions;this.feedEntryCheckBoxLabelTitle.innerHTML=_7.title;this.feedEntryCheckBoxLabelAuthors.innerHTML=_7.authors;this.feedEntryCheckBoxLabelContributors.innerHTML=_7.contributors;this.feedEntryCheckBoxLabelId.innerHTML=_7.id;this.close.innerHTML=_7.close;this.feedEntryCheckBoxLabelUpdated.innerHTML=_7.updated;this.feedEntryCheckBoxLabelSummary.innerHTML=_7.summary;this.feedEntryCheckBoxLabelContent.innerHTML=_7.content;},startup:function(){if(this.displayEntrySections===""){this._displayEntrySections=["title","authors","contributors","summary","content","id","updated"];}else{this._displayEntrySections=this.displayEntrySections.split(",");}this._setDisplaySectionsCheckboxes();if(this.enableMenu){_4.style(this.feedEntryViewerMenu,"display","");if(this.entryCheckBoxRow&&this.entryCheckBoxRow2){if(this.enableMenuFade){_4.fadeOut({node:this.entryCheckBoxRow,duration:250}).play();_4.fadeOut({node:this.entryCheckBoxRow2,duration:250}).play();}}}},clear:function(){this.destroyDescendants();this._entry=null;this._feed=null;this.clearNodes();},clearNodes:function(){_4.forEach(["entryTitleRow","entryAuthorRow","entryContributorRow","entrySummaryRow","entryContentRow","entryIdRow","entryUpdatedRow"],function(_8){_4.style(this[_8],"display","none");},this);_4.forEach(["entryTitleNode","entryTitleHeader","entryAuthorHeader","entryContributorHeader","entryContributorNode","entrySummaryHeader","entrySummaryNode","entryContentHeader","entryContentNode","entryIdNode","entryIdHeader","entryUpdatedHeader","entryUpdatedNode"],function(_9){while(this[_9].firstChild){_4.destroy(this[_9].firstChild);}},this);},setEntry:function(_a,_b,_c){this.clear();this._validEntryFields={};this._entry=_a;this._feed=_b;if(_a!==null){if(this.entryTitleHeader){this.setTitleHeader(this.entryTitleHeader,_a);}if(this.entryTitleNode){this.setTitle(this.entryTitleNode,this._editMode,_a);}if(this.entryAuthorHeader){this.setAuthorsHeader(this.entryAuthorHeader,_a);}if(this.entryAuthorNode){this.setAuthors(this.entryAuthorNode,this._editMode,_a);}if(this.entryContributorHeader){this.setContributorsHeader(this.entryContributorHeader,_a);}if(this.entryContributorNode){this.setContributors(this.entryContributorNode,this._editMode,_a);}if(this.entryIdHeader){this.setIdHeader(this.entryIdHeader,_a);}if(this.entryIdNode){this.setId(this.entryIdNode,this._editMode,_a);}if(this.entryUpdatedHeader){this.setUpdatedHeader(this.entryUpdatedHeader,_a);}if(this.entryUpdatedNode){this.setUpdated(this.entryUpdatedNode,this._editMode,_a);}if(this.entrySummaryHeader){this.setSummaryHeader(this.entrySummaryHeader,_a);}if(this.entrySummaryNode){this.setSummary(this.entrySummaryNode,this._editMode,_a);}if(this.entryContentHeader){this.setContentHeader(this.entryContentHeader,_a);}if(this.entryContentNode){this.setContent(this.entryContentNode,this._editMode,_a);}}this._displaySections();},setTitleHeader:function(_d,_e){if(_e.title&&_e.title.value&&_e.title.value!==null){var _f=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _10=new _6.atom.widget.EntryHeader({title:_f.title});_d.appendChild(_10.domNode);}},setTitle:function(_11,_12,_13){if(_13.title&&_13.title.value&&_13.title.value!==null){if(_13.title.type=="text"){var _14=document.createTextNode(_13.title.value);_11.appendChild(_14);}else{var _15=document.createElement("span");var _16=new _5.layout.ContentPane({refreshOnShow:true,executeScripts:false},_15);_16.attr("content",_13.title.value);_11.appendChild(_16.domNode);}this.setFieldValidity("title",true);}},setAuthorsHeader:function(_17,_18){if(_18.authors&&_18.authors.length>0){var _19=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _1a=new _6.atom.widget.EntryHeader({title:_19.authors});_17.appendChild(_1a.domNode);}},setAuthors:function(_1b,_1c,_1d){_1b.innerHTML="";if(_1d.authors&&_1d.authors.length>0){for(var i in _1d.authors){if(_1d.authors[i].name){var _1e=_1b;if(_1d.authors[i].uri){var _1f=document.createElement("a");_1e.appendChild(_1f);_1f.href=_1d.authors[i].uri;_1e=_1f;}var _20=_1d.authors[i].name;if(_1d.authors[i].email){_20=_20+" ("+_1d.authors[i].email+")";}var _21=document.createTextNode(_20);_1e.appendChild(_21);var _22=document.createElement("br");_1b.appendChild(_22);this.setFieldValidity("authors",true);}}}},setContributorsHeader:function(_23,_24){if(_24.contributors&&_24.contributors.length>0){var _25=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _26=new _6.atom.widget.EntryHeader({title:_25.contributors});_23.appendChild(_26.domNode);}},setContributors:function(_27,_28,_29){if(_29.contributors&&_29.contributors.length>0){for(var i in _29.contributors){var _2a=document.createTextNode(_29.contributors[i].name);_27.appendChild(_2a);var _2b=document.createElement("br");_27.appendChild(_2b);this.setFieldValidity("contributors",true);}}},setIdHeader:function(_2c,_2d){if(_2d.id&&_2d.id!==null){var _2e=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _2f=new _6.atom.widget.EntryHeader({title:_2e.id});_2c.appendChild(_2f.domNode);}},setId:function(_30,_31,_32){if(_32.id&&_32.id!==null){var _33=document.createTextNode(_32.id);_30.appendChild(_33);this.setFieldValidity("id",true);}},setUpdatedHeader:function(_34,_35){if(_35.updated&&_35.updated!==null){var _36=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _37=new _6.atom.widget.EntryHeader({title:_36.updated});_34.appendChild(_37.domNode);}},setUpdated:function(_38,_39,_3a){if(_3a.updated&&_3a.updated!==null){var _3b=document.createTextNode(_3a.updated);_38.appendChild(_3b);this.setFieldValidity("updated",true);}},setSummaryHeader:function(_3c,_3d){if(_3d.summary&&_3d.summary.value&&_3d.summary.value!==null){var _3e=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _3f=new _6.atom.widget.EntryHeader({title:_3e.summary});_3c.appendChild(_3f.domNode);}},setSummary:function(_40,_41,_42){if(_42.summary&&_42.summary.value&&_42.summary.value!==null){var _43=document.createElement("span");var _44=new _5.layout.ContentPane({refreshOnShow:true,executeScripts:false},_43);_44.attr("content",_42.summary.value);_40.appendChild(_44.domNode);this.setFieldValidity("summary",true);}},setContentHeader:function(_45,_46){if(_46.content&&_46.content.value&&_46.content.value!==null){var _47=_4.i18n.getLocalization("dojox.atom.widget","FeedEntryViewer");var _48=new _6.atom.widget.EntryHeader({title:_47.content});_45.appendChild(_48.domNode);}},setContent:function(_49,_4a,_4b){if(_4b.content&&_4b.content.value&&_4b.content.value!==null){var _4c=document.createElement("span");var _4d=new _5.layout.ContentPane({refreshOnShow:true,executeScripts:false},_4c);_4d.attr("content",_4b.content.value);_49.appendChild(_4d.domNode);this.setFieldValidity("content",true);}},_displaySections:function(){_4.style(this.entryTitleRow,"display","none");_4.style(this.entryAuthorRow,"display","none");_4.style(this.entryContributorRow,"display","none");_4.style(this.entrySummaryRow,"display","none");_4.style(this.entryContentRow,"display","none");_4.style(this.entryIdRow,"display","none");_4.style(this.entryUpdatedRow,"display","none");for(var i in this._displayEntrySections){var _4e=this._displayEntrySections[i].toLowerCase();if(_4e==="title"&&this.isFieldValid("title")){_4.style(this.entryTitleRow,"display","");}if(_4e==="authors"&&this.isFieldValid("authors")){_4.style(this.entryAuthorRow,"display","");}if(_4e==="contributors"&&this.isFieldValid("contributors")){_4.style(this.entryContributorRow,"display","");}if(_4e==="summary"&&this.isFieldValid("summary")){_4.style(this.entrySummaryRow,"display","");}if(_4e==="content"&&this.isFieldValid("content")){_4.style(this.entryContentRow,"display","");}if(_4e==="id"&&this.isFieldValid("id")){_4.style(this.entryIdRow,"display","");}if(_4e==="updated"&&this.isFieldValid("updated")){_4.style(this.entryUpdatedRow,"display","");}}},setDisplaySections:function(_4f){if(_4f!==null){this._displayEntrySections=_4f;this._displaySections();}else{this._displayEntrySections=["title","authors","contributors","summary","content","id","updated"];}},_setDisplaySectionsCheckboxes:function(){var _50=["title","authors","contributors","summary","content","id","updated"];for(var i in _50){if(_4.indexOf(this._displayEntrySections,_50[i])==-1){_4.style(this["feedEntryCell"+_50[i]],"display","none");}else{this["feedEntryCheckBox"+_50[i].substring(0,1).toUpperCase()+_50[i].substring(1)].checked=true;}}},_readDisplaySections:function(){var _51=[];if(this.feedEntryCheckBoxTitle.checked){_51.push("title");}if(this.feedEntryCheckBoxAuthors.checked){_51.push("authors");}if(this.feedEntryCheckBoxContributors.checked){_51.push("contributors");}if(this.feedEntryCheckBoxSummary.checked){_51.push("summary");}if(this.feedEntryCheckBoxContent.checked){_51.push("content");}if(this.feedEntryCheckBoxId.checked){_51.push("id");}if(this.feedEntryCheckBoxUpdated.checked){_51.push("updated");}this._displayEntrySections=_51;},_toggleCheckbox:function(_52){if(_52.checked){_52.checked=false;}else{_52.checked=true;}this._readDisplaySections();this._displaySections();},_toggleOptions:function(_53){if(this.enableMenu){var _54=null;var _55;var _56;if(this._optionButtonDisplayed){if(this.enableMenuFade){_55=_4.fadeOut({node:this.entryCheckBoxDisplayOptions,duration:250});_4.connect(_55,"onEnd",this,function(){_4.style(this.entryCheckBoxDisplayOptions,"display","none");_4.style(this.entryCheckBoxRow,"display","");_4.style(this.entryCheckBoxRow2,"display","");_4.fadeIn({node:this.entryCheckBoxRow,duration:250}).play();_4.fadeIn({node:this.entryCheckBoxRow2,duration:250}).play();});_55.play();}else{_4.style(this.entryCheckBoxDisplayOptions,"display","none");_4.style(this.entryCheckBoxRow,"display","");_4.style(this.entryCheckBoxRow2,"display","");}this._optionButtonDisplayed=false;}else{if(this.enableMenuFade){_55=_4.fadeOut({node:this.entryCheckBoxRow,duration:250});_56=_4.fadeOut({node:this.entryCheckBoxRow2,duration:250});_4.connect(_55,"onEnd",this,function(){_4.style(this.entryCheckBoxRow,"display","none");_4.style(this.entryCheckBoxRow2,"display","none");_4.style(this.entryCheckBoxDisplayOptions,"display","");_4.fadeIn({node:this.entryCheckBoxDisplayOptions,duration:250}).play();});_55.play();_56.play();}else{_4.style(this.entryCheckBoxRow,"display","none");_4.style(this.entryCheckBoxRow2,"display","none");_4.style(this.entryCheckBoxDisplayOptions,"display","");}this._optionButtonDisplayed=true;}}},_handleEvent:function(_57){if(_57.source!=this){if(_57.action=="set"&&_57.entry){this.setEntry(_57.entry,_57.feed);}else{if(_57.action=="delete"&&_57.entry&&_57.entry==this._entry){this.clear();}}}},setFieldValidity:function(_58,_59){if(_58){var _5a=_58.toLowerCase();this._validEntryFields[_58]=_59;}},isFieldValid:function(_5b){return this._validEntryFields[_5b.toLowerCase()];},getEntry:function(){return this._entry;},getFeed:function(){return this._feed;},destroy:function(){this.clear();_4.forEach(this._subscriptions,_4.unsubscribe);}});_4.declare("dojox.atom.widget.EntryHeader",[_5._Widget,_5._Templated,_5._Container],{title:"",templateString:_4.cache("dojox.atom","widget/templates/EntryHeader.html","<span dojoAttachPoint=\"entryHeaderNode\" class=\"entryHeaderNode\"></span>\r\n"),postCreate:function(){this.setListHeader();},setListHeader:function(_5c){this.clear();if(_5c){this.title=_5c;}var _5d=document.createTextNode(this.title);this.entryHeaderNode.appendChild(_5d);},clear:function(){this.destroyDescendants();if(this.entryHeaderNode){for(var i=0;i<this.entryHeaderNode.childNodes.length;i++){this.entryHeaderNode.removeChild(this.entryHeaderNode.childNodes[i]);}}},destroy:function(){this.clear();}});}}};});