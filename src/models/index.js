import db from "../config/connect";

import { UsuarioModel, UsuarioConfig } from "./usuario";
import { PsicologoModel, PsicologoConfig } from "./psicologo";
import { TratamientoModel, TratamientoConfig } from "./tratamiento";
import { PacienteModel, PacienteConfig } from "./paciente";
import { CitaModel, CitaConfig } from "./cita";

const Usuario = db.sequelize.define("Usuario", UsuarioModel, UsuarioConfig);
const Psicologo = db.sequelize.define(
  "Psicologo",
  PsicologoModel,
  PsicologoConfig
);
const Paciente = db.sequelize.define("Paciente", PacienteModel, PacienteConfig);
const Tratamiento = db.sequelize.define(
  "Tratamiento",
  TratamientoModel,
  TratamientoConfig
);
const Cita = db.sequelize.define("Cita", CitaModel, CitaConfig);

Usuario.hasOne(Psicologo, {
  as: "UsuarioPsicologo",
  foreignKey: "usuario"
});
Psicologo.belongsTo(Usuario, {
  as: "UsuarioPsicologo",
  foreignKey: "usuario"
});

Usuario.hasOne(Paciente, {
  as: "UsuarioPaciente",
  foreignKey: "usuario"
});
Paciente.belongsTo(Usuario, {
  as: "UsuarioPaciente",
  foreignKey: "usuario"
});

Paciente.hasOne(Cita, {
  as: "PacienteCita",
  foreignKey: "paciente"
});
Cita.belongsTo(Paciente, {
  as: "PacienteCita",
  foreignKey: "paciente"
});

Psicologo.hasMany(Tratamiento, {
  as: "PsicologoTratamiento",
  foreignKey: "psicologo"
});
Tratamiento.belongsTo(Psicologo, {
  as: "PsicologoTratamiento",
  foreignKey: "psicologo"
});

Tratamiento.hasOne(Cita, {
  as: "TratamientoCita",
  foreignKey: "tratamiento"
});
Cita.belongsTo(Tratamiento, {
  as: "TratamientoCita",
  foreignKey: "tratamiento"
});

const models = {
  db,
  Usuario,
  Psicologo,
  Paciente,
  Tratamiento,
  Cita
};

export default models;
