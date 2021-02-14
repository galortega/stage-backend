import express from "express";
import { actualizarSubTorneos } from "../controllers/subTorneo";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();

router.use("/actualizarTodos$", allowedMethods(["PUT"]));
router.put("/actualizarTodos", asyncWrapper(actualizarSubTorneos));

export default router;
