import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearEspecialidad,
  actualizarEspecialidad,
  eliminarEspecialidad
} from "../controllers/especialidad";
import { allowedMethods, asyncWrapper,  } from "../utils/utils";
import consultasRutas from "./consulta";
import doctorRouter from "./doctor";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post(
  "/",
  asyncWrapper(crearEspecialidad)
);

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get(
  "/:id",
  asyncWrapper(buscarPorId)
);
router.put(
  "/:id",
  asyncWrapper(actualizarEspecialidad)
);
router.delete(
  "/:id",
  asyncWrapper(eliminarEspecialidad)
);

router.use(consultasRutas);
router.use(doctorRouter);

export default router;
