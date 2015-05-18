'use strict';

angular.module('nodeApp')
  .controller('TaskCtrl', function ($scope, $http) {
  })
  .controller('NewTaskCtrl', function($state, $scope, $http){
    $scope.task = {};
    $scope.submit = function(){
      $http.post('/api/tasks', $scope.task)
        .success(function(data, status, headers, config){
          console.log("post success.");
          $state.go('task.show');
        })
        .error(function(data, status, headers, config){
          console.log("post error.");
        });
    };
  })
  .controller('ListTaskCtrl', function($scope, $http){
    $http.get('/api/tasks').success(function(tasks) {
      $scope.tasks = tasks;
    });
  })
  .controller('ShowTaskCtrl', function($scope, $http){
    $scope.task = {};
    $http.get('/api/tasks')
      .success(function(data, status, headers, config){
        $scope.task = data[0];
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
  });
