import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index"

export const UsuarioModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombres: {
    type: Sequelize.STRING(145),
    allowNull: false
  },
  apellidos: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  imagen: {
    type: Sequelize.STRING(45),
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
  fechaCreacion: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "fecha_creacion"
  },
  fechaActualizacion: {
    type: Sequelize.DATE,
    field: "fecha_actualizacion"
  },
  estado: {
    type: Sequelize.ENUM(estado.values),
    defaultValue: estado.ACTIVO
  },
};

export const UsuarioConfig = {
  freezeTableName: true,
  tableName: "usuario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
