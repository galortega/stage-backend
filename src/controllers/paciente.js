import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDPaciente = async (id) => {
  return await models.Paciente.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((paciente) => {
    if (!paciente) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Pacientes = await models.Paciente.findAll({
    where: {
      estado: estado.ACTIVO
    },
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Usuario,
        as: "UsuarioPaciente",
        attributes: ["imagen", "nombre"]
      }
    ]
  });
  return res.status(200).send({
    Pacientes
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Paciente = await models.Paciente.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "PacienteTratamiento"
      }
    ]
  });
  return res.status(200).send({
    Paciente: Paciente || []
  });
};

export const crearPaciente = async (req, res) => {
  req.body.id = uuid();
  req.body.UsuarioPaciente.id = uuid();
  req.body.UsuarioPaciente.usuario = req.body.id;

  const Paciente = await models.Paciente.create(req.body, {
    include: [
      {
        model: models.Paciente,
        as: "UsuarioPaciente"
      }
    ]
  });

  return res.status(201).send({
    Paciente,
    msj: "Paciente ingresado correctamente."
  });
};

export const actualizarPaciente = async (req, res) => {
  const id = req.params.id;
  const Paciente = await models.Paciente.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Paciente
  });
};

export const eliminarPaciente = async (req, res) => {
  const id = req.params.id;
  const Paciente = await models.Paciente.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Paciente
  });
};
