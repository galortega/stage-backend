import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo
} from "../controllers/grupo";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import { agregarMiembros, getGrupos } from "../controllers/usuariogrupo";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearGrupo));

router.use("/obtenerGrupos$", allowedMethods(["GET"]));
router.get("/obtenerGrupos", auth, asyncWrapper(getGrupos));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", auth, asyncWrapper(buscarPorId));

router.use("/:id/invitarParticipantes$", allowedMethods(["POST"]));
router.post("/:id/invitarParticipantes", asyncWrapper(agregarMiembros));

export default router;
