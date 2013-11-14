/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var http = require('http');
var path = require('path');

/**
 * Instantiate Rfid reader and load Book class
 */

/**
 * Environment
 */

var app = express();

// All environments
app.set('port', process.env.PORT || 4567);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressLayouts);
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * App locals, accessible to all routes and renderings
 */

var session = {};
app.locals({session: session, env: app.get('env')});

/**
 * Routes
 */
var routes = require('./routes');    // automatically requires 'routes/index.js'

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
