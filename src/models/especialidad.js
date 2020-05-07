import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index"

export const EspecialidadModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(45),
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

export const EspecialidadConfig = {
  freezeTableName: true,
  tableName: "especialidad",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
