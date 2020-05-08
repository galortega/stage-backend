import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearDoctor,
  actualizarDoctor,
  eliminarDoctor,
  contarTodos,
  obtenerTratamientos,
  buscarPorEspecialidad
} from "../controllers/doctor";
import { allowedMethods, asyncWrapper } from "../utils/utils";
import { routes } from "../constants/common";
import datosConsultaRouter from "./datosconsulta";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearDoctor));

router.use("/buscarPorEspecialidad$", allowedMethods(["GET"]));
router.get("/buscarPorEspecialidad", asyncWrapper(buscarPorEspecialidad));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));

router.use("/:id/obtenerTratamientos$", allowedMethods(["GET"]));
router.get("/:id/obtenerTratamientos", asyncWrapper(obtenerTratamientos));

router.put("/:id", asyncWrapper(actualizarDoctor));
router.delete("/:id", asyncWrapper(eliminarDoctor));

router.use("/numerodoctors$", allowedMethods(["GET"]));
router.get("/numerodoctors", asyncWrapper(contarTodos));

router.use(datosConsultaRouter);

export default router;
