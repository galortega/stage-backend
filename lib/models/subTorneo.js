"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubTorneoConfig = exports.SubTorneoModel = void 0;

var _sequelize = require("sequelize");

var _index = require("../constants/index");

var SubTorneoModel = {
  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true
  },
  torneo: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  division: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  modalidad: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  fecha_creacion: {
    type: _sequelize.Sequelize.DATE,
    allowNull: false
  },
  fecha_actualizacion: {
    type: _sequelize.Sequelize.DATE
  },
  estado: {
    type: _sequelize.Sequelize.ENUM(_index.estado.values),
    defaultValue: _index.estado.ACTIVO
  }
};
exports.SubTorneoModel = SubTorneoModel;
var SubTorneoConfig = {
  freezeTableName: true,
  tableName: "subtorneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.SubTorneoConfig = SubTorneoConfig;