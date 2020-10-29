"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtributosConfig = exports.AtributosModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var AtributosModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  usuarioRol: {
    type: _Sequelize.DataTypes.UUID,
    allowNull: false,
    field: "usuariorol"
  },
  clave: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  valor: {
    type: _Sequelize.DataTypes.STRING(45),
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
exports.AtributosModel = AtributosModel;
var AtributosConfig = {
  freezeTableName: true,
  tableName: "atributos",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.AtributosConfig = AtributosConfig;