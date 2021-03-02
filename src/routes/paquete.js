import express from "express";
import {
  actualizarPaquete,
  crearPaquete,
  eliminarPaquete,
  enlazarPaquete,
  getPaquetes
} from "../controllers/paquete";
import {
  checkEnlazarPaquete
} from "../validations/paquete";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearPaquete));
router.get("/", asyncWrapper(getPaquetes));
router.post(
  "/enlazarPaquete",
  checkParameters(checkEnlazarPaquete), 
  asyncWrapper(enlazarPaquete)
);

router.use("/:id$", allowedMethods(["PUT", "DELETE"]));
router.put("/:id", auth, asyncWrapper(actualizarPaquete));
router.delete("/:id", auth, asyncWrapper(eliminarPaquete));

export default router;
