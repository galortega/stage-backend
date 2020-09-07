export const methods = ["GET", "POST", "PUT", "DELETE"];

export const estado = {
  ACTIVO: "AC",
  INACTIVO: "IN",
  values: ["AC", "IN"]
};

export const estadoConsulta = {
  PENDIENTE: "P",
  TERMINADA: "T",
  INICIADA: "I",
  CANCELADA: "C",
  values: ["P", "T", "I", "C"]
};

export const estadoHorario = {
  DISPONIBLE: "D",
  RESERVADO: "R",
  CANCELADO: "C",
  TERMINADO: "T",
  values: ["D", "R", "C", "T"]
};

export const tipoDePago = {
  TARJETA: "TC",
  TRANSFERENCIA: "T",
  DEPOSITO: "D",
  values: ["TC", "T", "D"]
};

export const atributosExclude = ["fecha_creacion", "estado"];

export const adminDefecto = "30698c95-3245-49c9-b6e3-2326afc85de1";
