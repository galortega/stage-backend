import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDHorario = async (id) => {
  return await models.Horario.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((horario) => {
    if (!horario) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Horarios = await models.Horario.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Horarios
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Horario = await models.Horario.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Horario: Horario || []
  });
};

export const crearHorario = async (req, res) => {
  const idhorario = uuid();
  const doctor = req.params.id;
  const usuarioCreacion = adminDefecto;
  const {
    doctor,
    horaInicio,
    horaFin,
    disponibilidad
  } = req.body;

  const Horario = await models.Horario.create(datosHorario);

  return res.status(201).send({
    Horario,
    msj: "Horario ingresado correctamente."
  });
};

export const actualizarHorario = async (req, res) => {
  const id = req.params.id;
  const Horario = await models.Horario.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Horario
  });
};

export const eliminarHorario = async (req, res) => {
  const id = req.params.id;
  const Horario = await models.Horario.update(
    { estado: estado.INACTIVO, usuarioActualizacion: req.doctorAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Horario
  });
};
