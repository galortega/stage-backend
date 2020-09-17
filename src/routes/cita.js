import express from "express";
import {
  buscarTodos,
  buscarTodosAdmin,
  buscarPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
  reporteEstado
} from "../controllers/cita";
import { allowedMethods, asyncWrapper } from "../utils/error";
import { routes } from "../constants/common";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["GET"]));
router.get("/", buscarTodosAdmin);

router.use("/reporteEstado$", allowedMethods(["GET"]));
router.get("/reporteEstado", reporteEstado);

router.use("/:id$", allowedMethods(["PUT"]));
router.put("/:id$", actualizarCita);

router.use(`${routes.paciente.cita}/$`, allowedMethods(["GET", "POST"]));
router.get(`${routes.paciente.cita}/`, auth, asyncWrapper(buscarTodos));
router.post(`${routes.paciente.cita}/`, auth, asyncWrapper(crearCita));

router.use(
  `${routes.paciente.cita}/:id$`,
  allowedMethods(["GET", "PUT", "DELETE"])
);
router.get(`${routes.paciente.cita}/:id`, auth, asyncWrapper(buscarPorId));
router.put(`${routes.paciente.cita}/:id`, auth, asyncWrapper(actualizarCita));
router.delete(`${routes.paciente.cita}/:id`, auth, asyncWrapper(eliminarCita));

export default router;
