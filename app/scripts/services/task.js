'use strict';

angular.module('RobotMirosAdventure')
  .factory('Task', function ($resource) {
    return $resource('/api/task', {

    }, {
      get: {
        method: 'GET'
      }
	  });
  });
