'use strict';

angular.module('nodeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/appsflyer'
    }/*, {
      'title': 'Servers',
      'link': '/server'
    }, {
      'title': 'Tasks',
      'link': '/task/list'
    }, {
      'title': 'AppsFlyer',
      'link': '/appsflyer'
    }*/];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
