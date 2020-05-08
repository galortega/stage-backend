import models from "../models/index";
import { uuid } from "uuidv4";
import { Op, UUID } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDConsulta = async (id) => {
  return await models.Consulta.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((consulta) => {
    if (!consulta) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const paciente = req.params.id;
  const Consultas = await models.Consulta.findAll({
    where: {
      [Op.and]: [{ estado: estado.ACTIVO }, { paciente }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Consultas
  });
};

export const buscarPorId = async (req, res) => {
  const idconsulta = req.params.idconsulta;
  const idusuario = req.params.id;
  const Consulta = await models.Consulta.findOne({
    where: {
      [Op.and]: [
        { idconsulta },
        { estado: estado.ACTIVO },
        { paciente: idusuario }
      ]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Consulta: Consulta || []
  });
};

export const crearConsulta = async (req, res) => {
  const idconsulta = uuid();
  const codigoSala = _.replace(uuid(), "-", "");
  const usuarioCreacion = adminDefecto;
  const paciente = req.params.id;
  const {
    doctor,
    tipo,
    descripcion,
    precio,
    horario
  } = req.body;
  const datosConsulta = {
    idconsulta,
    estado_consulta,
    paciente,
    horario,
    usuarioCreacion,
    SalaConsulta: {
      id: uuid(),
      consulta: idconsulta,
      codigo: codigoSala,
      usuarioCreacion
    },
    DatosConsulta: {
      iddatos: uuid(),
      doctor,
      tipo,
      imagen,
      descripcion,
      precio,
      usuarioCreacion
    }
  };

  const Consulta = await models.Consulta.create(datosConsulta, {
    include: [
      {
        model: models.DatosConsulta,
        as: "DatosConsulta"
      },
      {
        model: models.Sala,
        as: "SalaConsulta"
      }
    ]
  });

  return res.status(201).send({
    Consulta,
    msj: "Consulta ingresada correctamente."
  });
};

export const actualizarConsulta = async (req, res) => {
  const id = req.params.id;
  const Consulta = await models.Consulta.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Consulta
  });
};

export const eliminarConsulta = async (req, res) => {
  const id = req.params.id;
  const Consulta = await models.Consulta.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Consulta
  });
};

export const contarTodos = async (req, res) => {
  const paciente = req.params.id;
  const Consultas = await models.Consulta.count({
    distinct: "idconsulta",
    where: {
      [Op.and]: [{ estado: estado.ACTIVO }, { paciente }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Consultas
  });
};
