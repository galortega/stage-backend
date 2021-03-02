import express from "express";
import {
  buscarPorId,
  buscarTodos,
  crearTorneo,
  actualizarTorneo,
  eliminarTorneo
} from "../controllers/torneo";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearTorneo));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));
router.put("/:id", asyncWrapper(actualizarTorneo));
router.delete("/:id", asyncWrapper(eliminarTorneo));

export default router;
