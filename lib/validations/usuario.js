"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCrearUsuario = void 0;

var _expressValidator = require("express-validator");

var _usuario = require("../controllers/usuario");

var _lodash = _interopRequireDefault(require("lodash"));

var _rol = require("../controllers/rol");

var checkCrearUsuario = [(0, _expressValidator.check)("nombre", "Nombre inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 7
}, {
  max: 30
}), (0, _expressValidator.check)("email", "Email inválido. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isEmail().isLength({
  min: 5
}, {
  max: 30
}).custom(_usuario.validarEmailUsuario), (0, _expressValidator.check)("contrasena", "Contraseña inválida. La longitud mínima es 5 y máximo 30 caracteres").notEmpty().isString().isLength({
  min: 5
}, {
  max: 30
}), (0, _expressValidator.check)("rol").notEmpty().isUUID().custom(_rol.validarIDRol), (0, _expressValidator.check)("atributos", "JSON inválido").notEmpty().custom(_usuario.validarAtributos)];
exports.checkCrearUsuario = checkCrearUsuario;