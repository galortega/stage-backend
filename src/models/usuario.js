import { DataTypes, Sequelize } from "Sequelize";
import { estado } from "../constants/index";

export const UsuarioModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  contrasena: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  imagen: {
    type: Sequelize.STRING(500)
  },
  telefono: {
    type: Sequelize.STRING(10)
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

export const UsuarioConfig = {
  freezeTableName: true,
  tableName: "Usuario",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
