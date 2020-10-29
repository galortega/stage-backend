"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autenticarParticipante = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _error = require("../utils/error");

var _lodash = _interopRequireDefault(require("lodash"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../models/index"));

var _sequelize = require("sequelize");

var _index2 = require("../constants/index");

var autenticarParticipante = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, contrasena, Usuario, payload;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, contrasena = _req$body.contrasena;
            email = _lodash["default"].toLower(email);
            _context2.next = 4;
            return _index["default"].Usuario.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                email: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%" + email + "%")
              }, {
                estado: _index2.estado.ACTIVO
              }]),
              include: [{
                model: _index["default"].UsuarioRol,
                as: "UsuarioRol",
                where: {
                  rol: _index2.rolesId.PARTICIPANTE
                },
                attributes: ["rol"],
                include: [{
                  model: _index["default"].Atributos,
                  as: "AtributosUsuario",
                  attributes: ["clave", "valor"]
                }]
              }]
            });

          case 4:
            Usuario = _context2.sent;

            if (!_lodash["default"].isEmpty(Usuario)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", (0, _error.errorStatusHandle)(res, "USUARIO_INEXISTENTE"));

          case 9:
            if (!(contrasena !== Usuario.contrasena)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", (0, _error.errorStatusHandle)(res, "CONTRASENA_INCORRECTA"));

          case 11:
            payload = {
              usuario: Usuario.id,
              nombre: Usuario.nombre,
              email: Usuario.email,
              rol: Usuario.UsuarioRol[0].rol,
              atributos: _lodash["default"].map(Usuario.UsuarioRol[0].AtributosUsuario, function (atributo) {
                var clave = atributo.clave,
                    valor = atributo.valor;
                var object = {};
                object[clave] = valor;
                return object;
              })
            };

            _jsonwebtoken["default"].sign(payload, process.env.KEY, {
              expiresIn: "120m"
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(error, token) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!error) {
                          _context.next = 4;
                          break;
                        }

                        throw error;

                      case 4:
                        res.json({
                          token: token,
                          payload: payload
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function autenticarParticipante(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.autenticarParticipante = autenticarParticipante;