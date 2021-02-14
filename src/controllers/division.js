import { uuid } from "uuidv4";
import { atributosExclude, estado } from "../constants";
import models from "../models";
import { Op } from "sequelize";

export const validarIDDivision = async (id) => {
  return await models.Division.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((d) => {
    if (!d) {
      return Promise.reject(
        new Error("El id ingresado no pertenece a una división.")
      );
    } else return Promise.resolve();
  });
};

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

export const actualizarDivision = async (req, res) => {
  const { id } = req.params;

  const Division = await models.Division.update(req.body, { where: { id } });

  return res.status(Division === 0 ? 409 : 200).send({
    Division,
    msj:
      Division === 0
        ? "Error al actualizar"
        : "Division actualizada correctamente."
  });
};

export const eliminarDivision = async (req, res) => {
  const { id } = req.params;

  const Division = await models.Division.update(
    { estado: estado.INACTIVO },
    { where: { id } }
  );

  return res.status(Division === 0 ? 409 : 200).send({
    Division,
    msj:
      Division === 0
        ? "Error al actualizar"
        : "Division actualizada correctamente."
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
