'use strict';

var fs = require('fs'),
  Q = require('q');

exports.readStateFile = function(type) {
  var fs_readFile = Q.denodeify(fs.readFile);
  return fs_readFile('lib/temp/state.txt', 'utf8').then(function(data) {
    var obj = JSON.parse(data);
    return type ? obj[type] : obj;
  }, function (err) {
    console.log(err);
  });
};

exports.writeStateFile = function(type, newdata) {
  return this.readStateFile().then(function (data) {
    data[type] = newdata;
    var fs_writeFile = Q.denodeify(fs.writeFile);
    return fs_writeFile('lib/temp/state.txt', JSON.stringify(data));
  });
};