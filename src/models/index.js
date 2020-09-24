import db from "../config/connect";

import { PedidoModel, PedidoConfig } from "./pedido";
import { DetalleModel, DetalleConfig } from "./detalle";

const Pedido = db.sequelize.define("Pedido", PedidoModel, PedidoConfig);
const Detalle = db.sequelize.define("Detalle", DetalleModel, DetalleConfig);

Pedido.hasMany(Detalle, {
  as: "DetallePedido",
  foreignKey: "pedido"
});
Detalle.belongsTo(Pedido, {
  as: "DetallePedido",
  foreignKey: "pedido"
});

const models = {
  db,
  Pedido,
  Detalle
};

export default models;
