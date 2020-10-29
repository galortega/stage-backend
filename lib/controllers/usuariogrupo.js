"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desactivarMiembro = exports.agregarMiembros = exports.getGrupos = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _constants = require("../constants");

var _models = _interopRequireDefault(require("../models"));

var _lodash = _interopRequireDefault(require("lodash"));

var _uuidv = require("uuidv4");

var _sequelize = require("sequelize");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getGrupos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var usuario, Grupos, Academias;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usuario = req.token.usuario;
            Grupos = [];
            Academias = [];
            _context.next = 5;
            return _models["default"].UsuarioGrupo.findAll({
              where: [{
                usuario: usuario
              }, {
                estado: _constants.estado.ACTIVO
              }],
              attributes: ["rol"],
              include: [{
                model: _models["default"].Grupo,
                as: "MiembrosGrupo",
                attributes: ["nombre", "tipo", "id"]
              }]
            }).then(function (grupos) {
              return _lodash["default"].forEach(grupos, function (g) {
                var _g$MiembrosGrupo = g.MiembrosGrupo,
                    tipo = _g$MiembrosGrupo.tipo,
                    nombre = _g$MiembrosGrupo.nombre,
                    id = _g$MiembrosGrupo.id;
                var data = {
                  id: id,
                  esDirector: g.rol === _constants.rolGrupo.DIRECTOR,
                  tipo: tipo,
                  nombre: nombre
                };
                if (tipo === _constants.tipoGrupo.ACADEMIA) Academias.push(data);else if (tipo === _constants.tipoGrupo.GRUPOINDEPENDIENTE) Grupos.push(data);
              });
            });

          case 5:
            return _context.abrupt("return", res.status(200).send({
              Academias: Academias,
              Grupos: Grupos
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getGrupos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getGrupos = getGrupos;

var agregarMiembros = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var miembros, grupo, datos, _iterator, _step, _loop, Miembros;

    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            miembros = req.body.miembros;
            grupo = req.params.id;
            datos = [];
            _iterator = _createForOfIteratorHelper(miembros);
            _context4.prev = 4;
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var miembro, email, rol;
              return _regenerator["default"].wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      miembro = _step.value;
                      email = miembro.email, rol = miembro.rol;
                      _context3.next = 4;
                      return _models["default"].Usuario.findOne({
                        where: [{
                          email: email
                        }, {
                          estado: _constants.estado.ACTIVO
                        }],
                        include: [{
                          model: _models["default"].UsuarioGrupo,
                          as: "MiembroUsuario"
                        }]
                      }).then( /*#__PURE__*/function () {
                        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(u) {
                          var validarGrupo;
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  if (!u) {
                                    _context2.next = 5;
                                    break;
                                  }

                                  u = u.toJSON(); // Si existe el usuario, no se puede ingresar a un grupo donde ya se ingresó

                                  validarGrupo = _lodash["default"].isEmpty(_lodash["default"].find(u.MiembroUsuario, {
                                    grupo: grupo
                                  }));
                                  _context2.next = 10;
                                  break;

                                case 5:
                                  _context2.t0 = _lodash["default"];
                                  _context2.next = 8;
                                  return _models["default"].UsuarioGrupo.findOne({
                                    where: [{
                                      email: email
                                    }, {
                                      grupo: grupo
                                    }]
                                  });

                                case 8:
                                  _context2.t1 = _context2.sent;
                                  validarGrupo = _context2.t0.isEmpty.call(_context2.t0, _context2.t1);

                                case 10:
                                  // Solo se envía la invitación si el usuario no se encuentra registrado en el grupo o la invitación no ha sido enviada
                                  if (validarGrupo) datos.push({
                                    id: (0, _uuidv.uuid)(),
                                    usuario: u ? u.id : null,
                                    grupo: grupo,
                                    email: email,
                                    rol: rol
                                  });

                                case 11:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2);
                        }));

                        return function (_x5) {
                          return _ref3.apply(this, arguments);
                        };
                      }());

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _loop);
            });

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context4.next = 11;
              break;
            }

            return _context4.delegateYield(_loop(), "t0", 9);

          case 9:
            _context4.next = 7;
            break;

          case 11:
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t1 = _context4["catch"](4);

            _iterator.e(_context4.t1);

          case 16:
            _context4.prev = 16;

            _iterator.f();

            return _context4.finish(16);

          case 19:
            _context4.next = 21;
            return _models["default"].UsuarioGrupo.bulkCreate(datos, {
              updateOnDuplicate: ["email"]
            });

          case 21:
            Miembros = _context4.sent;
            return _context4.abrupt("return", res.status(200).send({
              Miembros: Miembros
            }));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[4, 13, 16, 19]]);
  }));

  return function agregarMiembros(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.agregarMiembros = agregarMiembros;

var desactivarMiembro = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var grupo, email, UsuarioGrupo;
    return _regenerator["default"].wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            grupo = req.params.id;
            email = req.body.email;
            _context5.next = 4;
            return _models["default"].UsuarioGrupo.update({
              estado: _constants.estado.INACTIVO
            }, {
              where: [{
                email: email
              }, {
                grupo: grupo
              }]
            });

          case 4:
            UsuarioGrupo = _context5.sent;
            return _context5.abrupt("return", res.status(200).send({
              UsuarioGrupo: UsuarioGrupo
            }));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4);
  }));

  return function desactivarMiembro(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.desactivarMiembro = desactivarMiembro;