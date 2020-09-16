import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearCita,
  actualizarCita,
  eliminarCita
} from "../controllers/cita";
import { allowedMethods, asyncWrapper } from "../utils/error";
import { routes } from "../constants/common";

const router = express.Router();

router.use(`${routes.paciente.cita}/$`, allowedMethods(["GET", "POST"]));
router.get(`${routes.paciente.cita}/`, asyncWrapper(buscarTodos));
router.post(`${routes.paciente.cita}/`, asyncWrapper(crearCita));

router.use(
  `${routes.paciente.cita}/:id$`,
  allowedMethods(["GET", "PUT", "DELETE"])
);
router.get(`${routes.paciente.cita}/:id`, asyncWrapper(buscarPorId));
router.put(`${routes.paciente.cita}/:id`, asyncWrapper(actualizarCita));
router.delete(`${routes.paciente.cita}/:id`, asyncWrapper(eliminarCita));

export default router;
