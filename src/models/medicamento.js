import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index"

export const MedicamentoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  resultado: {
    type: DataTypes.UUID,
    allowNull: false
  },
  nombre: {
    type: Sequelize.STRING(36),
    allowNull: false
  },
  recomendacion: {
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

export const MedicamentoConfig = {
  freezeTableName: true,
  tableName: "medicamento",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
