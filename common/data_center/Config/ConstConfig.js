define(function(require, exports, module) {

/**
 * Created by Cyril on 2016/5/21.
 */
var ConstConfig = function() {
};

/*
 * 服务器地址
 * */
// nps 地址 大网
//ConstConfig.npsWebDomain = "103.25.23.99";
////// 串号
// ConstConfig.serelizednumber = "GDDXX1144500045";
// ConstConfig.deviceType = "Mobile";



//ConstConfig.npsWebDomain = "http://114.112.74.8:8088";
// 串号
//ConstConfig.serelizednumber = "GDDXX2111111111";
//ConstConfig.deviceType = "PCJustmeeting";


//ConstConfig.npsWebDomain = "http://210.51.168.101:8088";

//main.js所在的主进程获取输入参数，如果为relase版本则Nps地址设置为大网；
//如果为非release版本，则nps设置为测试网



// TODO
// var releaseVersion = require('electron').remote.getGlobal("releaseVersion");

if (false) {
    ConstConfig.npsWebDomain = "http://xmeeting.butel.com";
    ConstConfig.slaveNpsWebDomain  ="http://xmeeting.jihuiyi.cn"
} else {
    ConstConfig.npsWebDomain  ="http://222.73.29.12:8018/";
    ConstConfig.slaveNpsWebDomain  ="http://114.112.74.14:8018/"
}

// 医疗

//ConstConfig.deviceType="MobileHvs4";
//ConstConfig.serelizednumber="GDD111111111145";

//ConstConfig.npsWebDomain = "http://114.112.74.8:8088";
//// 串号
ConstConfig.serelizednumber = "GDDXX2111111111";
ConstConfig.deviceType = "PCJustmeeting";
ConstConfig.masterBmsWebDomain = "";
ConstConfig.personalContactWebDomain = "";
ConstConfig.enterPriseUserCenterWebDomain = "";
ConstConfig.personalUserCenterWebDomain = "";
ConstConfig.favoriteWebDomain = "";
ConstConfig.cdnWebDomain = "";

ConstConfig.masterAppUpdateServerWebDomain = "";
ConstConfig.slaveAppUpdateServerWebDomain = "";
ConstConfig.uploadImgWebDomain = "";
ConstConfig.favoriteWebDomain = "";
ConstConfig.cdnWebDomain = "";
/*ConstConfig.masterBmsWebDomain = "103.25.23.103:10016/";
ConstConfig.personalContactWebDomain = "103.25.23.99/";
ConstConfig.enterPriseUserCenterWebDomain = "103.25.23.99/";
ConstConfig.personalUserCenterWebDomain = /!*"219.142.74.32:81/"*!/"103.25.23.99/";
ConstConfig.npsWebDomain = "xmeeting.butel.com";
ConstConfig.masterAppUpdateServerWebDomain = /!*"222.73.29.12:21002/"*!/"114.112.74.14:8984/";
ConstConfig.uploadImgWebDomain = "210.51.168.105/";*/

/*
* 常量参数列表,为了跟下面的变量名做区分，命名规则为"PARAM_XXX_VALUE"，表示变量值
* */
ConstConfig.PARAM_MEETINGTYPE_VALUE = 2;//会议类型，1为即时会议，2为预约会议
ConstConfig.PARAM_APPTYPE_VALUE = "BUTELPC"; //产品类型，可以为"JIHY"、"KESHI_JIHY"或"HVS"
ConstConfig.PARAM_PRODUCTID_VALUE = "prod002";

//收藏相关类型值
ConstConfig.PARAM_IMAGE_TYPEVALUE = 2;
ConstConfig.PARAM_VIDEO_TYPEVALUE = 3;
ConstConfig.PARAM_AUDIO_TYPEVALUE = 7;
ConstConfig.PARAM_TEXT_TYPEVALUE = 8;
ConstConfig.PARAM_LINKTXT_TYPEVALUE = 20;
ConstConfig.PARAM_FILE_TYPEVALUE = 21;


/*
* URL参数名称
* */
ConstConfig.PARAM_NUBENUMBER = "nubeNumber";
ConstConfig.PARAM_IMEI = "imei";
ConstConfig.NUM = "num";
ConstConfig.PARAM_SERVICE = "service";
ConstConfig.PARAM_PHONEID = "phoneId";
ConstConfig.PARAM_TOKEN = "token";
ConstConfig.PARAM_TOPIC = "topic";
ConstConfig.PARAM_APP = "app";
ConstConfig.PARAM_NAME = "name";
ConstConfig.PARAM_EFFECTIVETIME = "effectiveTime";
ConstConfig.PARAM_PARAMS = "params";
ConstConfig.PARAM_INVOTEDUSERS = "invotedUsers";
ConstConfig.PARAM_INVOTEDPHONES = "invotedPhones";
ConstConfig.PARAM_MEETINGID = "meetingId";
ConstConfig.PARAM_MEETINGTYPE = "meetingType";
ConstConfig.PARAM_MEETINGTIME = "beginDateTime";
ConstConfig.PARAM_ENDDATETIME = "endDateTime";
ConstConfig.PARAM_EFFECTIVEHOUR = "effectiveHour";
ConstConfig.PARAM_FEEDBACK = "feedbackText";
ConstConfig.PARAM_USERCONTACT = "userContact";
ConstConfig.PARAM_FILEDATA = "fileData";
ConstConfig.PARAM_DATA = "data";
ConstConfig.PARAM_COUNT = "count";
ConstConfig.PARAM_CREATORNAME = "creatorName";
ConstConfig.PARAM_CREATETIME = "createTime";
ConstConfig.PARAM_DATETIME = "datetime";
ConstConfig.PARAM_CONTACTINFO = "contactInfo";
ConstConfig.PARAM_EXPECTSTARTTIME = "expectStarttime";
ConstConfig.PARAM_PRODUCT = "product";
ConstConfig.PARAM_VERSION = "version";
ConstConfig.PARAM_TERMINAL = "terminal";
ConstConfig.PARAM_PROJECT = "project";
ConstConfig.PARAM_UTCTIME = "utctime";
ConstConfig.PARAM_ADMINPHONEID = "adminPhoneId";
ConstConfig.PARAM_INVITERPHONEID = "inviterPhoneId";
ConstConfig.PARAM_INVITERNAME = "inviterName";
ConstConfig.PARAM_TERMINALTYPE = "terminalType";
ConstConfig.PARAM_PHONENUMBER = "phoneNumber";
ConstConfig.PARAM_MESSAGE = "message";
ConstConfig.PARAM_DEVICETYPE = "deviceType";
ConstConfig.PARAM_DEVMODEL = "devModel";
ConstConfig.PARAM_REQUESTPARAM = "requestParam";
ConstConfig.PARAM_SERIALNUMBER = "serialNumber";
ConstConfig.URLFLAG = "urlFlg";
ConstConfig.ALLOWEDRECOMMEND = "allowedRecommend";
ConstConfig.TOKEN = "token";
ConstConfig.TRADEIDS = "tradeIds";
ConstConfig.EFFECTIVE_TIME = "effectiveTime";
ConstConfig.NAME = "name";
ConstConfig.PHONE_ID = "phoneId";
ConstConfig.PAIDTYPE = "paidType";
ConstConfig.USER_INFO = "userInfo";
ConstConfig.NICK_NAME = "nickname";
ConstConfig.NICK_NAME_ = "nickName";
ConstConfig.USE_ENDTIME = "useEndTime";
ConstConfig.NUBENUMBER = "nubeNumber";
ConstConfig.UID = "uids";
ConstConfig.OLDPASSWORD = "oldPassword";
ConstConfig.NEWPASSWORD = "newPassword";
ConstConfig.VERIFICATIONCODE = "verificationCode";
ConstConfig.SERVICETYPE = "serviceType";
ConstConfig.USESTARTTIME = "useStartTime";
ConstConfig.HEADURL = "headUrl";
ConstConfig.MOBILE = "mobile";
ConstConfig.NUBE = "nube";
ConstConfig.ACCESS_TOKEN = "accessToken";
ConstConfig.RESULT = "result";
ConstConfig.RESPONSE = "response";
ConstConfig.RC = "rc";
ConstConfig.RD = "rd";
ConstConfig.MEETING_ID = "meetingId";
ConstConfig.ADMIN_PHONE_ID = "adminPhoneId";
ConstConfig.MOBILENOS = "mobileNos";
ConstConfig.STARTLINENO = "startLineNo";
ConstConfig.MAXNUM = "maxNum";
ConstConfig.TIMESTAMP = "timestamp";
ConstConfig.HASDELETE = "hasDelete";
ConstConfig.CONTACTS = "contacts";
ConstConfig.ACCOUNT = "account";
ConstConfig.PASSWORD = "password";
ConstConfig.ACTIVATECODE = "activateCode";
ConstConfig.APPTYPE = "appType";
ConstConfig.PRODUCTID = "productId";
ConstConfig.DYNAMICURL = "dynamicUrl";
ConstConfig.ACCOUNTS = "accounts";
ConstConfig.ERROR_CODE_INVALIDATE_PARAM = -1;
ConstConfig.USERTYPE = "userType";
ConstConfig.FIRSTLOGINTIME = "firstLoginTime";
ConstConfig.GENDER = "gender";
ConstConfig.ALLOWEDQUERY = "allowedQuery";
ConstConfig.BLOCKSTRANGECALL = "blockStrangeCall";
ConstConfig.SECURITYNUMBER = "securityNumber";
ConstConfig.REALNAME = "realName";
ConstConfig.MAIL = "mail";
ConstConfig.PHONE = "phone";

/*
 * URL部分路径名称
 * */
ConstConfig.HTTP_SCHEMA = "http://";
ConstConfig.bmsWebDomainSuffix = "MeetingManage/callService";
ConstConfig.upgradeServiceSuffix = "UpgradeService/callService";

// 备用服务器
// app version check address
ConstConfig.slaveAppUpdateServerWebDomain = null;
// meeting manage server address
ConstConfig.slaveBmsWebDomain = null;

/*
* service名称
* */
ConstConfig.PARAM_GETNOWMEETINGS = "service=GetNowMeetings&params=";
ConstConfig.PARAM_USERCNTER_DOWNLOADCONTACTDATA = "service=downloadContactsData&params=";
ConstConfig.PARAM_USERCNTER_UPLOADCONTACTDATA = "service=uploadContactsData&params=";
ConstConfig.PARAM_LOGIN4MOBILE = "service=Login4Mobile&params=";
ConstConfig.PARAM_CREATEMEETING = "service=CreateMeeting&params=";
ConstConfig.PARAM_SEARCHACCOUNT = "service=searchAccount&params=";
ConstConfig.PARAM_BINDTOKEN = "service=BindToken&params=";
ConstConfig.PARAM_GETMEETINGINFO = "service=GetMeetingInfo&params=";
ConstConfig.PARAM_MODIFYATTENDMEETINGNAME = "service=setAccountAttr&params=";
ConstConfig.PARAM_MEETINGMANAGE_STOREFEEDBACKTEXT = "service=StoreFeedbackText&params=";
ConstConfig.PARAM_USERCNTER_ACTIVATEACCOUNT = "service=activateAccount&params=";
ConstConfig.PARAM_USERCNTER_CHANGEPASSWORD = "service=changePassword&params=";
ConstConfig.PARAM_USERCNTER_CHANGEPASSWORDBYOLDPWD = "service=changePasswordByOldPwd&params=";
ConstConfig.PARAM_USERCNTER_GETNUBENUMBERLIST = "service=getNubeNumberList&params=";
ConstConfig.PARAM_SENDSMS = "service=SendSMS&params=";
ConstConfig.PARAM_USERCNTER_RESENDACTVIATECODE = "service=reSendActivateCode&params=";
ConstConfig.PARAM_USERCNTER_SENDCODEFORRESETPWD = "service=sendCodeForResetPwd&params=";
ConstConfig.PARAM_USERCNTER_RESETPASSWORD = "service=resetPassword&params=";
ConstConfig.PARAM_VERIFYTOKEN = "service=verifyToken&accessToken=";
ConstConfig.PARAM_AUTHORIZE = "service=authorize&params=";
ConstConfig.PARAM_USERCNTER_REGISTERACCOUNT = "service=registerAccount&params=";
ConstConfig.PARAM_MODIFYMEETINGINVITERS = "service=ModifyMeetingInviters&params=";
ConstConfig.PARAM_CLIENTREPORT = "service=ClientReportInfo&params=";
ConstConfig.PARAM_GET_TERMINAL_INFO_ = "service=GetTerminalInf&params=";
ConstConfig.PARAM_CHECK_APP_VERSION = "service=CheckVersion&params=";
ConstConfig.PARAM_GETMEETINGINVITATIONSMS = "service=GetMeetingInvitationSMS&params=";
ConstConfig.PARAM_SEARCHACCOUNTBYMOBILE = "service=searchAccountByMobile&params=";
ConstConfig.PARAM_MEETING_PWD = "service=GetMeetingPwd&params=";
ConstConfig.PARAM_MEETING_RESET_PWD = "service=ResetMeetingPwd&params=";
ConstConfig.PARAM_CHECK_MEETING_PWD = "service=CheckMeetingPwd&params=";
ConstConfig.PARAM_CHECK_MEETING_HAS_PWD = "service=CheckHasMeetingPwd&params=";
ConstConfig.PARAM_ADD_COLLECT = "service=addItem&";
ConstConfig.PARAM_DELETE_COLLECT = "service=deleteItem&";
ConstConfig.PARAM_GET_COLLECT_LIST = "service=getItems&";

ConstConfig.PARAM_GET_VIDEO_LIST = "service=QueryMeetingFile&params=";
ConstConfig.PARAM_QUERY_VIDEO_RECORD_INFO = "service=QueryMeetingFile&params=";
ConstConfig.PARAM_DELETE_VIDEO_RECORD = "service=DeleteMeetingFile&params=";
ConstConfig.PARAM_GET_VIDEO_URL = "service=GetMeetingFileUrl&params=";

/*
 * 设定请求超时时间
 * */
ConstConfig.TIME_OUT = 10000;

/*
* http返回码描述
* */
ConstConfig.PARAM_200 = "OK";
ConstConfig.PARAM_400 = "Bad Request";
ConstConfig.PARAM_404 = "Not Found";
ConstConfig.PARAM_408 = "Request Time-out";
ConstConfig.PARAM_500 = "Internal Server Error";
ConstConfig.PARAM_501 = "Not Implemented";
ConstConfig.PARAM_502 = "Bad Gateway";
ConstConfig.PARAM_503 = "Service Unavailable";

/*
 * 程序运行返回码列表，具体返回码请参阅文档
 * */
ConstConfig.PARAM_1 = "无效的操作，当前操作正在执行";
ConstConfig.PARAM_2 = "无效的编码";
ConstConfig.PARAM_3 = "json操作异常";
ConstConfig.PARAM_4 = "接口服务器地址不合法";
ConstConfig.PARAM_5 = "输入参数不合法";
ConstConfig.PARAM_11 = "请求错误";
ConstConfig.PARAM_12 = "重复请求";
ConstConfig.PARAM_13 = "文件夹创建失败";
ConstConfig.PARAM_14 = "下载响应错误";
ConstConfig.PARAM_15 = "上传失败";
ConstConfig.PARAM_16 = "未指定文件名";
ConstConfig.PARAM_17 = "未指定文件路径";
ConstConfig.PARAM_18 = "下载过程中出现异常";
ConstConfig.PARAM_19 = "请求超时";
ConstConfig.PARAM_20 = "文件不存在";

/*
* 设置与获取各服务器地址
* */
ConstConfig.getSearchAccountByMobile = function() {
    return ConstConfig.getSearchAccountByMobileUrl();
}
ConstConfig.setUploadImgWebDomain = function(uploadImgWebDomain) {
    ConstConfig.uploadImgWebDomain = uploadImgWebDomain;
};
ConstConfig.getUploadImgWebDomain = function() {
    return ConstConfig.uploadImgWebDomain;
};
ConstConfig.setMasterBmsWebDomain = function(masterBmsWebDomain) {
    ConstConfig.masterBmsWebDomain = masterBmsWebDomain;
};

ConstConfig.getMasterBmsWebDomain = function() {
    return ConstConfig.masterBmsWebDomain;
};
ConstConfig.getSlaveBmsWebDomain = function() {
    return ConstConfig.slaveBmsWebDomain;
};
ConstConfig.setSlaveBmsWebDomain = function(slaveBmsWebDomain) {
    ConstConfig.slaveBmsWebDomain = slaveBmsWebDomain;
};
ConstConfig.setSlaveAppUpdateServerWebDomain = function(slaveAppUpdateServerWebDomain) {
    ConstConfig.slaveAppUpdateServerWebDomain = slaveAppUpdateServerWebDomain;
};
ConstConfig.setNpsWebDomain = function(npsWebDomain) {
    ConstConfig.npsWebDomain = npsWebDomain;
};
ConstConfig.getNpsWebDomain = function() {
    return ConstConfig.npsWebDomain;
};
ConstConfig.setPersonalContactWebDomain = function(personalContactWebDomain) {
    ConstConfig.personalContactWebDomain = personalContactWebDomain;
};
ConstConfig.getPersonalContactWebDomain = function() {
    return ConstConfig.personalContactWebDomain;
};
ConstConfig.setEnterPriseUserCenterWebDomain = function(enterPriseUserCenterWebDomain) {
    ConstConfig.enterPriseUserCenterWebDomain = enterPriseUserCenterWebDomain;
};
ConstConfig.getEnterPriseUserCenterWebDomain = function() {
    return ConstConfig.enterPriseUserCenterWebDomain;
};
ConstConfig.setPersonalUserCenterWebDomain = function(personalUserCenterWebDomain) {
    ConstConfig.personalUserCenterWebDomain = personalUserCenterWebDomain;
};
ConstConfig.getPersonalUserCenterWebDomain = function() {
    return ConstConfig.personalUserCenterWebDomain;
};
ConstConfig.setMasterAppUpdateServerWebDomain = function(masterAppUpdateServerWebDomain) {
    ConstConfig.masterAppUpdateServerWebDomain = masterAppUpdateServerWebDomain;
};

ConstConfig.setSlaveAppUpdateServerWebDomain = function (slaveAppUpdateServerWebDomain) {
    ConstConfig.slaveAppUpdateServerWebDomain = slaveAppUpdateServerWebDomain;
};

ConstConfig.getMasterAppUpdateServerWebDomain = function() {
    return ConstConfig.masterAppUpdateServerWebDomain;
};
ConstConfig.setFavoriteWebDomain = function(favoriteWebDomain) {
    return  ConstConfig.favoriteWebDomain =favoriteWebDomain;
};

ConstConfig.getFavoriteWebDomain = function() {
    return  ConstConfig.favoriteWebDomain;
};
ConstConfig.setCdnWebDomain = function (cdnWebDomain) {
    return ConstConfig.cdnWebDomain = cdnWebDomain;
};
ConstConfig.getCdnWebDomain = function () {
    return ConstConfig.cdnWebDomain;
};

/*
* 拼装URL完整地址
* */
ConstConfig.getSearchAccountByMobileUrl = function() {
    return ConstConfig.getEnterpriseUserCenterHttpUrlPrefix() + "EnterpriseUserCenter/eucService";
}

ConstConfig.getUploadUrl = function() {
    return ConstConfig.getUploadImgWebDomainPrefix() + "dfs_upload/NubePhotoUpload";
};

ConstConfig.getEditMeetingUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getGetTerminalInfoUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getBindOnAccountUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getmodifyMeetingInvitersUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getRegisterAccount = function() {
    return ConstConfig.getRegisterAccountUrl();
};

ConstConfig.getRegisterAccountUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getAuthorizeUrl = function() {
    return ConstConfig.getAuthorizeUrlPrefix() + "BaikuUserCenterV2/auth";
};

ConstConfig.getVerifyTokenUrl = function() {
    return ConstConfig.getAuthorizeUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getAuthorizeUrl = function() {
    return ConstConfig.getAuthorizeUrlPrefix() + "BaikuUserCenterV2/auth";
};

ConstConfig.getResetPassword = function() {
    return ConstConfig.getResetPasswordUrl();
};

ConstConfig.getResetPasswordUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getSendCodeForResetPwd = function() {
    return ConstConfig.getSendCodeForResetPwdUrl();
};

ConstConfig.getSendCodeForResetPwdUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getReSendActivateCode = function() {
    return ConstConfig.getReSendActivateCodeUrl();
};

ConstConfig.getReSendActivateCodeUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getCreateMeetingUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getGetNubeNumberList = function() {
    return ConstConfig.getGetNubeNumberListUrl();
};

ConstConfig.getGetNubeNumberListUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getActivateAccountUrl = function() {
    return ConstConfig.getUserUserCenterHttpUrlPrefix() + "BaikuUserCenterV2/passportService";
};

ConstConfig.getSuggestionUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getSetAccountAttr = function() {
    return ConstConfig.getSetAccountAttrUrl();
};

ConstConfig.getSetAccountAttrUrl = function() {
    return ConstConfig.getEnterpriseUserCenterHttpUrlPrefix() + "EnterpriseUserCenter/eucService";
};

ConstConfig.getMeetingInfomationUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getBindTokenUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getSearchAccount = function() {
    return ConstConfig.getSearchAccountUrl();
};

ConstConfig.getSearchAccountUrl = function() {
    return ConstConfig.getEnterpriseUserCenterHttpUrlPrefix() + "EnterpriseUserCenter/eucService";
};

ConstConfig.getCreateMeetingUrl = function() {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getMeetingManageUrl = function() {
    return ConstConfig.getMeetingManagementHttpUrlPrefix() + ConstConfig.bmsWebDomainSuffix;
};

ConstConfig.getLogin4Mobile = function() {
    return ConstConfig.getLogin4MobileUrl();
};

ConstConfig.getLogin4MobileUrl = function() {
    return ConstConfig.getEnterpriseUserCenterHttpUrlPrefix() + "EnterpriseUserCenter/eucService";
};

ConstConfig.getDownloadContactsData = function() {
    return ConstConfig.getDownloadContactsDataUrl();
};

ConstConfig.getDownloadContactsDataUrl = function() {
    return ConstConfig.getContactsDataHttpUrlPrefix() + "BaikuContactsV2/contactService";
};

ConstConfig.getUploadContactsData = function() {
    return ConstConfig.getUploadContactsDataUrl();
};

ConstConfig.getUploadContactsDataUrl = function() {
    return ConstConfig.getContactsDataHttpUrlPrefix() + "BaikuContactsV2/contactService";
};

ConstConfig.getGetMeetingsUrl = function () {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getGetNowMeetingsUrl = function () {
    return ConstConfig.getMeetingManageUrl();
};

ConstConfig.getCDNAuthorizeUrl = function (){
    return ConstConfig.getCdnUrlPrefix() + "webapi/account/authorize";
};

ConstConfig.getCDNSystemParamUrl = function(){
    return ConstConfig.getCdnUrlPrefix() + "webapi/config/getfileconfig?"
};
//会议密码相关接口请求地址
ConstConfig.getMeetingPwdUrl = function(){
    return ConstConfig.getMeetingManagementHttpUrlPrefix() + ConstConfig.bmsWebDomainSuffix;
};

//收藏相关接口请求地址
ConstConfig.getFavoriteUrl = function () {
    return ConstConfig.getFavoriteUrlPrefix() + "messageV2/favoriteapi?";
}
;


/*
* 获取URL的服务器地址部分
* */
ConstConfig.getFavoriteUrlPrefix = function(){
    if (ConstConfig.favoriteWebDomain != null && !(ConstConfig.favoriteWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.favoriteWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.favoriteWebDomain;
    }
    if (ConstConfig.favoriteWebDomain != null && !ConstConfig.favoriteWebDomain.endsWith("/")) {
        ConstConfig.favoriteWebDomain = ConstConfig.favoriteWebDomain + "/";
    }
    return ConstConfig.favoriteWebDomain;
};
ConstConfig.getCdnUrlPrefix = function(){
    if (ConstConfig.cdnWebDomain != null && !(ConstConfig.cdnWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.cdnWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.cdnWebDomain;
    }
    if (ConstConfig.cdnWebDomain != null && !ConstConfig.cdnWebDomain.endsWith("/")) {
        ConstConfig.cdnWebDomain = ConstConfig.cdnWebDomain + "/";
    }
    return ConstConfig.cdnWebDomain;
};
ConstConfig.getUploadImgWebDomainPrefix = function() {
    if (ConstConfig.uploadImgWebDomain != null && !(ConstConfig.uploadImgWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.uploadImgWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.uploadImgWebDomain;
    }
    if (ConstConfig.uploadImgWebDomain != null && !ConstConfig.uploadImgWebDomain.endsWith("/")) {
        ConstConfig.uploadImgWebDomain = ConstConfig.uploadImgWebDomain + "/";
    }
    return ConstConfig.uploadImgWebDomain;
};

ConstConfig.getVerifyTokenUrlPrefix = function() {
    if (ConstConfig.personalUserCenterWebDomain != null && !(ConstConfig.personalUserCenterWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.personalUserCenterWebDomain;
    }
    if (ConstConfig.personalUserCenterWebDomain != null && !ConstConfig.personalUserCenterWebDomain.endsWith("/")) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.personalUserCenterWebDomain + "/";
    }
    return ConstConfig.personalUserCenterWebDomain;
};

ConstConfig.getAuthorizeUrlPrefix = function() {
    if (ConstConfig.personalUserCenterWebDomain != null && !(ConstConfig.personalUserCenterWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.personalUserCenterWebDomain;
    }
    if (ConstConfig.personalUserCenterWebDomain != null && !ConstConfig.personalUserCenterWebDomain.endsWith("/")) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.personalUserCenterWebDomain + "/";
    }
    return ConstConfig.personalUserCenterWebDomain;
};

ConstConfig.getVerifyTokenUrlPrefix = function() {
    if (ConstConfig.personalUserCenterWebDomain != null && !(ConstConfig.personalUserCenterWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.personalUserCenterWebDomain;
    }
    if (ConstConfig.personalUserCenterWebDomain != null && !ConstConfig.personalUserCenterWebDomain.endsWith("/")) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.personalUserCenterWebDomain + "/";
    }
    return ConstConfig.personalUserCenterWebDomain;
};

ConstConfig.getAppUpdateUrl = function() {
    if (ConstConfig.masterAppUpdateServerWebDomain != null && !(ConstConfig.masterAppUpdateServerWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.masterAppUpdateServerWebDomain = ConstConfig.HTTP_SCHEMA  + ConstConfig.masterAppUpdateServerWebDomain;
    }
    if (ConstConfig.masterAppUpdateServerWebDomain != null && !ConstConfig.masterAppUpdateServerWebDomain.endsWith("/")) {
        ConstConfig.masterAppUpdateServerWebDomain = ConstConfig.masterAppUpdateServerWebDomain + "/";
    }
    return ConstConfig.masterAppUpdateServerWebDomain + ConstConfig.upgradeServiceSuffix;
};

ConstConfig.getSlaveAppUpdateUrl = function () {
    if (ConstConfig.slaveAppUpdateServerWebDomain != null && !(ConstConfig.slaveAppUpdateServerWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.slaveAppUpdateServerWebDomain = ConstConfig.HTTP_SCHEMA  + ConstConfig.slaveAppUpdateServerWebDomain;
    }
    if (ConstConfig.slaveAppUpdateServerWebDomain != null && !ConstConfig.slaveAppUpdateServerWebDomain.endsWith("/")) {
        ConstConfig.slaveAppUpdateServerWebDomain = ConstConfig.slaveAppUpdateServerWebDomain + "/";
    }
    return ConstConfig.slaveAppUpdateServerWebDomain + ConstConfig.upgradeServiceSuffix;
};

ConstConfig.getNpsUrl = function() {
    if (ConstConfig.npsWebDomain != null && !(ConstConfig.npsWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.npsWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.npsWebDomain;
    }
    if (ConstConfig.npsWebDomain != null && !ConstConfig.npsWebDomain.endsWith("/")) {
        ConstConfig.npsWebDomain = ConstConfig.npsWebDomain + "/";
    }
    return ConstConfig.npsWebDomain;
};

ConstConfig.getSlaveNpsUrl = function () {

    if(ConstConfig.slaveNpsWebDomain == undefined || ConstConfig.slaveNpsWebDomain == "" || ConstConfig.slaveNpsWebDomain.length == 0){
        return "";
    }

    if (ConstConfig.slaveNpsWebDomain != null && !(ConstConfig.slaveNpsWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.slaveNpsWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.slaveNpsWebDomain;
    }
    if (ConstConfig.slaveNpsWebDomain != null && !ConstConfig.slaveNpsWebDomain.endsWith("/")) {
        ConstConfig.slaveNpsWebDomain = ConstConfig.slaveNpsWebDomain + "/";
    }
    return ConstConfig.slaveNpsWebDomain;
};

ConstConfig.getMeetingManagementHttpUrlPrefix = function() {
    if (ConstConfig.masterBmsWebDomain != null && !(ConstConfig.masterBmsWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.masterBmsWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.masterBmsWebDomain;
    }
    if (ConstConfig.masterBmsWebDomain != null && !ConstConfig.masterBmsWebDomain.endsWith("/")) {
        ConstConfig.masterBmsWebDomain = ConstConfig.masterBmsWebDomain + "/";
    }
    return ConstConfig.masterBmsWebDomain;
};

ConstConfig.getContactsDataHttpUrlPrefix = function() {
    if (ConstConfig.personalContactWebDomain != null && !(ConstConfig.personalContactWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.personalContactWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.personalContactWebDomain;
    }
    if (ConstConfig.personalContactWebDomain != null && !ConstConfig.personalContactWebDomain.endsWith("/")) {
        ConstConfig.personalContactWebDomain = ConstConfig.personalContactWebDomain + "/";
    }
    return ConstConfig.personalContactWebDomain;
};

ConstConfig.getEnterpriseUserCenterHttpUrlPrefix = function() {
    if (ConstConfig.enterPriseUserCenterWebDomain != null && !(ConstConfig.enterPriseUserCenterWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.enterPriseUserCenterWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.enterPriseUserCenterWebDomain;
    }
    if (ConstConfig.enterPriseUserCenterWebDomain != null && !ConstConfig.enterPriseUserCenterWebDomain.endsWith("/")) {
        ConstConfig.enterPriseUserCenterWebDomain = ConstConfig.enterPriseUserCenterWebDomain + "/";
    }
    return ConstConfig.enterPriseUserCenterWebDomain;
};

ConstConfig.getUserUserCenterHttpUrlPrefix = function() {
    if (ConstConfig.personalUserCenterWebDomain != null && !(ConstConfig.personalUserCenterWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.personalUserCenterWebDomain;
    }
    if (ConstConfig.personalUserCenterWebDomain != null && !ConstConfig.personalUserCenterWebDomain.endsWith("/")) {
        ConstConfig.personalUserCenterWebDomain = ConstConfig.personalUserCenterWebDomain + "/";
    }
    return ConstConfig.personalUserCenterWebDomain;
};

ConstConfig.getSlaveMeetingManagementHttpUrlPrefix = function() {
    if (ConstConfig.slaveBmsWebDomain != null && !(ConstConfig.slaveBmsWebDomain.toLowerCase().indexOf(ConstConfig.HTTP_SCHEMA) > -1)) {
        ConstConfig.slaveBmsWebDomain = ConstConfig.HTTP_SCHEMA + ConstConfig.slaveBmsWebDomain;
    }
    if (ConstConfig.slaveBmsWebDomain != null && !ConstConfig.slaveBmsWebDomain.endsWith("/")) {
        ConstConfig.slaveBmsWebDomain = ConstConfig.slaveBmsWebDomain + "/";
    }
    return ConstConfig.slaveBmsWebDomain;
}

ConstConfig.endsWith = function(suffix){
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

module.exports = ConstConfig;


});
