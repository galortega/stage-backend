import express from "express";
import { nuevoRol } from "../controllers/rol";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(nuevoRol));

export default router;
