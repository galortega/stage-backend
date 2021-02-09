import { uuid } from "uuidv4";
import { estado } from "../constants";
import models from "../models";
import _ from "lodash";

export const crearModalidad = async (req, res) => {
  const { modalidades } = req.body;

  const datos = _.map(modalidades, (m) => {
    const { nombre, precio } = m;
    return {
      id: uuid(),
      nombre,
      precio
    };
  });
  const Modalidades = await models.Modalidad.bulkCreate(datos);

  return res.status(200).send({
    Modalidades,
    msj: "Modalidad ingresada correctamente."
  });
};

export const actualizarModalidad = async (req, res) => {
  const { id } = req.params;

  const { nombre, precio } = req.body;

  const Modalidad = await models.Modalidad.update(
    { nombre, precio },
    { where: { id } }
  );

  return res.status(200).send({
    Modalidad,
    msj:
      Modalidad === 0
        ? "Error al actualizar"
        : "Modalidad actualizada correctamente."
  });
};

export const getModalidades = async (req, res) => {
  const Modalidades = await models.Modalidad.findAll({
    where: { estado: estado.ACTIVO },
    attributes: ["id", "nombre", "precio"]
  });

  return res.status(200).send(Modalidades);
};
