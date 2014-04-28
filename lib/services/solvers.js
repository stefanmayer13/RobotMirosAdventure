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

  function solveHanoi(task) {
    function move(a, b, c, n)
    {
      if (n === 1)
        return 1;
      else {
        var cnt = 0;
        cnt += move(a, c, b, n-1);
        cnt += move(a, b, c, 1);
        cnt += move(b, a, c, n-1);
        return cnt;
      }
    }
    return move("a", "b", "c", task);
  }

  switch (type) {
    case 'math':
      return solveMath(task);
    case 'hanoi':
      return solveHanoi(parseInt(task, 10));
  }
};