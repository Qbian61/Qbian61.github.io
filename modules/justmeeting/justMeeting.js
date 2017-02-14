define(function(require, exports, module) {
  'use strict';
  var GetNowMeetings = require('../../common/data_center/MeetingManage/GetNowMeetings');


 function justMeetingCtrl($scope,$location,$uibModal) {
   $scope.categoryPath = "./modules/meeting/MeetingList.html";

   $scope.joinMeeting = function() {
     var token = document.getElementById('inputMeetingNum').value;
     console.info('token=' + token);
     var getNowMeetings = new GetNowMeetings();
     getNowMeetings.getNowMeetings(token, function(result) {
       result = JSON.parse(result);
      //  console.info(result);
       console.info(result);
       if(result.result.rc === 0) {
        //  $scope.hideMeetingList = false;
         $scope.meetings = result.response.data;
       }

     });
   };








 }

 justMeetingCtrl.$inject = ['$scope', '$location'];
 module.exports = justMeetingCtrl;


});
