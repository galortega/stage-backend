"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrupoConfig = exports.GrupoModel = void 0;

var _Sequelize = require("Sequelize");

var _index = require("../constants/index");

var GrupoModel = {
  id: {
    type: _Sequelize.DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  tipo: {
    type: _Sequelize.Sequelize.ENUM(_index.tipoGrupo.values),
    allowNull: false
  },
  pais: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  direccion: {
    type: _Sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  logo: {
    type: _Sequelize.Sequelize.STRING(200)
  },
  instagram: {
    type: _Sequelize.Sequelize.STRING(45)
  },
  facebook: {
    type: _Sequelize.Sequelize.STRING(45)
  },
  email: {
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
exports.GrupoModel = GrupoModel;
var GrupoConfig = {
  freezeTableName: true,
  tableName: "grupo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.GrupoConfig = GrupoConfig;