import { check } from "express-validator";

export const checkCrearDivision = [
  check(
    "nombre",
    "Nombre inválido. La longitud mínima es 1 y máximo 30 caracteres"
  )
    .notEmpty()
    .isString()
    .isLength({ min: 1 }, { max: 30 }),
  check("edadInicio", "Edad de inicio inválida.").notEmpty().isInt(),
  check("edadFin", "Edad de inicio inválida.").optional().isInt()
];
