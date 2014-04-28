'use strict';

var stage = require('./stage'),
  state = require('./state'),
  robot = require('./../../game/robot'),
  fileContent;

exports.setFile = function (file) {
  fileContent = file;
};

exports.initRobot = function (pos) {
  var robotObj = robot.create(this.getExtensions(fileContent.stage));
  robotObj.setPos(pos);
  console.log('Initial state', robotObj.getState());
  return state.writeStateFile('robot', robotObj.getState());
};

exports.checkIfMoveAllowed = function (pos, oldPos) {
  var level = stage.getStage(fileContent.stage).level;
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
exports.isFinished = function (pos) {
  var finish = stage.getStage(fileContent.stage).finish;
  return finish[0] === pos[0] && finish[1] === pos[1];
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

function markTile () {
  var pos = JSON.parse(JSON.stringify(fileContent.robot.pos));

  if (!fileContent.markers) {
    fileContent.markers = [];
  }
  if (!fileContent.markers[pos[0]]) {
    fileContent.markers[pos[0]] = [];
  }
  fileContent.markers[pos[0]][pos[1]] = 1;
}

function isTileMarked() {
  var pos = JSON.parse(JSON.stringify(fileContent.robot.pos));
  if (!fileContent.markers) {
    fileContent.markers = [];
  }
  if (!fileContent.markers[pos[0]]) {
    fileContent.markers[pos[0]] = [];
  }
  return fileContent.markers[pos[0]][pos[1]] ? 1:0;
}

exports.getExtensions = function (level) {
  var extensions = {
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
  //console.log('Marker activated? ', level);
  if (level > 1) {
    //console.log('Marker activated!');
    extensions.marker = {
      markTile: function () {
        return markTile();
      },
      isTileMarked: function () {
        return isTileMarked();
      }
    };
  }
  return extensions;
};