'use strict';

angular.module('nodeApp')
  .controller('TaskCtrl', function($state, $scope, $http, Task) {
  })
  .controller('NewTaskCtrl', function($state, $scope, $http, Task, Server) {
    $scope.newTask = function(task) {
      var newTask = new Task($scope.task);
      newTask.$save(function(response) {
        console.log(response);
        if (response != null) {
          $state.go('task.show', {id: response._id});
          console.log("save success");
        } else {
          console.log("fails");
        };
      });
    };

    $scope.refresh_hostnames = function() {
      Server.query(function(servers) {
        var hostnames = [];
        for(var i = 0; i < servers.length; i++){
          hostnames.push(servers[i]['hostname']);
        }
        $scope.hostnames = hostnames;
      });
    };

    $scope.refresh_hostnames();
  })
  .controller('ListTaskCtrl', function($state, $scope, $http, Task) {
    $scope.refresh = function() {
      $scope.tasks = Task.query();
    };
    $scope.newTask = function() {
      $state.go('task.new');
    };

    $scope.deleteTask = function(task) {
      task.$delete();
      $scope.refresh();
    };

    $scope.show = function(task) {
      $state.go('task.show', {id: task._id});
    };

    var buttonClass = function(click) {
      if (click) {
        return "btn btn-primary";
      } else {
        return "btn btn-default";
      }
    };

    $scope.showFileContent = false;
    $scope.toggleFileContent = function(task) {
      $scope.showFileContent = !$scope.showFileContent;
      $scope.fileContent = task.file;
      $scope.resultContent = task.result;
    };

    $scope.refresh();
  })
  .controller('ShowTaskCtrl', function($state, $scope, $http, $stateParams, Task) {
    $scope.task = Task.get({id: $stateParams.id});

    $scope.edit = function(task) {
      $state.go('task.edit', {id: task._id});
    };
  })
  .controller('EditTaskCtrl', function($state, $scope, $http, $stateParams, Task) {
    $scope.task = Task.get({id: $stateParams.id});

    $scope.update = function(task) {
      task.$update();
      $state.go('task.show', {id: task._id});
    };
  });
