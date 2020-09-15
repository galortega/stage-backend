import { DataTypes, Sequelize } from "Sequelize";
import { estado, estadoConsulta } from "../constants/index"

export const ConsultaModel = {
  idconsulta: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  datos: {
    type: DataTypes.UUID,
    allowNull: false
  },
  horario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  paciente: {
    type: DataTypes.UUID,
    allowNull: false
  },
  estadoConsulta: {
    type: Sequelize.ENUM(estadoConsulta.values),
    defaultValue: estadoConsulta.PENDIENTE,
    field: "estado_consulta"
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

export const ConsultaConfig = {
  freezeTableName: true,
  tableName: "consulta",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
