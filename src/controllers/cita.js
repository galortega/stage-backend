import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, estadoCita } from "../constants/index";
import _ from "lodash";
import { errorStatusHandle } from "../utils/error";

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
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "TratamientoCita",
        attributes: ["id"],
        include: [
          {
            model: models.Psicologo,
            as: "PsicologoTratamiento",
            attributes: ["id"],
            include: [
              {
                model: models.Usuario,
                as: "UsuarioPsicologo",
                attributes: ["nombre", "telefono", "email", "imagen"]
              }
            ]
          }
        ]
      }
    ]
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
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Citas
  });
};

export const reporteEstado = async (req, res) => {
  const { porcentual } = req.query;

  const Aprobadas = await models.Cita.findAll({
    where: [
      {
        estado_cita: estadoCita.APROBADA
      },
      {
        estado: estado.ACTIVO
      }
    ],
    atributtes: ["id"]
  }).then((c) => {
    return !_.isEmpty(c) ? c.length : 0;
  });
  const Canceladas = await models.Cita.findAll({
    where: [
      {
        estado_cita: estadoCita.CANCELADA
      },
      {
        estado: estado.ACTIVO
      }
    ],
    atributtes: ["id"]
  }).then((c) => {
    return !_.isEmpty(c) ? c.length : 0;
  });
  const Pendientes = await models.Cita.findAll({
    where: [
      {
        estado_cita: estadoCita.PENDIENTE
      },
      {
        estado: estado.ACTIVO
      }
    ],
    atributtes: ["id"]
  }).then((c) => {
    return !_.isEmpty(c) ? c.length : 0;
  });

  const total = Aprobadas + Canceladas + Pendientes;

  return res.status(200).send({
    Aprobadas: !_.isEmpty(porcentual)
      ? ((Aprobadas / total) * 100).toFixed(2)
      : Aprobadas,
    Canceladas: !_.isEmpty(porcentual)
      ? ((Canceladas / total) * 100).toFixed(2)
      : Canceladas,
    Pendientes: !_.isEmpty(porcentual)
      ? ((Pendientes / total) * 100).toFixed(2)
      : Pendientes
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Cita = await models.Cita.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Cita: Cita || []
  });
};

export const crearCita = async (req, res) => {
  const t = await models.db.sequelize.transaction();

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
