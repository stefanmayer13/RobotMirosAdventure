'use strict';

var tasks = require('./../services/tasks'),
  stateFile = require('./../services/state');

exports.get = function(req, res) {
  stateFile.readStateFile().then(function (stateData) {
    try {
      var id = stateData.task;
      if (!id) {
        stateFile.writeStateFile('task', 0);
        id = 0;
      }
      var task = tasks.getTask(id);
      task.nr = id;
      res.json(task);
    } catch (e) {
      console.log(e);
      res.send(500);
    }
  }, function (err) {
    console.log(err);
    res.send(500);
  });
};