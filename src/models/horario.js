import { DataTypes, Sequelize } from "Sequelize";
import { estado, disponibilidad } from "../constants/index"

export const HorarioModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  doctor: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fechaInicio: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "fecha_inicio"
  },
  fechaFin: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "fecha_fin"
  },
  disponibilidad: {
    type: Sequelize.ENUM(disponibilidad),
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

export const HorarioConfig = {
  freezeTableName: true,
  tableName: "horario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
