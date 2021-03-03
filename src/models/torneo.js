import { DataTypes, Sequelize } from "sequelize";
import { estado, urlImagen } from "../constants/index";

export const TorneoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  pais: {
    type: Sequelize.UUID,
    allowNull: false
  },
  ciudad: {
    type: Sequelize.STRING(20),
    allowNull: false
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
  imagen: {
    type: Sequelize.STRING(45),
    get() {
      const nombre = this.getDataValue("imagen");
      if (nombre) return `${urlImagen}${nombre}`;
      else return null;
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
  }
};

export const TorneoConfig = {
  freezeTableName: true,
  tableName: "torneo",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
