import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude } from "../constants/index";
import _ from "lodash";

export const crearGrupo = async (req, res) => {
  const { nombre, pais, tipo, miembros } = req.body;
  const id = uuid();

  const datos = {
    id,
    nombre,
    tipo,
    pais,
    UsuarioGrupo: await Promise.all(
      _.map(miembros, async (miembro) => {
        const { email, rol } = miembro;
        const usuario = await models.Usuario.findOne({
          where: [{ email }, { estado: estado.ACTIVO }]
        });
        return {
          id: uuid(),
          usuario: usuario ? usuario.id : null,
          grupo: id,
          email,
          rol
        };
      })
    )
  };

  const Grupo = await models.Grupo.create(datos, {
    include: [
      {
        model: models.UsuarioGrupo,
        as: "UsuarioGrupo"
      }
    ]
  });

  return res.status(201).send({
    Grupo,
    msj: "Grupo ingresado correctamente."
  });
};

export const buscarTodos = async (req, res) => {
  const Grupos = await models.Grupo.findAll({
    where: {
      estado: estado.ACTIVO
    },
    include: [
      {
        model: models.UsuarioGrupo,
        as: "UsuarioGrupo",
        include: [
          {
            model: models.Usuario,
            as: "GrupoUsuario"
          }
        ]
      }
    ],
    attributes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Grupos
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Grupo = await models.Grupo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    include: [
      {
        model: models.UsuarioGrupo,
        as: "UsuarioGrupo",
        include: [
          {
            model: models.Usuario,
            as: "GrupoUsuario"
          }
        ]
      }
    ],
    attributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Grupo: Grupo || []
  });
};
