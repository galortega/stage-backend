import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const RepresentanteModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  pais: {
    type: DataTypes.UUID
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(45),
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  fechaNacimiento: {
    type: Sequelize.DATE,
    field: "fecha_nacimiento"
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

export const RepresentanteConfig = {
  freezeTableName: true,
  tableName: "usuario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
