/**
 * Created by admin on 2016/5/21.
 */
angular.module('justMeeting.MeetingList',['ngRoute','loginInfo','dateFilter','meetingListFilter','utilsService','dateFilter'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/MeetingList', {
            templateUrl: 'src/view_controllers/meeting/MeetingList.html',
            controller: 'MeetingList'
        });
    }])
    .controller('MeetingList',['$scope','$location','$rootScope','accountInfo','contactManagerSerice','connect','invite','CustomLog','$timeout','locals','anchorScroll',function($scope,$location,$rootScope,accountInfo,contactManagerSerice,connect,invite,CustomLog,$timeout,locals,anchorScroll){
        // 初始化btn的样式
        // 召开
        $scope.callClass='btn_ljzk';
        $scope.appointbtn = 'input_btn';
        $scope.finishInvite ='btn btnComplete';
      //  $scope.joinbtnclass="search_btn dis"
        const  GetNowMeetings  = require("./src/data_center/MeetingManage/GetNowMeetings.js");
        const GetMeetingInvitationSMS = require('./src/data_center/MeetingManage/GetMeetingInvitationSMS');
        var  getMeetingInvitationSMS = new  GetMeetingInvitationSMS();
        var getMeetingInvitationCopyLink = new GetMeetingInvitationSMS();

        var selectedContacts = new Array();
        var  ischeckAll = false;
        var appointInfo = {};
        appointInfo.meetingID = "";
        appointInfo.topic ="";
        appointInfo.beginDate = "";
        appointInfo.endDate = "";
        appointInfo.time ="";
        appointInfo.creatorName ="";
        appointInfo.meetingPWD = "";
        $scope.contactLetter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"];
        $scope.appointInfo = appointInfo;


        $scope.isshowMask = false;
        $scope.isshowInvite = false;
        $scope.isshowDetail = false;
        $scope.isshowjoinmeeting = false;
        $scope.hideLoading = false;
        $scope.hideMeetingList = true;
        $scope.hideNoMeeting = true;
        $scope.isshowCheckMeetingPwd = false;
        $scope.ishowHostDetail = true;
        $scope.showMeetingPwdError = false;
        $rootScope.isShowJoinBtn = false;
        $scope.isShowNoDataSelect = false;
        $scope.isShowNoDataAllSelect = true;

        function getMeetingList(){
            var getNowMeetings = new  GetNowMeetings();
            var result = getNowMeetings.getNowMeetings(accountInfo.accountInfo.accessToken);
            CustomLog.i('获取会议列表同步返回结果 '+result);
            if (result < 0){
                CustomLog.i('获取会议列表同步失败返回结果 '+result);
                return;
            }
            getNowMeetings.on("success",function(meetingList){
                CustomLog.i('获取会议列表成功 '+meetingList);
                if(meetingList.length == 0 || meetingList == null|| meetingList==undefined){
                    $scope.hideMeetingList = true;
                    $scope.hideNoMeeting = false;
                    CustomLog.i('获取会议列表为空'+meetingList.length);
                } else {
                    $scope.meetings = meetingList;
                    $scope.hideMeetingList = false;
                    $scope.hideNoMeeting = true;
                }
                $scope.hideLoading = true;
                $scope.$apply();
            });
            getNowMeetings.on("error",function(error,errorDesciption){
                $scope.hideLoading = true;
                $scope.hideMeetingList = true;
                $scope.hideNoMeeting = false;
                $scope.$apply();
                CustomLog.i('获取会议列表失败结果 '+error+ ' '+errorDesciption);
                console.log("----------"+error,errorDesciption);
                if(error == -11){
                    showAlertf('网络不给力，请检查网络');
                    $scope.$apply();
                }
            });
        }
       getMeetingList();
        $scope.showMask = false;
        //隐藏或显示参会人，输入密码进入会议
        /*$scope.hideAddmeetingPassword = false;
        $scope.isshowMask = true;*/
        $scope.closePasswordWindow = function(){
            $scope.isshowCheckMeetingPwd = false;
            $scope.isshowMask = false;
            $scope.joinMeetingPwd = '';
        };
        //判断日期是否合法
        $scope.undefineDate = function () {
            if(!$scope.beginDate){
                CustomLog.d('开始时间不合法');
                $scope.beginDate = $scope.mindate;

            }if(!$scope.endDate){
                CustomLog.d('开始时间不合法');
                $scope.endDate = $scope.beginDate;
            }
        }

        // 显示预约会议弹框
        $scope.showAppointMeeting = function(){
            var mdate = new  Date();
          //  var  str = ''+mdate.getFullYear()+'-0'+(mdate.getMonth()+1)+'-0'+mdate.getDate();
            var  m = '';
            if (mdate.getMonth() < 10){
                m = '0'+(mdate.getMonth()+1);
            }else{
                m = (mdate.getMonth()+1);
            }
            var  d = '';
            if (mdate.getDate()<10){

                d = '0'+mdate.getDate();
            }else{
                d = mdate.getDate();
            }
            var  str = ''+mdate.getFullYear()+'-'+m+'-'+d;
            $scope.mindate = mdate;
            CustomLog.i('mindate:'+ $scope.mindate);
            $scope.beginDate = new  Date();
            $scope.topic = accountInfo.getAccountInfo().nickname+'的预约会议';
            var  curren = new  Date();

             var tvalue = document.getElementById('appointTImer');
            if(curren.getHours()== 23){
                tvalue.value ='00'+':'+(parseInt(curren.getMinutes()/10)*10>=10?parseInt(curren.getMinutes()/10)*10:'0'+(parseInt(curren.getMinutes()/10)*10));

                var ndate = new  Date();
                ndate.setDate(ndate.getDate()+1);
                $scope.beginDate = ndate;

            }else {
                tvalue.value =(curren.getHours()+1 >= 10?curren.getHours()+1:'0'+(curren.getHours()+1) )+':'+(parseInt(curren.getMinutes()/10)*10>=10?parseInt(curren.getMinutes()/10)*10:'0'+(parseInt(curren.getMinutes()/10)*10));

            }
            $scope.endDate = $scope.beginDate;
            $scope.isshowInvite = true;
            $scope.isshowMask = true;

        }
        $scope.isundefinedate = function(){
           if (!$scope.date){
                $scope.date = new Date();
           }
        }

        //进入主页
        $scope.closeDialog = function(){
            selectedContacts = [];
            var choseAllid = document.getElementById("checkboxAll");
            var checkboxAll = angular.element(choseAllid);
            checkboxAll.removeClass("checked");
            ischeckAll = false;
            $scope.contactCount = 0;
            $scope.isshowMask = false;
            $scope.isshowInvite = false;
            $scope.isshowDetail = false;
            $scope.isshowjoinmeeting = false;
            $scope.yyUrl="";
            $scope.meetingPwd = null;
            $scope.checked = false;
            $scope.copyContent = null;
            $scope.yyUrl = null;
           getMeetingList();
        }
        // 创建即时会议
        var isCanCreateMeeting = true;
        $scope.createMeeting = function(){
            CustomLog.i('点击创建会议按钮');
            if($rootScope.currAudioPlayDevice  == '无'){
                CustomLog.i('扬声器设备设置错误');
                showAlertf('扬声器设备设置错误,请重新设置');
                return;
            }
            $rootScope.isInMeeting = true;
            if(isCanCreateMeeting === false){
                CustomLog.i('创建会议接口正在调用过程中，直接返回');
                return;
            }
            isCanCreateMeeting = false;
            const CreateMeeting = require('./src/data_center/MeetingManage/CreateMeeting');
            var  createMeeting = new  CreateMeeting();
            var  inviteUser = [accountInfo.getAccountInfo() .nubeNumber];
            // app,topic ,invotedUsers, invotedPhones,token, meetingType, beginDateTime
            $scope.callClass='waiting';
            var result = createMeeting.createMeeting(ConstConfig.PARAM_APPTYPE_VALUE,null,inviteUser,null,accountInfo.getAccountInfo().accessToken,1,null,null);
            CustomLog.i('创建会议同步返回结果 '+result);
            if (result < 0){
                CustomLog.i('创建会议同步返回失败 '+result);
               isCanCreateMeeting = true;
                $rootScope.isInMeeting = false;
                return;
            }
            createMeeting.on("success",function(obj){

                CustomLog.d('创建会议成功'+obj.meetingId);
                $scope.callClass='waiting';
                //$scope.$apply();
                var  meetingID = obj.meetingId;
                CustomLog.d('开始跳转到meetingroom界面'+obj.meetingId);
                $location.path('/meetingRoom/'+meetingID);
                $scope.$apply();
                isCanCreateMeeting = true;
                CustomLog.d('转到meetingroom界面完成'+obj.meetingId);
            });
            createMeeting.on("error",function(result,des){
                $rootScope.isInMeeting = false;
                isCanCreateMeeting = true;
                console.log(result+''+des);
                $scope.callClass='btn_ljzk';
                $scope.$apply();
                CustomLog.i('创建会议失败 '+result + ' '+ des);
                if(result == -11){
                    showAlertf('网络不给力，请检查网络');
                    $scope.$apply();

                }
                else if (result == -903){
                    var appElement = document.querySelector('[ng-controller=JustMeeting]');
                    var $scopeUnLogin = angular.element(appElement).scope();
                    $scopeUnLogin.unlogin();
                }
            });
        }
        function  showAlertf(msg){
            $scope.isShowToast = true;
            $scope.toastMsg = msg;
            showTips(function(){
                $scope.isShowToast = false;
            })
        }
        // 显示tips
        var  timer;
        function showTips(fun){
            if (timer != null || timer!=undefined){
                clearTimeout(timer);
            }
            timer = setTimeout(
                function() {
                    fun();
                    $scope.$apply();
                    timer = null;
                },
                2000
            );
        }
        function showAppointTips(fun){
            if (timer != null || timer!=undefined){
                clearTimeout(timer);
            }
            timer = setTimeout(
                function() {
                    fun();
                    $scope.$apply();
                    timer = null;
                },
                1000
            );
        }
         //创建预约会议
        var isEnableAppoint = true;
        $scope.showAppointInfo = function(){
            $scope.isshowHostDetail = true;
            if(isEnableAppoint === false){
                CustomLog.i('预约会议接口正在调用过程中');
                return;
            }
            isEnableAppoint = false;
            var meetingPwd = '';
            //创建有密会议
            if($scope.checked){
                CustomLog.i('选择了创建有密码会议'+$scope.checked);
                if($scope.meetingPwd == ''||$scope.meetingPwd == null){
                    $scope.showPwdError = true;
                    $scope.pwdError = '没有输入会议密码';
                    showTips(function(){
                        $scope.showPwdError = false;
                    });
                    isEnableAppoint = true;
                    return;
                } else if($scope.meetingPwd.length < 6){
                    CustomLog.i('输入的密码少于6位');
                    $scope.showPwdError = true;
                    $scope.pwdError = '输入的密码少于6位';
                    showTips(function(){
                        $scope.showPwdError = false;
                    });
                    isEnableAppoint = true;
                    return;
                }
                else if(isNaN($scope.meetingPwd) ){
                    CustomLog.i('请输入6位数字密码');
                    $scope.showPwdError = true;
                    $scope.pwdError = '请输入6位数字密码';
                    showTips(function(){
                        $scope.showPwdError = false;
                    });
                    isEnableAppoint = true;
                    return;
                }
                meetingPwd = $scope.meetingPwd;
                $scope.isshowPwd = true;
            }
            const CreateMeeting = require('./src/data_center/MeetingManage/CreateMeeting');
            var  createMeeting = new  CreateMeeting();

            var  topic = $scope.topic;
            var beginDate = $scope.beginDate;
            var endDate = $scope.endDate;
            var  timeInput = document.getElementById('appointTImer');
            var  valuetime = timeInput.value;
            var array = valuetime.split(':');
            var  current = new  Date();
            current.setHours(parseInt(array[0]));
            current.setMinutes(parseInt(array[1]));
            var  time = current;
            $scope.time = time;
            var  curentDay = new  Date();
          //开始时间不能小于当前时间
            if (curentDay.getFullYear()==beginDate.getFullYear() &&  curentDay.getMonth()== beginDate.getMonth() && curentDay.getDate()== beginDate.getDate()){
                if (time.getHours() < curentDay.getHours()){
                    CustomLog.d('时间不能小于当前时间');
                    $scope.showTimerError = true;
                    $scope.timeError = '会议开始时间不能小于当前时间';
                    showTips(function(){
                        $scope.showTimerError = false;
                    })
                    isEnableAppoint = true;
                    return;
                }else if (time.getHours() == curentDay.getHours())
                {
                    if(time.getMinutes() <curentDay.getMinutes()){
                        CustomLog.d('时间不能小于当前时间');
                        $scope.showTimerError = true;
                        $scope.timeError = '会议开始时间不能小于当前时间';
                        showTips(function(){
                            $scope.showTimerError = false;
                        })
                        isEnableAppoint = true;
                        return;
                    }
                }
            }
            beginDate.setHours(time.getHours());
            beginDate.setMinutes(time.getMinutes());
            var  startTime = Date.parse(beginDate)/1000;
            endDate.setHours(23);
            endDate.setMinutes(59);
            var endTime = Date.parse(endDate)/1000;
            var  inviteUser = [accountInfo.getAccountInfo() .nubeNumber];
            //   app,topic ,invotedUsers, invotedPhones,token, meetingType, beginDateTime
            var  topics = topic;
            if (topic == null || topic ==""){
                topics = $scope.topic = accountInfo.getAccountInfo().nickname+'的预约会议';
            }
            $scope.appointbtn = 'input_btn waiting';
            var result = createMeeting.createMeeting(ConstConfig.PARAM_APPTYPE_VALUE,topics,inviteUser,null,accountInfo.getAccountInfo().accessToken,2,startTime,meetingPwd,endTime);
            CustomLog.i('创建预约会议同步返回结果 ' + result);
            if (result < 0){
                CustomLog.i('创建预约会议同步返回失败' + result);
                return;
            }
            createMeeting.on("success",function(result){
                isEnableAppoint = true;
                CustomLog.i('创建预约会议成功返回结果 '+ result);
                $scope.appointbtn = 'input_btn';
                $scope.isshowDetail = true;
                $scope.isshowInvite = false;
                appointInfo.meetingID = result.meetingId;
                appointInfo.topic = $scope.topic;
                appointInfo.endDate = ($scope.endDate.getFullYear())+'-'+($scope.endDate.getMonth()+1 >=10 ? $scope.endDate.getMonth()+1: '0'+($scope.endDate.getMonth()+1) )+'-'+($scope.endDate.getDate()>=10? $scope.endDate.getDate():'0'+$scope.endDate.getDate());
                appointInfo.beginDate = ($scope.beginDate.getFullYear())+'-'+($scope.beginDate.getMonth()+1 >=10 ? $scope.beginDate.getMonth()+1: '0'+($scope.beginDate.getMonth()+1) )+'-'+($scope.beginDate.getDate()>=10? $scope.beginDate.getDate():'0'+$scope.beginDate.getDate());
                appointInfo.time =($scope.time.getHours()>=10  ? $scope.time.getHours():'0'+($scope.time.getHours()))+':'+($scope.time.getMinutes() >= 10 ? $scope.time.getMinutes() :'0'+($scope.time.getMinutes()) );;
                appointInfo.creatorName = accountInfo.getAccountInfo().nickname;
                appointInfo.meetingPWD = $scope.meetingPwd;
                if(meetingPwd == ''){
                    $scope.isshowPwd = false;
                }

                getSmsMsg();
                //   $scope.appointInfo = appointInfo;
                $scope.topic = '';
                $scope.beginDate = '';
                $scope.endDate = '';
                $scope.time = '';
                $scope.meetingPwd = '';
                $scope.$apply();
            });
            createMeeting.on("error",function(errorCode, errorDesciption){
                isEnableAppoint = true;
                CustomLog.i('创建预约会议返回失败 '+ errorCode+' '+ errorDesciption);
                $scope.appointbtn = 'input_btn';
                console.log(errorCode,errorDesciption);
                if(errorCode == -11){
                    showAlertf('网络不给力，请检查网络');
                }
                else if (errorCode == -903){
                    var appElement = document.querySelector('[ng-controller=JustMeeting]');
                    var $scopeUnLogin = angular.element(appElement).scope();
                    $scopeUnLogin.unlogin();
                }
                else if(errorCode == -900){
                    $scope.showtopError = true;
                    $scope.topicError = '会议主题中请不要包含“&”字符，请重新输入！';
                    showTips(function(){
                        $scope.showtopError = false;
                    })
                }
                $scope.$apply();
            });

        }

        //弹出预约会议框
        $scope.appointMeeting = function (){
            $scope.showMask = true;
            $scope.isshow = true;
            $scope.showPath= "src/view_controllers/meeting/AppointMeeting.html";

        };
      //点击详情或加入
        $scope.myclick= function(meetingItem,type){
            if (type === "详情"){
                $scope.isshowPwd = false;
                showDetail(meetingItem,meetingItem.creatorName,meetingItem.createTime);
            }
        }
        //进入会议详情
        function showDetail(meetingItem,createName,createTime){
            CustomLog.i('进入会议详情');
            appointInfo.meetingPWD = '';
            $scope.isshowDetail = false;
            $scope.isshowMask = false;
            appointInfo.meetingID =meetingItem.meetingId;
            appointInfo.creatorName = createName;
            if(appointInfo.creatorName === accountInfo.getAccountInfo().nickname){
                //查询会议密码
                $scope.isshowHostDetail = true;
                const GetMeetingPwd = require("./src/data_center/MeetingManage/GetMeetingPwd");
                var getMeetingPwd = new GetMeetingPwd();
                var result = getMeetingPwd.getMeetingPwd(accountInfo.getAccountInfo().accessToken,meetingItem.meetingId);
                getMeetingPwd.on("success", function(vo) {
                    getSmsMsg();
                    CustomLog.i('获取会议密码成功');
                    if(vo.meetingPwd !== ''&& vo.meetingPwd !== null&&vo.meetingPwd !== undefined){
                        appointInfo.meetingPWD = vo.meetingPwd;
                        $scope.isshowPwd = true;
                    }
                    else {
                        $scope.isshowPwd = false;
                    }
                });
                getMeetingPwd.on("error", function(errorCode, errorDesciption){
                    CustomLog.i('查询会议密码失败'+ errorCode + errorDesciption);
                    if(errorCode == '-11'){
                        showAlertf("网络不给力，请检查网络");
                        $scope.$apply();
                    }
                });
            }else {
                $scope.isshowHostDetail = false;
            }
            appointInfo.topic =meetingItem.topic;
            var newDate = new Date();
            newDate.setTime(createTime * 1000);
            var endDate = new Date();
            if(meetingItem.expectEndtime) {
                endDate.setTime(meetingItem.expectEndtime * 1000);
            }else {
                endDate.setTime(createTime * 1000);
            }
            appointInfo.endDate = (endDate.getFullYear())+'-'+(endDate.getMonth()+1 >=10 ? endDate.getMonth()+1: '0'+(endDate.getMonth()+1) )+'-'+(endDate.getDate()>=10? endDate.getDate():'0'+endDate.getDate());
            appointInfo.beginDate = (newDate.getFullYear())+'-'+(newDate.getMonth()+1 >=10 ? newDate.getMonth()+1: '0'+(newDate.getMonth()+1) )+'-'+(newDate.getDate()>=10? newDate.getDate():'0'+newDate.getDate());
            appointInfo.time =(newDate.getHours()>=10  ? newDate.getHours():'0'+(newDate.getHours()))+':'+(newDate.getMinutes() >= 10 ? newDate.getMinutes() :'0'+(newDate.getMinutes()) );;
            $scope.isshowDetail = true;
            $scope.isshowMask = true;
            //   $scope.isshowInvite = false;

        }
        $scope.joinClick= function(meetingItem){
            joinMeetingFromMeetingList(meetingItem);
        }
        //从会议列表加入会议
        function joinMeetingFromMeetingList(meetingItem){
            $rootScope.isInMeeting = true;
            const GetMeetingInfomation = require('./src/data_center/MeetingManage/GetMeetingInfomation');
            var  getMeetinginfo = new  GetMeetingInfomation();
            var result =  getMeetinginfo.getMeetingInfomation(meetingItem.meetingId);
            if (result <0){
                CustomLog.i('获取会议信息同步返回错误 '+ result);
                $rootScope.isInMeeting = false;
                return;
            }
            var classid = 'btn_'+ meetingItem.meetingId;
            var elementId = document.getElementById(classid);
            var  element = angular.element(elementId);
            element.addClass('waiting');

            getMeetinginfo.on('success',function(obj){
                CustomLog.i(obj.meetingStatus);
                if (obj.meetingStatus == 3){
                    $rootScope.isInMeeting = false;
                    CustomLog.i('会议已经结束'+meetingItem.meetingId);
                    element.removeClass('waiting');
                    $scope.isShowToast =true;
                    $scope.toastMsg = '会议已结束';
                    $scope.$apply();
                    showTips(function(){
                        $scope.isShowToast = false;
                    })
                    return;
                }
                CustomLog.i('会议号有效，加入会议'+meetingItem.meetingId)
                $location.path('/meetingRoom/'+meetingItem.meetingId);
                element.removeClass('waiting');
                $scope.$apply();

            });
            getMeetinginfo.on('error',function(code,des){
                $rootScope.isInMeeting = false;
                CustomLog.i(code+' '+des);
                element.removeClass('waiting');
                if (code == -11) {
                    $scope.isShowToast =true;
                    $scope.toastMsg = '网络不给力，请检查网络';
                    $scope.$apply();
                    showTips(function(){
                        $scope.isShowToast = false;
                    })
                }

                $scope.$apply();
            });
        }
        $scope.copyLink = function(){
            if($scope.copyContent == undefined || $scope.copyContent == null ){
                var getMeetingInvitationCopyLin = new GetMeetingInvitationSMS();
                var result = getMeetingInvitationCopyLin.getMeetingInvitationSMS( appointInfo.meetingID,accountInfo.getAccountInfo().nube,accountInfo.getAccountInfo().nickname+" ",2,ConstConfig.PARAM_APPTYPE_VALUE);
                CustomLog.i('获取邀请短链内容同步返回结果 +'+result);
                getMeetingInvitationCopyLin.on("success",function (obj){
                    $scope.copyContent = obj.invitationSMS;
                    $scope.yyUrl = obj.yyURL;
                    copySms();
                    $scope.$apply();
                });
                getMeetingInvitationCopyLin.on("error",function(code,des){
                    CustomLog.i('获取邀请短链内容失败结果 '+code+' '+des);
                    if(code == '-11'){
                        showAlertf("网络不给力,请检查网络");
                        $scope.$apply();
                    }
                })
                return;
            }
            copySms();
        }

        function copySms(){
            const {clipboard} = require('electron');
            clipboard.writeText( $scope.copyContent);
            $scope.ishidecopy = true;
            showTips(function(){
                $scope.ishidecopy = false;
            })
        }

        //获取短lian内容
        function getSmsMsg (){
           var result = getMeetingInvitationCopyLink.getMeetingInvitationSMS( appointInfo.meetingID,accountInfo.getAccountInfo().nube,accountInfo.getAccountInfo().nickname+" ",2,ConstConfig.PARAM_APPTYPE_VALUE);
           CustomLog.i('获取邀请短链内容同步返回结果 +'+result);
            getMeetingInvitationCopyLink.on("success",function (obj){
                $scope.copyContent = obj.invitationSMS;
                $scope.yyUrl = obj.yyURL;
                $scope.$apply();
                console.log(obj);
                CustomLog.d('获取短链内容结果 '+ obj);
            });
            getMeetingInvitationCopyLink.on("error",function(code,des){
                CustomLog.i('获取邀请短链内容失败结果 '+code+' '+des);
                if(code == '-11'){
                    showAlertf("网络不给力,请检查网络");
                    $scope.$apply();
                }

            })

        }

        //发送短信
        $scope.sendMsg =function(){

            const SendSMS = require('./src/data_center/MeetingManage/SendSMS');
            var  sendSMS = new  SendSMS();
            // token,phoneNumber,msg
            // 【会议邀请】$会议主题$，时间：$会议时间$，届时参加请点击$会议链接$
            var msg;
            var result = getMeetingInvitationSMS.getMeetingInvitationSMS( appointInfo.meetingID,accountInfo.getAccountInfo().nube,accountInfo.getAccountInfo().nickname+" ",2,"KESHI_JIHY");
            CustomLog.i('获取邀请短信内容同步返回结果 +'+result);
            getMeetingInvitationSMS.on("success",function (obj){
                msg = obj.invitationSMS;
                CustomLog.d('获取短信内容结果 '+ obj);
                var sresult = sendSMS.sendSMS(accountInfo.getAccountInfo().accessToken,accountInfo.getAccountInfo().mobile,msg);
                CustomLog.i('发送短信内容直接返回结果 '+' '+ sresult);
                sendSMS.on("success",function(obj){
                    CustomLog.i('发送短信成功结果 '+ obj);
                    $scope.ishidemsg = true;
                    $scope.msgphone = accountInfo.getAccountInfo().mobile;
                    showTips(function(){
                        $scope.ishidemsg = false;
                    });
                    console.log(obj);
                    $scope.$apply();
                });
                sendSMS.on("error",function(code,error){
                    CustomLog.i('发送短信失败 '+code+' '+error);
                    $scope.ishidemsg = false;
                    if(code == -11){
                        showAlertf("网络不给力，请检查网络");
                        $scope.$apply();
                    }
                    console.log(error);
                });
            });
            getMeetingInvitationSMS.on("error",function(code,des){
                CustomLog.i('获取邀请短信内容失败结果 '+code+' '+des);
                if(code == '-11'){
                    showAlertf("网络不给力,请检查网络");
                    $scope.$apply();
                }

            })

        }

        //加入有密会议
        var isCanJoin = true;
        $scope.joinMeetingWithPwd = function(){
            $rootScope.isInMeeting = true;
            CustomLog.i('点击加入有密会议，开始验证密码');
            if (isCanJoin === false){
                CustomLog.i('已经在加入会议中不可以再次加入');
                return;
            }
            isCanJoin = false;
            if($scope.joinMeetingPwd == ''||$scope.joinMeetingPwd == null){
                $scope.showMeetingPwdError = true;
                $scope.meetingPwdError = '没有输入会议密码';
                showTips(function(){
                    $scope.showMeetingPwdError = false;
                })
                isCanJoin = true;
                $rootScope.isInMeeting = false;
                return;
            } else if($scope.joinMeetingPwd.length < 6){
                CustomLog.i('输入的密码少于6位');
                $scope.showMeetingPwdError = true;
                $scope.meetingPwdError = '输入的密码少于6位';
                showTips(function(){
                    $scope.showMeetingPwdError = false;
                })
                isCanJoin = true;
                $rootScope.isInMeeting = false;
                return;
            }
            //校验会议密码
            var meetingId = $scope.meetingnumber;
            var  meetingPwd = $scope.joinMeetingPwd;
            const CheckMeetingPwd = require("./src/data_center/MeetingManage/CheckMeetingPwd.js");
            var checkMeetingPwd = new CheckMeetingPwd();
            var result = checkMeetingPwd.checkMeetingPwd(accountInfo.getAccountInfo().accessToken,meetingId,meetingPwd);
            checkMeetingPwd.on("success", function(vo) {
                CustomLog.i('密码验证ok');
                $scope.isshowCheckMeetingPwd= false;
                $scope.isshowMask = false;
                $location.path('/meetingRoom/'+meetingId);
                $scope.$apply();

            });

            checkMeetingPwd.on("error", function(errorCode, errorDesciption){
                //console.error(errorCode,errorDesciption);
                $rootScope.isInMeeting = false;
                isCanJoin = true;
                if(errorCode == -11){
                    CustomLog.i('网络异常')
                    showAlertf('网络不给力，请检查网络');
                    $scope.$apply();
                    return;
                }
                if(errorCode == -928){
                    CustomLog.i('密码错误')
                    $scope.showMeetingPwdError = true;
                    $scope.meetingPwdError = '密码不正确，请重新输入';
                    $scope.$apply();
                    showTips(function(){
                        $scope.showMeetingPwdError = false;
                    })
                    return;
                }
                CustomLog.i('密码验证失败');
                showAlertf("密码验证失败，请重试");

            });

        }
        //输入会议号加入会议
        var isEnableJoin = true;
        $scope.joinMeeting = function(){
            $rootScope.isInMeeting = true;
             CustomLog.i('点击加入会议');
            if(isEnableJoin === false){
                CustomLog.i('已经在加入会议中不可以再次加入');
                return;
            }
            isEnableJoin = false;
            var  meetingID = $scope.meetingnumber;
            if (meetingID==''|| meetingID == undefined){
                isEnableJoin = true;
                $rootScope.isInMeeting = false;
                return;
            }
            if (meetingID.length < 8){
                $scope.meetingIDErrortips = true;
                $scope.meettingIdError = '请输入8位有效会议号';
                showTips(function(){
                    $scope.meetingIDErrortips = false;
                });
                isEnableJoin = true;
                $rootScope.isInMeeting = false;
                return;
            }


            const GetMeetingInfomation = require('./src/data_center/MeetingManage/GetMeetingInfomation');

            var  getMeetinginfo = new  GetMeetingInfomation();
            var result = getMeetinginfo.getMeetingInfomation(meetingID);
            if(result < 0){
                isEnableJoin = true;
                $scope.meetingIDErrortips = true;
                $scope.meettingIdError = '会议号无效';
                CustomLog.i('查询会议结果失败 '+meetingID+' '+result)
                showTips(function(){
                    $scope.meetingIDErrortips = false;
                    $scope.$apply();
                })
                $rootScope.isInMeeting = false;
                return;
            }
            $scope.inputclass = 'search_key waiting'
            getMeetinginfo.on("success",function(obj){
                isEnableJoin = true;
                CustomLog.i('获取会议信息返回结果 '+ obj+'会议状态'+obj.meetingStatus+' '+obj.meetingHost);
                $scope.inputclass = 'search_key'
                $scope.$apply();
             //   locals.setObject(accountInfo.getAccountInfo().nube)
                if(obj.meetingStatus == 3){
                    CustomLog.d('会议已经结束');
                    $scope.meetingIDErrortips = true;
                    $scope.meettingIdError = '会议已经结束';
                    $scope.$apply();
                    showTips(function(){
                        $scope.meetingIDErrortips = false;
                        $scope.$apply();
                    })
                    $rootScope.isInMeeting = false;
                    return;

                }
                var  historylist = locals.getObject(accountInfo.getAccountInfo().nube);
                if (historylist === undefined || historylist == null){
                    $scope.meetinghostory = [];
                    historylist = [];
                }
                if (historylist.indexOf(meetingID) == -1){
                    historylist.unshift(meetingID);
                }

                locals.setObject(accountInfo.getAccountInfo().nube,historylist)
                ////判断是否为预约会议
                //if (obj.meetingType == 2){
                //    var  tiemtep = obj.expectStarttime;
                //    var newDate = new Date();
                //    newDate.setTime(tiemtep * 1000);
                //    var  newstr = parseInt(tiemtep)*1000;
                //    var  currentDate = new  Date();
                //    CustomLog.i(currentDate.getTime());
                //    if(newstr > currentDate.getTime() && !((newDate.getFullYear()==currentDate.getFullYear())&&(newDate.getMonth() == currentDate.getMonth())&&(newDate.getDate() == currentDate.getDate()))){
                //        // 进入会议详情
                //        showDetail(obj,obj.terminalAccountName,obj.yyBeginTime);
                //        $rootScope.isInMeeting = false;
                //    }else {
                //        // 开始进入会议
                //        CustomLog.i('预约会议已经开始，进入会议室');
                //        joinMeetingWithMeetingInfo(obj);
                //    }
                //
                //}else {//若为即时会议
                    CustomLog.i('即时会议已经开始，进入会议室');
                    joinMeetingWithMeetingInfo(obj);
                //}

            });
            getMeetinginfo.on("error",function(result,des){
                $rootScope.isInMeeting = false;
                isEnableJoin = true;
                CustomLog.i('获取会议信息返回失败 '+ result +' '+des);
                $scope.inputclass = 'search_key';
                if (result == -906){
                    $scope.meetingIDErrortips = true;
                    $scope.meettingIdError = '会议不存在';
                    showTips(function(){
                        $scope.meetingIDErrortips = false;
                      //  $scope.$apply();
                    })
                }
               else if(result == -11){
                    showAlertf('网络不给力，请检查网络');
                }
                $scope.$apply();
            });
        }

        //选择输入过的会议号加入会议
        $scope.setnumber = function(x){
            $scope.meetingnumber = x;
            var elementid =   document.getElementById('inputMeetingNum');
            var btnid = document.getElementById('joinbtn') ;
            let checkEle = angular.element(btnid);
            if($scope.meetingnumber.length == 8){
                if(checkEle.hasClass('dis')) {
                    checkEle.removeClass('dis');
                }
            }else {
                if(!checkEle.hasClass('dis')) {
                    checkEle.addClass('dis');
                }
            }
            $scope.hidehistory = false;
            //  $scope.joinbtnclass = 'search_btn';
            //  $scope.$apply();

        }
        //对输入过的会议号添加监听
        var body = document.getElementById('appBody');
        function clickFun(e){
            var inputnum = document.getElementById('inputMeetingNum');
            if(inputnum == e.target){
                return;
            }else {

            }
            $scope.hidehistory = false;
            $scope.$apply();
        }
        body.addEventListener('click',clickFun)

        //判断会议号是否为8位，若为8位，改变进入会议按钮形式
        $scope.inputLength = function(){
            //if ($scope.meetingnumber.length == 8){
            //    $scope.joinbtnclass = 'search_btn';
            //}else {
            //    $scope.joinbtnclass = 'search_btn dis';
            //}
            var elementid =   document.getElementById('inputMeetingNum');
            var btnid = document.getElementById('joinbtn') ;
            let checkEle = angular.element(btnid);
            if(elementid.value.length == 8){
                if(checkEle.hasClass('dis')) {
                    checkEle.removeClass('dis');
                }
            }else {
                if(!checkEle.hasClass('dis')) {
                    checkEle.addClass('dis');
                }
            }
            elementid.value = elementid.value.replace(/[^\d]/g,'');
        }

        //根据会议信息加入会议
        function joinMeetingWithMeetingInfo(obj){
            //判断是否是主持人
            if(obj.meetingHost == accountInfo.getAccountInfo().nubeNumber){
                $scope.isshowCheckMeetingPwd = false;
                $scope.isshowMask = false;
                $location.path('/meetingRoom/'+obj.meetingId);
                $scope.$apply();
                return;
            }
            //不是主持人判断是否有密码
            if(obj.hasMeetingPwd == 1){//有密码
                CustomLog.i('会议有密码，需要验证密码');
                $scope.isshowCheckMeetingPwd = true;
                $scope.isshowMask = true;
                $scope.$apply();
            }
            else {//无密码
                $scope.isshowCheckMeetingPwd = false;
                $scope.isshowMask = false;
                $location.path('/meetingRoom/'+obj.meetingId);
                $scope.$apply();
            }
        }

        // 输入会议号框获得焦点
        $scope.inputOnfocus =function(){
            var  meetingList = locals.getObject(accountInfo.getAccountInfo().nube);
            if (meetingList != undefined && meetingList.length > 0){
                $scope.hidehistory = true;
                $scope.meetinghostory = meetingList;
            }
        }

        $scope.inputOnblur = function(){

            //var timer = $timeout(
            //    function() {
            //
            //        $scope.hidehistory = false;
            //        $scope.$apply();
            //
            //    },
            //    150
            //);
        }

        //弹出邀请联系人参加会议框
        var allContactCount = 0;
        $scope.inviteContact = function(){

            //获取通讯录列表
            //data  -1 失败 空数组  无数据    数组是数据
            contactManagerSerice.contactManager.getContacts(function(data){
                if(data === -1){
                    CustomLog.i("getContacts()返回" + data);
                    $scope.isShowNoDataSelect = true;
                    $scope.isShowNoDataAllSelect = false;
                    $scope.$apply();
                    return;
                }
                console.log($scope.groupContacts);
                if(data.length == 0){
                    CustomLog.i("getContacts()暂无数据");
                    $scope.isShowNoDataSelect = true;
                    $scope.isShowNoDataAllSelect = false;
                    $scope.$apply();
                    return;
                }
                allContactCount = data.length;
                $scope.groupContacts = contactManagerSerice.formatContacts(data);
                $scope.$apply();
                CustomLog.i("获取到新的联系人了" + data + allContactCount);
            });

            $scope.isshowjoinmeeting = true;
            $scope.isshowDetail = false;
        };
        //根据字母选择联系人
        $scope.scrollToEl = function(elId){
            var path = "";
            if(elId === "#"){
                path = "#other";
            }else{
                path = "#" + elId;
            }
            anchorScroll.toView(path, true);
        };


        //选择联系人
        $scope.contactCount = 0;
        $scope.chooseContact = function(contactInfo){
            console.log("选择联系人");
            var checkID = document.getElementById("checkbox" + contactInfo.contactId);
            var checkEle = angular.element(checkID);
            if (checkEle.hasClass("checked")){
                checkEle.removeClass("checked");
                var i = selectedContacts.indexOf(contactInfo);
                selectedContacts.splice(i,1);

            }else{
                checkEle.addClass("checked");
                selectedContacts.push(contactInfo);
            }
            $scope.contactCount = selectedContacts.length;
            var choseAllid = document.getElementById("checkboxAll");
            var checkboxAll = angular.element(choseAllid);
            if(allContactCount === $scope.contactCount){
                checkboxAll.addClass("checked");
                ischeckAll = true;
            }else{
                checkboxAll.removeClass("checked");
                ischeckAll = false;
            }
        };
        //选择所有联系人
       $scope.choseAll = function(obj){
           //if (obj.hasClass("checked")){
           //    obj.removeClass("checked");
           //}
           var choseAllid = document.getElementById("checkboxAll");
           var checkboxAll = angular.element(choseAllid);
           if (ischeckAll == false){
               //checkboxAll
               checkboxAll.addClass("checked");
           }else {
               checkboxAll.removeClass("checked");
               selectedContacts = [];
           }
           for(var  i = 0;i<$scope.groupContacts.length;i++) {
               var  item = $scope.groupContacts[i].contacts;
               for ( var  j = 0;j < item.length;j++){
                   var  contactInfo = item[j];
                   var checkID = document.getElementById("checkbox" + contactInfo.contactId);
                   var checkEle = angular.element(checkID);
                   var index = selectedContacts.indexOf(contactInfo);
                   if (ischeckAll == false){
                       checkEle.addClass("checked");
                       if (index ==-1)
                       selectedContacts.push(contactInfo);
                   }else {
                      if (checkEle.hasClass("checked")){
                       checkEle.removeClass("checked");
                      }
                   }
               }
           }
           ischeckAll = !ischeckAll;
           $scope.contactCount = selectedContacts.length;

       }

        // 邀请联系人参会
        $scope.sendInvite = function(){
            if (selectedContacts.length <= 0){
                return;
            }

            const  ModifyMeetingInviters = require('./src/data_center/MeetingManage/ModifyMeetingInviters');
            var  modifyinviter = new  ModifyMeetingInviters();
            // (token,meetingId,invotedUsers,invotedPhones,app)
            var  accountids = [];
            for (var i = 0;i < selectedContacts.length;i++  ){
                var  item = selectedContacts[i];
                accountids.push( item.nubeNumber);
            }
            $scope.finishInvite ='btn waiting';
            var result = modifyinviter.modifyMeetingInviters(accountInfo.getAccountInfo().accessToken,appointInfo.meetingID,accountids,ConstConfig.PARAM_APPTYPE_VALUE);
            CustomLog.i('邀请联系人同步返回结果 '+result);
            modifyinviter.on("success",function(obj){
                ischeckAll = false;
                var choseAllid = document.getElementById("checkboxAll");
                var checkboxAll = angular.element(choseAllid);
                checkboxAll.removeClass("checked");
                selectedContacts = [];
                CustomLog.i('邀请联系人成功 '+ obj);
                CustomLog.d(obj);
                showAlertf('发送邀请成功');
                $scope.finishInvite ='btn btnComplete';
                $scope.isshowDetail = true;
                $scope.isshowjoinmeeting = false;
                selectedContacts = [];
                $scope.contactCount = selectedContacts.length;
                $scope.$apply();
            });
            modifyinviter.on("error",function(code,des){
                CustomLog.i('邀请联系人失败异步返回结果 '+code +' '+des);
                if (code == -11){
                    showAlertf('网络不给力，请检查网络');
                }
                $scope.finishInvite ='btn btnComplete';
                $scope.$apply();
                CustomLog.d(code,des);
            });

        }
        $scope.lengthchange =  function (){

            var str = $scope.topic;
            var strlen = 0;
            var  count = 0;
            for(var i = 0;i < str.length; i++)
            {
                count++;
                if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
                    strlen += 2;
                else
                    strlen++;
                if (strlen > 20){
                    var topic = $scope.topic;
                    $scope.topic = $scope.topic.substr(0,count-1);
                    return;
                }
            }


        }
        $scope.showmax = true;
        $scope.showreset = false;
     $scope.max_click = function(ele){

         switch (ele){
             case 'max':{
                 //$scope.showmax = false;
                 //$scope.showreset = true;
                 break;
             }
             case 'reset':{
                 $scope.showmax = true;
                 $scope.showreset = false;
                 break;
             }

         }

         $rootScope.max_click();
     }


        $scope.$on("$routeChangeStart",function(event,next,current) {
            window.removeEventListener('keyup',clickFun);
        })
    }]);
