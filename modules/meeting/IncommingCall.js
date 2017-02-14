/**
 * Created by admin on 2016/5/30.
 */
angular.module('justMeeting.IncommingCall',['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/IncommingCall', {
            templateUrl: 'src/view_controllers/meeting/IncommmingCall.html',
            controller: 'IncommingCall'
        });

    }])
.controller('IncommingCall',['$scope','$rootScope',function($scope,$rootScope){

    $scope.nube = $rootScope.incommingItem.nube;
    $scope.nickName = $rootScope.incommingItem.nickName;
    $scope.meetingID = $rootScope.incommingItem.meetingID;

    $scope.exitBtn = function(){
        var appElement = document.querySelector('[ng-controller=JustMeeting]');
        var $scopeMeetingList = angular.element(appElement).scope();
        $scopeMeetingList.isshowIncommingCall = false;
        $scopeMeetingList.incommingCalllpath = '';

    }
}])