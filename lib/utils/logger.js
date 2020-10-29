"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var myLevels = {
  levels: {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    crit: "red",
    fatal: "red"
  }
};
var consoleTransport = new _winston["default"].transports.Console({
  level: "trace",
  timestamp: true,
  format: _winston["default"].format.combine(_winston["default"].format.colorize(), _winston["default"].format.simple())
});

var logger = _winston["default"].createLogger({
  levels: myLevels.levels,
  transports: [consoleTransport]
});

_winston["default"].addColors(myLevels.colors);

var _default = logger;
exports["default"] = _default;