#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _debug = _interopRequireDefault(require("debug"));

var _app = _interopRequireDefault(require("../app"));

var _logger = _interopRequireDefault(require("../utils/logger"));

// import https from "https";
// var debug = require('debug')('demo:server');

/**
 * Get port from environment and store in Express.
 */
var selectPort = function selectPort(nodeEnv) {
  switch (nodeEnv) {
    case "production":
      return process.env.PORT;

    case "development":
      return process.env.PORT;

    case "preproduction":
      return process.env.PORT_PRE;
  }
};

var port = selectPort(process.env.NODE_ENV) || "3000";
/**
 * Create HTTP server.
 */
// const server = https.createServer(options, app);

var server = _http["default"].createServer(_app["default"]);

var debug = (0, _debug["default"])("SAWCI - Backend");
/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */
// eslint-disable-next-line no-unused-vars

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/**
 * Event listener for HTTP server "error" event.
 */


var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case "EACCES":
      _logger["default"].error(bind + " requires elevated privileges");

      process.exit(1);

    case "EADDRINUSE":
      _logger["default"].error(bind + " is already in use");

      process.exit(1);

    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */


var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
};

_app["default"].set("port", port);

server.listen(port);

_logger["default"].info("Server running. Listening on HTTP port ".concat(port));

server.on("error", onError);
server.on("listening", onListening);