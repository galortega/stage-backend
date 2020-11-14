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

export const getModalidades = async (req, res) => {
  const Modalidades = await models.Modalidad.findAll({
    where: { estado: estado.ACTIVO },
    attributes: ["id", "nombre"]
  });

  return res.status(200).send(Modalidades);
};
