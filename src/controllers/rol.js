import { errorStatusHandle } from "../utils/error";
import _ from "lodash";
import jwt from "jsonwebtoken";
import models from "../models/index";
import { Op } from "sequelize";
import { atributosExclude, estado } from "../constants/index";
import { uuid } from "uuidv4";

export const buscarTodos = async (req, res) => {
  const Roles = await models.Rol.findAll({
    where: {
      estado: estado.ACTIVO
    },
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Roles
  });
};

export const nuevoRol = async (req, res) => {
  const { rol } = req.body;

  const Rol = await models.Rol.create({ id: uuid(), rol });

  return res.status(201).send({
    Rol,
    msj: "Rol ingresado correctamente."
  });
};
