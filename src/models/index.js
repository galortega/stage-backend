import db from "../config/connect";

import { UsuarioModel, UsuarioConfig } from "./usuario";
import { InfoModel, InfoConfig } from "./infopersonal";
import { ConsultaModel, ConsultaConfig } from "./consulta";
import { UsuarioRolModel, UsuarioRolConfig } from "./usuariorol";
import { RolModel, RolConfig } from "./rol";
import { DoctorModel, DoctorConfig } from "./doctor";
import { EspecialidadModel, EspecialidadConfig } from "./especialidad";
import { DatosConsultaModel, DatosConsultaConfig } from "./datosconsulta";
import { SalaModel, SalaConfig } from "./sala";
import { HorarioModel, HorarioConfig } from "./horario";
import { PsicologoModel, PsicologoConfig } from "./psicologo";
import { TratamientoModel, TratamientoConfig } from "./tratamiento";

const Usuario = db.sequelize.define("Usuario", UsuarioModel, UsuarioConfig);
const InfoPersonal = db.sequelize.define("InfoPersonal", InfoModel, InfoConfig);
const Consulta = db.sequelize.define("Consulta", ConsultaModel, ConsultaConfig);
const UsuarioRol = db.sequelize.define(
  "UsuarioRol",
  UsuarioRolModel,
  UsuarioRolConfig
);
const Rol = db.sequelize.define("Rol", RolModel, RolConfig);
const Doctor = db.sequelize.define("Doctor", DoctorModel, DoctorConfig);
const Especialidad = db.sequelize.define(
  "Especialidad",
  EspecialidadModel,
  EspecialidadConfig
);
const DatosConsulta = db.sequelize.define(
  "DatosConsulta",
  DatosConsultaModel,
  DatosConsultaConfig
);
const Psicologo = db.sequelize.define(
  "Psicologo",
  PsicologoModel,
  PsicologoConfig
);
const Tratamiento = db.sequelize.define(
  "Tratamiento",
  TratamientoModel,
  TratamientoConfig
);

const Sala = db.sequelize.define("Sala", SalaModel, SalaConfig);
const Horario = db.sequelize.define("Horario", HorarioModel, HorarioConfig);
// USUARIO INFOPERSONAL
Usuario.hasOne(InfoPersonal, { as: "InfoUsuario", foreignKey: "usuario" });
InfoPersonal.belongsTo(Usuario, { as: "InfoUsuario", foreignKey: "usuario" });
//USUARIO CONSULTA
Usuario.hasOne(Consulta, { as: "ConsultaUsuario", foreignKey: "paciente" });
Consulta.belongsTo(Usuario, { as: "ConsultaUsuario", foreignKey: "paciente" });
// DATOSCONSULTA CONSULTA
DatosConsulta.hasOne(Consulta, { as: "DatosConsulta", foreignKey: "datos" });
Consulta.belongsTo(DatosConsulta, { as: "DatosConsulta", foreignKey: "datos" });
// SALA CONSULTA
Consulta.hasOne(Sala, { as: "SalaConsulta", foreignKey: "sala" });
Sala.belongsTo(Consulta, { as: "SalaConsulta", foreignKey: "sala" });
//HORARIO CONSULTA
Horario.hasOne(Consulta, { as: "Horario", foreignKey: "horario" });
Consulta.belongsTo(Horario, { as: "Horario", foreignKey: "horario" });
// USUARIO ROL
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "usuario"
});
Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "rol"
});

// USUARIO USUARIOROL
Usuario.hasMany(UsuarioRol, { as: "UsuarioRol", foreignKey: "usuario" });
UsuarioRol.belongsTo(Usuario, { as: "UsuarioRol", foreignKey: "usuario" });
// USUARIO DOCTOR
Usuario.hasMany(Doctor, { as: "UsuarioDoctor", foreignKey: "usuario" });
Doctor.belongsTo(Usuario, { as: "UsuarioDoctor", foreignKey: "usuario" });
// HORARIO DOCTOR
Doctor.hasMany(Horario, { as: "HorarioDoctor", foreignKey: "doctor" });
Horario.belongsTo(Doctor, { as: "HorarioDoctor", foreignKey: "doctor" });
// ESPECIALIDAD DOCTOR
Especialidad.hasOne(Doctor, {
  as: "EspecialidadDoctor",
  foreignKey: "especialidad"
});
Doctor.belongsTo(Especialidad, {
  as: "EspecialidadDoctor",
  foreignKey: "especialidad"
});
// DATOSCONSULTA DOCTOR
Doctor.hasMany(DatosConsulta, {
  as: "TratamientoDoctor",
  foreignKey: "doctor"
});
DatosConsulta.belongsTo(Doctor, {
  as: "TratamientoDoctor",
  foreignKey: "doctor"
});

Usuario.hasMany(Psicologo, {
  as: "UsuarioPsicologo",
  foreignKey: "usuario"
});
Psicologo.belongsTo(Usuario, {
  as: "UsuarioPsicologo",
  foreignKey: "usuario"
});

Psicologo.hasMany(Tratamiento, {
  as: "PsicologoTratamiento",
  foreignKey: "tratamiento"
});
Tratamiento.belongsTo(Psicologo, {
  as: "PsicologoTratamiento",
  foreignKey: "tratamiento"
});

const models = {
  db,
  Usuario,
  InfoPersonal,
  Consulta,
  Rol,
  UsuarioRol,
  Doctor,
  Horario,
  Sala,
  Especialidad,
  DatosConsulta,
  Psicologo,
  Tratamiento
};

export default models;
