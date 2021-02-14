import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const AtributosModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuarioRol: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "usuariorol"
  },
  clave: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  valor: {
    type: DataTypes.STRING(45),
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

export const AtributosConfig = {
  freezeTableName: true,
  tableName: "atributos",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
