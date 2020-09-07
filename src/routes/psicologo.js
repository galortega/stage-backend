import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPsicologo,
  actualizarPsicologo,
  eliminarPsicologo
} from "../controllers/psicologo";
import { allowedMethods, asyncWrapper } from "../utils/utils";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPsicologo));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));

router.put("/:id", asyncWrapper(actualizarPsicologo));
router.delete("/:id", asyncWrapper(eliminarPsicologo));

export default router;
