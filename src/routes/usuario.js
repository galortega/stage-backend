import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  buscarPorCorreo,
  totalesUsuario
} from "../controllers/usuario";
import { checkCrearUsuario } from "../validations/usuario";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post(
  "/",
  checkParameters(checkCrearUsuario),
  asyncWrapper(crearUsuario)
);

router.use("/buscarPorCorreo$", allowedMethods(["GET"]));
router.get("/buscarPorCorreo", asyncWrapper(buscarPorCorreo));

router.use("/totales/:id$", allowedMethods(["GET"]));
router.get("/totales/:id", auth, asyncWrapper(totalesUsuario));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));
router.put("/:id", asyncWrapper(actualizarUsuario));
router.delete("/:id", asyncWrapper(eliminarUsuario));


export default router;
