import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const PaqueteModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  modalidad: {
    type: DataTypes.UUID
  },
  division: {
    type: DataTypes.UUID
  },
  categoria: {
    type: DataTypes.UUID
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
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

export const PaqueteConfig = {
  freezeTableName: true,
  tableName: "paquete",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
