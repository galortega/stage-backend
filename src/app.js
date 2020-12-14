import "dotenv/config";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { routes } from "./constants/common";
import cacheControl from "express-cache-controller";

import indexRouter from "./routes/index";

import usuariosRouter from "./routes/usuario";
import rolesRouter from "./routes/rol";
import authRouter from "./routes/auth";
import gruposRouter from "./routes/grupo";
import divisionesRouter from "./routes/division";
import modalidadesRouter from "./routes/modalidad";
import torneosRouter from "./routes/torneo";
import paisesRouter from "./routes/pais";
import contactosRouter from "./routes/contacto";

const app = express();

app.use(cors());

app.use(
  cacheControl({
    noCache: true
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/", indexRouter);
app.use(routes.usuario, usuariosRouter);
app.use(routes.rol, rolesRouter);
app.use(routes.auth, authRouter);
app.use(routes.gruposRoot, gruposRouter);
app.use(routes.divisiones, divisionesRouter);
app.use(routes.modalidades, modalidadesRouter);
app.use(routes.torneos, torneosRouter);
app.use(routes.paises, paisesRouter);
app.use(routes.contactos, contactosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Mount uploads
app.use("./public", express.static(path.join(__dirname, "./public")));

export default app;
