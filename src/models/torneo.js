import { DataTypes, Sequelize } from "sequelize";
import { estado } from "../constants/index";

export const TorneoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  inicioInscripcion: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "inicio_inscripcion"
  },
  finInscripcion: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "fin_inscripcion"
  },
  inicioTorneo: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "inicio_torneo"
  },
  finTorneo: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "fin_torneo"
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  pais: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  ciudad: {
    type: Sequelize.STRING(20),
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

export const TorneoConfig = {
  freezeTableName: true,
  tableName: "torneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
