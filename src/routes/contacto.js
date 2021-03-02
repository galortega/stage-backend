import express from "express";
import { crearContacto, getContactos } from "../controllers/contacto";
import { checkCrearContacto } from "../validations/contacto";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post(
  "/",
  checkParameters(checkCrearContacto),
  asyncWrapper(crearContacto)
);
router.get("/", asyncWrapper(getContactos));

export default router;
