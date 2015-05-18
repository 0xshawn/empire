'use strict';

angular.module('nodeApp')
  .factory('Task', function($resource, Environment) {
    var url = '/api/tasks/:id';
    return $resource(url, {
      id: '@_id'
    });
  };
