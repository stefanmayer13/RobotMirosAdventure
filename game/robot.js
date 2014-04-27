'use strict';
/*jshint unused:false */

var mathSolver = require('./mathSolver');

exports.create = function(extensions) {
  var robot = {},
    direction = 'left',
    turn = 0,
    pos = [0,0];

  function turnLeft () {
    switch (direction) {
      case 'right':
        direction = 'top';
        break;
      case 'left':
        direction = 'bottom';
        break;
      case 'top':
        direction = 'left';
        break;
      case 'bottom':
        direction = 'right';
        break;
    }
  }
  function turnRight () {
    switch (direction) {
      case 'right':
        direction = 'bottom';
        break;
      case 'left':
        direction = 'top';
        break;
      case 'top':
        direction = 'right';
        break;
      case 'bottom':
        direction = 'left';
        break;
    }
  }

  robot.nextStep = function () {
    if (!extensions.sensors[direction]) {
      console.log('Somethings wrong');
      return;
    }

    if (extensions.sensors[direction]() === 'empty') {
      turnLeft();
      if (extensions.sensors[direction]() === 'wall') {
        turnRight();
      }
    }

    var count = 0;
    while (extensions.sensors[direction]() === 'wall' || count === 2) {
      turnLeft();
      count++;
    }

    console.log('Direction', direction);

    switch (direction) {
      case 'right':
        pos[0] += 1;
        break;
      case 'left':
        pos[0] -= 1;
        break;
      case 'top':
        pos[1] -= 1;
        break;
      case 'bottom':
        pos[1] += 1;
        break;
    }
  };

  robot.solve = function (type, tasks) {
    switch (type) {
      case 'math':
        return mathSolver.solve(tasks);
    }
  };

  /* Saving and restoring state */
  robot.getState = function () {
    return {
      pos: pos,
      dir: direction
    };
  };

  robot.setState = function (state) {
    pos = state.pos;
    direction = state.dir;
  };

  /*----------------*/
  robot.setPos = function (newPos) {
    pos = newPos;
  };

  robot.getPos = function () {
    return pos;
  };

  return robot;
};