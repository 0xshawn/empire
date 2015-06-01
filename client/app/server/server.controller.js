'use strict';

angular.module('nodeApp')
  .controller('ServerCtrl', function ($scope, $http, Server) {
    $scope.awesomeThings = [];

    $scope.refresh = function() {
      $scope.servers = Server.query();
    };

    $scope.deleteServer = function(server) {
      server.$delete();
      $scope.refresh();
    };

    $scope.refresh();
  });
