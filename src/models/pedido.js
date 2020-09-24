import { DataTypes, Sequelize } from "Sequelize";

export const PedidoModel = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  factura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_actualizacion: {
    type: Sequelize.DATE
  },
};

export const PedidoConfig = {
  freezeTableName: true,
  tableName: "pedido",
  timestamps: true,
  createdAt: "fecha_creacion",
  updatedAt: "fecha_actualizacion"
};
