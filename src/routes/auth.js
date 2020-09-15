import express from "express";
import { autenticarUsuario } from "../controllers/auth";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(autenticarUsuario));

export default router;
