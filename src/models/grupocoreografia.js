import { DataTypes, Sequelize } from "Sequelize";
import { estado, rolGrupo } from "../constants/index";

export const GrupoCoreografiaModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuarioGrupo: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "usuariogrupo"
  },
  coreografia: {
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

export const GrupoCoreografiaConfig = {
  freezeTableName: true,
  tableName: "grupocoreografia",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
