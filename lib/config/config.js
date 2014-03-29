'use strict';

var _ = require('lodash');

/**
 * Load environment configuration
 */
module.exports = _.extend(
    require('./env.js') || {});