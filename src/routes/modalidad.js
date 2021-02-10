import express from "express";
import {
  actualizarModalidad,
  crearModalidad,
  getModalidades
} from "../controllers/modalidad";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";
import { eliminarCategoria } from "../controllers/categoria";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearModalidad));
router.get("/", asyncWrapper(getModalidades));

router.use("/:id$", allowedMethods(["PUT", "DELETE"]));
router.put("/:id", auth, asyncWrapper(actualizarModalidad));
router.delete("/:id", auth, asyncWrapper(eliminarCategoria));

export default router;
