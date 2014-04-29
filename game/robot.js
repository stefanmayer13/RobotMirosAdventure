'use strict';
/*jshint unused:false */

var testModule = require('./testModule');

exports.create = function(extensions) {
  var robot = {},
    direction = 'left',
    pos = [0,0];

  /* Gets called for every move of the robot */
  robot.nextStep = function () {
    console.log('Direction:', direction);

    testModule.doNothing();
  };

  /* Gets called if a task needs to be solved */
  robot.solve = function (type, tasks) {
    testModule.doEvenLess();
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