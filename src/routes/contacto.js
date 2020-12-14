import express from "express";
import { crearContacto } from "../controllers/contacto";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(crearContacto));

export default router;
