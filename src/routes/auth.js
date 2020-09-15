import express from "express";
import { autenticarUsuario } from "../controllers/auth";
import { allowedMethods, asyncWrapper } from "../utils/utils";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", asyncWrapper(autenticarUsuario));

export default router;
