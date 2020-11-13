import express from "express";
import { crearModalidad, getModalidades } from "../controllers/modalidad";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearModalidad));
router.get("/", asyncWrapper(getModalidades));

export default router;
