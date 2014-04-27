'use strict';

angular.module('RobotMirosAdventure').filter('checkmark', function() {
  return function(input) {
    switch (input) {
    case 'ok':
      return '\u2713';
    case 'false':
      return '\u2718';
    }
  };
});