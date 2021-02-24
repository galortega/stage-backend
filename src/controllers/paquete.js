import { uuid } from "uuidv4";
import { atributosExclude, estado } from "../constants";
import models from "../models";
import _ from "lodash";

export const crearPaquete = async (req, res) => {
  req.body.id = uuid();
  const Paquete = await models.Paquete.create(req.body);

  return res.status(200).send({
    Paquete,
    msj: "Paquete ingresada correctamente."
  });
};

export const getPaquetes = async (req, res) => {
  const Paquetes = await models.Paquete.findAll({
    where: { estado: estado.ACTIVO },
    attributes: { exclude: atributosExclude }
  });

  return res.status(200).send(Paquetes);
};

export const actualizarPaquete = async (req, res) => {
  const { id } = req.params;

  const Paquete = await models.Paquete.update(req.body, { where: { id } });

  return res.status(Paquete[0] === 0 ? 409 : 200).send({
    Paquete,
    msj:
      Paquete[0] === 0
        ? "Error al actualizar"
        : "Paquete actualizada correctamente."
  });
};

export const eliminarPaquete = async (req, res) => {
  const { id } = req.params;

  const Paquete = await models.Paquete.update(
    { estado: estado.INACTIVO },
    { where: { id } }
  );
  return res.status(Paquete[0] === 0 ? 409 : 200).send({
    Paquete,
    msj:
      Paquete[0] === 0
        ? "Error al actualizar"
        : "Paquete actualizada correctamente."
  });
};
