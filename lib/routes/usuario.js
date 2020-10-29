"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usuario = require("../controllers/usuario");

var _usuario2 = require("../validations/usuario");

var _error = require("../utils/error");

var _auth = _interopRequireDefault(require("../utils/auth"));

var router = _express["default"].Router();

router.use("/$", (0, _error.allowedMethods)(["GET", "POST"]));
router.get("/", (0, _error.asyncWrapper)(_usuario.buscarTodos));
router.post("/", (0, _error.checkParameters)(_usuario2.checkCrearUsuario), (0, _error.asyncWrapper)(_usuario.crearUsuario));
router.use("/:id$", (0, _error.allowedMethods)(["GET", "PUT", "DELETE"]));
router.get("/:id", (0, _error.asyncWrapper)(_usuario.buscarPorId));
router.put("/:id", (0, _error.asyncWrapper)(_usuario.actualizarUsuario));
router["delete"]("/:id", (0, _error.asyncWrapper)(_usuario.eliminarUsuario));
var _default = router;
exports["default"] = _default;