import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const TratamientoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  psicologo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  precio: {
    type: Sequelize.FLOAT
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

export const TratamientoConfig = {
  freezeTableName: true,
  tableName: "Tratamiento",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
