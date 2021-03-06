'use strict';

angular.module('RobotMirosAdventure')
  .controller('FinishCtrl', function ($scope, Stage, Task) {
    var texts = [
      'Now it gets a little trickier!',
      'Miro needs to lern basic math to continue. Implement the solve function of Miro.',
      'I hope you know the Tower of Hanoi. Calculate the number of needed steps with the specified disks.',
      'Congratulations, you finished it!!!',
      'Not bad, not bad.'
    ];
    Task.get(function (data) {
      $scope.text = texts[data.nr];
      $scope.task = data;
    });
  });