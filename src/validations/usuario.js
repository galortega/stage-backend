import { check, param, query } from "express-validator";
import { validarAtributos, validarEmailUsuario } from "../controllers/usuario";
import { validarIDUsuarioGrupo } from "../controllers/usuariogrupo";
import _ from "lodash";
import { validarIDRol } from "../controllers/rol";
import { estadoAprobado } from "../constants";
import { validarIDPais } from "../controllers/pais";

export const checkCrearUsuario = [
  check(
    "nombre",
    "Nombre inválido. La longitud mínima es 2 y máximo 30 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 2 }, { max: 30 }),
  check(
    "email",
    "Email inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .notEmpty()
    .isEmail()
    .isLength({ min: 5 }, { max: 30 })
    .custom(validarEmailUsuario),
  check(
    "contrasena",
    "Contraseña inválida. La longitud mínima es 6 y máximo 30 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 6 }, { max: 30 }),
  check("rol").notEmpty().isUUID().custom(validarIDRol),
  check("atributos", "JSON inválido").notEmpty().custom(validarAtributos),
  check("usuarioGrupo").optional().isUUID().custom(validarIDUsuarioGrupo),
  check("aprobacion").optional().isIn(estadoAprobado.values),
  check("pais", "País inválido").notEmpty().custom(validarIDPais)
];
