"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalidadConfig = exports.ModalidadModel = void 0;

var _sequelize = require("sequelize");

var _index = require("../constants/index");

var ModalidadModel = {
  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: _sequelize.Sequelize.STRING(45),
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
exports.ModalidadModel = ModalidadModel;
var ModalidadConfig = {
  freezeTableName: true,
  tableName: "modalidad",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.ModalidadConfig = ModalidadConfig;