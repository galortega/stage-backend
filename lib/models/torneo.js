"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TorneoConfig = exports.TorneoModel = void 0;

var _sequelize = require("sequelize");

var _index = require("../constants/index");

var TorneoModel = {
  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true
  },
  inicioInscripcion: {
    type: _sequelize.Sequelize.DATE,
    allowNull: false,
    field: "inicio_inscripcion"
  },
  finInscripcion: {
    type: _sequelize.Sequelize.DATE,
    allowNull: false,
    field: "fin_inscripcion"
  },
  inicioTorneo: {
    type: _sequelize.Sequelize.DATE,
    allowNull: false,
    field: "inicio_torneo"
  },
  finTorneo: {
    type: _sequelize.Sequelize.DATE,
    allowNull: false,
    field: "fin_torneo"
  },
  nombre: {
    type: _sequelize.Sequelize.STRING(45),
    allowNull: false
  },
  pais: {
    type: _sequelize.Sequelize.STRING(20),
    allowNull: false
  },
  ciudad: {
    type: _sequelize.Sequelize.STRING(20),
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
exports.TorneoModel = TorneoModel;
var TorneoConfig = {
  freezeTableName: true,
  tableName: "torneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
exports.TorneoConfig = TorneoConfig;