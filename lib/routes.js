'use strict';

var index = require('./controllers'),
  stage = require('./controllers/stage'),
  robot = require('./controllers/robot');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/stage', stage.stage);
  app.put('/api/robot', robot.init);
  app.get('/api/robot', robot.get);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};