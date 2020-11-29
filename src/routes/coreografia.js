import express from "express";
import { routes } from "../constants/common";
import {
  crearCoreografias,
  buscarTodos,
  buscarPorGrupo
} from "../controllers/coreografia";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";

const router = express.Router();

router.use(`${routes.grupos.coreografias}/$`, allowedMethods(["POST", "GET"]));
router.post(`${routes.grupos.coreografias}/`, asyncWrapper(crearCoreografias));
router.get(`${routes.grupos.coreografias}/`, asyncWrapper(buscarTodos));

router.use(
  `${routes.grupos.coreografias}/buscarPorGrupo$`,
  allowedMethods(["GET"])
);
router.get(`${routes.grupos.coreografias}/buscarPorGrupo$`, buscarPorGrupo);

export default router;
