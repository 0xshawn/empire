'use strict';

angular.module('nodeApp')
  .controller('TagCtrl', function($state, $scope, $http, Tag) {
    $scope.tags = Tag.query();

    $scope.deleteTag = function(tag) {
      tag.$delete();
      $scope.refresh();
    };

    $scope.refresh = function() {
      $scope.tasks = Tag.query();
    };

    $scope.refresh();
  });
