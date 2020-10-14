import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const SubTorneoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  torneo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  division: {
    type: DataTypes.UUID,
    allowNull: false
  },
  modalidad: {
    type: DataTypes.UUID,
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

export const SubTorneoConfig = {
  freezeTableName: true,
  tableName: "subtorneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
