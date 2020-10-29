"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAgregarMiembros = exports.checkCrearGrupo = void 0;

var _expressValidator = require("express-validator");

var _usuario = require("../controllers/usuario");

var _lodash = _interopRequireDefault(require("lodash"));

var _rol = require("../controllers/rol");

var _grupo = require("../controllers/grupo");

var _constants = require("../constants");

var checkCrearGrupo = [(0, _expressValidator.check)("nombre", "Nombre inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 7
}, {
  max: 30
}).custom(_grupo.validarNombreGrupo), (0, _expressValidator.check)("email", "Email inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isEmail().isLength({
  min: 5
}, {
  max: 30
}).custom(_grupo.validarEmailGrupo), (0, _expressValidator.check)("pais", "País inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 5
}, {
  max: 30
}), (0, _expressValidator.check)("direccion", "País inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 5
}, {
  max: 30
}), (0, _expressValidator.check)("logo", "País inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 5
}, {
  max: 30
}), (0, _expressValidator.check)("instagram", "Usuario de Instagram inválido. La longitud mínima es 2 y máximo 30 caracteres").optional().isLength({
  min: 2
}, {
  max: 30
}), (0, _expressValidator.check)("facebook", "Usuario de Faceboook inválido. La longitud mínima es 5 y máximo 30 caracteres").optional().isString().isLength({
  min: 5
}, {
  max: 30
}), (0, _expressValidator.check)("tipo", "Tipo de grupo: ".concat(_constants.tipoGrupo.values)).notEmpty().isIn(_constants.tipoGrupo.values), (0, _expressValidator.check)("miembros").optional().custom(_grupo.validarMiembros)];
exports.checkCrearGrupo = checkCrearGrupo;
var checkAgregarMiembros = [(0, _expressValidator.param)("id").notEmpty().isUUID().custom(_grupo.validarIDGrupo), (0, _expressValidator.check)("miembros").notEmpty().custom(_grupo.validarMiembros)];
exports.checkAgregarMiembros = checkAgregarMiembros;