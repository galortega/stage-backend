export const methods = ["GET", "POST", "PUT", "DELETE"];

export const estado = {
  ACTIVO: "A",
  INACTIVO: "I",
  values: ["A", "I"]
};

export const niveles = {
  BEGGINER: "B",
  ADVANCED: "A",
  PROFESIONAL: "P",
  values: ["B", "A", "P"]
};

export const nivelesTrayectoria = {
  BEGGINER: 3,
  ADVANCED: 4,
  values: ["B", "A"]
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
  LIDER: "L",
  BAILARIN: "B",
  COREOGRAFO: "C",
  DIRECTOR: "D",
  values: ["B", "C", "D", "L"]
};

export const nombreRolGrupo = {
  B: "Bailarín/a",
  L: "Líder",
  C: "Coreógrafo/a",
  D: "Director/a"
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
  PARTICIPANTE: "b4c884b9-dc81-44ea-9378-cfa6ca2dd54f",
  ADMINISTRADOR: "f1826bff-655d-474f-a3ed-d2599de2b101"
};

export const atributosExclude = [
  "fecha_creacion",
  "estado",
  "fecha_actualizacion"
];

export const adminDefecto = "30698c95-3245-49c9-b6e3-2326afc85de1";

export const asuntos = {
  InvitarParticipante: "Invitación a "
};

export const urlInvitarParticipante =
  "https://www.stagedanceinternational.com/#/authentication/login";
