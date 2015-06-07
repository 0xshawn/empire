'use strict';

angular.module('nodeApp')
  .controller('TagCtrl', function($state, $scope, $http, Tag, $modal, $log, Server) {
    $scope.tags = Tag.query();

    $scope.deleteTag = function(tag) {
      tag.$delete();
      $scope.refresh();
    };

    $scope.refresh = function() {
      $scope.tasks = Tag.query();
    };

    $scope.refresh();

    // Modal
    $scope.servers = Server.query();
    $scope.servers.$promise.then(function(servers){
      $scope.servers = servers;
    });

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/tag/tag.new.html',
        controller: 'NewTagCtrl',
        size: size,
        resolve: {
          servers: function () {
            return $scope.servers;
          }
        }
      });

      modalInstance.result.then(function (tag) {
        $
        console.log('create new tag: ' + tag.name);
      }, function () {
        console.log('canceled');
      });
    };
  })
  .controller('NewTagCtrl', function($scope, Tag, $modalInstance, servers) {
    $scope.servers = servers;
    $scope.selected_servers = [];
    $scope.submit = function (tag) {
      $scope.selected_servers.forEach(function(s) {
        $scope.tag.servers.push(s._id);
      });
      console.log($scope.tag);
      var newTag = new Tag($scope.tag);
      newTag.$save();
      $modalInstance.close(newTag);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.show = function(tag) {
      console.log(tag);
      console.log($scope.x);
      console.log($scope.xx);
      console.log($scope.selected_servers);
    };
  });
