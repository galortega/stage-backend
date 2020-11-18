import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const CoreografiaModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  subTorneo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  grupo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  resultado: {
    type: Sequelize.STRING(10)
  },
  precio: {
    type: Sequelize.FLOAT,
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

export const CoreografiaConfig = {
  freezeTableName: true,
  tableName: "coreografia",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
