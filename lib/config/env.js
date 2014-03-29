'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  env: 'development',
  root: rootPath,
  port: process.env.PORT || 9000
};