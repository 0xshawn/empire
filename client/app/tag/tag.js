'use strict';

angular.module('nodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tag', {
        url: '/tag',
        templateUrl: 'app/tag/tag.html',
        controller: 'TagCtrl'
      });
  });
