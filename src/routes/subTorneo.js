import express from "express";
import { actualizarSubTorneos, coreografiasPorSubTorneo } from "../controllers/subTorneo";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/actualizarTodos$", allowedMethods(["PUT"]));
router.put("/actualizarTodos", asyncWrapper(actualizarSubTorneos));

router.use("/coreografias/:id$", allowedMethods(["GET"]));
router.get("/coreografias/:id", asyncWrapper(coreografiasPorSubTorneo));

export default router;
