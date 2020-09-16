import { DataTypes, Sequelize } from "Sequelize";
import { estado, estadoCita } from "../constants/index";

export const CitaModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  tratamiento: {
    type: DataTypes.UUID
  },
  paciente: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATE
  },
  motivo: {
    type: DataTypes.STRING
  },
  observacion: {
    type: DataTypes.STRING
  },
  resena: {
    type: DataTypes.STRING
  },
  estado_cita: {
    type: Sequelize.ENUM(estadoCita.values),
    defaultValue: estadoCita.PENDIENTE
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_actualizacion: {
    type: Sequelize.DATE
  },
  estado: {
    type: Sequelize.ENUM(estado.values),
    defaultValue: estado.ACTIVO
  }
};

export const CitaConfig = {
  freezeTableName: true,
  tableName: "Cita",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
