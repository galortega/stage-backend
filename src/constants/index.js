export const methods = ["GET", "POST", "PUT", "DELETE"];

export const estado = {
  ACTIVO: "A",
  INACTIVO: "I",
  values: ["A", "I"]
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

export const estadoCita = {
  PENDIENTE: "P",
  APROBADA: "A",
  CANCELADA: "C",
  values: ["P", "A", "C"]
};

export const tipoDePago = {
  TARJETA: "TC",
  TRANSFERENCIA: "T",
  DEPOSITO: "D",
  values: ["TC", "T", "D"]
};

export const rolGrupo = {
  BAILARIN: "B",
  COREOGRAFO: "C",
  DIRECTOR: "D",
  values: ["B", "C", "D"]
};

export const tipoGrupo = {
  ACADEMIA: "A",
  GRUPOINDEPENDIENTE: "GI",
  values: ["A", "GI"]
};

export const estadoAprobado = {
  APROBADO: "AP",
  PENDIENTE: "P",
  values: ["AP", "P"]
};

export const rolesId = {
  PARTICIPANTE: "947aa7d3-17f5-4ab2-897e-ea97598cda96"
};

export const atributosExclude = [
  "fecha_creacion",
  "estado",
  "fecha_actualizacion"
];

export const adminDefecto = "30698c95-3245-49c9-b6e3-2326afc85de1";
