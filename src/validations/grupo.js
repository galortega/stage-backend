import { check, param } from "express-validator";
import _ from "lodash";
import {
  validarEmailGrupo,
  validarMiembros,
  validarNombreGrupo,
  validarIDGrupo,
  validarEsDirector,
  validarEsMiembro
} from "../controllers/grupo";
import { niveles, tipoGrupo } from "../constants";
import { validarIDDivision } from "../controllers/division";
import { validarIDTorneo } from "../controllers/torneo";

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
  check(
    "pais",
    "Grupo inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .notEmpty()
    .isUUID(),
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
    "Usuario de Faceboook inválido. La longitud mínima es 2 y máximo 30 caracteres"
  )
    .optional()
    .isString()
    .isLength({ min: 2 }, { max: 30 }),
  check("tipo", `Tipo de grupo: ${tipoGrupo.values}`)
    .notEmpty()
    .isIn(tipoGrupo.values),
  check("miembros").optional().custom(validarMiembros)
];

export const checkActualizarGrupo = [
  param("id")
    .custom(validarIDGrupo)
    .custom(async (id, { req }) => {
      const { usuario, rol } = req.token;
      return await validarEsDirector(usuario, id, rol);
    }),
  check(
    "nombre",
    "Nombre inválido. La longitud mínima es 1 y máximo 30 caracteres"
  )
    .optional()
    .isString()
    .isLength({ min: 1 }, { max: 30 })
    .custom(validarNombreGrupo),
  check(
    "email",
    "Email inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .optional()
    .isEmail()
    .isLength({ min: 5 }, { max: 30 })
    .custom(validarEmailGrupo),
  check(
    "pais",
    "Grupo inválido. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .optional()
    .isUUID(),
  check(
    "direccion",
    "Dirección inválida. La longitud mínima es 5 y máximo 30 caracteres"
  )
    .optional()
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
    "Usuario de Faceboook inválido. La longitud mínima es 2 y máximo 30 caracteres"
  )
    .optional()
    .isString()
    .isLength({ min: 2 }, { max: 30 }),
  check("tipo", `Tipo de grupo: ${tipoGrupo.values}`)
    .optional()
    .isIn(tipoGrupo.values)
];

export const checkAgregarMiembros = [
  param("id").notEmpty().isUUID().custom(validarIDGrupo),
  check("miembros").notEmpty().custom(validarMiembros)
];

export const checkValidarParticipantes = [
  param("grupo").notEmpty().isUUID().custom(validarIDGrupo),
  check("nivel").notEmpty().isIn(niveles.values),
  check("division").notEmpty().custom(validarIDDivision),
  check("torneo").notEmpty().custom(validarIDTorneo)
];

export const checkEliminarGrupo = [
  param("id")
    .custom(validarIDGrupo)
    .custom(async (id, { req }) => {
      const { usuario, rol } = req.token;
      return await validarEsDirector(usuario, id, rol);
    })
];

export const checkGrupoPorID = [
  param("id")
    .custom(async (id, { req }) => {
      const { usuario, rol } = req.token;
      return await validarEsMiembro(usuario, id, rol);
    })
];
