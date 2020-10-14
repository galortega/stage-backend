import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const RolModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  rol: {
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

export const RolConfig = {
  freezeTableName: true,
  tableName: "rol",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
