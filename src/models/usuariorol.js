import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const UsuarioRolModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  rol: {
    type: DataTypes.UUID,
    allowNull: false
  },
  usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  usuarioCreacion: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "usuario_creacion"
  },
  usuarioActualizacion: {
    type: DataTypes.UUID,
    field: "usuario_actualizacion"
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

export const UsuarioRolConfig = {
  freezeTableName: true,
  tableName: "usuariorol",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
