import express from "express";
import { login } from "../controllers/auth";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import { checkLogin } from "../validations/auth";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post("/", checkParameters(checkLogin), asyncWrapper(login));

export default router;
