"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _grupo = require("../controllers/grupo");

var _error = require("../utils/error");

var _auth = _interopRequireDefault(require("../utils/auth"));

var _usuariogrupo = require("../controllers/usuariogrupo");

var _grupo2 = require("../validations/grupo");

var router = _express["default"].Router();

router.use("/$", (0, _error.allowedMethods)(["GET", "POST"]));
router.get("/", (0, _error.asyncWrapper)(_grupo.buscarTodos));
router.post("/", (0, _error.checkParameters)(_grupo2.checkCrearGrupo), (0, _error.asyncWrapper)(_grupo.crearGrupo));
router.use("/obtenerGrupos$", (0, _error.allowedMethods)(["GET"]));
router.get("/obtenerGrupos", _auth["default"], (0, _error.asyncWrapper)(_usuariogrupo.getGrupos));
router.use("/:id$", (0, _error.allowedMethods)(["GET", "PUT", "DELETE"]));
router.get("/:id", _auth["default"], (0, _error.asyncWrapper)(_grupo.buscarPorId));
router.use("/:id/invitarParticipantes$", (0, _error.allowedMethods)(["POST"]));
router.post("/:id/invitarParticipantes", (0, _error.checkParameters)(_grupo2.checkAgregarMiembros), (0, _error.asyncWrapper)(_usuariogrupo.agregarMiembros));
router.use("/:id/suspenderParticipante$", (0, _error.allowedMethods)(["PUT"]));
router.put("/:id/suspenderParticipante", (0, _error.asyncWrapper)(_usuariogrupo.desactivarMiembro));
var _default = router;
exports["default"] = _default;