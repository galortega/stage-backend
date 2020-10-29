"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _rol = require("../controllers/rol");

var _error = require("../utils/error");

var router = _express["default"].Router();

router.use("/$", (0, _error.allowedMethods)(["POST", "GET"]));
router.get("/", (0, _error.asyncWrapper)(_rol.buscarTodos));
router.post("/", (0, _error.asyncWrapper)(_rol.nuevoRol));
var _default = router;
exports["default"] = _default;