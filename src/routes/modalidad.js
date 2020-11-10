import express from "express";
import { crearModalidad } from "../controllers/modalidad";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(crearModalidad));

export default router;
