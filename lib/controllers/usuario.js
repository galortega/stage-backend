"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.buscarPorId = exports.buscarTodos = exports.validarAtributos = exports.validarEmailUsuario = exports.validarIDUsuario = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("../models/index"));

var _uuidv = require("uuidv4");

var _sequelize = require("sequelize");

var _index2 = require("../constants/index");

var _lodash = _interopRequireDefault(require("lodash"));

var validarIDUsuario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index["default"].Usuario.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (usuario) {
              if (!usuario) {
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

  return function validarIDUsuario(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validarIDUsuario = validarIDUsuario;

var validarEmailUsuario = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index["default"].Usuario.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                email: email
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (usuario) {
              if (usuario) {
                return Promise.reject(new Error("El email ingresado ya se encuentra en uso."));
              } else return Promise.resolve();
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validarEmailUsuario(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validarEmailUsuario = validarEmailUsuario;

var validarAtributos = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(atributos) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!_lodash["default"].isEmpty(atributos)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", true);

          case 4:
            return _context3.abrupt("return", _lodash["default"].forEach(Object.keys(atributos), function (key) {
              var value = parseInt(atributos[key]);

              switch (key) {
                case "edad":
                  var edad = parseInt(value);
                  if (!_lodash["default"].isNumber(edad) || !_lodash["default"].inRange(edad, 0, 150) || _lodash["default"].isNaN(edad)) throw new Error("Edad debe ser un número.");

                case "nivel":
                  return _lodash["default"].isString(value);

                default:
                  break;
              }
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validarAtributos(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.validarAtributos = validarAtributos;

var buscarTodos = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var Usuarios;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _index["default"].Usuario.findAll({
              where: {
                estado: _index2.estado.ACTIVO
              },
              include: [{
                model: _index["default"].UsuarioRol,
                as: "UsuarioRol",
                include: [{
                  model: _index["default"].Atributos,
                  as: "AtributosUsuario"
                }]
              }],
              attributes: {
                exclude: _index2.atributosExclude
              }
            });

          case 2:
            Usuarios = _context4.sent;
            return _context4.abrupt("return", res.status(200).send({
              Usuarios: Usuarios
            }));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function buscarTodos(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.buscarTodos = buscarTodos;

var buscarPorId = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, Usuario;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _index["default"].Usuario.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }]),
              include: [{
                model: _index["default"].UsuarioRol,
                as: "UsuarioRol",
                include: [{
                  model: _index["default"].Atributos,
                  as: "AtributosUsuario"
                }]
              }],
              attributes: {
                exclude: _index2.atributosExclude
              }
            });

          case 3:
            Usuario = _context5.sent;
            return _context5.abrupt("return", res.status(200).send({
              Usuario: Usuario || []
            }));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function buscarPorId(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.buscarPorId = buscarPorId;

var crearUsuario = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, nombre, email, contrasena, rol, atributos, id, idUsuarioRol, AtributosUsuario, datosUsuario, Usuario;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, contrasena = _req$body.contrasena, rol = _req$body.rol, atributos = _req$body.atributos;
            id = (0, _uuidv.uuid)();
            idUsuarioRol = (0, _uuidv.uuid)();
            AtributosUsuario = _lodash["default"].map(Object.keys(atributos), function (a) {
              return {
                id: (0, _uuidv.uuid)(),
                usuarioRol: idUsuarioRol,
                clave: a,
                valor: atributos[a]
              };
            });
            datosUsuario = {
              id: id,
              nombre: nombre,
              email: email,
              contrasena: contrasena,
              UsuarioRol: {
                id: idUsuarioRol,
                usuario: id,
                rol: rol,
                AtributosUsuario: AtributosUsuario
              }
            };
            _context6.next = 7;
            return _index["default"].Usuario.create(datosUsuario, {
              include: [{
                model: _index["default"].UsuarioRol,
                as: "UsuarioRol",
                include: [{
                  model: _index["default"].Atributos,
                  as: "AtributosUsuario"
                }]
              }]
            });

          case 7:
            Usuario = _context6.sent;
            return _context6.abrupt("return", res.status(201).send({
              Usuario: Usuario,
              msj: "Usuario ingresado correctamente."
            }));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function crearUsuario(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.crearUsuario = crearUsuario;

var actualizarUsuario = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, Usuario;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _index["default"].Usuario.update(req.body, {
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }])
            });

          case 3:
            Usuario = _context7.sent;
            return _context7.abrupt("return", res.status(200).send({
              Usuario: Usuario
            }));

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function actualizarUsuario(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.actualizarUsuario = actualizarUsuario;

var eliminarUsuario = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, Usuario;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.next = 3;
            return _index["default"].Usuario.update({
              estado: _index2.estado.INACTIVO
            }, {
              where: {
                id: id
              }
            });

          case 3:
            Usuario = _context8.sent;
            return _context8.abrupt("return", res.status(200).send({
              Usuario: Usuario
            }));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function eliminarUsuario(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

exports.eliminarUsuario = eliminarUsuario;