/**
 * Created by admin on 2016/5/21.
 */
angular.module('justMeeting.AppointMeeting',['ngRoute','justMeeting.MyAppointMeeting','loginInfo'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/AppointMeeting', {
            templateUrl: 'src/view_controllers/meeting/AppointMeeting.html',
            controller: 'AppointMeeting'



        });
    }])
    .controller('AppointMeeting',['$scope','$location','$rootScope','accountInfo',function($scope,$location,$rootScope,accountInfo){
        $scope.createAppoinMeeting = function (){
            var appElement = document.querySelector('[ng-controller=MeetingList]');
            var $scopeMeetingList = angular.element(appElement).scope();

          //  $rootScope.showMask = true;
            var maskeElement = document.querySelector('[ng-controller=JustMeeting]');
            //    alert(maskeElement);
            var $maskScope = angular.element(maskeElement).scope();
            $maskScope.showMask = true;

            const CreateMeeting = require('./src/data_center/MeetingManage/CreateMeeting');
            var  createMeeting = new  CreateMeeting();

            var  topic = $scope.topic;
            var date = $scope.date;
            var  time = $scope.time;
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            var  timetep = Date.parse(date)/1000;
            var  inviteUser = [{"phoneId" :accountInfo.getAccountInfo() .nubeNumber}];
         //   app,topic ,invotedUsers, invotedPhones,token, meetingType, beginDateTime
            createMeeting.createMeeting(ConstConfig.PARAM_APPTYPE_VALUE,topic,inviteUser,"",accountInfo.getAccountInfo().accessToken,2,''+timetep);
            createMeeting.on("success",function(result){
                console.log(result);

          //      $scope.$apply();
                var appointInfo = {};
                appointInfo.meetingID = result.meetingId;
                appointInfo.topic = topic;
                appointInfo.date = date;
                appointInfo.time = time;
                $rootScope.appointInfo = appointInfo;
                $scopeMeetingList.showPath= "src/view_controllers/meeting/MyAppointMeeting.html";
                $scope.$apply();
            });
            createMeeting.on("error",function(errorCode, errorDesciption){
                console.log(errorCode,errorDesciption);
            });

        }
        $scope.exitAppoint = function (){
            var appElement = document.querySelector('[ng-controller=MeetingList]');
            var $scopeMeetingList = angular.element(appElement).scope();
            $scopeMeetingList.isshow = false;
           $scopeMeetingList.showPath = "";
            $scopeMeetingList.showMask = false;
        }
    }])