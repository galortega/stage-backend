import { DataTypes, Sequelize } from "sequelize";
import { estado, niveles } from "../constants/index";

export const PaisModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  pais: {
    type: Sequelize.STRING(100) ,
    allowNull: false
  },
  codigo: {
    type: Sequelize.STRING(5),
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

export const PaisConfig = {
  freezeTableName: true,
  tableName: "pais",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
