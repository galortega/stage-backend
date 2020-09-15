import { check, param, query } from "express-validator"

export const checkCrear
to = [
  check("numero_factura", "Numero de factura inválido.")
    .not()
    .isEmpty()
    .isLength({ max: 20 })
    .custom(validarFactura),
  check("paciente", "ID de paciente inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Cliente")
    }),
  check("servicio", "ID de producto inválido")
    .not()
    .isEmpty()
    .isUUID()
    .custom(validarIDServicio),
  check("cosmetologo", "ID de cosmetólogo inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Cosmetologo")
    }),
  check("usuario_creacion", "ID inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Administrador")
    })
]

export const checkActualizarTratamiento = [
  param("id", "Formato de ID de tratamiento inválido.")
    .isUUID()
    .custom(validarIDTratamiento),
  check("numero_factura", "Numero de factura inválido.")
    .not()
    .isEmpty()
    .isLength({ max: 20 })
    .custom(validarFactura),
  check("paciente", "ID de paciente inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Cliente")
    }),
  check("servicio", "ID de producto inválido")
    .not()
    .isEmpty()
    .isUUID()
    .custom(validarIDServicio),
  check("cosmetologo", "ID de cosmetólogo inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Cosmetologo")
    }),
  check("usuario_actualizacion", "ID inválido.")
    .not()
    .isEmpty()
    .isUUID()
    .custom(async usuario => {
      await validarRol(usuario, "Administrador")
    })
]

export const checkGetTratamiento = [
  param("id", "Formato de ID de tratamiento inválido.")
    .optional()
    .isUUID()
    .custom(validarIDTratamiento),
  query("numero_factura")
    .optional()
    .isNumeric()
]
