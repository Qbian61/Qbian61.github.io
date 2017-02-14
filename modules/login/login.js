define(function(require, exports, module) {
  'use strict';

/**
 * Created by admin on 2016/5/19.
 */
angular.module('justMeeting.LoginView',[/*'ngRoute','justMeeting.justMeeting','loginInfo','justMeeting.reg','justMeeting.resetPass','utilsService','sqliteDB','recordDownload'*/])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/LoginView', {
        templateUrl: 'src/view_controllers/Login/LoginView.html',

    });
}])
.controller('Login',['$scope'/*,'$location','$rootScope','accountInfo','contactManagerSerice','connect','CustomLog','locals','$timeout','invite','getCdnService','sqliteDB_init_Service','recordDownloadManageService'*/,function($scope/*,$location,$rootScope,accountInfo,contactManagerSerice,connect,CustomLog,locals,$timeout,invite,getCdnService,sqliteDB_init_Service,recordDownloadManageService*/)
{
    //$scope.userName = "18211673231";
    //$scope.passWord = "123456";
    // const remote = require('electron').remote;
    // const app = remote.app;
    // const configPath = app.getPath('userData');
    $scope.showRegetConfig = false;
    $scope.showCopyConfig = false;
    $rootScope.account = [];
//获取安装文件目录下的version文件
    // function getVersionDocFromInstall(callback){
    //     var path = getConfigDirFromInstall();
    //     if($scope.showRegetConfig){
    //         return;
    //     }
    //     var errorCode = 0;
    //     var versionStr = '';
    //     CustomLog.i("获取到安装目录下的config路径：" + path);
    //     const versionPath = path + '\\version.txt';
    //     // var fs = require('fs');
    //     if(fs.existsSync(versionPath)){
    //         $scope.showMinMask = false;
    //         $scope.showRegetConfig = false;
    //         fs.readFile(versionPath,function(err,data){
    //             if(err){
    //                 CustomLog.e("读取安装目录下version.txt文件失败" + err);
    //                 errorCode = -2
    //                 callback(errorCode,err);
    //                 return;
    //             }
    //             versionStr = data.toString();
    //             callback(errorCode,versionStr);
    //             CustomLog.i("读取安装目录下version.txt文件成功" + versionStr);
    //         });
    //     }else {
    //         CustomLog.i('安装目录下没有找到version.txt配置文件');
    //         errorCode = -3;
    //         $scope.showMinMask = true;
    //         $scope.showRegetConfig = true;
    //         callback(errorCode,versionStr);
    //     }
    //
    // }
    //获取安装目录config根目录
    // function getConfigDirFromInstall(){
    //     const MeetingConnect =  require("meetingconnect").MeetingConnect;
    //     var  meetingConnect = new  MeetingConnect();
    //     const installPath = meetingConnect.getBinPath();
    //     const installConfigPath = installPath + '\\justmeeting\\config';
    //     var fs = require('fs');
    //     if(!fs.existsSync(installConfigPath)){
    //         CustomLog.i(installConfigPath + '目录不存在');
    //         $scope.showRegetConfig = true;
    //         $scope.showMinMask = true;
    //         return;
    //     }
    //     return installConfigPath;
    //     //const electron = require('electron');
    //     //const remote = require('electron').remote;
    //     //const app = remote.app;
    //     /////app.getVersion()
    //     //var installPath = app.getAppPath();
    //     //CustomLog.i(installPath);
    //     //var path = GetCurrDir(GetCurrDir(installPath));
    //     //CustomLog.i(path);
    //     //return path;
    // }
    //获取用户路径下的版本信息文件信息
    // function getVersionDocFromUser(callback){
    //     const userPath = getConfigDirFromUser();
    //     const versionPath = userPath + '\\version.txt';
    //     var fs = require('fs');
    //     var errCode = 0;
    //     var versionStr = '';
    //     //var iconv = require('iconv-lite');
    //     if(fs.existsSync(versionPath)){
    //         fs.readFile(versionPath,function(err,data){
    //             if(err){
    //                 CustomLog.e("读取用户目录下version.txt文件失败" + err);
    //                 errCode = -2;
    //                 callback(errCode,err);
    //                 return;
    //             }
    //             //var versionStr = iconv.decode(data, 'gbk');
    //             versionStr = data.toString();
    //             CustomLog.i(versionPath + '用户目录下找到version.txt文件'+ versionStr);
    //             callback(errCode,versionStr);
    //         });
    //     }else {
    //         CustomLog.i('用户目录下没有找到version.txt文件');
    //         callback(errCode,versionStr);
    //     }
    //
    // }
    //获取用户目录config根目录
    // function getConfigDirFromUser(){
    //
    //     return configPath;
    // }
    //比较两个目录下的版本号,复制config文件
    // function compareAndCopy(){
    //
    //     getVersionDocFromInstall(function(installErrorCode,installVersion){
    //         if(installErrorCode == 0){
    //             getVersionDocFromUser(function(errCode,userVersion){
    //                 if(errCode == 0){
    //                     if($scope.showRegetConfig){
    //                         return;
    //                     }
    //                     if(userVersion !== installVersion){
    //                         CustomLog.i('用户配置文件版本信息与安装文件不相同，需要拷贝');
    //                         $scope.showCopyConfig = false;
    //                         $scope.showMinMask = false;
    //                         copyCofigFile(function(errorCode){
    //                             if(errorCode == 0){
    //                                 CustomLog.i('拷贝配置文件成功，开始写版本信息文件')
    //                                 var fs = require("fs");
    //                                 const userPath = getConfigDirFromUser();
    //                                 const versionPath = userPath + '\\version.txt';
    //                                 fs.open(versionPath,"w",function(err,fd){
    //                                     if(err){
    //                                         CustomLog.e("打开用户目录下版本信息文件失败" + err);
    //                                         $scope.showCopyConfig = true;
    //                                         $scope.showMinMask = true;
    //                                         return;
    //                                     }
    //                                     var buf = new Buffer(installVersion);
    //                                     fs.writeSync(fd,buf,0,buf.length,0);
    //                                     CustomLog.i('写version.txt文件成功');
    //                                     getNps();
    //                                 });
    //                             }else{
    //                                 CustomLog.e('写版本信息文件失败'+errorCode);
    //                                 $scope.showCopyConfig = true;
    //                                 $scope.showMinMask = true;
    //                             }
    //                         });
    //                     }
    //                     else {
    //                         CustomLog.i('配置文件版本信息相同，不需要拷贝');
    //                         getNps();
    //                     }
    //                 }else {
    //                     CustomLog.e("读取用户version信息失败" + errCode);
    //                 }
    //             });
    //         }else {
    //             CustomLog.e("读取安装version信息失败");
    //         }
    //     });
    // }
//复制文件
    // function copyCofigFile(copyback){
    //     var fs = require( 'fs' ),
    //         stat = fs.stat;
    //     var errorCode = 0;
    //     /*
    //      * 复制目录中的所有文件包括子目录
    //      * @param{ String } 需要复制的目录
    //      * @param{ String } 复制到指定的目录
    //      */
    //     var src = getConfigDirFromInstall();
    //     CustomLog.i('得到安装目录下的config目录'+src);
    //     var dst = getConfigDirFromUser() + '\\config';
    //     CustomLog.i('得到用户目录下的config目录'+dst);
    //     var copy = function( src, dst ){
    //         // 读取目录中的所有文件/目录
    //         fs.readdir( src, function( err, paths ){
    //             if( err ){
    //                 $scope.showCopyConfig = true;
    //                 $scope.showMinMask = true;
    //                 CustomLog.e('读取安装配置文件错误'+ err);
    //                 errorCode = -1;
    //                 throw err;
    //             }
    //             paths.forEach(function( path ){
    //                 var _src = src + '\\' + path,
    //                     _dst = dst + '\\' + path,
    //                     readable, writable;
    //                 stat( _src, function( err, st ){
    //                     if( err ){
    //                         $scope.showCopyConfig = true;
    //                         $scope.showMinMask = true;
    //                         CustomLog.e('查看配置文件状态错误'+ err);
    //                         errorCode = -2;
    //                         throw err;
    //                     }
    //                     // 判断是否为文件
    //                     if( st.isFile() ){
    //                         // 创建读取流
    //                         readable = fs.createReadStream( _src );
    //                         // 创建写入流
    //                         writable = fs.createWriteStream( _dst );
    //                         // 通过管道来传输流
    //                         readable.pipe( writable );
    //                     }
    //                     // 如果是目录则递归调用自身
    //                     else if( st.isDirectory() ){
    //                         exists( _src, _dst, copy );
    //                     }
    //                 });
    //             });
    //         });
    //     };
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
        // var exists = function( src, dst, callback ){
            fs.exists( dst, function( exists ){
                // 已存在
                if( exists ){
                    CustomLog.i('用户已经存在目标目录');
                    callback( src, dst );
                }
                // 不存在
                else{
                    CustomLog.i('不存在目标目录，创建目标目录');
                    fs.mkdir( dst, function(){
                        callback( src, dst );
                    });
                }
            });
        };
// 复制目录
    //     exists( src, dst, copy );
    //     copyback(errorCode);
    // }
    //function GetCurrDir(pathName){
    //    var DirName = pathName == '' ? '' : pathName.substring(0, pathName.lastIndexOf('\\'));
    //    var reg=new RegExp("%20","g");
    //    return DirName.replace(reg, " ");//替换空格
    //}
//     $scope.regetConfig = function(){
//         $scope.showRegetConfig = false;
//         $scope.showCopyConfig = false;
//         $scope.showMinMask = false;
//         compareAndCopy();
// }
    // $scope.btnclass = 'input_btn';
    // if (locals.get('userName','')!=''){
    //     $scope.userName = locals.get('userName','');
    // }else
    // {
    //     $scope.userNamePlaceholder = "请输入用户名";
    //
    // }
    // if (locals.get('passWord')!=''){
    //     $scope.passWord = locals.get('passWord','');
    //
    // }else {
    //     $scope.passwordPlaceholder = "请输入密码";
    //
    // }

    $rootScope.quit = function(){
        // window-all-close
        CustomLog.i("按退出应用按钮，关闭应用。");
        var ipc = require('electron').ipcRenderer;
        ipc.send('window-all-close');
    }
    $rootScope.min_click = function(){
        var ipc = require('electron').ipcRenderer;
        ipc.send('minimize');
    }
    $rootScope.max_click = function(){
        var ipc = require('electron').ipcRenderer;
        ipc.send('maximize');
    }

//获取系统盘剩余空间
    $scope.showFreeSystemSpace = false;
    function getFreeSystemSpace(){
        CustomLog.i("进行系统磁盘空间检测");
        const MeetingConnect =  require("meetingconnect").MeetingConnect;
        const freeSystemSpaceSize = MeetingConnect.getfreespacesize('c:');
        CustomLog.i('磁盘剩余空间为：' + freeSystemSpaceSize + 'M');
        if(freeSystemSpaceSize < 300){
            $scope.showFreeSystemSpace = true;
            $scope.showMinMask = true;
            CustomLog.i("系统盘空间小于300M");
            //$scope.$apply();
            return;
        }
        //启动应用拷贝配置文件
        compareAndCopy();
    }

//重新获取磁盘空间
    $scope.regetFreeSize = function(){
        const MeetingConnect =  require("meetingconnect").MeetingConnect;
        const freeSize = MeetingConnect.getfreespacesize('c:');
        CustomLog.i('重新获取磁盘空间：' + freeSize);
        if (freeSize < 300){
            $scope.showFreeSystemSpace = true;
            CustomLog.i("系统盘空间小于300M");
            //$scope.$apply();
            return;
        }
        $scope.showFreeSystemSpace = false;
        $scope.showMinMask = false;
        compareAndCopy();
        //$scope.$apply();
    }

    // 获取nps
    function  getNps(){

        // 如果调用过，就不知获取nps
        if($rootScope.isGetNps === true){
            CustomLog.d('nps isget');
            // 直接显示登陆界面
            $scope.showUpdate = false;
            $scope.showLgoin = true;
            $scope.$apply();
            return;
        }

        const AcquireParameter = require("./src/data_center/MeetingManage/AcquireParameter.js");
        var acquireParameter = new AcquireParameter();
        const ConstConfig = require("./src/data_center/Config/ConstConfig.js")
        var result = acquireParameter.acquire("X1MeetingCommon|X1MeetingAppUpdate|X1MeetingMediaPlay|X1MeetingHelp|JustMeetingLogUpload",
            ConstConfig.deviceType,ConstConfig.serelizednumber);
        CustomLog.i('获取nps 同步返回结果 '+result);
        if(result < 0){
            CustomLog.i('获取nps 同步失败返回结果 '+result);
            return;
        }
        $scope.showUpdate = true;
        acquireParameter.on("success", function(result) {
            $rootScope.isGetNps = true;

            $scope.$apply();
            CustomLog.i('获取nps 异步返回成功 '+result);

            const  ConstConfig = require("./src/data_center/Config/ConstConfig.js");
            ConstConfig.setMasterBmsWebDomain(result.X1MeetingCommon.MS_URL);
            ConstConfig.setSlaveBmsWebDomain(result.X1MeetingCommon.SLAVE_MS_URL);
            CustomLog.i('MS_URL'+result.X1MeetingCommon.MS_URL);
            ConstConfig.setEnterPriseUserCenterWebDomain(result.X1MeetingCommon.EUC_URL);
            CustomLog.i('EUC_URL'+result.X1MeetingCommon.EUC_URL)
            ConstConfig.setPersonalUserCenterWebDomain(result.X1MeetingCommon.PUC_URL);
            CustomLog.i('PUC_URL'+result.X1MeetingCommon.PUC_URL);
            ConstConfig.setPersonalContactWebDomain(result.X1MeetingCommon.Persion_Contact_URL);
            CustomLog.i('Persion_Contact_URL '+result.X1MeetingCommon.Persion_Contact_URL);
            ConstConfig.setMasterAppUpdateServerWebDomain(result.X1MeetingAppUpdate.ServerUrl);
            ConstConfig.setSlaveAppUpdateServerWebDomain(result.X1MeetingAppUpdate.SLAVE_ServerUrl);
            CustomLog.i('ServerUrl '+ result.X1MeetingAppUpdate.ServerUrl);
            ConstConfig.setUploadImgWebDomain(result.X1MeetingCommon.Head_Upload_URL);
            CustomLog.i('Head_Upload_URL '+result.X1MeetingCommon.Head_Upload_URL);
            ConstConfig.setFavoriteWebDomain(result.X1MeetingCommon.Favorite_Server_Url);
            CustomLog.i('Favorite_Server_Url '+result.X1MeetingCommon.Favorite_Server_Url);
            ConstConfig.setCdnWebDomain( result.X1MeetingCommon.CDN_Server_Url);
            CustomLog.i('CDN_Server_Url '+ result.X1MeetingCommon.CDN_Server_Url);
            CustomLog.i(ConstConfig.getCDNAuthorizeUrl());
            checkUpdate();
        });

        $scope.popMsg = "";
        acquireParameter.on("error", function(errorCode, errorDesciption){
            $scope.showRegetNps = true;
            if(errorCode == -11){
                $scope.popMsg = '网络异常，请重试';
            }else {
                $scope.popMsg = '启动失败，请重试';
            }
            $rootScope.isGetNps = false;
            $scope.showUpdate = false;
            $scope.$apply();
            CustomLog.e(errorCode+' '+errorDesciption);

        });


    }

    $scope.regetNps = function(){
        getNps();
        $scope.showRegetNps = false;
    }
    // 检测更新
    function  checkUpdate(){
        const CheckAppVersion = require("./src/data_center/VersionUpdate/CheckAppVersion.js");
        var checkAppVersion = new CheckAppVersion();
        const electron = require('electron');
        const remote = require('electron').remote;
        const app = remote.app;
        ///app.getVersion()
        var  vision = 'v'+ app.getVersion();
        CustomLog.i('vision ' + vision );
      //  alert(vision);
        const configPath = app.getPath('userData');
        var path = configPath+'\\download\\ButelDeskTopSetup'+vision+'.exe';
        var fs = require('fs');
        if (fs.existsSync(path)){
            // 存在已经更新过的文件，删除掉
            CustomLog.d('存在已经更新过的文件，删除掉更新包');
            fs.unlink(path);
        }
        var result = checkAppVersion.checkAppVersion(vision,"cn.redcdn.justmeetingpc","PC","justmeeting","1464612735");
        CustomLog.i('检测更新同步返回结果 '+ result);
        if(result < 0){
            CustomLog.i('检测更新同步失败返回结果' + result);
            return;
        }
        checkAppVersion.on("success", function(vo) {
            CustomLog.i('检测更新异步返回成功 '+vo);
            if (vo.result.rc === 1){
                // 显示升级框
                CustomLog.d('存在升级包，需要升级');

                // 检测本地是否存在更新文件
                var  rootPath =configPath+ '\\download\\ButelDeskTopSetup';
                var  updatePath = rootPath + vo.response.version+'.exe';
                $scope.vision = vo.response.version;
                $scope.downloadPath = updatePath;
                $scope.rootPath = rootPath;
                $scope.installCode = vo.response.installerCode;
                $scope.vo = vo;
                var fs = require('fs');
                if (fs.existsSync(updatePath)){
                    // 存在本地更新文件
                    CustomLog.i('本地存在已经下载的更新包,开始进行hashcode 校验');
                    const  sha1file = require("./src/data_center/sha1file.js");
                    sha1file(updatePath, function (error, sum) {
                        if (error) return console.log(error);
                        if (sum == vo.response.installerCode){
                            // 显示安装框
                            $scope.showupdateforce = true;
                            $scope.showMinMask = true;
                            $scope.showUpdate = false;

                            $scope.$apply();
                            CustomLog.i('更新包校验成功 ，显示更新弹框');
                        }else {
                            downLoad(vo.response.installer,rootPath,vo.response.version);
                            CustomLog.i('更新包校验不一直 ，显示更新弹框');
                            $scope.showUpdate = false;
                            $scope.$apply();
                        }
                    })
                }else {
                    $scope.showUpdate = false;
                    $scope.$apply();
                    downLoad(vo.response.installer,rootPath,vo.response.version);

                }
            }else {
                //需要调用登录过程
                CustomLog.d('不需要升级');
                $scope.showUpdate = false;
                $scope.showLgoin = true;
                $scope.$apply();
            }
        });
        checkAppVersion.on("error",function(result , des){
            CustomLog.e('检测更新版本失败 '+result+' '+des);
            $scope.showUpdate = false;
            $scope.showLgoin = true;
            $scope.$apply();

        });
    }

     function downLoad(url,path ,vision){

         $scope.showprogress = true;
         $scope.showMinMask = true;
         if($scope.isNotNeedApplay == true){

         }else {
             $scope.$apply()
         }
       //  $scope.progress = '0%';
        const HttpFileDownload = require("./src/data_center/UpDownLoad/HttpFileDownload.js");

        var  download = new  HttpFileDownload();
           // vo.response.installer,
          // rootPath+vo.response.version+'.exe'
         var result =  download.download(url,
             path+vision+'.exe');
        CustomLog.i('下载接口同步结果 '+ result);
//'http://dzs.qisuu.com/txt/17203.txt'

        download.on("transfer_encoding", function(transfer_encoding) {

            CustomLog.d("download type:" + transfer_encoding);
        });

         if($scope.isNotNeedApplay == true){

         }else {
             $scope.extraStyle = {
                 "width":0
             };
             $scope.$apply()
         }
        download.on("percent", function(percent) {
            $scope.progress = ''+percent+'%';

            $scope.extraStyle = {
                "width":$scope.progress
            };

            $scope.$apply();
            console.log(percent + "%");
        });

        download.on("success", function(info) {
            // 下载完成
            CustomLog.i(info+" download complete.");
            // 弹出安装框
            const  sha1file = require("./src/data_center/sha1file.js");
            sha1file( $scope.downloadPath, function (error, sum) {
                if (error) return console.log(error);
                if (sum ==  $scope.installCode){
                    // 启动安装程序
                    //   alert("下载文件正确");
                    CustomLog.i('下载文件正确 '+sum+$scope.installCode);
                    $scope.showupdateforce = true;
                    $scope.showprogress = false;
                    $scope.showMinMask = true;
                    $scope.showUpdate = false;
                    $scope.$apply();
                }else {
                   // 弹出下载错误安装包，重新下载
                 //    alert("下载文件错误");
                    CustomLog.i('下载文件错误 hashcode 不一致 '+sum+' '+$scope.installCode);
                    $scope.showprogress = false;
                    $scope.showMinMask = true;
                    $scope.showRedownload = true;
                    $scope.showUpdate = false;
                    var fs = require('fs');
                    var  deletpath = path+vision+'.exe';
                    if (fs.existsSync(deletpath)){
                        // 存在已经更新过的文件，删除掉
                        fs.unlink(deletpath);
                        CustomLog.i('下载文件错误删除文件');
                    }
                    $scope.$apply();
                }

            })
        });

        download.on("error", function(statusCode,statusDescription) {
            CustomLog.i(statusCode,statusDescription);
            // 弹出错误安装包从新下载
            if(statusCode == -19){
                CustomLog.i(statusCode,statusDescription);
            }else if (statusCode == -11){
                CustomLog.i(statusCode,statusDescription);
            }else {
                // 删除本地文件
                if(statusCode == -18){
                    $scope.progress = ''+0+'%';

                    $scope.extraStyle = {
                        "width":$scope.progress
                    };

                    $scope.$apply();
                }
                var fs = require('fs');
                var  deletpath = path+vision+'.exe';
                if (fs.existsSync(deletpath)){
                    // 存在已经更新过的文件，删除掉
                    fs.unlink(deletpath);
                }
            }
            $scope.showprogress = false;
            $scope.showMinMask = true;
            $scope.showRedownload = true;
            $scope.$apply();
        });

    }

//检测系统磁盘空间
    getFreeSystemSpace();
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


    //监听录制文件下载进度
    $rootScope.getDownloadProcess = function(eventTpye,process,des,currentDownloadFile){
        $rootScope.currentDownloadFile = currentDownloadFile;
        switch (eventTpye){
            case 1:
                $rootScope.downloadProcess = process + '%';
                break;
            case 2:
                $rootScope.downloadProcess = process + '%';
                break;
            case 3:
            case 4:
                CustomLog.i("正在转换格式" + eventTpye + des + process);
                $rootScope.downloadProcess = '100%';
                break;
            case 5:
                CustomLog.i("下载完成" + eventTpye + des + process);
                $rootScope.isShowProcess = false;
                recordDownloadManageService.getDownloadTaskLists(function(errcode,err,res){
                    if(errcode == 0){
                        $rootScope.downloadTasks = res;
                    }
                });
                break;
            case 6:
                CustomLog.i("下载失败");
                $rootScope.isShowProcess = false;
                recordDownloadManageService.getDownloadTaskLists(function(errcode,err,res){
                    if(errcode == 0){
                        $rootScope.downloadTasks = res;
                    }
                });
                break;
            default:
                break;
        }


    }

    $scope.isShowShade = false;
    $scope.loginWithPwd = function (){
       if( $scope.btnclass == 'waiting input_btn'){
           return;
       }
        $scope.isShowShade = true;
                 var os=require('os');
                CustomLog.i('系统信息：---------------');
                CustomLog.i('cpu 信息 '+ JSON.stringify(os.cpus()));
                CustomLog.i('free system memory '+(os.freemem()/(1024*1024))+' m');
                CustomLog.i('platform '+os.platform());
                CustomLog.i('操作系统版本 '+os.release());
                CustomLog.i('系统总共内存  '+(os.totalmem()/(1024*1024))+' m');
                CustomLog.i('操作系统名字 '+os.type());
                CustomLog.i('CPU architecture '+os.arch());
                CustomLog.i('系统信息: ---------------')
                $scope.userName = document.getElementById('username').value;
             if ($scope.userName ==''||$scope.userName == undefined){
                 CustomLog.d('账号名为空');
                 $scope.isShowShade = false;
                 $scope.showNameError = true;
                 $scope.nameError = "请输入账号"
                 showTips(function(){
                     $scope.showNameError = false;
                     $scope.$apply();
                 });
                 return;
             }
             if ($scope.passWord ==''||$scope.passWord == undefined){
                 $scope.isShowShade = false;
                 $scope.showPassError = true;
                 $scope.pwdError = "请输入密码";
                 showTips(function(){
                     $scope.showPassError = false;
                     $scope.$apply();
                 })
                 CustomLog.d('请输入密码');
                 return;
             }
             if ($scope.userName.length < 8 ||($scope.userName.length>8 && $scope.userName.length <11) ){
                 $scope.isShowShade = false;
                    CustomLog.d('请输入正确的手机号或视讯号');
                 $scope.showNameError = true;
                 $scope.nameError = "请输入正确的手机号或视讯号"
                 showTips(function(){
                     $scope.showNameError = false;
                     $scope.$apply();
                 });
                 return;
             }
            if($scope.userName.length === 11 && !(/^1[3|4|5|7|8]\d{9}$/.test($scope.userName))){
                $scope.isShowShade = false;
                $scope.showNameError = true;
                $scope.nameError = "请输入正确的手机号"
                showTips(function(){
                    $scope.showNameError = false;
                    $scope.$apply();
                });
                return;
            }
             if ($scope.passWord.length < 6){
                 $scope.isShowShade = false;
                 $scope.showPassError = true;
                 $scope.pwdError = "密码由6位数字组成";
                 showTips(function(){
                     $scope.showPassError = false;
                     $scope.$apply();
                 })
                 CustomLog.d('密码由6位数字组成');
                 return;
             }
        const  Login4Mobile = require("./src/data_center/EnterpriseCenter/Login4Mobile.js");

        var  login4Mobile = new  Login4Mobile(); // $scope.passWord

       var  result = login4Mobile.getLogin($scope.userName,accountInfo.md5Str($scope.passWord));
        CustomLog.i('登录同步返回结果 '+result);
        if (result < 0){
            CustomLog.i('登录同步失败'+result);
            return;
        }
        $scope.btnclass = 'waiting input_btn';
        $scope.canLogin = true;
        login4Mobile.on("success",function(account){
	    getCdnService.getCDNToken(account);
            //input_btn
            $rootScope.account = account;
            var  meetinginvate =  require("meetingconnect").MeetingInvite;
            var  minvite = new  meetinginvate();
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
            locals.set('userName',$scope.userName);
            locals.set('passWord',$scope.passWord);
            const ContactManageModule = require("./src/contact_manager/ContactManager.js");
            var contactManagemodel = new ContactManageModule();
            accountInfo.setAccountInfo(account);

            var dataBasesPath = configPath + '\\databases\\justMeeting.db';
            var fs = require('fs');
            if(!fs.existsSync(configPath + '\\databases')){
                fs.mkdirSync(configPath + '\\databases');
            }
            //创建录制文件存储目录
            createRecordDownloadDirectory();
            //数据库初始化
            sqliteDB_init_Service.init(dataBasesPath,3,accountInfo.getAccountInfo().nube,function(dbresult,errcode,err){
                if (dbresult == 0){
                    CustomLog.i("数据库初始化成功"+ sqliteDB_init_Service.accountNube);
                    // accountId, token, initCallback
                    recordDownloadManageService.init($rootScope.getDownloadProcess);
                    contactManagemodel.init(accountInfo.getAccountInfo().nube,accountInfo.getAccountInfo().accessToken,function(result){
                        if(result === 0){
                            const MeetingConnect =  require("meetingconnect").MeetingConnect;
                            var  meetingConnect = new  MeetingConnect();
                            const Consfig = require('./src/data_center/Config/ConstConfig.js');
                            CustomLog.i("bin + "+meetingConnect.getBinPath());
                            meetingConnect.setToken(accountInfo.getAccountInfo().accessToken);
                            var  fs = require('fs');
                            var file = fs.createWriteStream(configPath+"\\config\\MediaFramework.txt");
                            file.write(meetingConnect.getBinPath()); //文件中写入mediaframework.dll所在目录
                            file.end();

                            var  status =  meetingConnect.init(account.nubeNumber,configPath+'\\config',configPath+'\\data',configPath+'\\resource',configPath+'\\log',Consfig.getNpsWebDomain()+'/nps_x1/',Consfig.getNpsWebDomain()+'/nps_x1/',Consfig.serelizednumber,meetingConnect.getBinPath());
                    CustomLog.i('meetingConnect 初始化同步返回结果 '+status);
                    if (status == 0){
                        meetingConnect.on("init", function(statusCode, configPath) {
                            CustomLog.i("connect onInit, statusCode:"+ statusCode + " " + configPath);
                            if (statusCode == 0){
                                connect.setMeetingConnect(meetingConnect);
                               // $scope.$apply();

                                minvite.init();
                                minvite.on("invite",function(functionname,statusCode,des){
                                    CustomLog.i('发起邀请 '+ statusCode +' '+ des);
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
                                    var isfind = false;
                                    for(var i = 0;i <  $scopeMeetingList.inviteArray.length;i++){
                                        var item = $scopeMeetingList.inviteArray[0];
                                        if(item.nube ===  incommingItem.nube && incommingItem.meetingID == item.meetingID){
                                            CustomLog.i('已结包含了外呼，不再添加');
                                            isfind  = true;
                                            return;
                                        }
                                    }
                                    if(isfind == false){
                                        $scopeMeetingList.inviteArray.push(incommingItem);
                                    }
                                    if ($scopeMeetingList.isNowInccomingCall){
                                        // 缓存外呼信息
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
                                $location.path('/JustMeeting/DefaultView');
                                $scope.$apply();
                            }else {
                                $scope.isShowShade = false;
                                CustomLog.i('meetingConnect 初始化失败 statusCode '+ statusCode+' '+configPath);
                                $scope.isShowToast =true;
                                $scope.toastMsg = '登录失败，请重试';
                                $scope.$apply();
                                showTips(function(){
                                    $scope.isShowToast = false;
                                })
                            }
                            $scope.btnclass = 'input_btn';
                            $scope.isShowShade = false;
                            // 注释掉meetingInvite 报错
                            $scope.canLogin = false;
                            $scope.$apply();

                        });
                    } else {
                        $scope.isShowShade = false;
                        $scope.btnclass = 'input_btn';
                        $scope.$apply();
                      //  CustomLog.e("connect onInit faile, statusCode:"+ statusCode + ",configPath:" + configPath);
                      CustomLog.i('meetingConnect 初始化同步失败 '+ status);
                        $scope.isShowToast =true;
                        $scope.toastMsg = '登录失败，请重试';
                        $scope.$apply();
                        showTips(function(){
                            $scope.isShowToast = false;
                        })
                        $scope.canLogin = false;
                        $scope.$apply();
                    }

                }else {
                    $scope.isShowShade = false;
                    $scope.btnclass = 'input_btn';
                    $scope.isShowToast =true;
                    $scope.toastMsg = '登录失败，请重试';
                    $scope.$apply();
                    showTips(function(){
                        $scope.isShowToast = false;
                    })
                    $scope.$apply();
                    CustomLog.e('数据库初始化失败 '+result);
                    $scope.canLogin = false;
                    $scope.$apply();
                }
            ;
            });
            contactManagerSerice.setContactManager(contactManagemodel);
                }else {
                    $scope.isShowShade = false;
                    $scope.btnclass = 'input_btn';
                    $scope.isShowToast =true;
                    $scope.toastMsg = '登录失败，请重试';
                    $scope.$apply();
                    showTips(function(){
                        $scope.isShowToast = false;
                    })
                    $scope.$apply();
                    CustomLog.e('数据库初始化失败 '+dbresult + errcode+ err);
                    $scope.canLogin = false;
                    $scope.$apply();
                }

            });
        });
        login4Mobile.on("error",function(result,des){
            $scope.isShowShade = false;
            $scope.canLogin = false;
            $scope.$apply();
            var msg = '登录失败，请重试';
            if (result == "-93"){
                CustomLog.i("该账号不存在");
                //$scope.showNameError = true;
                //$scope.nameError = "该账号不存在";
                //$scope.$apply();
                //showTips(function(){
                //    $scope.showNameError = false;
                //    $scope.$apply();
                //});
                msg = '该账号不存在';
            }
            if (result == "-2"){
                CustomLog.i("密码错误");
                //$scope.showPassError = true;
                //$scope.pwdError = "密码不正确";
                //$scope.$apply();
                //showTips(function(){
                //    $scope.showPassError = false;
                //    $scope.$apply();
                //})
                //CustomLog.d('密码不正确');
                msg = '密码错误';
            }
            if(result == "-11"){
                CustomLog.i("网络异常");
                msg = '网络异常，登录失败';
            }

            CustomLog.i('登录失败 '+result+' '+ des);

            $scope.toastMsg = msg;
            $scope.isShowToast = true;
            $scope.$apply();
            $scope.btnclass = 'input_btn';
            showTips(function(){
                $scope.isShowToast = false;
            })
            $scope.$apply();


        });

    }

    //function loginInit(invite)

    // 添加按enter 事件
    //var  loginbtn = document.getElementById('login_innner_click');
    window.addEventListener('keyup',loginByEnter);

    function loginByEnter(e){
        if ($scope.showMinMask || $scope.showRegetNps ){
            return;
        }
        // alert('enter');
        if (13 === e.keyCode){
            CustomLog.i('按enter 键，开始登陆');
            $scope.loginWithPwd();
            $scope.$apply();

        }
    }
    //创建录制文件存储目录
    function createRecordDownloadDirectory(){
        var i = configPath.indexOf("AppData");
        var recordDownloadPath = configPath.substring(0,i-1);
        recordDownloadPath += "\\Documents\\ButelmeetingDownloads";
        var fs = require('fs');
        if(!fs.existsSync(recordDownloadPath)){
            fs.mkdirSync(recordDownloadPath);
        }
    }

    function checkAvailable(accountNum,passwdNum){
        if(accountNum.length === 0){
            return "请输入账号";
        }

        if(passwdNum.length === 0){
            return "请输入密码";
        }

        if(isNaN(accountNum)){
            return "请输入正确的手机号或视讯号";
        }

        if(accountNum.length !== 8 && accountNum.length !== 11){
            return "请输入正确的手机号或视讯号";
        }

        if(accountNum.length === 11){
            if(accountNum.charAt(0) !== "1"){
                return "请输入正确的手机号或视讯号";
            }
        }

        if(passwdNum.length < 6){
            return "密码由6位数字组成";
        }
        return "";
    }

    //$scope.install = function(){
    //
    //    const execFile = require('child_process').exec;
    //
    //    execFile( $scope.downloadPath,(err, stdout, stderr) => {
    //        if (err) {
    //            CustomLog.d(err);
    //            return;
    //        }
    //        var ipc = require('electron').ipcRenderer;
    //        ipc.send('window-all-close');
    //        console.log(stdout);
    //    });
    //
    //
    //
    //
    //
    //}


    $scope.isStartSetup = false;
    $scope.install = function(){
        if($scope.isStartSetup === true){
            CustomLog.i('已经启动安装包，不在启动');
            return;
        }
        var fs = require('fs');
        if (!fs.existsSync($scope.downloadPath)){
            CustomLog.i('安装包不存在，显示下载错误，从新下载');
            $scope.showprogress = false;
            $scope.showMinMask = true;
            $scope.showRedownload = true;
            $scope.progress = ''+0+'%';
            $scope.extraStyle = {
                "width":$scope.progress
            };
            return;
        }
        const spawn = require('child_process').spawn;
        const child = spawn($scope.downloadPath, {
            detached:true,
            stdio:'ignore'
        });
        child.on('error', (err) => {
            $scope.isStartSetup = false;
            CustomLog.e('Failed to start child process.');
        });
        child.on('exit',(code) => {
            $scope.isStartSetup = false;
        CustomLog.i('exit the child process');
        });
        child.unref();

        $scope.isStartSetup = true;
        //$scope.$apply();
    //    const execFile = require('child_process').exec;
    //    execFile('start '+'\"\" '+' \"'+ $scope.downloadPath+'\"',(err, stdout, stderr) => {
    //        if (err) {
    //            CustomLog.d(err);
    //            return;
    //        }
    //        $scope.isStartSetup = false;
    //        $scope.$apply();
    //        CustomLog.i(stdout);
    //    });
    //    //$timeout(function(){
    //    //    var ipc = require('electron').ipcRenderer;
    //    //    ipc.send('window-all-close');
    //    //},5000);
    //
    }
    // 下载失败
    $scope.redownLoad = function(){
        $scope.isNotNeedApplay = true;
        downLoad($scope.vo.response.installer,$scope.rootPath,$scope.vo.response.version);
        $scope.showRedownload = false;

    }

    var ipc = require('electron').ipcRenderer;
    ipc.send('sizechange',400,400,false);
    //alert('change');

    $scope.$on("$routeChangeStart",function(event,next,current) {
        window.removeEventListener('keyup',loginByEnter);
        var timer = $timeout(
            function() {
                var ipc = require('electron').ipcRenderer;
                ipc.send('sizechange',1024,600,true);

            },
            100
        )

    })



}])




});
