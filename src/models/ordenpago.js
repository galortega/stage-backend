import { DataTypes, Sequelize } from "Sequelize";
import { estado, tipoDePago } from "../constants/index";

export const Orden = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  datos_consulta: {
    type: DataTypes.UUID,
    allowNull: false
  },
  horario: {
    type: DataTypes.UUID,
    allowNull: false
  },
  tipoPago: {
    type: Sequelize.ENUM(tipoDePago.values),
    allowNull: false,
    field: "tipo_pago"
  },
  usuarioCreacion: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "usuario_creacion"
  },
  usuarioActualizacion: {
    type: DataTypes.UUID,
    field: "usuario_actualizacion"
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

export const OrdenConfig = {
  freezeTableName: true,
  tableName: "orden",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
