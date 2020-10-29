#!/usr/bin/env node

/**
 * Module dependencies.
 */
import fs from "fs";
import http from "http";
// import https from "https";
import debugLib from "debug";
import app from "../app";

import logger from "../utils/logger";

// var debug = require('debug')('demo:server');

/**
 * Get port from environment and store in Express.
 */

const selectPort = (nodeEnv) => {
  switch (nodeEnv) {
    case "production":
      return process.env.PORT;
    case "development":
      return process.env.PORT;
    case "preproduction":
      return process.env.PORT_PRE;
  }
};

const port = selectPort(process.env.NODE_ENV) || "3000";

/**
 * Create HTTP server.
 */
// const server = https.createServer(options, app);
const server = http.createServer(app);
const debug = debugLib("SAWCI - Backend");

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

// eslint-disable-next-line no-unused-vars
const normalizePort = (val) => {
  const port = parseInt(val, 10);

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

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
};

app.set("port", port);

server.listen(port);
logger.info(`Server running. Listening on HTTP port ${port}`);
server.on("error", onError);
server.on("listening", onListening);
