define(function(require, exports, module) {
'use strict';

const util = require('./util');
const AbstractBusinessData = require("../AbstractBussinessData.js");
const MeetingManageParser = require("../MeetingManageParser.js");
const ConstConfig = require("../Config/ConstConfig.js");
const Log = require("../../log/Log.js");

var GetNowMeetings = function() {
    AbstractBusinessData.call(this,"GetNowMeetings");
};
GetNowMeetings.prototype = new AbstractBusinessData;

/*****************接口调用说明******************
 * @return
 *  -1: 表示无效的操作，当前操作正在执行
 *  -2: 表示无效的编码
 *  -3: 表示json操作异常
 *  -4: 接口服务器地址不合法
 *  -5: 输入参数不合法
 *
 *  接口调用方式如下：
 *  const GetNowMeetings = require("./MeetingManage/GetNowMeetings.js");//以实际路径为准
    var getNowMeetings = new GetNowMeetings();
    getNowMeetings.getNowMeetings("82ccb33e-6965-48d7-9bd7-c33feb483a97");
    //若发送成功，返回信息见parseContentBody函数
    getNowMeetings.on("success", function(vo) {
        console.log(vo);
    });
    //若发送失败，则返回错误码和描述信息
    getNowMeetings.on("error", function(errorCode, errorDesciption){
        console.log(errorCode,errorDesciption);
    });
 ***********************************************/
GetNowMeetings.prototype.getNowMeetings = function(token, callback) {
    try {
        var json = "{\"" + ConstConfig.TOKEN + "\":\"" + token + "\"}";
        // token = 74108c68-8109-403e-8d54-385f0a691d99
        // url = http://103.25.23.103:20001/MeetingManage/callService
        // return this.exec(ConstConfig.getGetNowMeetingsUrl(), ConstConfig.PARAM_GETNOWMEETINGS + encodeURI(json));
        // return this.exec("http://103.25.23.103:20001/MeetingManage/callService", ConstConfig.PARAM_GETNOWMEETINGS + encodeURI(json));
        return this.exec('http://localhost:80/jsp-angular/api/user/callService', ConstConfig.PARAM_GETNOWMEETINGS + encodeURI(json), callback);
        // var firstRequestUrl = ConstConfig.getGetNowMeetingsUrl();
        // var secondRequestUrl = ConstConfig.getSlaveMeetingManagementHttpUrlPrefix() + ConstConfig.bmsWebDomainSuffix;
        // console.log("[getNowMeetings]the first url " + firstRequestUrl + " the second url " + secondRequestUrl);
        // return this.execBoth(firstRequestUrl,secondRequestUrl,ConstConfig.PARAM_GETNOWMEETINGS + encodeURI(json));
        // return this.exec(firstRequestUrl, ConstConfig.PARAM_GETNOWMEETINGS + encodeURI(json));
    } catch (e) {
        Log.error("[GetNowMeetings] error:" + "-3 at getNowMeetings():" + ConstConfig.PARAM_3);
        //console.log("error",-3, e.message + " at getNowMeetings() in GetNowMeetings.js");
    }
    return -3;
}

GetNowMeetings.prototype.parseContentBody = function(headerValueObject,bodyObject) {
    if(bodyObject != null && bodyObject.length != 0){
        var result = [];
        if(bodyObject.count > 0){
            var body = bodyObject.data;
            for(var i = 0; i < body.length; i++){
                var ob={};
                try{
                    ob.createTime = body[i].createTime;
                    ob.creatorName = body[i].creatorName;
                    ob.meetingId = body[i].meetingId;
                    ob.meetingType = body[i].meetingType;
                    ob.phoneId = body[i].phoneId;
                    ob.topic = body[i].topic;
                    ob.hasMeetingPwd = body[i].hasMeetingPwd;
                    ob.meetingHost = body[i].meetingHost;
                    ob.expectEndtime = body[i].expectEndtime;
                    result.push(ob);
                }catch(e){
                    Log.error("[GetNowMeetings] error:" + "-3 at parseContentBody():" + ConstConfig.PARAM_3);
                    //console.log("error",-3, e.message + " at parseContentBody() in GetNowMeetings.js");
                    return -3;
                }
            }
        }
        return result;
    }
};

GetNowMeetings.prototype.combineResponse = function(firstResponse,secondResponse) {
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

    return allObj;
};

GetNowMeetings.prototype.getParser = function() {
    return new MeetingManageParser();
};

util.inherits(GetNowMeetings, AbstractBusinessData);

module.exports = GetNowMeetings;

});
