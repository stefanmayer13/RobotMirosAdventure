var robot = require('./../../game/robot'),
  solvers = require('./solvers'),
  stateFile = require('./../services/state');

exports.getTask = function (id) {
  var tasks = [{}, {
    task: 'math',
    tasks: [
      "%0+%1+%2",
      "%0*%1",
      "%1-%2*%3",
      "%0^%1",
      "(%0+%1*%2)/(%3-%4+%5)+1/%6"
    ],
    rand: 6
  }, {
    task: 'hanoi',
    tasks: [
      "2",
      "3",
      "%0",
      "%0",
      "%0"
    ],
    rand: 1
  }, {}];

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  //console.log('task nr', id);
  var task = tasks[id];
  if (!task.tasks) {
    task.solved = true;
    stateFile.writeStateFile('task', ++id);
    return task;
  }
  for (var index = 0, length = task.tasks.length; index < length; index++) {
    var origTask = task.tasks[index];
    do {
      task.tasks[index] = origTask;
      for (var index2 = 0; index2 <= task.rand; index2++) {
        task.tasks[index] = task.tasks[index].replace('%'+index2, getRandomArbitrary(1, 15));
      }
    } while (solvers.solve(task.task, task.tasks[index]) === Number.POSITIVE_INFINITY);
  }

  var robotObj = robot.create();
  var evalFn = eval,
    FunctionFn = Function;
  eval = function () {
    throw "Nice try, but not allowed";
  };
  Function = function () {
    throw "Wow advanced, but still not allowed";
  };
  var solutions = robotObj.solve(task.task, task.tasks);
  eval = evalFn;
  Function = FunctionFn;

  task.solutions = [];
  var solved = true;
  if (solutions) {
    for (index = 0, length = task.tasks.length; index < length; index++) {
      task.solutions[index] = {};
      solutions[index] = Math.round(parseFloat(solutions[index], 10) * 100) / 100;
      task.solutions[index].solution = solutions[index];
      if (Math.round(parseFloat(solvers.solve(task.task, task.tasks[index]), 10) * 100) / 100 === solutions[index]) {
        task.solutions[index].status = 'ok';
      } else {
        task.solutions[index].status = 'false';
        solved = false;
      }
    }
  } else {
    solved = false;
  }

  task.solved = solved;
  if (solved) {
    stateFile.writeStateFile('task', ++id);
  }

  return task;
};