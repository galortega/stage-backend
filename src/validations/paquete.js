import { check, param } from "express-validator";
import { validarEnlazarPaquete } from "../controllers/paquete";

export const checkEnlazarPaquete = [
  check("torneo", "Campo requerido").notEmpty().isUUID(),
  check("paquete", "Campo requerido")
    .notEmpty()
    .isUUID()
    .custom(async (paquete, { req }) => {
      const { torneo } = req.body;
      if (torneo && paquete) await validarEnlazarPaquete(paquete, torneo);
      else return false;
    })
];
