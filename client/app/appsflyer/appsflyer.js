'use strict';

angular.module('nodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('appsflyer', {
        url: '/appsflyer',
        templateUrl: 'app/appsflyer/appsflyer.html',
        controller: 'AppsflyerCtrl'
      });
  });
