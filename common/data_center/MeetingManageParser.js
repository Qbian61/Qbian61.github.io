define(function(require, exports, module) {
'use strict';

const util = require('./util');
const Parser = require("./Parser.js");

var MeetingManageParser = function() {
    Parser.call(this);

    this.rc = -1;
    this.rd = "";
    this.body = null;
};

MeetingManageParser.prototype.getHeaderValue = function() {
    //throw exception
    return this.rc;
}

MeetingManageParser.prototype.getHeaderText = function() {
    //throw exception
    return this.rd;
}

MeetingManageParser.prototype.getBody = function() {
    //throw exception
    return this.body;//JSONObject
}

/************返回信息说明*************
* content 为服务器返回的完整信息，包括result和response，格式如下：
* {
    "result":{"rc":0,"rd":"返回码描述"},
    "response":{"meetingId":123,"adminPhoneId":"xxxxx",……}
  }
*************************************/
MeetingManageParser.prototype.parse = function(content) {
    //throw exception
    try {
        var joContent = JSON.parse(content);
        this.body = joContent.response;
        this.rc = joContent.result.rc;
        this.rd = joContent.result.rd;
    } catch (e) {
        console.log(e);
    }
}

MeetingManageParser.prototype.isOk = function() {
    //throw exception
    return this.rc == 0;
}

util.inherits(MeetingManageParser, Parser);

module.exports = MeetingManageParser;
});
