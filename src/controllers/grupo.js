import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import {
  estado,
  atributosExclude,
  rolGrupo,
  estadoAprobado
} from "../constants/index";
import _ from "lodash";
import { GrupoConfig } from "../models/grupo";

export const crearGrupo = async (req, res) => {
  const {
    nombre,
    pais,
    direccion,
    logo,
    instagram,
    facebook,
    email,
    tipo,
    miembros
  } = req.body;
  const id = uuid();

  const datos = {
    id,
    nombre,
    tipo,
    pais,
    direccion,
    logo,
    instagram,
    facebook,
    email,
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
        as: "MiembrosGrupo"
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
            as: "MiembroUsuario"
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
  const { usuario } = req.token;

  const aprobados = [];
  const pendientes = [];
  const Grupo = await models.Grupo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    include: [
      {
        model: models.UsuarioGrupo,
        as: "MiembrosGrupo",
        attributes: {
          exclude: atributosExclude
        },
        include: [
          {
            model: models.Usuario,
            as: "MiembroUsuario",
            attributes: {
              exclude: atributosExclude
            }
          }
        ]
      }
    ],
    attributes: {
      exclude: atributosExclude
    }
  }).then((grupo) => {
    const {
      MiembrosGrupo,
      id,
      nombre,
      tipo,
      pais,
      direccion,
      logo,
      instagram,
      facebook,
      email
    } = grupo;
    const miembroToken = _.find(MiembrosGrupo, { usuario });
    if (!miembroToken) return false;
    _.forEach(MiembrosGrupo, (miembro) => {
      const {
        usuario,
        rol,
        fecha_aprobado,
        aprobacion,
        email,
        MiembroUsuario
      } = miembro;
      const datos = {
        id: usuario,
        nombre: !MiembroUsuario ? null : MiembroUsuario.nombres,
        correo: email,
        telefono: !MiembroUsuario ? null : MiembroUsuario.telefono,
        rol,
        fechaUnion: fecha_aprobado,
        existe: !_.isEmpty(MiembroUsuario)
      };
      if (aprobacion === estadoAprobado.APROBADO) aprobados.push(datos);
      else pendientes.push(datos);
    });
    return {
      id,
      nombre,
      tipo,
      pais,
      direccion,
      logo,
      instagram,
      facebook,
      email,
      esDirector: miembroToken.rol === rolGrupo.DIRECTOR,
      miembros: {
        aprobados,
        pendientes
      }
    };
  });
  if (!Grupo)
    return res.status(403).send({
      msj: "Usuario no válido"
    });
  else
    return res.status(200).send({
      Grupo: Grupo || []
    });
};
