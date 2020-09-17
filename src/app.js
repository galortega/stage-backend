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

import psicologosRouter from "./routes/psicologo";
import pacientesRouter from "./routes/paciente";
import contactanosRouter from "./routes/contactanos";
import citasRouter from "./routes/cita";
import authRouter from "./routes/auth";
import paisesRouter from "./routes/paises";
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use(routes.psicologoRaiz, psicologosRouter);
app.use(routes.pacienteRaiz, pacientesRouter);
app.use(routes.contactanos, contactanosRouter);
app.use(routes.cita, citasRouter);
app.use(routes.auth, authRouter);
app.use(routes.paises,paisesRouter);

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

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));

export default app;
