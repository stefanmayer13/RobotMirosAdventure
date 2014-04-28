'use strict';

var tasks = require('./../services/tasks'),
  stateFile = require('./../services/state');

exports.get = function(req, res) {
  stateFile.readStateFile().then(function (stateData) {
    try {
      var id = stateData.stage;
      stateFile.writeStateFile('task', id).then(function () {
        var task = tasks.getTask(id);
        task.nr = id;
        res.json(task);
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