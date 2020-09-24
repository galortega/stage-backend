import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido
} from "../controllers/pedido";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["GET", "POST"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearPedido));

router.use("/:id$", allowedMethods(["GET", "PUT", "DELETE"]));
router.get("/:id", asyncWrapper(buscarPorId));
router.put("/:id", asyncWrapper(actualizarPedido));
router.delete("/:id", asyncWrapper(eliminarPedido));

export default router;
