define(function(require, exports, module) {
  'use strict';
  const userServ = require('../../services/user.serv.js');


  function LoginCtrl($scope, $location, User) {
    $scope.showLgoin = true;

    $scope.loginWithPwd = function() {
      console.info('username='+$scope.userName+',password='+$scope.passWord);
      User.save({username: $scope.userName, password: $scope.passWord}, function(resp) {
        console.info(resp);
        // $location.path('index');
        $location.path('meeting');
      });

    };

    $scope.click = function () {
      seajs.use('./../common/log/Log', function(log) {

      });
    };

  }

  LoginCtrl.$inject = ['$scope', '$location', 'User'];

  module.exports = LoginCtrl;

});
