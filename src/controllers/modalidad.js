import { uuid } from "uuidv4";
import { estado } from "../constants";
import models from "../models";

export const crearModalidad = async (req, res) => {
  const { nombre } = req.body;

  const datos = {
    id: uuid(),
    nombre
  };

  const Modalidad = await models.Modalidad.create(datos);

  return res.status(200).send({
    Modalidad,
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
