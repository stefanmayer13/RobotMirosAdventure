'use strict';
/*jshint unused:false */

var mathSolver = require('./mathSolver'),
  solveHanoi = require('./hanoiSolver');

exports.create = function(extensions) {
  var robot = {},
    direction = 'left',
    turn = 0,
    pos = [0,0];

  function turnLeft () {
    switch (direction) {
      case 'right':
        return 'top';
      case 'left':
        return 'bottom';
      case 'top':
        return 'left';
      case 'bottom':
        return 'right';
    }
  }
  function turnRight () {
    switch (direction) {
      case 'right':
        return 'bottom';
      case 'left':
        return 'top';
      case 'top':
        return 'right';
      case 'bottom':
        return 'left';
    }
  }

  function markIntersection () {
    if (extensions.sensors[direction]() === 'empty') {
      if (extensions.sensors[turnLeft()]() === 'empty' || extensions.sensors[turnRight()]() === 'empty') {
        extensions.marker.markTile();
      }
    } else {
      if (extensions.sensors[turnLeft()]() === 'empty' && extensions.sensors[turnRight()]() === 'empty') {
        extensions.marker.markTile();
      }
    }
  }

  robot.nextStep = function () {
    if (!extensions.sensors[direction]) {
      console.log('Somethings wrong');
      return;
    }

    if (extensions.sensors[direction]() === 'marked') {
      console.log('marked ahead');
    }

    if (extensions.sensors[direction]() === 'empty' && (!extensions.marker || !extensions.marker.isTileMarked())) {
      var dir = turnLeft();
      if (extensions.sensors[dir]() === 'empty') {
        direction = dir;
      }
    }

    var count = 0;
    while (extensions.sensors[direction]() === 'wall' || count === 2) {
      direction = turnLeft();
      count++;
    }

    if (extensions.marker) {
      markIntersection();
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
      case 'hanoi':
        return solveHanoi.solve(tasks);
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