'use strict';

angular.module('nodeApp')
  .controller('AppsflyerCtrl', function ($scope, $http, Appsflyer) {
    $scope.toggleData = {};

    $scope.refresh = function() {
      $scope.appsflyers = Appsflyer.query(function(appsflyers) {
        for(var i = 0; i < appsflyers.length; i++) {
          $scope.toggleData[appsflyers[i]['_id']] = true;
        }
      });
    };

    $scope.toggle = function(event) {
      $scope.toggleData[event._id] = !$scope.toggleData[event._id];
    };

    $scope.toggleCollapse = function(event) {
      return $scope.toggleData[event._id];
    };

    $scope.refresh();

    $scope.appId = function(event) {
      var json = angular.fromJson(event.content);
      return json['app_id'];
    };
    $scope.eventName = function(event) {
      var json = angular.fromJson(event.content);
      if (event.eventName == 'purchase') {
        return 'purchase ' + json['event_value'];
      } else {
        return event.eventName;
      }
    };

    $scope.deleteAll = function() {
      for(var i = 0; i < $scope.appsflyers.length; i++) {
        $scope.appsflyers[i].$delete();
      }
      $scope.refresh();
    };

    $scope.jsonFormat = function(event) {
      return angular.fromJson(event.content);
    };
  });
