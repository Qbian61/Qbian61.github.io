/**
 * Created by admin on 2016/5/21.
 */
angular.module('justMeeting.MyAppointMeeting',['ngRoute','loginInfo'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/MyAppointMeeting', {
            templateUrl: 'src/view_controllers/meeting/MyAppointMeeting.html',
            controller: 'MyAppointMeeting'

        });
    }])
    .controller('MyAppointMeeting',['$scope','$location','$rootScope','accountInfo',function($scope,$location,$rootScope,accountInfo){
             $scope.exitMyAppoint = function(){
                 var appElement = document.querySelector('[ng-controller=MeetingList]');
                 var $scopeMeetingList = angular.element(appElement).scope();
                 $scopeMeetingList.isshow = false;
                 $scopeMeetingList.showPath = "";
                 $scopeMeetingList.showMask = false;
             };
        //var appointInfo = {};
        //appointInfo.meetingID = result.meetingId;
        //appointInfo.topic = topic;
        //appointInfo.date = date;
        //appointInfo.time = time;
        var  appointInfo =  $rootScope.appointInfo;
        $scope.meetingId = appointInfo.meetingID;
        $scope.topic = appointInfo.topic;
        $scope.date = (appointInfo.date.getFullYear()+1)+'-'+(appointInfo.date.getMonth()+1)+'-'+(appointInfo.date.getDay());
        $scope.time = (appointInfo.time.getHours()+1 >= 10 ? appointInfo.time.getHours()+1:'0'+(appointInfo.time.getHours()+1))+':'+(appointInfo.time.getMinutes()+1 >= 10 ? appointInfo.time.getMinutes()+1 :'0'+(appointInfo.time.getMinutes()+1 ) );
        $scope.createName = accountInfo.getAccountInfo().nickname;

    }])