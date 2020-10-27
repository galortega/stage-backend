import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo
} from "../controllers/grupo";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import auth from "../utils/auth";
import { agregarMiembros, getGrupos } from "../controllers/usuariogrupo";
import { checkAgregarMiembros, checkCrearGrupo } from "../validations/grupo";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", checkParameters(checkCrearGrupo), asyncWrapper(crearGrupo));

router.use("/obtenerGrupos$", allowedMethods(["GET"]));
router.get("/obtenerGrupos", auth, asyncWrapper(getGrupos));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));

router.use("/:id/invitarParticipantes$", allowedMethods(["POST"]));
router.post(
  "/:id/invitarParticipantes",
  checkParameters(checkAgregarMiembros),
  asyncWrapper(agregarMiembros)
);

export default router;
