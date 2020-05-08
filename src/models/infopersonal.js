import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index"

export const InfoModel = {
  idinfo: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  peso: {
    type: Sequelize.FLOAT(7, 2)
  },
  estatura: {
    type: Sequelize.FLOAT(7, 2)
  },
  tipoSangre: {
    type: Sequelize.STRING(5),
    field: "tipo_sangre"
  },
  alergias: {
    type: Sequelize.STRING(140)
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
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

export const InfoConfig = {
  freezeTableName: true,
  tableName: "infopersonal",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
