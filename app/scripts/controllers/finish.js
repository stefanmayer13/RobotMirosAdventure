'use strict';

angular.module('RobotMirosAdventure')
  .controller('FinishCtrl', function (Stage) {
    Stage.get(function (data) {
      console.log(data);
    });
  });