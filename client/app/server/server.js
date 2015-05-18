'use strict';

angular.module('nodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('server', {
        url: '/server',
        templateUrl: 'app/server/server.html',
        controller: 'ServerCtrl'
      });
  });
