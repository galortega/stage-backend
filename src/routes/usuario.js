import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearUsuario));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));

router.put("/:id", asyncWrapper(actualizarUsuario));
router.delete("/:id", asyncWrapper(eliminarUsuario));

export default router;