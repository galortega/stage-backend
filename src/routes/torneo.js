import express from "express";
import { buscarPorId, buscarTodos, crearTorneo } from "../controllers/torneo";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.get("/", asyncWrapper(buscarTodos));
router.post("/", asyncWrapper(crearTorneo));

router.use("/:id$", allowedMethods(["GET"]));
router.get("/:id", asyncWrapper(buscarPorId));

export default router;
