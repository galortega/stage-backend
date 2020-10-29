"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _error = require("./error");

var _lodash = _interopRequireDefault(require("lodash"));

var handleJWTError = function handleJWTError(res, error) {
  switch (error) {
    case "TokenExpiredError":
      return (0, _error.errorStatusHandle)(res, "TOKEN_EXPIRADO");

    case "JsonWebTokenError":
      return (0, _error.errorStatusHandle)(res, "TOKEN_ERROR");

    case "NotBeforeError":
      return (0, _error.errorStatusHandle)(res, "TOKEN_INACTIVO");

    default:
      break;
  }
};

module.exports = function (req, res, next) {
  var token = req.header("token");
  if (!token) return (0, _error.errorStatusHandle)(res, "UNAUTHORIZED");
  var error;

  var cifrado = _jsonwebtoken["default"].verify(token, process.env.KEY, function (err, decoded) {
    if (!_lodash["default"].isEmpty(err)) error = err.name;else return decoded;
  });

  if (error) return handleJWTError(res, error);else {
    req.token = cifrado;
    next();
  }
};