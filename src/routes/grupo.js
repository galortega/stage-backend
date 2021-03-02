import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerNombreGrupo,
  validarMiembroGrupo,
  coreografiasPorModalidadGrupo,
  totalesGrupo
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
import {
  checkAgregarMiembros,
  checkCrearGrupo,
  checkValidarParticipantes,
  checkActualizarGrupo,
  checkEliminarGrupo,
  checkGrupoPorID
} from "../validations/grupo";
import coreografiasRouter from "./coreografia";

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

router.use("/coreografiasPorModalidad/$", allowedMethods(["GET"]));
router.get(
  "/coreografiasPorModalidad/",
  asyncWrapper(coreografiasPorModalidadGrupo)
);

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get(
  "/:id",
  auth,
  checkParameters(checkGrupoPorID),
  asyncWrapper(buscarPorId)
);
router.put(
  "/:id",
  auth,
  checkParameters(checkActualizarGrupo),
  asyncWrapper(actualizarGrupo)
);
router.delete(
  "/:id",
  auth,
  checkParameters(checkEliminarGrupo),
  asyncWrapper(eliminarGrupo)
);

router.use("/:id/invitarParticipantes$", allowedMethods(["POST"]));
router.post(
  "/:id/invitarParticipantes",
  checkParameters(checkAgregarMiembros),
  auth,
  asyncWrapper(agregarMiembros)
);

router.use("/:id/suspenderParticipante$", allowedMethods(["PUT"]));
router.put("/:id/suspenderParticipante", asyncWrapper(desactivarMiembro));

router.use("/:id/confirmarParticipante$", allowedMethods(["PUT"]));
router.put("/:id/confirmarParticipante", asyncWrapper(confirmarMiembro));

router.use("/:id/obtenerNombre$", allowedMethods(["GET"]));
router.get("/:id/obtenerNombre", asyncWrapper(obtenerNombreGrupo));

router.use("/:id/totales$", allowedMethods(["GET"]));
router.get("/:id/totales", asyncWrapper(totalesGrupo));

router.use("/:grupo/validarParticipantes$", allowedMethods(["GET"]));
router.get(
  "/:grupo/validarParticipantes",
  checkParameters(checkValidarParticipantes),
  asyncWrapper(validarMiembroGrupo)
);

router.use(coreografiasRouter);

export default router;
