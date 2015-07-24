'use strict';

angular.module('nodeApp')
  .controller('AppsflyerCtrl', function ($scope, $http, Appsflyer) {
    $scope.toggleData = {};
    $scope.refreshLoading = false;
    $scope.actionButtonLoading = false;
    $scope.actionStatus = 1;
    $scope.actionButtonClass = "btn btn-danger";
    $scope.actionButtonLabel = "drop old data, and start new test.";
    $scope.totalTimes = -1;


    $scope.actionButtonClick = function (times) {
      $scope.actionStatus += 1;
      if ($scope.actionStatus > 3) {
        $scope.actionStatus = 1;
      }

      switch ($scope.actionStatus) {
        case 1:
          resetToggle(-2);
          break;
        case 2:
          removeAll();
          resetToggle(times);
          break;
        case 3:
          resetToggle(-1);
          break;
      }

      updateButtonStatus(times);
    };

    var updateButtonStatus = function (times) {
      if (times == -2) {
        $scope.actionStatus = 1;
      } else if (times == -1) {
        $scope.actionStatus = 3;
      }
      switch ($scope.actionStatus) {
        case 1:
          $scope.actionButtonLoading = false;
          $scope.actionButtonClass = "btn btn-danger";
          $scope.actionButtonLabel = "drop old data, and start new test.";
          break;
        case 2:
          $scope.actionButtonLoading = true;
          $scope.actionButtonClass = "btn btn-info";
          $scope.actionButtonLabel = "is receiving data from appsflyer. Refresh when you finish or click to stop.";
          break;
        case 3:
          $scope.actionButtonLoading = false;
          $scope.actionButtonClass = "btn btn-primary";
          $scope.actionButtonLabel = "it is finished. Click to Restart";
          break;
      }
    };

    $scope.refresh = function () {
      readToggle();
      $scope.refreshLoading = true;
      var appsflyers = Appsflyer.query();
      appsflyers.$promise.then(function (result) {
        $scope.appsflyers = result;
        for (var i = 0; i < result.length; i++) {
          $scope.toggleData[result[i]['_id']] = true;
        }
        $scope.refreshLoading = false;
      });
    };

    $scope.toggle = function (event) {
      $scope.toggleData[event._id] = !$scope.toggleData[event._id];
    };

    $scope.toggleCollapse = function (event) {
      return $scope.toggleData[event._id];
    };

    $scope.appId = function (event) {
      var json = angular.fromJson(event.content);
      return json['app_id'];
    };

    $scope.eventName = function (event) {
      var json = angular.fromJson(event.content);
      if (event.eventName == 'purchase') {
        return 'purchase ' + json['event_value'];
      } else {
        return event.eventName;
      }
    };

    $scope.deviceType = function(event) {
      var json = angular.fromJson(event.content);
      return json.device_type;
    };

    var removeAll = function () {
      Appsflyer.removeAll(function () {
        $scope.refresh();
      });;
    };

    $scope.jsonFormat = function (event) {
      return angular.fromJson(event.content);
    };

    var resetToggle = function (times) {
      Appsflyer.reset({
        toggleAccept: times
      });
    };

    var readToggle = function () {
      Appsflyer.read(function (times, error, success) {
        $scope.totalTimes = times.toggleAccept;
        console.log($scope.totalTimes);
        updateButtonStatus($scope.totalTimes);
      });
    };

    $scope.refresh();
  });
