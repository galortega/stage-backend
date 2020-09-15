import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from "../controllers/paciente";
import { allowedMethods, asyncWrapper } from "../utils/utils";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPaciente));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));

router.put("/:id", asyncWrapper(actualizarPaciente));
router.delete("/:id", asyncWrapper(eliminarPaciente));

export default router;
