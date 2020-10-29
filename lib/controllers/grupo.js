"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buscarPorId = exports.buscarTodos = exports.crearGrupo = exports.validarEmailGrupo = exports.validarMiembros = exports.validarNombreGrupo = exports.validarIDGrupo = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("../models/index"));

var _uuidv = require("uuidv4");

var _sequelize = require("sequelize");

var _index2 = require("../constants/index");

var _lodash = _interopRequireDefault(require("lodash"));

var _grupo = require("../models/grupo");

var _util = require("../utils/util");

var validarIDGrupo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index["default"].Grupo.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (Grupo) {
              if (!Grupo) {
                return Promise.reject(new Error("El id ingresado no pertenece a un grupo o academia."));
              } else return Promise.resolve();
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

  return function validarIDGrupo(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validarIDGrupo = validarIDGrupo;

var validarNombreGrupo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(nombre) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index["default"].Grupo.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                nombre: nombre
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (Grupo) {
              if (Grupo) {
                return Promise.reject(new Error("El nombre ingresado ya se encuentra en uso."));
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

  return function validarNombreGrupo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validarNombreGrupo = validarNombreGrupo;

var validarMiembros = function validarMiembros(miembros) {
  if (!_lodash["default"].isEmpty(miembros)) try {
    _lodash["default"].forEach(miembros, function (miembro) {
      if (miembro) {
        var email = miembro.email,
            rol = miembro.rol;
        if (!(0, _util.isValidEmail)(email)) throw new Error("Email inválido");
        if (!_lodash["default"].includes(_index2.rolGrupo.values, rol)) throw new Error("Rol inv\xE1lido. ".concat(_index2.rolGrupo.values));
      }
    });

    return true;
  } catch (error) {
    throw error;
  }
};

exports.validarMiembros = validarMiembros;

var validarEmailGrupo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _index["default"].Grupo.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                email: email
              }, {
                estado: _index2.estado.ACTIVO
              }])
            }).then(function (Grupo) {
              if (Grupo) {
                return Promise.reject(new Error("El email ingresado ya se encuentra en uso."));
              } else return Promise.resolve();
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validarEmailGrupo(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.validarEmailGrupo = validarEmailGrupo;

var crearGrupo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, nombre, pais, direccion, logo, instagram, facebook, email, tipo, miembros, id, datos, Grupo;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, pais = _req$body.pais, direccion = _req$body.direccion, logo = _req$body.logo, instagram = _req$body.instagram, facebook = _req$body.facebook, email = _req$body.email, tipo = _req$body.tipo, miembros = _req$body.miembros;
            id = (0, _uuidv.uuid)();
            _context5.t0 = id;
            _context5.t1 = nombre;
            _context5.t2 = tipo;
            _context5.t3 = pais;
            _context5.t4 = direccion;
            _context5.t5 = logo;
            _context5.t6 = instagram;
            _context5.t7 = facebook;
            _context5.t8 = email;
            _context5.next = 13;
            return Promise.all(_lodash["default"].map(miembros, /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(miembro) {
                var email, rol, usuario;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        email = miembro.email, rol = miembro.rol;
                        _context4.next = 3;
                        return _index["default"].Usuario.findOne({
                          where: [{
                            email: email
                          }, {
                            estado: _index2.estado.ACTIVO
                          }]
                        });

                      case 3:
                        usuario = _context4.sent;
                        return _context4.abrupt("return", {
                          id: (0, _uuidv.uuid)(),
                          usuario: usuario ? usuario.id : null,
                          grupo: id,
                          email: email,
                          rol: rol
                        });

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x6) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 13:
            _context5.t9 = _context5.sent;
            datos = {
              id: _context5.t0,
              nombre: _context5.t1,
              tipo: _context5.t2,
              pais: _context5.t3,
              direccion: _context5.t4,
              logo: _context5.t5,
              instagram: _context5.t6,
              facebook: _context5.t7,
              email: _context5.t8,
              UsuarioGrupo: _context5.t9
            };
            _context5.next = 17;
            return _index["default"].Grupo.create(datos, {
              include: [{
                model: _index["default"].UsuarioGrupo,
                as: "MiembrosGrupo"
              }]
            });

          case 17:
            Grupo = _context5.sent;
            return _context5.abrupt("return", res.status(201).send({
              Grupo: Grupo,
              msj: "Grupo ingresado correctamente."
            }));

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function crearGrupo(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.crearGrupo = crearGrupo;

var buscarTodos = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var Grupos;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _index["default"].Grupo.findAll({
              where: {
                estado: _index2.estado.ACTIVO
              },
              include: [{
                model: _index["default"].UsuarioGrupo,
                as: "MiembrosGrupo",
                include: [{
                  model: _index["default"].Usuario,
                  as: "MiembroUsuario"
                }]
              }],
              attributes: {
                exclude: _index2.atributosExclude
              }
            });

          case 2:
            Grupos = _context6.sent;
            return _context6.abrupt("return", res.status(200).send({
              Grupos: Grupos
            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function buscarTodos(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.buscarTodos = buscarTodos;

var buscarPorId = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, usuario, aprobados, pendientes, Grupo;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            usuario = req.token.usuario;
            aprobados = [];
            pendientes = [];
            _context7.next = 6;
            return _index["default"].Grupo.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                estado: _index2.estado.ACTIVO
              }]),
              include: [{
                model: _index["default"].UsuarioGrupo,
                as: "MiembrosGrupo",
                where: {
                  estado: _index2.estado.ACTIVO
                },
                attributes: {
                  exclude: _index2.atributosExclude
                },
                include: [{
                  model: _index["default"].Usuario,
                  as: "MiembroUsuario",
                  attributes: {
                    exclude: _index2.atributosExclude
                  }
                }]
              }],
              attributes: {
                exclude: _index2.atributosExclude
              }
            }).then(function (grupo) {
              var MiembrosGrupo = grupo.MiembrosGrupo,
                  id = grupo.id,
                  nombre = grupo.nombre,
                  tipo = grupo.tipo,
                  pais = grupo.pais,
                  direccion = grupo.direccion,
                  logo = grupo.logo,
                  instagram = grupo.instagram,
                  facebook = grupo.facebook,
                  email = grupo.email;

              var miembroToken = _lodash["default"].find(MiembrosGrupo, {
                usuario: usuario
              });

              if (!miembroToken) return false;

              _lodash["default"].forEach(MiembrosGrupo, function (miembro) {
                var usuario = miembro.usuario,
                    rol = miembro.rol,
                    fecha_aprobado = miembro.fecha_aprobado,
                    aprobacion = miembro.aprobacion,
                    email = miembro.email,
                    MiembroUsuario = miembro.MiembroUsuario;
                var datos = {
                  id: usuario,
                  nombre: !MiembroUsuario ? null : MiembroUsuario.nombres,
                  correo: email,
                  telefono: !MiembroUsuario ? null : MiembroUsuario.telefono,
                  rol: rol,
                  fechaUnion: fecha_aprobado,
                  existe: !_lodash["default"].isEmpty(MiembroUsuario)
                };
                if (aprobacion === _index2.estadoAprobado.APROBADO) aprobados.push(datos);else pendientes.push(datos);
              });

              return {
                id: id,
                nombre: nombre,
                tipo: tipo,
                pais: pais,
                direccion: direccion,
                logo: logo,
                instagram: instagram,
                facebook: facebook,
                email: email,
                esDirector: miembroToken.rol === _index2.rolGrupo.DIRECTOR,
                miembros: {
                  aprobados: aprobados,
                  pendientes: pendientes
                }
              };
            });

          case 6:
            Grupo = _context7.sent;

            if (Grupo) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(400).send({
              msj: "Usuario no pertenece al grupo."
            }));

          case 11:
            return _context7.abrupt("return", res.status(200).send({
              Grupo: Grupo || []
            }));

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function buscarPorId(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.buscarPorId = buscarPorId;