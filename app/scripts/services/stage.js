'use strict';

angular.module('RobotMirosAdventure')
  .factory('Stage', function ($resource) {
    return $resource('/api/stage', {

    }, {
      get: {
        method: 'GET'
      },
      reset: {
        method: 'DELETE'
      }
	  });
  });
