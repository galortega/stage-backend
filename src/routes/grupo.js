import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo
} from "../controllers/grupo";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearGrupo));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));

router.put("/:id", asyncWrapper(actualizarGrupo));
router.delete("/:id", asyncWrapper(eliminarGrupo));

export default router;
