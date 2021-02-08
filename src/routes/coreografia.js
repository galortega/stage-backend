import express from "express";
import { routes } from "../constants/common";
import {
  crearCoreografias,
  buscarTodos,
  buscarPorGrupo,
  buscarPorId,
  remplazarMiembros
} from "../controllers/coreografia";
import auth from "../utils/auth";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";

const router = express.Router();

router.use(
  `${routes.grupos.coreografias}/$`,
  auth,
  allowedMethods(["POST", "GET"])
);
router.post(
  `${routes.grupos.coreografias}/`,
  auth,
  asyncWrapper(crearCoreografias)
);
router.get(`${routes.grupos.coreografias}/`, auth, asyncWrapper(buscarTodos));

router.use(
  `${routes.grupos.coreografias}/buscarPorGrupo$`,
  auth,
  allowedMethods(["GET"])
);
router.get(
  `${routes.grupos.coreografias}/buscarPorGrupo$`,
  auth,
  buscarPorGrupo
);

router.use(
  `${routes.grupos.coreografias}/remplazarMiembros$`,
  auth,
  allowedMethods(["PUT"])
);
router.put(
  `${routes.grupos.coreografias}/remplazarMiembros$`,
  auth,
  remplazarMiembros
);

router.use(`${routes.grupos.coreografias}/:id$`, auth, allowedMethods(["GET"]));
router.get(
  `${routes.grupos.coreografias}/:id`,
  auth,
  asyncWrapper(buscarPorId)
);

export default router;
