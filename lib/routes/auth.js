"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

var _error = require("../utils/error");

var router = _express["default"].Router();

router.use("/$", (0, _error.allowedMethods)(["POST"]));
router.post("/", (0, _error.asyncWrapper)(_auth.autenticarParticipante));
var _default = router;
exports["default"] = _default;