'use strict';

angular.module('RobotMirosAdventure')
  .controller('FinishCtrl', function ($scope, Stage, Task) {
    var texts = ['',
      'Now it gets a little trickier!',
      'Miro needs to lern basic math to continue. Implement the solve function of Miro.'
    ];
    Stage.get(function (data) {
      $scope.text = texts[data.nr];
    });
    Task.get(function (data) {
      $scope.task = data;
    });
  });