"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminDefecto = exports.atributosExclude = exports.rolesId = exports.estadoAprobado = exports.tipoGrupo = exports.rolGrupo = exports.tipoDePago = exports.estadoCita = exports.estadoHorario = exports.estadoConsulta = exports.estado = exports.methods = void 0;
var methods = ["GET", "POST", "PUT", "DELETE"];
exports.methods = methods;
var estado = {
  ACTIVO: "A",
  INACTIVO: "I",
  values: ["A", "I"]
};
exports.estado = estado;
var estadoConsulta = {
  PENDIENTE: "P",
  TERMINADA: "T",
  INICIADA: "I",
  CANCELADA: "C",
  values: ["P", "T", "I", "C"]
};
exports.estadoConsulta = estadoConsulta;
var estadoHorario = {
  DISPONIBLE: "D",
  RESERVADO: "R",
  CANCELADO: "C",
  TERMINADO: "T",
  values: ["D", "R", "C", "T"]
};
exports.estadoHorario = estadoHorario;
var estadoCita = {
  PENDIENTE: "P",
  APROBADA: "A",
  CANCELADA: "C",
  values: ["P", "A", "C"]
};
exports.estadoCita = estadoCita;
var tipoDePago = {
  TARJETA: "TC",
  TRANSFERENCIA: "T",
  DEPOSITO: "D",
  values: ["TC", "T", "D"]
};
exports.tipoDePago = tipoDePago;
var rolGrupo = {
  LIDER: "L",
  BAILARIN: "B",
  COREOGRAFO: "C",
  DIRECTOR: "D",
  values: ["B", "C", "D", "L"]
};
exports.rolGrupo = rolGrupo;
var tipoGrupo = {
  ACADEMIA: "A",
  GRUPOINDEPENDIENTE: "GI",
  values: ["A", "GI"]
};
exports.tipoGrupo = tipoGrupo;
var estadoAprobado = {
  APROBADO: "AP",
  PENDIENTE: "P",
  values: ["AP", "P"]
};
exports.estadoAprobado = estadoAprobado;
var rolesId = {
  PARTICIPANTE: "947aa7d3-17f5-4ab2-897e-ea97598cda96"
};
exports.rolesId = rolesId;
var atributosExclude = ["fecha_creacion", "estado", "fecha_actualizacion"];
exports.atributosExclude = atributosExclude;
var adminDefecto = "30698c95-3245-49c9-b6e3-2326afc85de1";
exports.adminDefecto = adminDefecto;