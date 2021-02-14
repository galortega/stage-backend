import express from "express";
import { crearContacto } from "../controllers/contacto";
import { checkCrearContacto } from "../validations/contacto";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post(
  "/",
  checkParameters(checkCrearContacto),
  asyncWrapper(crearContacto)
);

export default router;
