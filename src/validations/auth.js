import { check } from "express-validator";
import { validarUsuarioRol } from "../controllers/usuario";

export const checkLogin = [
  check("rol", "Rol inválido").notEmpty().isUUID(),
  check("email", "Email inválido")
    .isEmail()
    .custom(async (email, { req }) => {
      const { rol } = req.body;
      if (rol) await validarUsuarioRol(email, rol);
      else return false;
    })
];
