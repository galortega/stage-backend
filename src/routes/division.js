import express from "express";
import { crearDivision, getDivisiones } from "../controllers/division";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import { checkCrearDivision } from "../validations/division";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post(
  "/",
  checkParameters(checkCrearDivision),
  asyncWrapper(crearDivision)
);
router.get("/", asyncWrapper(getDivisiones));

export default router;
