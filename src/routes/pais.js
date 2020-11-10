import express from "express";
import { agregarPaises, buscarTodos } from "../controllers/pais";
import { allowedMethods, asyncWrapper } from "../utils/error";

const router = express.Router();
router.use("/$", allowedMethods(["POST", "GET"]));

router.get("/", asyncWrapper(buscarTodos));

router.post("/", asyncWrapper(agregarPaises));

export default router;
