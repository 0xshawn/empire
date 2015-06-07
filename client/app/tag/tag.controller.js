'use strict';

angular.module('nodeApp')
  .controller('TagCtrl', function($state, $scope, $http, Tag, $modal, $log, Server) {
    $scope.tags = Tag.query();

    $scope.deleteTag = function(tag) {
      tag.$delete();
      $scope.refresh();

    };

    $scope.refresh = function() {
      $scope.tags = Tag.query();
      /*
      console.log($scope.tags);
      for(var i = 0; i < $scope.tags.length; i++) {
        $scope.tags[i].serverNames = ['s'];
        for(var j = 0; j < $scope.servers.length; j++) {
          console.log($scope.servers[j]._id);
          if($scope.servers[j]._id == $scope.tags[i]) {
            console.log($scope.servers[j].hostname);
            $scope.tags[i].serverNames.push($scope.servers[j].hostname);
          }
        }
      }*/
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
