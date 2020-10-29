import express from "express";
import { autenticarParticipante } from "../controllers/auth";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(autenticarParticipante));

export default router;
