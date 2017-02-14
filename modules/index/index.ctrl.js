define(function(require, exports, module) {
  'use strict';

  var GetNowMeetings = require('../../common/data_center/MeetingManage/GetNowMeetings');

  function IndexCtrl($scope) {
    $scope.isshowjoinmeeting = false;
    $scope.isShowToast = false;
    $scope.getMeetings = function() {
      var getNowMeetings = new GetNowMeetings();
      console.info('token=' + $scope.token);
      getNowMeetings.getNowMeetings($scope.token);

    };

  }

  IndexCtrl.$inject = ['$scope'];
  module.exports = IndexCtrl;

});
