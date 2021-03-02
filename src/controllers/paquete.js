import { uuid } from "uuidv4";
import { atributosExclude, estado } from "../constants";
import models from "../models";
import _ from "lodash";

export const validarEnlazarPaquete = async (paquete, torneo) => {
  console.log({ paquete, torneo });
  return await models.PaqueteTorneo.findAll({
    where: [{ torneo }, { paquete }, { estado: estado.ACTIVO }]
  }).then((res) => {
    console.log({ res });
    if (!_.isEmpty(res)) {
      return Promise.reject(
        new Error(
          "El torneo ingresado ya se encuentra enlazado al mismo paquete."
        )
      );
    } else return Promise.resolve(".");
  });
};

export const crearPaquete = async (req, res) => {
  req.body.id = uuid();
  const Paquete = await models.Paquete.create(req.body);
  let PaqueteTorneo;
  if (req.body.torneo)
    PaqueteTorneo = await models.PaqueteTorneo.create({
      id: uuid(),
      torneo,
      paquete: req.body.id
    });

  return res.status(200).send({
    Paquete,
    PaqueteTorneo,
    msj: "Paquete ingresado correctamente."
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
        : "Paquete actualizado correctamente."
  });
};

export const enlazarPaquete = async (req, res) => {
  const { torneo, paquete } = req.body;

  const PaqueteTorneo = await models.PaqueteTorneo.create({
    id: uuid(),
    torneo,
    paquete
  });

  return res.status(200).send({
    PaqueteTorneo,
    msj: "Paquete enlazado correctamente."
  });
};

export const eliminarPaquete = async (req, res) => {
  const { id } = req.params;

  const PaqueteTorneo = await models.PaqueteTorneo.update(
    { estado: estado.INACTIVO },
    { where: { paquete: id } }
  );

  const Paquete = await models.Paquete.update(
    { estado: estado.INACTIVO },
    { where: { id } }
  );
  return res.status(Paquete[0] === 0 ? 409 : 200).send({
    Paquete,
    PaqueteTorneo,
    msj:
      Paquete[0] === 0
        ? "Error al actualizar"
        : "Paquete actualizado correctamente."
  });
};
