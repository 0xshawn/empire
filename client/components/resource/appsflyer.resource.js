'use strict';

angular.module('nodeApp')
  .factory('Appsflyer', function ($resource) {
    var url = '/api/appsflyer/:id';
    return $resource(url, {
      id: '@_id'
    }, {
      'reset': {
        method: 'GET',
        params: {
          id: 'reset'
        }
      },
      'read': {
        method: 'GET',
        params: {
          id: 'read'
        }
      }
    });
  });
