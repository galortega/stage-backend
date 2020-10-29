"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DivisionConfig = exports.DivisionModel = void 0;

var _sequelize = require("sequelize");

var _index = require("../constants/index");

var DivisionModel = {
  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: _sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  edadInicio: {
    type: _sequelize.Sequelize.INTEGER,
    allowNull: false,
    field: "edad_inicio"
  },
  edadFin: {
    type: _sequelize.Sequelize.INTEGER,
    allowNull: false,
    field: "edad_fin"
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
exports.DivisionModel = DivisionModel;
var DivisionConfig = {
  freezeTableName: true,
  tableName: "division",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.DivisionConfig = DivisionConfig;