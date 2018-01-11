const mongoose = require('mongoose')
var config = require('lib/config');

/*
 *  Module dependencies
 */

var exports = module.exports = function(app) {

  // Initialize data models
  const connection = mongoose.connect(config.mongoUrl)

  require('./topic')(connection);
  exports.Tag = require('./tag')(connection);
  exports.Comment = require('./comment')(connection);
  exports.Forum = require('./forum')(connection);
  require('./token')(connection);
  require('./whitelist')(connection);
  require('./notification')(connection);

  // Treat User model as per configuration
  var usersDb = connection;

  exports.User = require('./user')(usersDb);
}
