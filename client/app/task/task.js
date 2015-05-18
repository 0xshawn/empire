'use strict';

angular.module('nodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('task', {
        url: '/task',
        templateUrl: 'app/task/task.html',
        controller: 'TaskCtrl'
      })
      .state('task.list', {
        url: '/list',
        templateUrl: 'app/task/task.list.html',
        controller: 'NewTaskCtrl'
      })
      .state('task.new', {
        url: '/new',
        templateUrl: 'app/task/task.new.html',
        controller: 'NewTaskCtrl'
      })
      .state('task.show', {
        url: '/show',
        templateUrl: 'app/task/task.show.html',
        controller: 'ShowTaskCtrl'
      });
  });
