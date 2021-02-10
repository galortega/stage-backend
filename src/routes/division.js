import express from "express";
import {
  actualizarDivision,
  crearDivision,
  eliminarDivision,
  getDivisiones
} from "../controllers/division";
import { allowedMethods, asyncWrapper, checkParameters } from "../utils/error";
import { checkCrearDivision } from "../validations/division";
import auth from "../utils/auth";


const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post(
  "/",
  checkParameters(checkCrearDivision),
  asyncWrapper(crearDivision)
);
router.get("/", asyncWrapper(getDivisiones));

router.use("/:id$", allowedMethods(["PUT", "DELETE"]));
router.put("/:id", auth, asyncWrapper(actualizarDivision));
router.delete("/:id", auth, asyncWrapper(eliminarDivision));

export default router;
