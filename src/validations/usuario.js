import { check, param, query } from "express-validator";
import { validarAtributos, validarEmail } from "../controllers/usuario";
import _ from "lodash";
import { validarIDRol } from "../controllers/rol";

export const checkCrearUsuario = [
  check(
    "nombre",
    "Nombre inválido. La longitud mínima es 5 y máximo 25 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 7 }, { max: 25 }),
  check(
    "email",
    "Email inválido. La longitud mínima es 5 y máximo 25 caracteres"
  )
    .notEmpty()
    .isEmail()
    .isLength({ min: 5 }, { max: 25 })
    .custom(validarEmail),
  check(
    "contrasena",
    "Contraseña inválida. La longitud mínima es 5 y máximo 25 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 5 }, { max: 25 }),
  check("rol").notEmpty().isUUID().custom(validarIDRol),
  check("atributos", "JSON inválido.").notEmpty().custom(validarAtributos)
];
