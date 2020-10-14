import express from "express";
import { buscarTodos, nuevoRol } from "../controllers/rol";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(nuevoRol));

export default router;
