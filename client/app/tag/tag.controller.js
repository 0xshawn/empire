'use strict';

angular.module('nodeApp')
  .controller('TagCtrl', function($state, $scope, $http, Tag, $modal, $log, Server) {
    var map = {};
    $scope.servers = Server.query(function(servers) {
      for(var i = 0; i < servers.length; i++) {
        map[servers[i]._id] = servers[i].hostname;
      }
    });

    $scope.tags = Tag.query();

    $scope.get_hostname = function(tag) {
      var length = tag.servers.length;
      var hostnames = [];
      for(var i = 0; i < length; i++) {
        hostnames.push(map[tag.servers[i]]);
      }
      return hostnames;
    };

    $scope.deleteTag = function(tag) {
      tag.$delete();
      $scope.refresh();
    };

    $scope.refresh = function() {
      $scope.tags = Tag.query();
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
        console.log('create new tag: ' + tag.name);
        $scope.refresh();
      }, function () {
        console.log('canceled');
      });
    };
  })
  .controller('NewTagCtrl', function($scope, Tag, $modalInstance, servers) {
    $scope.servers = servers;
    $scope.selected_servers = [];
    $scope.submit = function (tag) {
      $scope.tag['servers'] = [];
      $scope.selected_servers.forEach(function(s) {
        $scope.tag.servers.push(s._id);
      });
      var newTag = new Tag($scope.tag);
      newTag.$save();
      $modalInstance.close(newTag);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
