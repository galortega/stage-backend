import db from "../config/connect";

import { UsuarioModel, UsuarioConfig } from "./usuario";
import { UsuarioRolModel, UsuarioRolConfig } from "./usuariorol";
import { RolModel, RolConfig } from "./rol";
import { UsuarioGrupoModel, UsuarioGrupoConfig } from "./usuariogrupo";
import { AtributosModel, AtributosConfig } from "./atributos";
import { GrupoModel, GrupoConfig } from "./grupo";
import {
  GrupoCoreografiaModel,
  GrupoCoreografiaConfig
} from "./grupocoreografia";
import { CoreografiaModel, CoreografiaConfig } from "./coreografia";
import { SubTorneoModel, SubTorneoConfig } from "./subTorneo";
import { TorneoModel, TorneoConfig } from "./torneo";
import { DivisionModel, DivisionConfig } from "./division";
import { ModalidadModel, ModalidadConfig } from "./modalidad";

const Usuario = db.sequelize.define("Usuario", UsuarioModel, UsuarioConfig);
const UsuarioRol = db.sequelize.define(
  "UsuarioRol",
  UsuarioRolModel,
  UsuarioRolConfig
);
const Rol = db.sequelize.define("Rol", RolModel, RolConfig);
const Atributos = db.sequelize.define(
  "Atributos",
  AtributosModel,
  AtributosConfig
);
const UsuarioGrupo = db.sequelize.define(
  "UsuarioGrupo",
  UsuarioGrupoModel,
  UsuarioGrupoConfig
);
const Grupo = db.sequelize.define("Grupo", GrupoModel, GrupoConfig);
const Coreografia = db.sequelize.define(
  "Coreografia",
  CoreografiaModel,
  CoreografiaConfig
);
const GrupoCoreografia = db.sequelize.define(
  "GrupoCoreografia",
  GrupoCoreografiaModel,
  GrupoCoreografiaConfig
);
const SubTorneo = db.sequelize.define(
  "SubTorneo",
  SubTorneoModel,
  SubTorneoConfig
);
const Torneo = db.sequelize.define("Torneo", TorneoModel, TorneoConfig);
const Division = db.sequelize.define("Division", DivisionModel, DivisionConfig);
const Modalidad = db.sequelize.define(
  "Modalidad",
  ModalidadModel,
  ModalidadConfig
);

//USUARIO y ROL
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "usuario"
});
Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "rol"
});

Usuario.hasMany(UsuarioRol, {
  as: "UsuarioRol",
  foreignKey: "usuario"
});
UsuarioRol.belongsTo(Usuario, {
  as: "UsuarioRol",
  foreignKey: "usuario"
});

Usuario.belongsToMany(Grupo, {
  through: UsuarioGrupo,
  foreignKey: "usuario"
});
Grupo.belongsToMany(Usuario, {
  through: UsuarioGrupo,
  foreignKey: "grupo"
});

Usuario.hasMany(UsuarioGrupo, {
  as: "GrupoUsuario",
  foreignKey: "usuario"
});
UsuarioGrupo.belongsTo(Usuario, {
  as: "GrupoUsuario",
  foreignKey: "usuario"
});

//USUARIOROL
UsuarioRol.hasMany(Atributos, {
  as: "AtributosUsuario",
  foreignKey: "usuarioRol"
});
Atributos.belongsTo(UsuarioRol, {
  as: "AtributosUsuario",
  foreignKey: "usuarioRol"
});

//COREOGRAFIA y USUARIOGRUPO
Coreografia.belongsToMany(UsuarioGrupo, {
  through: GrupoCoreografia,
  as: "ParticipantesCoreografia",
  foreignKey: "coreografia"
});
UsuarioGrupo.belongsToMany(Coreografia, {
  through: GrupoCoreografia,
  as: "ParticipantesCoreografia",
  foreignKey: "usuarioGrupo"
});

UsuarioGrupo.hasMany(GrupoCoreografia, {
  as: "CoreografiaParticipante",
  foreignKey: "usuarioGrupo"
});
GrupoCoreografia.belongsTo(UsuarioGrupo, {
  as: "CoreografiaParticipante",
  foreignKey: "usuarioGrupo"
});

//GRUPO
Grupo.hasMany(Coreografia, {
  as: "CoreografiaGrupo",
  foreignKey: "grupo"
});
Coreografia.belongsTo(Grupo, {
  as: "CoreografiaGrupo",
  foreignKey: "grupo"
});
Grupo.hasMany(UsuarioGrupo, {
  as: "UsuarioGrupo",
  foreignKey: "grupo"
});
UsuarioGrupo.belongsTo(Grupo, {
  as: "UsuarioGrupo",
  foreignKey: "grupo"
});

//MODALIDAD
Modalidad.hasMany(SubTorneo, {
  as: "ModalidadSubTorneo",
  foreignKey: "modalidad"
});
SubTorneo.belongsTo(Modalidad, {
  as: "ModalidadSubTorneo",
  foreignKey: "modalidad"
});

//DIVISION
Division.hasMany(SubTorneo, {
  as: "DivisionSubTorneo",
  foreignKey: "division"
});
SubTorneo.belongsTo(Division, {
  as: "DivisionSubTorneo",
  foreignKey: "division"
});

//SUBTORNEO
SubTorneo.hasMany(Coreografia, {
  as: "CoreografiaSubTorneo",
  foreignKey: "subTorneo"
});
Coreografia.belongsTo(SubTorneo, {
  as: "CoreografiaSubTorneo",
  foreignKey: "subTorneo"
});

//TORNEO
Torneo.hasMany(SubTorneo, {
  as: "SubTorneo",
  foreignKey: "torneo"
});
SubTorneo.belongsTo(Torneo, {
  as: "SubTorneo",
  foreignKey: "torneo"
});

const models = {
  db,
  Usuario,
  UsuarioRol,
  Rol,
  Atributos,
  UsuarioGrupo,
  Grupo,
  GrupoCoreografia,
  Coreografia,
  SubTorneo,
  Modalidad,
  Division,
  Torneo
};

export default models;
