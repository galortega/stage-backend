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
  usuario: {
    type: Sequelize.STRING(50)
  },
  contrasena: {
    type: Sequelize.STRING(50)
  },
  urlImagen: {
    type: Sequelize.STRING(50)
  },
  telefono: {
    type: Sequelize.STRING(10)
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  estado: {
    type: Sequelize.ENUM(estado.values),
    defaultValue: estado.ACTIVO
  }
};

export const UsuarioConfig = {
  freezeTableName: true,
  tableName: "usuario",
  timestamps: true,
  createdAt: "fecha_creacion"
};
