"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _common = require("./constants/common");

var _expressCacheController = _interopRequireDefault(require("express-cache-controller"));

var _index = _interopRequireDefault(require("./routes/index"));

var _usuario = _interopRequireDefault(require("./routes/usuario"));

var _rol = _interopRequireDefault(require("./routes/rol"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _grupo = _interopRequireDefault(require("./routes/grupo"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _expressCacheController["default"])({
  noCache: true
})); // view engine setup

app.set("views", _path["default"].join(__dirname, "views"));
app.set("view engine", "pug");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public"))); // Routes

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use("/", _index["default"]);
app.use(_common.routes.usuarioRaiz, _usuario["default"]);
app.use(_common.routes.rol, _rol["default"]);
app.use(_common.routes.auth, _auth["default"]);
app.use(_common.routes.grupos, _grupo["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
}); // Mount uploads

app.use("./public", _express["default"]["static"](_path["default"].join(__dirname, "./public")));
var _default = app;
exports["default"] = _default;