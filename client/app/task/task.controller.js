'use strict';

angular.module('nodeApp')
  .controller('TaskCtrl', function($state, $scope, $http, Server) {
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
  .controller('NewTaskCtrl', function($state, $scope, $http, Task, Server) {
    $scope.submit = function(task) {
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
  })
  .controller('ListTaskCtrl', function($state, $scope, $http, Task) {
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

    $scope.toggleData = {};

    $scope.refresh = function() {
      $scope.tasks = Task.query(function(tasks) {
        for(var i = 0; i < tasks.length; i++) {
          $scope.toggleData[tasks[i]['_id']] = true;
        }
      });
    };

    $scope.toggle = function(task) {
      $scope.toggleData[task._id] = !$scope.toggleData[task._id];
    };

    $scope.toggleCollapse = function(task) {
      return $scope.toggleData[task._id];
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

    $scope.submit = function(task) {
      task.$update();
      $state.go('task.show', {id: task._id});
    };
  });
