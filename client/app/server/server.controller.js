'use strict';

angular.module('nodeApp')
  .controller('ServerCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/servers').success(function(servers) {
      $scope.servers = servers;
    });
  });
