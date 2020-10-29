"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrupoCoreografiaConfig = exports.GrupoCoreografiaModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var GrupoCoreografiaModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  usuarioGrupo: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false,
    field: "usuariogrupo"
  },
  coreografia: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false
  },
  rol: {
    type: _Sequelize.Sequelize.ENUM(_index.rolGrupo.values),
    allowNull: false
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
exports.GrupoCoreografiaModel = GrupoCoreografiaModel;
var GrupoCoreografiaConfig = {
  freezeTableName: true,
  tableName: "grupocoreografia",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.GrupoCoreografiaConfig = GrupoCoreografiaConfig;