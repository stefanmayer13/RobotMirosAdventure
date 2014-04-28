
var stage = require('./../services/stage'),
  robotService = require('./../services/robot'),
  stateFile = require('./../services/state');

exports.stage = function(req, res) {
  stateFile.readStateFile().then(function (stateData) {
    try {
      robotService.setFile(stateData);
      var id = stateData.stage;
      function cont () {
        var level = stage.getStage(id, stateData);
        level.nr = id;
        robotService.initRobot(level.start).then(function () {
          res.json(level);
        }, function (err) {
          console.log(err);
          res.send(500);
        });
      }
      if (id && stateData.task > id) {
        id = stateData.task;
        stateFile.writeStateFile('stage', id).then(cont);
      } else if (!id) {
        stateFile.writeStateFile('stage', "0").then(cont);
        id = 0;
      } else {
        cont();
      }
    } catch (e) {
      console.log('controller stage.js', e);
      res.send(500);
    }
  }, function (err) {
    console.log('controller stage.js file', err);
    res.send(500);
  });
};

exports.reset = function (req, res) {
  stateFile.writeStateFile('stage', "0").then(function (data) {
    console.log(data);
    stateFile.writeStateFile('task', "0").then(function () {
      stateFile.writeStateFile('rand1', Math.round(Math.random() * (16 - 10) + 10) + "").then(function () {
        stateFile.writeStateFile('rand2', Math.round(Math.random() * (8 - 4) + 4) + "").then(function () {
          res.send(200);
        });
      });
    });
  });
};