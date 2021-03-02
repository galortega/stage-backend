import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const PaqueteTorneoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  paquete: {
    type: DataTypes.UUID,
    allowNull: false
  },
  torneo: {
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

export const PaqueteTorneoConfig = {
  freezeTableName: true,
  tableName: "paquetetorneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
