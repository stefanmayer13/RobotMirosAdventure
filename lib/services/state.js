'use strict';

var fs = require('fs'),
  Q = require('q');

exports.readStateFile = function(type) {
  var fs_readFile = Q.denodeify(fs.readFile);
  return fs_readFile('lib/temp/state.txt', 'utf8').then(function(data) {
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      console.log('error reading file', e, data);
      return null;
    }
    return obj;
  }, function (err) {
    console.log(err);
  });
};

exports.writeStateFile = function(type, newdata) {
  return (this.readStateFile().then(function (data) {
    if (!data) {
      data = {robot: {}};
    }
    data[type] = newdata;
    var fs_writeFile = Q.denodeify(fs.writeFile);
    //console.log('write data ', JSON.stringify(data), type);
    return fs_writeFile('lib/temp/state.txt', JSON.stringify(data));
  }));
};