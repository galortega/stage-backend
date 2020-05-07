import express from "express";
import {
  buscarTodos,
  buscarPorId
} from "../controllers/infopersonal";
import { allowedMethods, asyncWrapper,  } from "../utils/utils";
import { routes } from "../constants/common";


const router = express.Router();

router.use(`${routes.usuario.infoPersonal}/$`, allowedMethods(["GET", "POST"]));
router.get(routes.usuario.infoPersonal, asyncWrapper(buscarTodos));

router.use(`${routes.usuario.infoPersonal}/:idinfo$`, allowedMethods(["GET", "PUT", "DELETE"]));
router.get(
  `${routes.usuario.infoPersonal}/:idinfo`,
  asyncWrapper(buscarPorId)
);

export default router;
