"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseRoute = void 0;
var baseRoute = "/api/v1";
exports.baseRoute = baseRoute;
var routes = {
  usuarioRaiz: "".concat(baseRoute, "/usuarios"),
  rol: "".concat(baseRoute, "/roles"),
  auth: "".concat(baseRoute, "/auth"),
  grupos: "".concat(baseRoute, "/grupos")
};
exports.routes = routes;