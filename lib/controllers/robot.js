'use strict';

var robot = require('./../../game/robot'),
  robotService = require('./../services/robot'),
  stateFile = require('./../services/state'),
  fs = require('fs');

exports.init = function(req, res) {
  stateFile.readStateFile().then(function (robotFile) {
    var robotObj = robot.create(robotService.getExtensions(robotFile.stage));
    try {
      robotObj.setState(robotFile.robot);
      stateFile.writeStateFile('markers', []).then(function () {
        res.json({pos: robotObj.getPos()});
      });
    } catch (e) {
      console.log('Robot init', e);
    }
  }, function (err) {
    console.log('Robot init file', err);
    return res.send(500);
  });
};

exports.get = function(req, res) {
  stateFile.readStateFile().then(function (robotFile) {
    var pos, oldPos,
      robotObj = robot.create(robotService.getExtensions(robotFile.stage));
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

      stateFile.writeStateFile('markers', robotFile.markers).then(function () {
        stateFile.writeStateFile('robot', robotObj.getState()).then(function () {
          if (robotService.isFinished(pos)) {
            var level = parseInt(robotFile.stage, 10);
            robotFile.stage = level;
            console.log('Finished level ' + level);
          }
          res.json({pos: pos, markers: robotFile.markers});
        }, function (err) {
          console.log(err);
          return res.send(500);
        });
      }, function (err) {
        console.log(err);
        return res.send(500);
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