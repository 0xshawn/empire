'use strict';

angular.module('nodeApp')
  .factory('Server', function($resource) {
    var url = '/api/servers/:id';
    return $resource(url, {
      id: '@_id'
    },{
      'update': { method:'PUT' }
    });
  });
