import express from "express";
import {
  buscarTodos,
  buscarPorId,
  crearConsulta,
  actualizarConsulta,
  eliminarConsulta,
  contarTodos
} from "../controllers/consulta";
import { allowedMethods, asyncWrapper,  } from "../utils/utils";
import { routes } from "../constants/common";

const router = express.Router();

router.use(`${routes.usuario.consulta}/$`, allowedMethods(["GET", "POST"]));
router.get(routes.usuario.consulta, asyncWrapper(buscarTodos));
router.post(
  routes.usuario.consulta,
  asyncWrapper(crearConsulta)
);

router.use(`${routes.usuario.consulta}/:idconsulta$`, allowedMethods(["GET", "PUT", "DELETE"]));
router.get(
  `${routes.usuario.consulta}/:idconsulta`,
  asyncWrapper(buscarPorId)
);
router.put(
  `${routes.usuario.consulta}/:idconsulta`,
  asyncWrapper(actualizarConsulta)
);
router.delete(
  `${routes.usuario.consulta}/:idconsulta`,
  asyncWrapper(eliminarConsulta)
);

router.use(`${routes.usuario.consulta}/numeroconsultas$`, allowedMethods(["GET"]));
router.get(`${routes.usuario.consulta}/numeroconsultas`, asyncWrapper(contarTodos));


export default router;
