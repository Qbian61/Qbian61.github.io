define(function(require, exports, module) {
/**
 * Created by Cyril on 2016/5/30.
 * AbstractBusinessDataBoth同时访问两台服务器，并对返回结果进行合并
 * GetNowMeetings(获取被邀请参加的所有会议)
 */
'use strict';

const EventEmitter = require('./events').EventEmitter;
const util = require('./util');
const http = require('./http');
const urlparse = require('./url');
const ConstConfig = require("./Config/ConstConfig.js");
const Log = require("../log/Log.js");
const Querystring =  require('./querystring');

var thiz;
var responseStatus = {};
responseStatus.initStatus = 0;
responseStatus.successStatus = 1;
responseStatus.failedStatus = 2;


var AbstractBusinessData = function(name) {
    EventEmitter.call(this);
    this.firstRequest = null;
    this.secondRequest = null;
    this.tag = name;
    this.firstServerResStatus = 0;
    this.secondServerResStatus = 0;
    this.responseOfFirstRequest = [];
    this.responseOfSecondRequest = [];
};

AbstractBusinessData.prototype.execBoth = function (firstUrl,secondUrl,content) {
    Log.info(this.tag + "execBoth 被执行");
    var firstServerReturn = firstServerExec(this,firstUrl,content);
    var secondServerReturn = sencondServerExec(this,secondUrl,content);

    if(firstServerReturn < 0 && secondServerReturn < 0){
        Log.error("["+ subname +"] error:" + "-12 " + ConstConfig.PARAM_11);
        console.error("error",-12,ConstConfig.PARAM_11);
        return ConstConfig.PARAM_11;
    }
    return 0;
};


function firstServerExec(currObj,url,content) {
    var thiz = currObj;
    var subname = thiz.tag;
    Log.info("["+ subname +"] info:first Request url:",url + "?" + content);
    if(thiz.firstRequest != null){
        firstFailedResponse(currObj,-12,ConstConfig.PARAM_12);
        return;
    }
    var urlpath = urlparse.parse(url);
    var options = {
        host:urlpath.hostname,
        port:urlpath.port,
        path:urlpath.pathname,
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };

    thiz.firstRequest = http.request(options, function(response) {
        if(response.statusCode != 200){
            firstFailedResponse(currObj,response.statusCode,ConstConfig["PARAM_" + response.statusCode]);
            return;
        }
        var body = '';
        response.on('data', function(data){
            Log.info("["+ currObj +"] info:response data is" + data);
            body += data;
        } );
        response.on('end', function(){
            var parser = thiz.getParser();
            parser.parse(body);
            var ob = null;
            if (parser.isOk()) {
                try{
                    ob = thiz.parseContentBody(parser.getHeaderValue(), parser.getBody());//throws exception
                }catch( e ){
                    firstFailedResponse(currObj,-3,ConstConfig.PARAM_3);
                    return;
                }
                Log.info("["+ currObj +"] info:receiving data success");
                console.log("first request success");
                thiz.firstServerResStatus = responseStatus.successStatus;
                thiz.responseOfFirstRequest = ob;
                if(thiz.secondServerResStatus == responseStatus.successStatus || thiz.secondServerResStatus == responseStatus.failedStatus){
                    // thiz.emit("success", ob);
                    handleSuccess(currObj,ob,thiz.responseOfSecondRequest);
                }else {
                    console.log("second request not response");
                    Log.info("second request not response");
                    return;
                }
            }else{
                firstFailedResponse(currObj,parser.getHeaderValue(),parser.getHeaderText());
                return;
            }
        });
    });
    thiz.firstRequest.setTimeout(ConstConfig.TIME_OUT,function(){
        firstFailedResponse(currObj,-19,ConstConfig.PARAM_19);
        thiz.firstRequest.abort();
    });
    thiz.firstRequest.on("error", function(error) {
        firstFailedResponse(currObj,-11,ConstConfig.PARAM_11 + error.message);
    });
    thiz.firstRequest.write(content);
    thiz.firstRequest.end();
    return 0 ;
};

function firstFailedResponse(obj,errorCode,errorMsg) {
    obj.firstServerResStatus = responseStatus.failedStatus;
    console.log("["+ obj.tag +"] first request, response error:errorCode=" + errorCode + "errorMsg="+ errorMsg);
    Log.error("["+ obj.tag +"] first request, response error:errorCode=" + errorCode + "errorMsg="+ errorMsg);
    if(obj.secondServerResStatus == responseStatus.failedStatus){
        console.log("second response failed");
        Log.info("emit，错误信息返回");
        obj.emit("error", errorCode,errorMsg);
    }else if(obj.secondServerResStatus == responseStatus.successStatus){
        handleSuccess(obj,obj.responseOfFirstRequest,obj.responseOfSecondRequest);
    }else {
        console.log("second request not request");
    }
}

function sencondServerExec(currObj,url,content) {
    var thiz = currObj;
    var subname = thiz.tag;
    Log.info("["+ subname +"] info:second Request url:",url + "?" + content);
    if(thiz.secondRequest != null){
        secondFailedResponse(currObj,-12,ConstConfig.PARAM_12);
        return;
    }
    var urlpath = urlparse.parse(url);
    var options = {
        host:urlpath.hostname,
        port:urlpath.port,
        path:urlpath.pathname,
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };

    thiz.secondRequest = http.request(options, function(response) {
        if(response.statusCode != 200){
            secondFailedResponse(currObj,response.statusCode,ConstConfig["PARAM_" + response.statusCode]);
            return;
        }
        var body = '';
        response.on('data', function(data){
            Log.info("["+ currObj +"] info:response data is" + data);
            body += data;
        } );
        response.on('end', function(){
            var parser = thiz.getParser();
            parser.parse(body);
            var ob = null;
            if (parser.isOk()) {
                try{
                    ob = thiz.parseContentBody(parser.getHeaderValue(), parser.getBody());//throws exception
                }catch( e ){
                    secondFailedResponse(currObj,-3,ConstConfig.PARAM_3);
                    return;
                }
                Log.info("["+ subname +"] info:receiving data success");
                console.log("second request success");
                thiz.secondServerResStatus = responseStatus.successStatus;
                thiz.responseOfSecondRequest = ob;
                if(thiz.firstServerResStatus == responseStatus.successStatus || thiz.firstServerResStatus == responseStatus.failedStatus){
                    // thiz.emit("success", ob);
                    handleSuccess(currObj,thiz.responseOfFirstRequest,ob);
                }else {
                    console.log("first request not response");
                    Log.info("first request not response");
                    return;
                }
            }else{
                secondFailedResponse(currObj,parser.getHeaderValue(),parser.getHeaderText());
                return;
            }
        });
    });
    thiz.secondRequest.setTimeout(ConstConfig.TIME_OUT,function(){
        secondFailedResponse(currObj,-19,ConstConfig.PARAM_19);
        thiz.secondRequest.abort();
    });
    thiz.secondRequest.on("error", function(error) {
        secondFailedResponse(currObj,-11,ConstConfig.PARAM_11 + error.message);
    });
    thiz.secondRequest.write(content);
    thiz.secondRequest.end();
    return 0 ;
}


function secondFailedResponse(obj,errorCode,errorMsg) {
    obj.secondServerResStatus = responseStatus.failedStatus;
    console.log("["+ obj.tag +"] second request, response error:errorCode=" + errorCode + "errorMsg="+ errorMsg);
    Log.error("["+ obj.tag +"] second request, response error:errorCode=" + errorCode + "errorMsg="+ errorMsg);
    if(obj.firstServerResStatus == responseStatus.failedStatus){
        console.log("first response failed");
        obj.emit("error", errorCode, errorMsg);
    }else if(obj.firstServerResStatus == responseStatus.successStatus){
        handleSuccess(obj,obj.responseOfFirstRequest,obj.responseOfSecondRequest);
    }else{
        console.log("second request not request");
    }
}

function handleSuccess(obj,firstResponse,secondResponse) {
    console.log("会议记录获取成功，整合数据");

    if(firstResponse.length > 0 && secondResponse.length == 0){
        obj.emit("success", firstResponse);
    }else if(firstResponse.length == 0 && secondResponse.length > 0){
        obj.emit("success", secondResponse);
    }else{
        var allObj = [];
        allObj = firstResponse;
        for (let i=0; i<secondResponse.length; i++){
            let temp = secondResponse[i];
            for (let j=0; j<firstResponse.length; j++){
                let temp2 = firstResponse[j];
                if(temp.meetingId == temp2.meetingId && temp.phoneId == temp2.phoneId){
                    secondResponse.splice(i,1);
                    i--;
                    break;
                }
            }
        }
        allObj = allObj.concat(secondResponse);

        var instantMeetRecords = [];
        var futuremeetRecords = [];
        for (let z = 0; z<allObj.length; z++){
            let temp = allObj[z];
            if(temp.meetingType == 1){
                instantMeetRecords.push(temp);
            }else{
                futuremeetRecords.push(temp);
            }
        }

        instantMeetRecords.sort(function (a,b) {
            if(a.createTime < b.createTime){
                return 1;
            }else{
                return -1;
            }
        });

        futuremeetRecords.sort(function (a,b) {
            if(a.createTime > b.createTime){
                return 1;
            }else{
                return -1;
            }
        });

        allObj.splice(0,allObj.length);
        allObj = instantMeetRecords;
        allObj = allObj.concat(futuremeetRecords);
        obj.emit("success", allObj);
    }

    if(obj.firstServerResStatus == responseStatus.successStatus && obj.secondServerResStatus == responseStatus.successStatus){
        console.log("主备机的会议信息都返回了");
    }else if(obj.firstServerResStatus == responseStatus.successStatus && obj.secondServerResStatus == responseStatus.failedStatus){
        console.log("主机会议记录返回，从机会议记录返回失败");
    }else if(obj.firstServerResStatus == responseStatus.failedStatus && obj.secondServerResStatus == responseStatus.successStatus) {
        console.log("主机会议记录返回失败，从机会议记录返回");
    }
    obj.emit("success", allObj);

}


AbstractBusinessData.prototype.cancel = function() {
    Log.info("["+ this.tag +"] info:firstRequest canceled");
    if (this.firstRequest != null) {
        this.firstRequest.abort();
        this.firstRequest = null;
    }
    Log.info("["+ this.tag +"] info:secondRequest canceled");
    if (this.secondRequest != null) {
        this.secondRequest.abort();
        this.secondRequest = null;
    }
};

AbstractBusinessData.prototype.getParser = function() {
    return null;//throws exception
};

AbstractBusinessData.prototype.parseContentBody = function(headerValue, jo) {
    return null;//throws exception
};

util.inherits(AbstractBusinessData, EventEmitter);

module.exports = AbstractBusinessData;

});
