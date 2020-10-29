"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../config/connect"));

var _usuario = require("./usuario");

var _usuariorol = require("./usuariorol");

var _rol = require("./rol");

var _usuariogrupo = require("./usuariogrupo");

var _atributos = require("./atributos");

var _grupo = require("./grupo");

var _grupocoreografia = require("./grupocoreografia");

var _coreografia = require("./coreografia");

var _subTorneo = require("./subTorneo");

var _torneo = require("./torneo");

var _division = require("./division");

var _modalidad = require("./modalidad");

var Usuario = _connect["default"].sequelize.define("Usuario", _usuario.UsuarioModel, _usuario.UsuarioConfig);

var UsuarioRol = _connect["default"].sequelize.define("UsuarioRol", _usuariorol.UsuarioRolModel, _usuariorol.UsuarioRolConfig);

var Rol = _connect["default"].sequelize.define("Rol", _rol.RolModel, _rol.RolConfig);

var Atributos = _connect["default"].sequelize.define("Atributos", _atributos.AtributosModel, _atributos.AtributosConfig);

var UsuarioGrupo = _connect["default"].sequelize.define("UsuarioGrupo", _usuariogrupo.UsuarioGrupoModel, _usuariogrupo.UsuarioGrupoConfig);

var Grupo = _connect["default"].sequelize.define("Grupo", _grupo.GrupoModel, _grupo.GrupoConfig);

var Coreografia = _connect["default"].sequelize.define("Coreografia", _coreografia.CoreografiaModel, _coreografia.CoreografiaConfig);

var GrupoCoreografia = _connect["default"].sequelize.define("GrupoCoreografia", _grupocoreografia.GrupoCoreografiaModel, _grupocoreografia.GrupoCoreografiaConfig);

var SubTorneo = _connect["default"].sequelize.define("SubTorneo", _subTorneo.SubTorneoModel, _subTorneo.SubTorneoConfig);

var Torneo = _connect["default"].sequelize.define("Torneo", _torneo.TorneoModel, _torneo.TorneoConfig);

var Division = _connect["default"].sequelize.define("Division", _division.DivisionModel, _division.DivisionConfig);

var Modalidad = _connect["default"].sequelize.define("Modalidad", _modalidad.ModalidadModel, _modalidad.ModalidadConfig); //USUARIO y ROL


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
  as: "MiembroUsuario",
  foreignKey: "usuario"
});
UsuarioGrupo.belongsTo(Usuario, {
  as: "MiembroUsuario",
  foreignKey: "usuario"
}); //USUARIOROL

UsuarioRol.hasMany(Atributos, {
  as: "AtributosUsuario",
  foreignKey: "usuarioRol"
});
Atributos.belongsTo(UsuarioRol, {
  as: "AtributosUsuario",
  foreignKey: "usuarioRol"
}); //COREOGRAFIA y USUARIOGRUPO

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
}); //GRUPO

Grupo.hasMany(Coreografia, {
  as: "CoreografiaGrupo",
  foreignKey: "grupo"
});
Coreografia.belongsTo(Grupo, {
  as: "CoreografiaGrupo",
  foreignKey: "grupo"
});
Grupo.hasMany(UsuarioGrupo, {
  as: "MiembrosGrupo",
  foreignKey: "grupo"
});
UsuarioGrupo.belongsTo(Grupo, {
  as: "MiembrosGrupo",
  foreignKey: "grupo"
}); //MODALIDAD

Modalidad.hasMany(SubTorneo, {
  as: "ModalidadSubTorneo",
  foreignKey: "modalidad"
});
SubTorneo.belongsTo(Modalidad, {
  as: "ModalidadSubTorneo",
  foreignKey: "modalidad"
}); //DIVISION

Division.hasMany(SubTorneo, {
  as: "DivisionSubTorneo",
  foreignKey: "division"
});
SubTorneo.belongsTo(Division, {
  as: "DivisionSubTorneo",
  foreignKey: "division"
}); //SUBTORNEO

SubTorneo.hasMany(Coreografia, {
  as: "CoreografiaSubTorneo",
  foreignKey: "subTorneo"
});
Coreografia.belongsTo(SubTorneo, {
  as: "CoreografiaSubTorneo",
  foreignKey: "subTorneo"
}); //TORNEO

Torneo.hasMany(SubTorneo, {
  as: "SubTorneo",
  foreignKey: "torneo"
});
SubTorneo.belongsTo(Torneo, {
  as: "SubTorneo",
  foreignKey: "torneo"
});
var models = {
  db: _connect["default"],
  Usuario: Usuario,
  UsuarioRol: UsuarioRol,
  Rol: Rol,
  Atributos: Atributos,
  UsuarioGrupo: UsuarioGrupo,
  Grupo: Grupo,
  GrupoCoreografia: GrupoCoreografia,
  Coreografia: Coreografia,
  SubTorneo: SubTorneo,
  Modalidad: Modalidad,
  Division: Division,
  Torneo: Torneo
};
var _default = models;
exports["default"] = _default;