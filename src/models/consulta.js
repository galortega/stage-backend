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
    defaultValue: estado.ACTIVO,
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
  }
};

export const ConsultaConfig = {
  freezeTableName: true,
  tableName: "consulta",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
