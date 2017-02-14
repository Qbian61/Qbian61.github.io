define(function(require, exports, module) {
  'use strict';
  /* testSv */
  var angular = require('angularjs');
  var ngResource = require('ngResource');
  
  angular.module('UserServ', ['ngResource'])
  .factory('User', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:80/jsp-angular/api/user/:id');
  }]);

})
