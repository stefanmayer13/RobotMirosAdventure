'use strict';

var stage = require('./stage'),
  state = require('./state'),
  robot = require('./../../game/robot'),
  fileContent;

exports.setFile = function (file) {
  fileContent = file;
};

exports.initRobot = function (pos) {
  var robotObj = robot.create(this.getExtensions());
  robotObj.setPos([0,1]);
  console.log('Initial state', robotObj.getState());
  return state.writeStateFile('robot', robotObj.getState());
};

exports.checkIfMoveAllowed = function (robotFile, pos, oldPos) {
  var level = stage.getStage(robotFile.stage).level;
  if (Math.abs(pos[0] - oldPos[0]) > 1 || Math.abs(pos[1] - oldPos[1]) > 1 ||
    (Math.abs(pos[0] - oldPos[0]) + Math.abs(pos[1] - oldPos[1])) > 1) {
    return false;
  }
  if (pos[0] < 0 || pos[1] < 0 ||
    level.length <= pos[1] || level[pos[1]].length <= pos[0]) {
    return false;
  }
  return !level[pos[1]][pos[0]];
};

function getAdjacentTile (direction) {
  var level = stage.getStage(fileContent.stage).level,
    pos = JSON.parse(JSON.stringify(fileContent.robot.pos));
  switch (direction) {
    case 'top':
      pos[1]--;
      break;
    case 'right':
      pos[0]++;
      break;
    case 'left':
      pos[0]--;
      break;
    case 'bottom':
      pos[1]++;
      break;
  }
  return pos[0] < 0 || pos[1] < 0 || level.length <= pos[1] || level[pos[1]].length <= pos[0] || level[pos[1]][pos[0]] ? 'wall' : 'empty';
}

exports.getExtensions = function () {
  return {
    sensors: {
      top: function () {
        return getAdjacentTile('top');
      },
      right: function () {
        return getAdjacentTile('right');
      },
      bottom: function () {
        return getAdjacentTile('bottom');
      },
      left: function () {
        return getAdjacentTile('left');
      }
    }
  };
};