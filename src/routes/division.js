import express from "express";
import { crearDivision } from "../controllers/division";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import { checkCrearDivision } from "../validations/division";

const router = express.Router();

router.use("/$", allowedMethods(["POST"]));
router.post(
  "/",
  checkParameters(checkCrearDivision),
  asyncWrapper(crearDivision)
);

export default router;
