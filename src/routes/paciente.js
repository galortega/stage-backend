import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from "../controllers/paciente";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import citasRouter from "./cita";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", auth, asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPaciente));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));

router.put("/:id", asyncWrapper(actualizarPaciente));
router.delete("/:id", auth, asyncWrapper(eliminarPaciente));

router.use(citasRouter);

export default router;
