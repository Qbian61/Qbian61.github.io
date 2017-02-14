/**
 * Created by admin on 2016/5/30.
 */
angular.module('justMeeting.reg',['ngRoute','loginInfo','utilsService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/reg', {
            templateUrl: 'src/view_controllers/Login/reg.html'
        });
    }])
.controller('reg',['$rootScope','$scope','$location','accountInfo','CustomLog','connect','locals','contactManagerSerice','$interval','$timeout','invite','getCdnService',function($rootScope,$scope,$location,accountInfo,CustomLog,connect,locals,contactManagerSerice,$interval,$timeout,invite,getCdnService){

    // 显示注册的第一步
    $scope.show_step1 = true;
    queryElement(1);

    $scope.btn_exit = function(){
        if (connect.meetingConnect != undefined && connect !=null){
            connect.meetingConnect.release();
            contactManagerSerice.contactManager.release();
        }

        var ipc = require('electron').ipcRenderer;
        ipc.send('sizechange',400,400,false);

        $location.path('/LoginView');
    }
    $scope.min_click = function(){
        var ipc = require('electron').ipcRenderer;
        ipc.send('minimize');
    }
    $scope.max_click = function(){
        var ipc = require('electron').ipcRenderer;
        ipc.send('maximize');
    }

    // 显示tips
    var timer = null;
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


    $scope.step2 = function(){
        var  phoneid = document.getElementById('phoneno');
        //let checkEle = angular.element(phoneid);
        $scope.phone = phoneid.value;
        if ( $scope.phone==undefined|| $scope.phone==''){
            CustomLog.d('phone为空');
            $scope.showPhoneError = true;
            $scope.phoneError = "请输入手机号"
            showTips(function(){
                $scope.showPhoneError = false;
            });
            return;
        }
        if ($scope.phone.length < 11 || $scope.phone.charAt(0)!='1'){
            CustomLog.d('请输入正确的手机号');
            $scope.showPhoneError = true;
            $scope.phoneError = "请输入正确的手机号"
            showTips(function(){
                $scope.showPhoneError = false;
            });
            return;
        }
        if ($scope.password == undefined || $scope.password==''){
            $scope.showPwdError = true;
            $scope.pwdError = "请输入密码"
            showTips(function(){
                $scope.showPwdError = false;
            });
            CustomLog.d('密码为空');
            return;
        }
        if ($scope.password.length < 6){
            $scope.showPwdError = true;
            $scope.pwdError = "密码由6位数字组成"
            showTips(function(){
                $scope.showPwdError = false;
            });
            CustomLog.d('密码为空');
            CustomLog.d('密码由6位数字组成');
            return;
        }
        //if ($scope.password == undefined || $scope.password==''){
        //    $scope.showContromError = true;
        //    $scope.conformError = "密码不能为空"
        //    showTips(function(){
        //        $scope.showContromError = false;
        //    });
        //    CustomLog.d('密码为空');
        //    return;
        //}


        if ($scope.password != $scope.confrompwd){
            $scope.showContromError = true;
            $scope.conformError = "两次输入密码不一致"
            showTips(function(){
                $scope.showContromError = false;
            });
            CustomLog.d('密码不一致');
            return;
        }

        //if(!$scope.checked){
        //    $scope.showCheckboxError = true;
        //    $scope.checkboxError = "未点选同意服务协议和隐私协议"
        //    showTips(function(){
        //        $scope.showCheckboxError = false;
        //    });
        //    CustomLog.d('未点选同意服务协议和隐私协议');
        //    return;
        //}


        const  GetNubeNumberList = require("./src/data_center/UserCenter/GetNubeNumberList");
        var getNubeNumberList = new  GetNubeNumberList();
        var result =  getNubeNumberList.getNubeNumberList("mobinp_JIHY",1,6,"mobile");
        CustomLog.i('从服务器获取视讯号同步返回结果 '+result);
        if(result < 0){
            CustomLog.i('从服务器获取视讯号同步返回失败，直接返回');
            return;
        }
        $scope.step1class = 'input_btn nextbtn '+'waiting'
        getNubeNumberList.on("success",function(obj){
            var  numberlist = obj.nubeNumberlist;
            CustomLog.i('获取视频讯号返回成功结果 '+' '+numberlist);
            const RegisterAccount = require("./src/data_center/UserCenter/RegisterAccount.js");
            var registerAccount = new RegisterAccount();
            $scope.nube = numberlist[0];
            var result = registerAccount.registerAccount("mobinp_JIHY","mobile",numberlist[0],$scope.phone,accountInfo.md5Str($scope.password),null,"prod002");
            console.log(result);
            CustomLog.i('注册接口返回结果 '+ result);
            registerAccount.on("success",function(obj){
                CustomLog.i('注册成功返回结果 '+ obj);
                $scope.show_step1 = false;
                queryElement(2);
                $scope.show_step2 = true;
                $scope.show_step3 = false;
                console.log(obj);
                $scope.step1class = 'input_btn nextbtn ';
                $scope.smsclass = 'input_btn '+'waiting';

                // 开始倒计时
                $scope.cansend = true;
                var  count = 59;
                $scope.minutes = count--;
                $scope.$apply();
                var timer = $interval(
                    function() {
                        $scope.minutes = count--;

                        if (count == 0){
                            $scope.minutes = '';
                            $scope.smsclass = 'input_btn ';
                            $interval.cancel(timer);
                            $scope.cansend = false;
                        }

                    },
                    1000
                );



                $scope.$apply();
            });
            registerAccount.on("error",function(result,des){
                CustomLog.i('注册返回失败结果 '+ result +' '+des);
                $scope.step1class = 'input_btn nextbtn ';
                $scope.$apply();

                if (result == "-432"){
                    CustomLog.d('账号已经注册');
                    $scope.showPhoneError = true;
                    $scope.phoneError = "手机号已经注册，请直接登录";
                    $scope.$apply();
                    showTips(function(){
                        $scope.showPhoneError = false;
                    });

                    return;
                }
                if (result == "-452"){
                    CustomLog.i('短信验证次数超出限制');
                    $scope.showSmsError = true;
                    $scope.smsError = "短信验证次数超出限制，请一小时后重试";
                    $scope.$apply();
                    showTips(function(){
                        $scope.showSmsError = false;
                    });
                    return;
                }
                if(result == "-11"){
                    CustomLog.i('网络异常');
                    $scope.showSmsError = true;
                    $scope.smsError = "网络异常，请稍后重试";
                    $scope.$apply();
                    showTips(function(){
                        $scope.showSmsError = false;
                    });
                    return;
                }
                console.log(des);
            });

        });
        getNubeNumberList.on("error",function(result,des){
            CustomLog.i('获取视讯号返回失败结果 '+result+' '+des);
            $scope.step1class = 'input_btn nextbtn ';
            $scope.$apply();
            CustomLog.d(result+des);
            if(result == "-11"){
                CustomLog.i('网络异常');
                $scope.showSmsError = true;
                $scope.smsError = "网络异常，请稍后重试";
                $scope.$apply();
                showTips(function(){
                    $scope.showSmsError = false;
                });
            }
        });




    }
    $scope.step3 = function(){
        $scope.sms_code = document.getElementById('rg_sms_code').value;
        if($scope.sms_code ==''||$scope.sms_code==undefined){
            $scope.showSmsError = true;
            $scope.smsError = "请输入验证码";

            showTips(function(){
                $scope.showSmsError = false;
                $scope.$apply();
            });
            return;
        }
        if($scope.sms_code.length < 6){
            $scope.showSmsError = true;
            $scope.smsError = "验证码由6位数字组成";

            showTips(function(){
                $scope.showSmsError = false;
                $scope.$apply();
            });
            return;
        }


        const  ActivateAccount = require("./src/data_center/UserCenter/ActivateAccount.js");
        var  activiaccount = new ActivateAccount();
        var result = activiaccount.activateAccount($scope.phone,$scope.sms_code,"prod002");
        CustomLog.i('激活接口同步返回结果 '+result);
        if (result < 0){
            CustomLog.i('激活接口调用失败 '+result);
            return;
        }
        $scope.disableStep2 = true;
        $scope.step2class = 'input_btn nextbtn '+'waiting';
        activiaccount.on("success",function(obj){
            CustomLog.i('激活成功 '+ obj);
            $scope.loginWithPwd();
            $scope.$apply();
        });
        activiaccount.on("error",function(error,des){
            $scope.disableStep2 = false;
            CustomLog.i('激活失败 '+ error+' '+des);
            $scope.step2class = 'input_btn nextbtn ';
            $scope.$apply();
            if (error == "-404"){
                CustomLog.d('激活码错误');
                $scope.showSmsError = true;
                $scope.smsError = "验证码不正确";
                $scope.$apply();
                showTips(function(){
                    $scope.showSmsError = false;
                    $scope.$apply();
                });
            }
            if(error == "-11"){
                CustomLog.i('网络异常');
                $scope.showSmsError = true;
                $scope.smsError = "网络异常，请稍后重试";
                $scope.$apply();
                showTips(function(){
                    $scope.showSmsError = false;
                });
            }
            if (error == "-432"){
                CustomLog.d('账号已经注册');
                $scope.showSmsError = true;
                $scope.smsError = "手机号已经注册，请直接登录";
                $scope.$apply();
                showTips(function(){
                    $scope.showSmsError = false;
                });
            }
            CustomLog.d(error+des);
        });



    }
    // 发送验证码
    $scope.resendsms = function(){

        const ReSendActivateCode = require("./src/data_center/UserCenter/ReSendActivateCode.js");

        var reSendActivateCode = new ReSendActivateCode();
        var result = reSendActivateCode.reSendActivateCode($scope.phone,"","prod002");
        CustomLog.i('从发验证码调用结果' +
            ' '+ result);
        if (result < 0){
            CustomLog.i('从发送验证码失败 '+ result);
            return;
        }
        console.log(result);
        $scope.smsclass = 'input_btn '+'waiting';
        reSendActivateCode.on("success", function( obj) {
            CustomLog.i('发送验证码成功 '+ obj);
            console.log(obj);

            var  count = 59;
            $scope.minutes = count--;
            $scope.cansend = true;
            $scope.$apply();
            var timer = $interval(
                function() {
                    $scope.minutes = count--;

                    if (count == 0){
                        $scope.minutes = '';
                        $scope.smsclass = 'input_btn ';
                        $interval.cancel(timer);
                        $scope.cansend = false;
                    }

                },
                1000
            );

            CustomLog.d(obj);
        });
        reSendActivateCode.on("error",function(result,des){
            CustomLog.i('发送验证码失败 '+ result +' '+des);
            $scope.showSmsError = true;
            $scope.smsError = des;
            if(result == '-11' || result == '-19'){
                $scope.smsError = '网络异常，请检查网络';
            }
            $scope.smsclass = 'input_btn ';
            $scope.$apply();
            showTips(function(){
                $scope.showSmsError = false;
            });
            CustomLog.d(result,des);
        });
    }

    $scope.finishreg = function(){
        var ele = document.getElementById('regnickid');
        $scope.nick_name = ele.value;
        if ($scope.nick_name ==''||$scope.nick_name== undefined){
            CustomLog.d('用户名称为空');
            $scope.showNamerror = true;
            $scope.nameError = '请输入昵称';
            showTips(function(){
                $scope.showNamerror = false;
                $scope.$apply();
            });
            return;
        }
        const  SetAccountAttr = require("./src/data_center/EnterpriseCenter/SetAccountAttr.js");

        var setaccount = new  SetAccountAttr();
        var result = setaccount.setAccountAttr( $scope.nick_name,accountInfo.getAccountInfo().accessToken);
        CustomLog.i('设置昵称同步返回结果  '+ result);
        if (result < 0){
            CustomLog.i('设置昵称同步返回失败 ' + result);
            return;
        }
        $scope.step3class = 'input_btn finishbtn waiting';
        setaccount.on("success",function(obj){
            CustomLog.i('设置昵称成功 '+obj);
            accountInfo.getAccountInfo().nickname = $scope.nick_name;
            $location.path('/JustMeeting/DefaultView');
            $scope.step3class = 'input_btn finishbtn';
            $scope.$apply();
            console.log(obj);
        });
        setaccount.on("error",function(result,error){
            CustomLog.i('设置昵称失败 '+ result +' '+ error);
            $scope.nickname = accountInfo.getAccountInfo().nickname;
            //$scope.$apply();
            $scope.showNamerror = true;
            $scope.nameError = error;
            $scope.step3class = 'input_btn finishbtn';
            $scope.$apply();
            showTips(function(){
                $scope.showNamerror = false;
                $scope.$apply();
            });
            console.log(result+error);
        });

    }

    $scope.loginWithPwd = function (){

        const  Login4Mobile = require("./src/data_center/EnterpriseCenter/Login4Mobile.js");
        var  login4Mobile = new  Login4Mobile(); // $scope.passWord
        login4Mobile.getLogin( $scope.phone,accountInfo.md5Str($scope.password));
        login4Mobile.on("success",function(account){
            //input_btn
            getCdnService.getCDNToken(account);
            $rootScope.account = account;
            var  meetinginvite =  require("meetingconnect").MeetingInvite;
            var  minvite = new  meetinginvite();
            minvite.setAccountInfo(account.accessToken,account,account.nickname);
            const  BindToken = require("./src/data_center/MeetingManage/BindToken.js");

            var  bindToken = new  BindToken();
            bindToken.bindToken(account.nube,account.accessToken,account.nickname);

            bindToken.on("success",function(obj){
                CustomLog.i('绑定token成功'+obj);
            });
            bindToken.on("error",function(code,des){
                CustomLog.i('绑定token失败'+code+des);
            });

            accountInfo.setAccountInfo(account);
            locals.set('userName',$scope.phone);
            locals.set('passWord',$scope.password);
            const ContactManageModule = require("./src/contact_manager/ContactManager.js");
            var contactManagemodel = new ContactManageModule();
            // accountId, token, initCallback
            contactManagemodel.init(accountInfo.getAccountInfo().nube,accountInfo.getAccountInfo().accessToken,function(result){
                if(result === 0){
                    const MeetingConnect =  require("meetingconnect").MeetingConnect;
                    var  meetingConnect = new  MeetingConnect();
                    const Consfig = require('./src/data_center/Config/ConstConfig.js');
                    CustomLog.i("bin + "+meetingConnect.getBinPath());
                    meetingConnect.setToken(accountInfo.getAccountInfo().accessToken);
                    const remote = require('electron').remote;
                    const app = remote.app;
                    const configPath = app.getPath('userData');
                    var  fs = require('fs');
                    var file = fs.createWriteStream(configPath+"\\config\\MediaFramework.txt");
                    file.write(meetingConnect.getBinPath()); //文件中写入mediaframework.dll所在目录
                    file.end();

                    var  status =  meetingConnect.init(account.nubeNumber,configPath+'\\config',configPath+'\\data',configPath+'\\resource',configPath+'\\log',Consfig.getNpsWebDomain()+'/nps_x1/',Consfig.getNpsWebDomain()+'/nps_x1/',Consfig.serelizednumber,meetingConnect.getBinPath());
                    CustomLog.i('meetingConnect 初始化同步返回结果 '+status);
                    if (status == 0){
                        meetingConnect.on("init", function(statusCode, configPath) {
                            $scope.disableStep2 = false;
                            if (statusCode == 0){
                                connect.setMeetingConnect(meetingConnect);
                                $scope.$apply();
                                // show_step3
                             //   $location.path('/JustMeeting/DefaultView');
                                $scope.show_step3 = true;
                                $scope.show_step2 = false;
                                queryElement(3);
                               // $scope.btnclass = 'input_btn';
                                $scope.$apply();
                            }
                            console.log("connect onInit, statusCode:"+ statusCode + ",configPath:" + configPath);
                            // 注释掉meetingInvite 报错

                            minvite.init();
                            minvite.on("invite",function(functionname,statusCode,des){
                                console.log(functionname+" "+statusCode+" "+des);
                            });
                            minvite.on("forcedOffline",function(functionname,statusCode){
                                CustomLog.i('被迫下线 ');
                                var appElement = document.querySelector('[ng-controller=rootCtr]');
                                var $scopeForcedOffLine = angular.element(appElement).scope();
                                $scopeForcedOffLine.isshowForceOffLineMask = true;
                                $scopeForcedOffLine.isForceOffLine = true;
                                $scopeForcedOffLine.$apply();
                            });
                            minvite.on("incommingCall",function(account,accountName,meetingID){
                                console.log(" "+account+" "+accountName+" "+meetingID);
                                CustomLog.i('收到外呼'+" "+account+" "+accountName+" "+meetingID);
                                if($rootScope.isInMeeting){
                                    CustomLog.i('正在会议中，不处理外呼事件');
                                    return;
                                }
                                var appElement = document.querySelector('[ng-controller=rootCtr]');
                                var $scopeMeetingList = angular.element(appElement).scope();
                                var  incommingItem = {};
                                incommingItem.nube = account;
                                incommingItem.nickName = accountName;
                                incommingItem.meetingID = meetingID;
                                if ($scopeMeetingList.isNowInccomingCall){
                                    // 缓存外呼信息
                                    $scopeMeetingList.inviteArray.push(incommingItem);
                                    return;
                                }
                                $scopeMeetingList.isNowInccomingCall = true;
                                $rootScope.incommingItem = incommingItem;
                                $scopeMeetingList.showInviteMask = true;
                                $scopeMeetingList.showInvieteDialog = true;
                                $scopeMeetingList.startPlay();
                                $scopeMeetingList.$apply();
                            })
                            invite.setMeetingInvite(minvite);
                            // accounts ,meetingid,accountID,accountName
                            //   var obj = { "accounts":["61000082"] };
                            //  var str = JSON.stringify(obj)
                            //var  result =  minvite.invite(str,'1234566','90502156','hello');
                            //$rootScope.meetingInvte = invite;
                        });
                    } else {
                       // $scope.btnclass = 'input_btn';
                      //  $scope.$apply();
                        $scope.disableStep2 = false;
                        console.log("connect onInit faile, statusCode:"+ statusCode + ",configPath:" + configPath);
                        CustomLog.e("connect onInit faile, statusCode:"+ statusCode + ",configPath:" + configPath);
                    }


                }else {
                    //$scope.btnclass = 'input_btn';
                    //$scope.$apply();
                    console.log("数据库初始化失败");
                    CustomLog.e('数据库初始化失败 '+result);
                    $scope.disableStep2 = false;
                }
            });
            contactManagerSerice.setContactManager(contactManagemodel);
        });
        login4Mobile.on("error",function(result){
            $scope.disableStep2 = false;
            CustomLog.i('登录失败' + result);
            $scope.step2class = 'input_btn nextbtn ';
            $scope.$apply();
            console.log("----------"+result);
        });



    }

    function ninameChange(){
      var nickname =  $scope.nick_name;
        var strlen = 0;
        var  pre = 0;
        for(var i = 0;i < nickname.length; i++)
        {
            pre = strlen;
            if(nickname.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
            {
                strlen += 2;
            }
            else
            {
                strlen++;
            }
            if (strlen > 10){
                nickname = nickname.substr(0,pre - 1);
                $scope.nick_name = nickname;
                CustomLog.d('昵称有英文和数字组成，最多支持10个字符');
                $scope.showNamerror = true;
                $scope.nameError = '昵称有英文和数字组成，最多10个字符';
                showTips(function(){
                    $scope.showNamerror = false;
                    $scope.$apply();
                });
                $scope.$apply();
                return;
            }
        }


    }

    function chkstrlen(str)
    {
        var strlen = 0;
        for(var i = 0;i < str.length; i++)
        {
            if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
                strlen += 2;
            else
                strlen++;
        }
        return   strlen;
    }

    function queryElement(j){
        for (i = 1; i<=3;i++){
            var item1id = document.getElementById("list"+i);
            var checkEle = angular.element(item1id);
            if (i==j){
                checkEle.addClass('current');
            }else {
                checkEle.removeClass('current');
            }

        }

    }

}])


function reglengthchange( value ){
    var ele = document.getElementById('regnickid');
    var str = value;
    var strlen = 0;
    var  count = 0;
    for(var i = 0;i < str.length; i++)
    {
        count++;
        if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
            strlen += 2;
        else
            strlen++;
        if (strlen > 10){

            ele.value = ele.value .substr(0,count-1);
            return;
        }
    }
}