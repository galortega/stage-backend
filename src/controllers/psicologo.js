import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDPsicologo = async (id) => {
  return await models.Psicologo.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((psicologo) => {
    if (!psicologo) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Psicologos = await models.Psicologo.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Usuario,
        as: "PsicologoUsuario",
        attributes: ["imagen, nombre"]
      }
    ]
  });
  return res.status(200).send({
    Psicologos
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "PsicologoTratamiento"
      }
    ]
  });
  return res.status(200).send({
    Psicologo: Psicologo || []
  });
};

export const crearPsicologo = async (req, res) => {
  req.body.id = uuid();
  req.body.UsuarioPsicologo.id = uuid();
  req.body.UsuarioPsicologo.usuario = req.body.id;

  const Psicologo = await models.Usuario.create(req.body, {
    include: [
      {
        model: models.Psicologo,
        as: "UsuarioPsicologo"
      }
    ]
  });
  return res.status(201).send({
    Psicologo,
    msj: "Psicologo ingresado correctamente."
  });
};

export const actualizarPsicologo = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Psicologo
  });
};

export const eliminarPsicologo = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.update(
    { estado: estado.INACTIVO, usuarioActualizacion: req.doctorAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Psicologo
  });
};
