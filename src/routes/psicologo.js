import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPsicologo,
  actualizarPsicologo,
  eliminarPsicologo,
  reporteRating,
  reportePais
} from "../controllers/psicologo";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import tratamientosRouter from "./tratamiento";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", auth, asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPsicologo));

router.use("/reporteRating$", allowedMethods(["GET"]));
router.get("/reporteRating", asyncWrapper(reporteRating));

router.use("/reportePais$", allowedMethods(["GET"]));
router.get("/reportePais", asyncWrapper(reportePais));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));
router.put("/:id", auth, asyncWrapper(actualizarPsicologo));
router.delete("/:id", auth, asyncWrapper(eliminarPsicologo));

router.use("/:pais$", allowedMethods(["GET"]));
router.get("/buscarPais/:pais",auth,asyncWrapper(buscarPorPais));
router.use(tratamientosRouter);

export default router;
