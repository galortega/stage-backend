import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const DetalleModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  pedido: {
    type: DataTypes.UUID,
    allowNull: false
  },
  producto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_actualizacion: {
    type: Sequelize.DATE
  }
};

export const DetalleConfig = {
  freezeTableName: true,
  tableName: "detalle",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
