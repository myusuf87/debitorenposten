const parsedUI5Version=sap.ui.version.split(".");const connectorPath=parseInt(parsedUI5Version[0],10)>=1&&parseInt(parsedUI5Version[1],10)>=80?"sap/ui/fl/write/api/connectors/FileListBaseConnector":"sap/ui/fl/initial/api/connectors/FileListBaseConnector";sap.ui.define(["sap/base/util/merge",connectorPath],function(n,e){var a=[/^localhost$/,/^.*.applicationstudio.cloud.sap$/];var i=new URL(window.location.toString());var t=a.some(n=>n.test(i.hostname));return n({},e,{getFileList:function(){return new Promise(function(n,e){if(!t){e("cannot load flex changes: invalid host")}$.ajax({url:i.origin+"/changes/",type:"GET",cache:false}).then(function(e){var a=/(\/changes\/[^"]*\.[a-zA-Z]*)/g;var i=a.exec(e);var t=[];while(i!==null){t.push(i[1]);i=a.exec(e)}n(t)}).fail(function(e){n()})})}})});