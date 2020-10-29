"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsuarioRolConfig = exports.UsuarioRolModel = void 0;

var _sequelize = require("sequelize");

var _index = require("../constants/index");

var UsuarioRolModel = {
  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  rol: {
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
exports.UsuarioRolModel = UsuarioRolModel;
var UsuarioRolConfig = {
  freezeTableName: true,
  tableName: "usuariorol",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.UsuarioRolConfig = UsuarioRolConfig;