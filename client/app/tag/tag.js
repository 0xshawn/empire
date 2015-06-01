'use strict';

angular.module('nodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tag', {
        url: '/tag',
        templateUrl: 'app/tag/tag.html',
        controller: 'TagCtrl'
      })
      .state('tag.new', {
        url: '/tag/new',
        templateUrl: 'app/tag/tag.new.html',
        controller: 'NewTagCtrl'
      });
  });
