angular.module('app', [])
  .controller('contr', ['$scope', function($scope) {

    var tags = window.qbian.tags;

    angular.forEach(tags, function(tag, tagIndex, tagsArr) {
      angular.forEach(window.qbian.sources, function(source, sourceIndex, sourceArr) {
        var flag = false;
        for(var i = 0, len = source.tags.length; i < len; ++ i) {
          if(source.tags[i] === tag.name) {
            flag = true;
          }
        }

        if(flag) {
          tag.sources.push(source.source);
        }

      });
    });

    $scope.datasource = tags;

    $scope.init = function(url) {
      $scope.content = url;
    };

    $scope.tabClick = function(url) {
      $scope.content = url;
    };

  }]);
