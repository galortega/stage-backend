import { check } from "express-validator";
import { validarEmailContacto } from "../controllers/contacto";

export const checkCrearContacto = [
  check("nombre").notEmpty().isLength({ min: 2, max: 45 }),
  check("pais").notEmpty().isUUID(),
  check("email").notEmpty().isEmail() /*.custom(validarEmailContacto)*/
];
