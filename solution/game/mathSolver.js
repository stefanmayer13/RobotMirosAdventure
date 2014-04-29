'use strict';
/*jshint unused:false */

exports.solve = function(tasks) {
  var solutions = [], task;
  for (var index = 0, length = tasks.length; index < length; index++) {
    task = tasks[index];
    if (task.indexOf('(') !== -1) {
      task = this.solveBraces(task);
    }
    console.log('solving ', task);
    solutions.push(this.solveTree(task));
  }
  return solutions;
};

exports.solveTree = function(task) {
  var chars, char, value = null, result, resultTree, tempResultTree;
  resultTree = {};
  tempResultTree = resultTree;
  chars = task.split('');
  for (var index2 = 0, length2 = chars.length; index2 < length2; index2++) {
    char = chars[index2];
    if (!isNaN(char)) {
      if(value === null) {
        value = char;
      } else {
        value += char;
      }
    } else if (value === null && char === '-') {
      value = char;
    } else {
      if(tempResultTree.op) {
        switch(char) {
          case '+':
          case '-':
            tempResultTree.right = value;
            value = tempResultTree;
            tempResultTree = {};
            resultTree = tempResultTree;
            break;
          case '*':
          case '/':
            tempResultTree.right = {
              left: value
            };
            tempResultTree = tempResultTree.right;
            break;
        }
      }

      tempResultTree.left = value;
      tempResultTree.op = char;
      tempResultTree.right = 0;
      // console.log(tempResultTree);
      // console.log(resultTree);
      value = null;
    }
  }
  if(value !== null) {
    tempResultTree.right = value;
    value = null;
  }

  //console.log(task);
  //console.log(resultTree);
  result = this.calcTree(resultTree);
  //console.log(result);
  return result;
};

exports.calcTree = function (tree) {
  //console.log('Solving tree ', tree);
  if (tree && tree.op) {
    var left = this.calcTree(tree.left),
      right = this.calcTree(tree.right);
    switch (tree.op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '^':
        return Math.pow(left, right);
    }
  } else if (!isNaN(tree)) {
    return Math.round(parseFloat(tree, 10) * 100) / 100;
  } else if (!isNaN(tree.right)) {
  return Math.round(parseFloat(tree.right, 10) * 100) / 100;
  } else {
    return 0;
  }
};

exports.solveBraces = function (task) {
  var indexBegin, indexEnd, part;

  indexBegin  = task.indexOf('(');
  indexEnd = task.indexOf(')');
  while (indexBegin !== -1) {
    part = this.solveTree(task.substring(indexBegin + 1, indexEnd));
    task = task.substr(0, indexBegin) + part + task.substr(indexEnd+1);
    indexBegin  = task.indexOf('(');
    indexEnd = task.indexOf(')');
    // console.log('solved braces: ', task);
  }
  return task;
};