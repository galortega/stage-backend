import express from "express";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  getCategorias
} from "../controllers/categoria";
import { allowedMethods, asyncWrapper } from "../utils/error";
import auth from "../utils/auth";


const router = express.Router();

router.use("/$", allowedMethods(["POST", "GET"]));
router.post("/", asyncWrapper(crearCategoria));
router.get("/", asyncWrapper(getCategorias));

router.use("/:id$", allowedMethods(["PUT", "DELETE"]));
router.put("/:id", auth, asyncWrapper(actualizarCategoria));
router.delete("/:id", auth, asyncWrapper(eliminarCategoria));

export default router;
