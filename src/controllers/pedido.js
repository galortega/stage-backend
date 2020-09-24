import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude } from "../constants/index";
import _ from "lodash";

export const buscarTodos = async (req, res) => {
  const Pedidos = await models.Pedido.findAll({
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Detalle,
        as: "DetallePedido"
      }
    ]
  });
  return res.status(200).send({
    Pedidos
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Pedido = await models.Pedido.findOne({
    where: {
      [Op.and]: [{ id }]
    },
    attributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Detalle,
        as: "DetallePedido"
      }
    ]
  });
  return res.status(200).send({
    Pedido: Pedido || []
  });
};

export const crearPedido = async (req, res) => {
  const id = uuid();

  const { cliente, pago, tipo, detalles, total } = req.body;
  console.log(detalles);
  _.forEach(detalles, (d) => {
    d.id = id;
    d.pedido = id;
  });

  const datos = {
    id,
    cliente,
    pago,
    tipo,
    factura: uuid().slice(0, 7),
    total,
    DetallePedido: detalles
  };

  console.log(datos);

  const Pedido = await models.Pedido.create(datos, {
    include: [
      {
        model: models.Detalle,
        as: "DetallePedido"
      }
    ]
  });

  return res.status(201).send({
    Pedido,
    msj: "Pedido ingresado correctamente."
  });
};

export const actualizarPedido = async (req, res) => {
  const id = req.params.id;
  const Pedido = await models.Pedido.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Pedido
  });
};

export const eliminarPedido = async (req, res) => {
  const id = req.params.id;
  const Pedido = await models.Pedido.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Pedido
  });
};
