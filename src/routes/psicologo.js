import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPsicologo,
  actualizarPsicologo,
  eliminarPsicologo,
  reporteRating
} from "../controllers/psicologo";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import tratamientosRouter from "./tratamiento";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", auth, asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPsicologo));

router.use("/reporteRating$", allowedMethods(["GET"]));
router.get("/reporteRating", auth, asyncWrapper(reporteRating));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));
router.put("/:id", auth, asyncWrapper(actualizarPsicologo));
router.delete("/:id", auth, asyncWrapper(eliminarPsicologo));

router.use(tratamientosRouter);

export default router;
