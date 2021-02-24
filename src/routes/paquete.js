import express from "express";
import {
  actualizarPaquete,
  crearPaquete,
  eliminarPaquete,
  getPaquetes
} from "../controllers/paquete";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";


const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearPaquete));
router.get("/", asyncWrapper(getPaquetes));

router.use("/:id$", allowedMethods(["PUT", "DELETE"]));
router.put("/:id", auth, asyncWrapper(actualizarPaquete));
router.delete("/:id", auth, asyncWrapper(eliminarPaquete));

export default router;
