import { DataTypes, Sequelize } from "sequelize";
import { estado, tipoGrupo } from "../constants/index";

export const GrupoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  tipo: {
    type: Sequelize.ENUM(tipoGrupo.values),
    allowNull: false
  },
  pais: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  
  instagram: {
    type: Sequelize.STRING(45)
  },
  facebook: {
    type: Sequelize.STRING(45)
  },
  email: {
    type: Sequelize.STRING(45),
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

export const GrupoConfig = {
  freezeTableName: true,
  tableName: "grupo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
