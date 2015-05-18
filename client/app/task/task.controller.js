'use strict';

angular.module('nodeApp')
  .controller('TaskCtrl', function ($scope, $http, Task) {
  })
  .controller('NewTaskCtrl', function($state, $scope, $http){
    var newTask = new Task($scope.task);
    newTask.$save(function(task){
      if(task != null) {
        $state.go('task.show');
        console.log("save success");
      } else {
        console.log("fails");
      };
    });
  })
  .controller('ListTaskCtrl', function($scope, $http){
    $http.get('/api/tasks')
      .success(function(data, status, headers, config){
        $scope.tasks = data;
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });

    $scope.showFileContent = false;
    $scope.toggleFileContent = function(task){
      $scope.showFileContent = true;
      $scope.fileContent = task.file;
    };
  })
  .controller('ShowTaskCtrl', function($scope, $http){
    $http.get('/api/tasks')
      .success(function(data, status, headers, config){
        $scope.task = data[0];
      })
      .error(function(data, status, headers, config){
        console.log('get error');
      });
  });
