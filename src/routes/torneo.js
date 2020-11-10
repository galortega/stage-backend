import express from "express";
import { buscarTodos, crearTorneo } from "../controllers/torneo";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearTorneo));

export default router;
