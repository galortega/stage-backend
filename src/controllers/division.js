import { uuid } from "uuidv4";
import models from "../models";

export const crearDivision = async (req, res) => {
  const { nombre, edadInicio, edadFin } = req.body;

  const datos = {
    id: uuid(),
    nombre,
    edadInicio,
    edadFin
  };

  const Division = await models.Division.create(datos);

  return res.status(200).send({
    Division,
    msj: "Division ingresada correctamente."
  });
};

export const buscarDivisionPorNombre = async (nombre) => {
  const Division = await models.Division.findOne({ where: nombre });

  return Division;
};
