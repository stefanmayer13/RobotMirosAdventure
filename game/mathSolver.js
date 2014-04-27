'use strict';
/*jshint unused:false */

exports.solve = function(tasks) {
  var parent, solutions = [], task, chars, char, value = null, result, resultTree, tempResultTree;
  for (var index = 0, length = tasks.length; index < length; index++) {
    resultTree = {};
    tempResultTree = resultTree;
    result = 0;
    task = tasks[index];
    chars = task.split('');
    for (var index2 = 0, length2 = chars.length; index2 < length2; index2++) {
      char = chars[index2];
      if (!isNaN(char)) {
        if(value === null) {
          value = char;
        } else {
          value += char;
        }
      } else {
        if(tempResultTree.op && tempResultTree.op !== '(') {
          switch(char) {
            case '+':
            case '-':
              parent = tempResultTree.parent;
              tempResultTree.right = value;
              value = tempResultTree;
              tempResultTree = {};
              tempResultTree.parent = parent;
              if (parent) {
                //TODO
              } else {
                resultTree = tempResultTree;
              }
              break;
            case '*':
              tempResultTree.right = {
                left: value
              };
              tempResultTree = tempResultTree.right;
              break;
          }
        } else if (tempResultTree.op === '(') {
          tempResultTree = {
            left: tempResultTree
          };
        }
        tempResultTree.left = value;
        tempResultTree.op = char;
        tempResultTree.right = 0;
        console.log(tempResultTree);
        value = null;
      }
    }
    if(value !== null) {
      tempResultTree.right = value;
      value = null;
    }

    console.log(task);
    console.log(resultTree);
    result = this.solveTree(resultTree);
    console.log(result);
    solutions.push(result);
  }
  return solutions;
};

exports.solveTree = function (tree) {
  if (tree && tree.op) {
    var left = this.solveTree(tree.left),
      right = this.solveTree(tree.right);
    switch (tree.op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '^':
        return Math.pow(left, right);
    }
  } else if (!isNaN(tree)) {
    return parseInt(tree, 10);
  } else {
    return 0;
  }
};