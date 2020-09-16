import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPsicologo,
  actualizarPsicologo,
  eliminarPsicologo
} from "../controllers/psicologo";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", auth, asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPsicologo));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));
router.put("/:id", auth, asyncWrapper(actualizarPsicologo));
router.delete("/:id", auth, asyncWrapper(eliminarPsicologo));

export default router;
