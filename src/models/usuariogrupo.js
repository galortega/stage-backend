import { DataTypes, Sequelize } from "Sequelize";
import { estado, rolGrupo } from "../constants/index";

export const UsuarioGrupoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  grupo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rol: {
    type: Sequelize.ENUM(rolGrupo.values),
    allowNull: false
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

export const UsuarioGrupoConfig = {
  freezeTableName: true,
  tableName: "usuariogrupo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
