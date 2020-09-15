import db from "../config/connect";

import { UsuarioModel, UsuarioConfig } from "./usuario";
import { PsicologoModel, PsicologoConfig } from "./psicologo";
import { TratamientoModel, TratamientoConfig } from "./tratamiento";

const Usuario = db.sequelize.define("Usuario", UsuarioModel, UsuarioConfig);

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
  Psicologo,
  Tratamiento
};

export default models;
