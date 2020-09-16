const errors = {
  // Generals
  UNAUTHORIZED: {
    title: "No autorizado",
    status: 405,
    detail: "Usted no tiene autorización para realizar esta petición."
  },
  NOT_FOUND: {
    title: "Not found",
    status: 404,
    detail: "The requested resource couldn't be found in the server"
  },
  METHOD_NOT_ALLOWED: {
    title: "Método no permitido",
    status: 505,
    detail: "El método usado en la petición no es sosportado en esta ruta."
  },
  INTERNAL_SERVER_ERROR: {
    title: "Error interno del servidor",
    status: 500,
    detail: "Algo ha salido mal del lado del servidor de la aplicación"
  },
  NOT_YET_IMPLEMENTED: {
    title: "Not Yet Implemented",
    status: 501,
    detail: "That functionality hasn't been implemented yet."
  },
  INVALID_PARAMS: {
    title: "Parámetros inválidos",
    status: 400,
    detail: "Sus parámetros de solicitud no se validaron."
  },
  CONTRASENA_INCORRECTA: {
    title: "Parámetros inválidos",
    status: 405,
    detail: "Usuario y/o contraseña no son correctos."
  },
  USUARIO_EXISTENTE: {
    title: "Usuario ya existe",
    status: 400,
    detail:
      "El número de identificación ingresado ya le pertenece a un usuario."
  },
  USUARIO_INEXISTENTE: {
    title: "Usuario no existe",
    status: 400,
    detail: "Información ingresada no le pertenece a un usuario."
  },
  PRODUCTO_EXISTENTE: {
    title: "Producto ya existe",
    status: 400,
    detail: "El código ingresado ya le pertenece a un producto."
  },
  PRODUCTO_INEXISTENTE: {
    title: "Producto no existe",
    status: 400,
    detail: "El código ingresado no le pertenece a un producto."
  },
  TRANSACCION_FALLIDA: {
    title: "Transacción fallida",
    status: 400,
    detail: "La transacción requerida no fue realizada con éxito."
  },
  TOKEN_EXPIRADO: {
    title: "Token expirado",
    status: 405,
    detail: "El token de la sesión se encuentra expirado."
  },
  TOKEN_ERROR: {
    title: "Token error",
    status: 405,
    detail: "El token de la sesión está malformado o es inválido."
  },
  TOKEN_INACTIVO: {
    title: "Token inactivo",
    status: 405,
    detail: "El token de la sesión no se encuentra activo."
  }
};

export default errors;
