"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolConfig = exports.RolModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var RolModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  rol: {
    type: _Sequelize.Sequelize.STRING(45),
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
exports.RolModel = RolModel;
var RolConfig = {
  freezeTableName: true,
  tableName: "rol",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.RolConfig = RolConfig;