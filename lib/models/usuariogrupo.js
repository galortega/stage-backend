"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsuarioGrupoConfig = exports.UsuarioGrupoModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var UsuarioGrupoModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false
  },
  grupo: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false
  },
  rol: {
    type: _Sequelize.Sequelize.ENUM(_index.rolGrupo.values),
    allowNull: false
  },
  email: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  aprobacion: {
    type: _Sequelize.Sequelize.ENUM(_index.estadoAprobado.values),
    defaultValue: _index.estadoAprobado.PENDIENTE
  },
  fecha_aprobado: {
    type: _Sequelize.Sequelize.DATE
  },
  fecha_creacion: {
    type: _Sequelize.Sequelize.DATE,
    allowNull: false
  },
  fecha_actualizacion: {
    type: _Sequelize.Sequelize.DATE
  },
  estado: {
    type: _Sequelize.Sequelize.ENUM(_index.estado.values),
    defaultValue: _index.estado.ACTIVO
  }
};
exports.UsuarioGrupoModel = UsuarioGrupoModel;
var UsuarioGrupoConfig = {
  freezeTableName: true,
  tableName: "usuariogrupo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.UsuarioGrupoConfig = UsuarioGrupoConfig;