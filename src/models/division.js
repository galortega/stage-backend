import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const DivisionModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  edadInicio: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: "edad_inicio"
  },
  edadFin: {
    type: Sequelize.INTEGER,
    field: "edad_fin"
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

export const DivisionConfig = {
  freezeTableName: true,
  tableName: "division",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
