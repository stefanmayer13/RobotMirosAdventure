'use strict';

angular.module('RobotMirosAdventure')
  .factory('Robot', function ($resource) {
    return $resource('/api/robot', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: false
      },
      init: {
        method: 'PUT'
      }
	  });
  });
