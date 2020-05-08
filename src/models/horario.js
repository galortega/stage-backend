import { DataTypes, Sequelize } from "Sequelize";
import { estado, disponibilidad } from "../constants/index"

export const HorarioModel = {
  idhorario: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  doctor: {
    type: DataTypes.UUID,
    allowNull: false
  },
  horaInicio: {
    type: Sequelize.STRING(36),
    allowNull: false,
    field: "hora_inicio"
  },
  horaFin: {
    type: Sequelize.STRING(36),
    allowNull: false,
    field: "hora_fin"
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
  },
};

export const HorarioConfig = {
  freezeTableName: true,
  tableName: "horario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
