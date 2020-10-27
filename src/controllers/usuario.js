import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude } from "../constants/index";
import _ from "lodash";

export const validarIDUsuario = async (id) => {
  return await models.Usuario.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((usuario) => {
    if (!usuario) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const validarEmailUsuario = async (email) => {
  return await models.Usuario.findOne({
    where: { [Op.and]: [{ email }, { estado: estado.ACTIVO }] }
  }).then((usuario) => {
    if (usuario) {
      return Promise.reject(
        new Error("El email ingresado ya se encuentra en uso.")
      );
    } else return Promise.resolve();
  });
};

export const validarAtributos = async (atributos) => {
  if (_.isEmpty(atributos)) return true;
  else
    return _.forEach(Object.keys(atributos), (key) => {
      const value = parseInt(atributos[key]);
      switch (key) {
        case "edad":
          const edad = parseInt(value);
          if (!_.isNumber(edad) || !_.inRange(edad, 0, 150) || _.isNaN(edad))
            throw new Error("Edad debe ser un número.");
        case "nivel":
          return _.isString(value);
        default:
          break;
      }
    });
};

export const buscarTodos = async (req, res) => {
  const Usuarios = await models.Usuario.findAll({
    where: {
      estado: estado.ACTIVO
    },
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        include: [
          {
            model: models.Atributos,
            as: "AtributosUsuario"
          }
        ]
      }
    ],
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Usuarios
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Usuario = await models.Usuario.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        include: [
          {
            model: models.Atributos,
            as: "AtributosUsuario"
          }
        ]
      }
    ],
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Usuario: Usuario || []
  });
};

export const crearUsuario = async (req, res) => {
  const { nombre, email, contrasena, rol, atributos } = req.body;
  const id = uuid();
  const idUsuarioRol = uuid();
  const AtributosUsuario = _.map(Object.keys(atributos), (a) => {
    return { id: uuid(), usuarioRol: idUsuarioRol, clave: a, valor: atributos[a] };
  });

  const datosUsuario = {
    id,
    nombre,
    email,
    contrasena,
    UsuarioRol: {
      id: idUsuarioRol,
      usuario: id,
      rol,
      AtributosUsuario
    }
  };

  const Usuario = await models.Usuario.create(datosUsuario, {
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        include: [
          {
            model: models.Atributos,
            as: "AtributosUsuario"
          }
        ]
      }
    ]
  });
  return res.status(201).send({
    Usuario,
    msj: "Usuario ingresado correctamente."
  });
};

export const actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  const Usuario = await models.Usuario.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Usuario
  });
};

export const eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  const Usuario = await models.Usuario.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Usuario
  });
};
