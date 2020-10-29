"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkParameters = exports.errorStatusHandle = exports.allowedMethods = exports.asyncWrapper = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errors = _interopRequireDefault(require("../constants/errors"));

var _check = require("express-validator/check");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var asyncWrapper = function asyncWrapper(fn) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fn(req, res, next);

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              // next(descripcion);
              console.error(_context.t0);
              return _context.abrupt("return", errorStatusHandle(res, "INTERNAL_SERVER_ERROR"));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.asyncWrapper = asyncWrapper;

var allowedMethods = function allowedMethods() {
  var methods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["GET"];
  return function (req, res, next) {
    if (methods.includes(req.method)) return next();
    res.set("Allow", methods);
    return errorStatusHandle(res, "METHOD_NOT_ALLOWED", {
      methods: methods
    });
  };
};

exports.allowedMethods = allowedMethods;

var errorStatusHandle = function errorStatusHandle(res, payload, other) {
  var msg = _errors["default"][payload] || _errors["default"].INTERNAL_SERVER_ERROR;
  return res.status(msg.status).send({
    error: _objectSpread(_objectSpread({}, msg), other)
  });
};

exports.errorStatusHandle = errorStatusHandle;

var checkParameters = function checkParameters(validators) {
  var validatorFunction = function validatorFunction(req, res, next) {
    var checks = (0, _check.validationResult)(req);

    if (!checks.isEmpty()) {
      return errorStatusHandle(res, "INVALID_PARAMS", {
        issues: checks.array({
          onlyFirstError: true
        })
      });
    }

    return next();
  };

  return [].concat((0, _toConsumableArray2["default"])(validators), [validatorFunction]);
};

exports.checkParameters = checkParameters;