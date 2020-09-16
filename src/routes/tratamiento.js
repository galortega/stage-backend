import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearTratamiento,
  actualizarTratamiento,
  eliminarTratamiento
} from "../controllers/tratamiento";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import { routes } from "../constants/common";

const router = express.Router();

router.use(
  `${routes.psicologo.tratamiento}/$`,
  allowedMethods(["GET", "POST"])
);
router.get(`${routes.psicologo.tratamiento}/`, auth, asyncWrapper(buscarTodos));
router.post(`${routes.psicologo.tratamiento}/`, asyncWrapper(crearTratamiento));

router.use(
  `${routes.psicologo.tratamiento}/:id$`,
  allowedMethods(["GET", "PUT", "DELETE"])
);
router.get(
  `${routes.psicologo.tratamiento}/:id`,
  auth,
  asyncWrapper(buscarPorId)
);

router.put(
  `${routes.psicologo.tratamiento}/:id`,
  asyncWrapper(actualizarTratamiento)
);
router.delete(
  `${routes.psicologo.tratamiento}/:id`,
  auth,
  asyncWrapper(eliminarTratamiento)
);

export default router;
