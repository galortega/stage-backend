import { uuid } from "uuidv4";
import { atributosExclude, estado } from "../constants";
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

export const getDivisiones = async (req, res) => {
  const Divisiones = await models.Division.findAll({
    where: { estado: estado.ACTIVO },
    attributes: {
      exlude: atributosExclude
    }
  });

  return res.status(200).send(Divisiones);
};

export const buscarDivisionPorNombre = async (nombre) => {
  const Division = await models.Division.findOne({ where: nombre });

  return Division;
};
