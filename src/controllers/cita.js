import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude } from "../constants/index";
import _ from "lodash";
import moment from "moment";

export const validarIDCita = async (id) => {
  return await models.Cita.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((tratamiento) => {
    if (!tratamiento) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodosAdmin = async (req, res) => {
  const Citas = await models.Cita.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Citas
  });
};

export const buscarTodos = async (req, res) => {
  const { paciente } = req.params;
  const Citas = await models.Cita.findAll({
    where: [
      { paciente },
      {
        estado: estado.ACTIVO
      }
    ],
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Citas
  });
};

export const buscarTodosPorDia = async (req, res) => {
  const { dias } = req.query;
  const fecha = moment().subtract(!_.isEmpty(dias) ? dias : 10, "days");
  const Citas = await models.Cita.findAll({
    where: [
      {
        fecha: {
          [Op.gte]: fecha
        }
      },
      {
        estado: estado.ACTIVO
      }
    ],
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Citas
  });
};

export const buscarPorId = async (req, res) => {
  const t = await models.db.sequelize.transaction();

  const id = req.params.id;
  const Cita = await models.Cita.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Cita: Cita || []
  });
};

export const crearCita = async (req, res) => {
  const { paciente } = req.params;
  req.body.id = uuid();
  req.body.paciente = paciente;

  try {
    const Cita = await models.Cita.create(req.body, {
      transaction: t
    });
    await t.commit();
    return res.status(201).send({
      Cita,
      msj: "Cita ingresado correctamente."
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return errorStatusHandle(res, "INTERNAL_SERVER_ERROR");
  }
};

export const actualizarCita = async (req, res) => {
  const id = req.params.id;
  const Cita = await models.Cita.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Cita
  });
};

export const eliminarCita = async (req, res) => {
  const id = req.params.id;
  const Cita = await models.Cita.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Cita
  });
};
