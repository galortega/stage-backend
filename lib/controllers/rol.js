"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nuevoRol = exports.buscarTodos = exports.validarIDRol = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _error = require("../utils/error");

var _lodash = _interopRequireDefault(require("lodash"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../models/index"));

var _sequelize = require("sequelize");

var _index2 = require("../constants/index");

var _uuidv = require("uuidv4");

var _util = require("../utils/util");

var validarIDRol = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index["default"].Rol.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (rol) {
              if (!rol) {
                return Promise.reject(new Error("ID ingresado no es v\xE1lido. ".concat(id)));
              }
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validarIDRol(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validarIDRol = validarIDRol;

var buscarTodos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var Roles;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index["default"].Rol.findAll({
              where: {
                estado: _index2.estado.ACTIVO
              },
              attributes: {
                exclude: _index2.atributosExclude
              }
            });

          case 2:
            Roles = _context2.sent;
            return _context2.abrupt("return", res.status(200).send({
              Roles: Roles
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function buscarTodos(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.buscarTodos = buscarTodos;

var nuevoRol = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var rol, Rol;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rol = req.body.rol;
            _context3.next = 3;
            return _index["default"].Rol.create({
              id: (0, _uuidv.uuid)(),
              rol: rol
            });

          case 3:
            Rol = _context3.sent;
            return _context3.abrupt("return", res.status(201).send({
              Rol: Rol,
              msj: "Rol ingresado correctamente."
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function nuevoRol(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.nuevoRol = nuevoRol;