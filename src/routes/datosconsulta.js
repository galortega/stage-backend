import express from "express";
import {

  crearDatosConsulta
} from "../controllers/datosconsulta";
import { allowedMethods, asyncWrapper,  } from "../utils/utils";
import { routes } from "../constants/common";

const router = express.Router();

router.use(`${routes.doctor.datosConsulta}/$`, allowedMethods(["GET", "POST"]));
// router.get(routes.doctor.datosConsulta, asyncWrapper(buscarTodos));
router.post(
  routes.doctor.datosConsulta,
  asyncWrapper(crearDatosConsulta)
);

export default router;