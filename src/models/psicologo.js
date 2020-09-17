import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const PsicologoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING(50)
  },
  longitud: {
    type: Sequelize.FLOAT
  },
  latitud: {
    type: Sequelize.FLOAT
  },
  descripcion: {
    type: Sequelize.STRING(100)
  },
  rating: {
    type: DataTypes.VIRTUAL,
    get() {
      return (Math.random() * 4 + 1).toFixed(1);
    }
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
  pais:{
    type: Sequelize.STRING(36),
    allowNull: false
  }


};

export const PsicologoConfig = {
  freezeTableName: true,
  tableName: "Psicologo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
