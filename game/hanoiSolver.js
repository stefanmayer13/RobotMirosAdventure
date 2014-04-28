'use strict';
/*jshint unused:false */

exports.solve = function(tasks) {
  var solutions = [], task;
  for (var index = 0, length = tasks.length; index < length; index++) {
    task = tasks[index];
    solutions.push(this.solveHanoi(parseInt(task, 10)));
  }
  return solutions;
};

exports.solveHanoi = function(task) {
  function move(a, b, c, n)
  {
    if (n === 1) {
      return 1;
    } else {
      var cnt = 0;
      cnt += move(a, c, b, n-1);
      cnt += move(a, b, c, 1);
      cnt += move(b, a, c, n-1);
      return cnt;
    }
  }
  return move("a", "b", "c", task);
};