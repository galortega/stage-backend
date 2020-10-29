"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsuarioConfig = exports.UsuarioModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var UsuarioModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  email: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  telefono: {
    type: _Sequelize.Sequelize.STRING(45)
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
exports.UsuarioModel = UsuarioModel;
var UsuarioConfig = {
  freezeTableName: true,
  tableName: "usuario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.UsuarioConfig = UsuarioConfig;