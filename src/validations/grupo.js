import { check, param } from "express-validator";
import _ from "lodash";
import {
  validarEmailGrupo,
  validarMiembros,
  validarNombreGrupo,
  validarIDGrupo
} from "../controllers/grupo";
import { tipoGrupo } from "../constants";

export const checkCrearGrupo = [
  check(
    "nombre",
    "Nombre inválido. La longitud mínima es 1 y máximo 30 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 1 }, { max: 30 })
    .custom(validarNombreGrupo),
  check(
    "email",
    "Email inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .notEmpty()
    .isEmail()
    .isLength({ min: 5 }, { max: 30 })
    .custom(validarEmailGrupo),
  check("pais", "Email inválido. La longitud mínima es 5 y máximo 30 caracteres")
    .notEmpty()
    .isString()
    .isLength({ min: 5 }, { max: 30 }),
  check(
    "direccion",
    "Dirección inválida. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 5 }, { max: 80 }),
  check(
    "instagram",
    "Usuario de Instagram inválido. La longitud mínima es 2 y máximo 30 caracteres"
  )
    .optional()
    .isLength({ min: 2 }, { max: 30 }),
  check(
    "facebook",
    "Usuario de Faceboook inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .optional()
    .isString()
    .isLength({ min: 5 }, { max: 30 }),
  check("tipo", `Tipo de grupo: ${tipoGrupo.values}`)
    .notEmpty()
    .isIn(tipoGrupo.values),
  check("miembros").optional().custom(validarMiembros)
];

export const checkAgregarMiembros = [
  param("id").notEmpty().isUUID().custom(validarIDGrupo),
  check("miembros").notEmpty().custom(validarMiembros)
];