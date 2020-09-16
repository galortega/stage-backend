import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDTratamiento = async (id) => {
  return await models.Tratamiento.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((tratamiento) => {
    if (!tratamiento) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Tratamientos = await models.Tratamiento.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Usuario,
        as: "UsuarioTratamiento",
        attributes: ["imagen", "nombre"]
      }
    ]
  });
  return res.status(200).send({
    Tratamientos
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Tratamiento = await models.Tratamiento.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "TratamientoTratamiento"
      }
    ]
  });
  return res.status(200).send({
    Tratamiento: Tratamiento || []
  });
};

export const crearTratamiento = async (req, res) => {
  req.body.id = uuid();
  req.body.UsuarioTratamiento.id = uuid();
  req.body.UsuarioTratamiento.usuario = req.body.id;

  const Tratamiento = await models.Usuario.create(req.body, {
    include: [
      {
        model: models.Tratamiento,
        as: "UsuarioTratamiento"
      }
    ]
  });

  return res.status(201).send({
    Tratamiento,
    msj: "Tratamiento ingresado correctamente."
  });
};

export const actualizarTratamiento = async (req, res) => {
  const id = req.params.id;
  const Tratamiento = await models.Tratamiento.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Tratamiento
  });
};

export const eliminarTratamiento = async (req, res) => {
  const id = req.params.id;
  const Tratamiento = await models.Tratamiento.update(
    { estado: estado.INACTIVO, usuarioActualizacion: req.doctorAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Tratamiento
  });
};
