import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index"

export const SalaModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  consulta: {
    type: DataTypes.UUID,
    allowNull: false
  },
  codigo: {
    type: Sequelize.STRING(36),
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

export const SalaConfig = {
  freezeTableName: true,
  tableName: "sala",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
