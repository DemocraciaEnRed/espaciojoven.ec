var express = require('express');
var config = require('lib/config');

var app = module.exports = express();

if (config.letsencrypt.key) {
  app.param('key', function letsencryptParamKey (req, res, next, key) {
    if (key === config.letsencrypt.key) return next();
    res.status(400).send();
  });

  app.get('/.well-known/acme-challenge/:key', function letsencrypt (req, res) {
    res.send(config.letsencrypt.token);
  });
}
