import { DataTypes, Sequelize } from "sequelize";
import { estado, tipoGrupo } from "../constants/index";

export const ContactoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  pais: {
    type: DataTypes.UUID,
    allowNull: false
  },
  nombre: {
    type: Sequelize.STRING(45),
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  descripcion: {
    type: Sequelize.STRING(500),
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

export const ContactoConfig = {
  freezeTableName: true,
  tableName: "contacto",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
