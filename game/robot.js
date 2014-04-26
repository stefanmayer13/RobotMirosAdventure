'use strict';
/*jshint unused:false */

exports.create = function(extensions) {
  var robot = {},
    direction = 'left',
    pos = [0,0];

  robot.nextStep = function () {
    console.log();

    if (!extensions.sensors[direction]) {
      console.log('Somethins wrong');
      return;
    }

    console.log(extensions.sensors[direction]());
    if (extensions.sensors[direction]() === 'wall') {
      if (direction !== 'left' && extensions.sensors.right() !== 'wall') {
        direction = 'right';
      } else if (direction !== 'bottom' && extensions.sensors.top() !== 'wall') {
        direction = 'top';
      } else if (direction !== 'top' && extensions.sensors.bottom() !== 'wall') {
        direction = 'bottom';
      } else if (direction !== 'left') {
        direction = 'left';
      } else {
        direction = 'right';
      }
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