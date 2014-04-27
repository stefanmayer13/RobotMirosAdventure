'use strict';

var stage = require('./../services/stage'),
  robotService = require('./../services/robot'),
  stateFile = require('./../services/state');

exports.stage = function(req, res) {
  stateFile.readStateFile().then(function (stateData) {
    try {
      robotService.setFile(stateData);
      var id = stateData.stage;
      if (!id) {
        stateFile.writeStateFile('stage', 0);
        id = 0;
      }
      var level = stage.getStage(id);
      level.nr = id;
      robotService.initRobot(level.start).then(function () {
        res.json(level);
      }, function (err) {
        console.log(err);
        res.send(500);
      });
    } catch (e) {
      console.log(e);
      res.send(500);
    }
  }, function (err) {
    console.log(err);
    res.send(500);
  });
};

exports.reset = function (req, res) {
  stateFile.writeStateFile('stage', 0);
  res.send(200);
};