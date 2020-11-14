import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerNombreGrupo
} from "../controllers/grupo";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import auth from "../utils/auth";
import {
  agregarMiembros,
  confirmarMiembro,
  desactivarMiembro,
  getGrupos,
  getGruposLider
} from "../controllers/usuariogrupo";
import { checkAgregarMiembros, checkCrearGrupo } from "../validations/grupo";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post(
  "/",
  auth,
  checkParameters(checkCrearGrupo),
  asyncWrapper(crearGrupo)
);

router.use("/obtenerGrupos$", allowedMethods(["GET"]));
router.get("/obtenerGrupos", auth, asyncWrapper(getGrupos));

router.use("/obtenerGruposLider$", allowedMethods(["GET"]));
router.get("/obtenerGruposLider", auth, asyncWrapper(getGruposLider));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));

router.use("/:id/invitarParticipantes$", allowedMethods(["POST"]));
router.post(
  "/:id/invitarParticipantes",
  checkParameters(checkAgregarMiembros),
  asyncWrapper(agregarMiembros)
);

router.use("/:id/suspenderParticipante$", allowedMethods(["PUT"]));
router.put("/:id/suspenderParticipante", asyncWrapper(desactivarMiembro));

router.use("/:id/confirmarParticipante$", allowedMethods(["PUT"]));
router.put("/:id/confirmarParticipante", asyncWrapper(confirmarMiembro));

router.use("/:id/obtenerNombre$", allowedMethods(["GET"]));
router.get("/:id/obtenerNombre", asyncWrapper(obtenerNombreGrupo));

export default router;
