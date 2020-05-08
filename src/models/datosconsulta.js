import { DataTypes, Sequelize } from "Sequelize";
import { estado, estadoConsulta } from "../constants/index"

export const DatosConsultaModel = {
  iddatos: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  doctor: {
    type: DataTypes.UUID,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING(140),
    allowNull: false
  },
  precio: {
    type: Sequelize.FLOAT(7, 20),
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
  }
};

export const DatosConsultaConfig = {
  freezeTableName: true,
  tableName: "datosconsulta",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
