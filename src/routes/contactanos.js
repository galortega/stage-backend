import express from "express";
import { enviarCorreoContactanos } from "../controllers/contactanos";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(enviarCorreoContactanos));

export default router;
