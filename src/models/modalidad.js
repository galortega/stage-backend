import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const ModalidadModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(45),
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

export const ModalidadConfig = {
  freezeTableName: true,
  tableName: "modalidad",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
