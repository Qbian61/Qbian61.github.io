/**
 * Created by admin on 2016/5/30.
 */
angular.module('justMeeting.resetPass',['ngRoute','loginInfo','utilsService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/resetPass', {
            templateUrl: 'src/view_controllers/Login/resetPass.html'
        });
    }])
    .controller('resetPass',['$scope','$location','accountInfo','$timeout','$interval','locals','CustomLog',function($scope,$location,accountInfo,$timeout,$interval,locals,CustomLog){


        $scope.exitBtn = function(){

            $location.path('/LoginView');
            var ipc = require('electron').ipcRenderer;
            ipc.send('sizechange',400,400,false);
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
        $scope.resetPwd =  function (){
            $scope.phone = document.getElementById('phoneret').value;
            $scope.sms_code = document.getElementById('msg_code').value;
            var  phone = $scope.phone;
            var  sms_code = $scope.sms_code;
            var  password = $scope.password;
            var  conformpwd = $scope.conformpwd;
            if ($scope.phone==''||$scope.phone == undefined){
             $scope.showphoeError = true;
                 $scope.phoneError = '请输入手机号';
              showTips(function(){
                  $scope.showphoeError = false;
              })  ;
                return;
            }
            if($scope.phone.length < 11|| $scope.phone.charAt(0) != '1'){
                $scope.showphoeError = true;
                $scope.phoneError = '请输入正确的手机号';
                showTips(function(){
                    $scope.showphoeError = false;
                    $scope.$apply();
                })  ;
                return;
            }
            if (($scope.sms_code==''||$scope.sms_code == undefined)){
                $scope.showSmsError = true;
                $scope.smsError = '请输入验证码'
                showTips(function(){
                    $scope.showSmsError = false;
                    $scope.$apply();
                })
                return;
            }
            if ($scope.sms_code.length < 6){
                $scope.showSmsError = true;
                $scope.smsError = '验证码由六位数字组成'
                showTips(function(){
                    $scope.showSmsError = false;
                    $scope.$apply();
                })
                return;
            }

            if ($scope.password==''||$scope.password == undefined){
                $scope.showPwdError = true;
                $scope.pwdError = '请输入密码';
                showTips(function(){
                    $scope.showPwdError = false;
                    $scope.$apply();
                });
                return;
            }
            if($scope.password.length < 6){
                $scope.showPwdError = true;
                $scope.pwdError = '密码由6位数字组成';
                showTips(function(){
                    $scope.showPwdError = false;
                    $scope.$apply();
                });
                return;
            }
            //if ($scope.conformpwd==''||$scope.conformpwd == undefined){
            //
            //    return;
            //}
            //if($scope.conformpwd.length < 6){
            //    return;
            //}
            if($scope.conformpwd !== $scope.password){
                $scope.showCpwdError = true;
                $scope.cpdError = '两次密码输入不一致';
                showTips(function(){
                    $scope.showCpwdError = false;
                    $scope.$apply();
                });
                return;
            }
            const  ResetPassword = require("./src/data_center/UserCenter/ResetPassword.js");

            var  resetpwd = new  ResetPassword();


            var result = resetpwd.resetPassword(phone,sms_code,accountInfo.md5Str(conformpwd),'prod002');
            CustomLog.i('重置密码同步返回结果 '+ result);
            if (result < 0){
                return;
            }
            $scope.savaclass = 'input_btn waiting';
            resetpwd.on("success",function(ob){
                CustomLog.i('重置密码成功 '+ ob);
            /*    ob.appId = (bodyObject.appId == null?"":bodyObject.appId);
                ob.appType = (bodyObject.appType == null?"":bodyObject.appType);
                ob.mobile = (bodyObject.mobile == null?"":bodyObject.mobile);
                ob.nubeNumber = (bodyObject.nubeNumber == null?"":bodyObject.nubeNumber);
                ob.prod002 = (bodyObject.prod002 == null?"":bodyObject.prod002);
                ob.productId = (bodyObject.productId == null?"":bodyObject.productId);
                ob.uid = (bodyObject.uid == null?"":bodyObject.uid);
               */
                console.log('重置密码成功');
                $scope.savaclass = 'input_btn';
                locals.set('passWord','');
                $location.path('/LoginView');
                $scope.$apply();
            });
            resetpwd.on("error",function(code,des){
                CustomLog.i('重置密码失败 '+ code +' '+des);
                $scope.savaclass = 'input_btn';
                $scope.$apply();
                var msg = '';
                if (code == "-406"){
                    msg = '验证码不正确';
                }
                if(code == "-11"){
                    msg = '网络异常，请稍后再试';
                }
                else
                {
                    msg = des;
                }
                $scope.showSmsError = true;
                $scope.smsError = msg;
                $scope.$apply();
                showTips(function(){
                    $scope.showSmsError = false;
                    $scope.$apply();
                })
                console.log('重置密码失败',code,des);
            });

        }
        $scope.btnTitle = '获取验证码';
        $scope.sendCodeForResetPwd = function(){
            if($scope.phone ==''||$scope.phone == undefined){
                $scope.showphoeError = true;
                $scope.phoneError = '请输入手机号';
                showTips(function(){
                    $scope.showphoeError = false;
                    $scope.$apply();
                })
                return;
            }
            if($scope.phone.length < 11){
                $scope.showphoeError = true;
                $scope.phoneError = '请输入正确的手机号';
                showTips(function(){
                    $scope.showphoeError = false;
                    $scope.$apply();
                })
                return;
            }


            const  Sendcode = require("./src/data_center/UserCenter/SendCodeForResetPwd.js");

            var  sendcode = new  Sendcode();

         var  result =  sendcode.sendCodeForResetPwd($scope.phone,null,"prod002");
            CustomLog.i('发送验证码同步返回' + result);
            if (result < 0){
                return;
            }
            $scope.smsbtnclass = 'input_btn waiting';
            sendcode.on("success",function(ret){
                CustomLog.i('发送验证码成功 '+ret);
                $scope.cansend = true;
                $scope.$apply();
                var  count = 59;
                var timer = $interval(
                    function() {

                        $scope.btnTitle = '重新获取'+count;
                       // $scope.$apply();
                        if (count == 0){
                            $interval.cancel(timer);
                            $scope.btnTitle = '获取验证码';
                            $scope.cansend = false;
                            $scope.smsbtnclass = 'input_btn';
                            return;
                         //   $scope.$apply();
                        }
                        count--;

                    },
                    1000
                );

                console.log('发送验证码成功'+ret);
            });
            sendcode.on("error",function(errorcode,des){
                CustomLog.i('发送验证码失败 '+ errorcode +' '+ des);
                $scope.smsbtnclass = 'input_btn';
                $scope.$apply();
                //"-93"
                var tip = '';
                if (errorcode == '-93'){
                   tip = '手机号尚未注册';
                }else {
                    tip = des;
                }

                $scope.showphoeError = true;
                $scope.phoneError =tip;
                $scope.$apply();
                showTips(function(){
                    $scope.showphoeError = false;
                    $scope.$apply();
                });
                console.log('发送验证码失败'+errorcode+des);
            });
        }
    }])