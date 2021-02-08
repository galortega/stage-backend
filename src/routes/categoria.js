import express from "express";
import { crearCategoria, getCategorias } from "../controllers/categoria";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearCategoria));
router.get("/", asyncWrapper(getCategorias));

export default router;
