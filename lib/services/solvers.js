'use strict';

exports.solve = function (type, task) {

  function solveMath(task) {
    if (task.indexOf('^') !== -1) {
      var values = task.split('^');
      return Math.pow(parseInt(values[0], 10), parseInt(values[1], 10));
    } else {
      return eval(task);
    }
  }

  switch (type) {
    case 'math':
      return solveMath(task);
  }
};