"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoreografiaConfig = exports.CoreografiaModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var CoreografiaModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  subTorneo: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false
  },
  grupo: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false
  },
  resultado: {
    type: _Sequelize.Sequelize.STRING(10),
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
exports.CoreografiaModel = CoreografiaModel;
var CoreografiaConfig = {
  freezeTableName: true,
  tableName: "coreografia",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.CoreografiaConfig = CoreografiaConfig;