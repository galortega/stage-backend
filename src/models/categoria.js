import { DataTypes, Sequelize } from "sequelize";
import { estado, categorias } from "../constants/index";

export const CategoriaModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  minimo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maximo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tiempo: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nombre: {
    type: Sequelize.ENUM(categorias.values),
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

export const CategoriaConfig = {
  freezeTableName: true,
  tableName: "categoria",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
