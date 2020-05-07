import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const DoctorModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING(140),
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
  }
};

export const DoctorConfig = {
  freezeTableName: true,
  tableName: "doctor",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
