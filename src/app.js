define(function(require, exports, module) {
  'use strict';
  /* APP */

  var angular = require('angularjs');
  var $ = require('jquery');
  var bootstrap = require('bootstrap');

  var IndexCtrl = require('../modules/index/index.ctrl.js');
  var LoginCtrl = require('../modules/login/login.ctrl.js');
  var justMeetingCtrl = require('../modules/justmeeting/justMeeting.js');

  angular.module('myApp', ['UserServ']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({redirectTo : '/login'})
      .when('/login', {
        templateUrl : './modules/login/loginView.html' ,
        controller : LoginCtrl
      })
      .when('/index', {
        templateUrl : './modules/index/index.html' ,
        controller : IndexCtrl
      })
      .when('/meeting', {
        templateUrl : './modules/justmeeting/justMeeting.html' ,
        controller : justMeetingCtrl
      });
  }]);

  angular.bootstrap(document.body, ['myApp']);

});
