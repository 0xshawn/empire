'use strict';

angular.module('nodeApp')
  .factory('Tag', function($resource) {
    var url = '/api/tags/:id';
    return $resource(url, {
      id: '@_id'
    },{
      'update': { method:'PUT' }
    });
  });
