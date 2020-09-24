import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude } from "../constants/index";
import _ from "lodash";

export const buscarTodos = async (req, res) => {
  const Pedidos = await models.Pedido.findAll({
    where: {
      estado: estado.ACTIVO
    },
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Detalle,
        as: "DetallePedido",
        attributes: ["imagen", "nombre"]
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
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    attributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "PedidoTratamiento"
      }
    ]
  });
  return res.status(200).send({
    Pedido: Pedido || []
  });
};

export const crearPedido = async (req, res) => {
  req.body.id = uuid();
  req.body.DetallePedido.id = uuid();
  req.body.DetallePedido.usuario = req.body.id;

  const Pedido = await models.Detalle.create(req.body, {
    include: [
      {
        model: models.Pedido,
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
