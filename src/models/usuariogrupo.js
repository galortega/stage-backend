import { DataTypes, Sequelize } from "sequelize";
import { estado, estadoAprobado, rolGrupo } from "../constants/index";

export const UsuarioGrupoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.UUID
  },
  grupo: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rol: {
    type: Sequelize.ENUM(rolGrupo.values),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  aprobacion: {
    type: Sequelize.ENUM(estadoAprobado.values),
    defaultValue: estadoAprobado.PENDIENTE
  },
  fecha_aprobado: {
    type: Sequelize.DATE
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
