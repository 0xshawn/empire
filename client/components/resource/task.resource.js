'use strict';

angular.module('nodeApp')
  .factory('Task', function($resource) {
    var url = '/api/tasks/:id';
    return $resource(url, {
      id: '@_id'
    },{
      'update': { method:'PUT' }
    });
  });
