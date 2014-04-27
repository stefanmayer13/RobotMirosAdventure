'use strict';

var robot = require('./../../game/robot'),
  robotService = require('./../services/robot'),
  stateFile = require('./../services/state'),
  fs = require('fs');

exports.init = function(req, res) {
  var robotObj = robot.create(robotService.getExtensions());
  stateFile.readStateFile().then(function (robotFile) {
    robotObj.setState(robotFile.robot);
    res.json({pos: robotObj.getPos()});
  }, function (err) {
    console.log(err);
    return res.send(500);
  });
};

exports.get = function(req, res) {
  stateFile.readStateFile().then(function (robotFile) {
    var pos, oldPos,
      robotObj = robot.create(robotService.getExtensions());
    try {
      robotObj.setState(robotFile.robot);
      oldPos = JSON.parse(JSON.stringify(robotObj.getPos()));
      robotService.setFile(robotFile);
      robotObj.nextStep();
      pos = robotObj.getPos();
      var allowed = robotService.checkIfMoveAllowed(pos, oldPos);
      if (!allowed) {
        console.log('Move not allowed');
        pos = oldPos;
        robotObj.setPos(pos);
      }
      stateFile.writeStateFile('robot', robotObj.getState()).then(function () {
        if (robotService.isFinished(pos)) {
          var level = parseInt(robotFile.stage, 10);
          robotFile.stage = level;
          console.log('Finished level ' + level);
          stateFile.writeStateFile('stage', (++level) + "").then(function () {
            res.json({pos: pos});
          });
        } else {
          res.json({pos: pos});
        }
      });
    } catch (e) {
      console.log(e);
      res.send(500);
    }
  }, function (err) {
    console.log(err);
    return res.send(500);
  });
};