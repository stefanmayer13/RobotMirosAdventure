var robot = require('./../../game/robot'),
  solvers = require('./solvers');

exports.getTask = function (id) {
  var tasks = [{
    task: 'math',
    tasks: [
      "%0+%1+%2",
      "%0*%1",
      "%1-%2*%3",
      "%0^%1",
      "(%0+%1*%2)/(%3-%4+%5)+1/%6"
    ],
    rand: 6
  }];

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  var task = tasks[id];
  for (var index = 0, length = task.tasks.length; index < length; index++) {
    for (var index2 = 0; index2 <= task.rand; index2++) {
      task.tasks[index] = task.tasks[index].replace('%'+index2, getRandomArbitrary(1, 15));
    }
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
  for (index = 0, length = task.tasks.length; index < length; index++) {
    task.solutions[index] = {};
    task.solutions[index].solution = solutions[index];
    if (solvers.solve(task.task, task.tasks[index]) == solutions[index]) {
      task.solutions[index].status = 'ok';
    } else {
      task.solutions[index].status = 'false';
    }
  }

  return task;
};