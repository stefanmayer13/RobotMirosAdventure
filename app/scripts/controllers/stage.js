'use strict';

angular.module('RobotMirosAdventure')
  .controller('StageCtrl', function ($scope, $rootScope, $location, Stage, Robot) {
    var timeout;

    $rootScope.speed = parseInt(sessionStorage.getItem('speed'), 10) || 1;

    $scope.speed = function (speed) {
      $rootScope.speed = speed;
      sessionStorage.setItem('speed', speed);
    };

    $scope.isActive = function (speed) {
      return $rootScope.speed === speed;
    };

    Stage.get(function (data) {
      $scope.robot = Robot.init();
      $scope.level = data.level;
      $scope.start = data.start;
      $scope.finish = data.finish;
      $scope.text = data.text;
    });

    var getRobotState = function () {
      timeout = window.setTimeout(function () {
        Robot.get(function (robot) {
          $scope.robot = robot;
          if ($scope.finish[0] !== robot.pos[0] || $scope.finish[1] !== robot.pos[1]) {
            getRobotState();
          } else {
            window.setTimeout(function () {
              $rootScope.$apply(function() {
                $location.path('finish');
              });
            }, 500);
          }
        });
      }, 800.0 / $rootScope.speed);
    };

    $scope.reset = function () {
      Stage.get(function () {
        Robot.init(function (robot) {
          window.clearTimeout(timeout);
          $scope.robot = robot;
          getRobotState();
        });
      });
    };
  });