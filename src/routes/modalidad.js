import express from "express";
import {
  actualizarModalidad,
  crearModalidad,
  getModalidades
} from "../controllers/modalidad";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearModalidad));
router.get("/", asyncWrapper(getModalidades));

router.use("/:id$", allowedMethods(["PUT"]));
router.put("/:id", auth, asyncWrapper(actualizarModalidad));

export default router;
