import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import {
  estado,
  atributosExclude,
  rolGrupo,
  estadoAprobado,
  asuntos,
  nombreRolGrupo,
  tipoGrupo
} from "../constants/index";
import _ from "lodash";
import { GrupoConfig } from "../models/grupo";
import { isValidEmail } from "../utils/util";
import { invitacionParticipante } from "../templates/invitacion";
import { enviarCorreo } from "../utils/nodemailer";

export const validarIDGrupo = async (id) => {
  return await models.Grupo.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((Grupo) => {
    if (!Grupo) {
      return Promise.reject(
        new Error("El id ingresado no pertenece a un grupo o academia.")
      );
    } else return Promise.resolve();
  });
};

export const validarNombreGrupo = async (nombre) => {
  return await models.Grupo.findOne({
    where: { [Op.and]: [{ nombre }, { estado: estado.ACTIVO }] }
  }).then((Grupo) => {
    if (Grupo) {
      return Promise.reject(
        new Error("El nombre ingresado ya se encuentra en uso.")
      );
    } else return Promise.resolve();
  });
};

export const validarMiembros = (miembros) => {
  if (!_.isEmpty(miembros))
    try {
      _.forEach(miembros, (miembro) => {
        if (miembro) {
          const { email, rol } = miembro;
          if (!isValidEmail(email)) throw new Error("Email inválido");
          if (!_.includes(rolGrupo.values, rol))
            throw new Error(`Rol inválido. ${rolGrupo.values}`);
        }
      });
      return true;
    } catch (error) {
      throw error;
    }
};

export const validarEmailGrupo = async (email) => {
  return await models.Grupo.findOne({
    where: { [Op.and]: [{ email }, { estado: estado.ACTIVO }] }
  }).then((Grupo) => {
    if (Grupo) {
      return Promise.reject(
        new Error("El email ingresado ya se encuentra en uso.")
      );
    } else return Promise.resolve();
  });
};

export const crearGrupo = async (req, res) => {
  const emailLider = req.token;
  const {
    nombre,
    pais,
    direccion,
    imagen,
    instagram,
    facebook,
    email,
    tipo,
    miembros
  } = req.body;
  const id = uuid();
  miembros.push({
    email: emailLider,
    rol: tipo === tipoGrupo.ACADEMIA ? rolGrupo.DIRECTOR : rolGrupo.LIDER
  });

  const datos = {
    id,
    nombre,
    tipo,
    pais,
    direccion,
    // imagen,
    instagram,
    facebook,
    email,
    UsuarioGrupo: await Promise.all(
      _.map(miembros, async (miembro) => {
        const { email, rol } = miembro;
        const usuario = await models.Usuario.findOne({
          where: [{ email }, { estado: estado.ACTIVO }]
        });
        const usuariogrupo = uuid();
        enviarCorreo(
          email,
          `${asuntos.InvitarParticipante}${nombre}`,
          invitacionParticipante({
            registrado: !usuario ? false : true,
            nombreGrupo: nombre,
            grupo: id,
            rol: nombreRolGrupo[rol],
            usuariogrupo,
            email
          })
        );
        return {
          id: usuariogrupo,
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
        as: "MiembrosGrupo",
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
        where: { estado: estado.ACTIVO },
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
      imagen,
      instagram,
      facebook,
      email
    } = grupo;
    const esMiembroToken = _.find(MiembrosGrupo, { usuario });
    if (!esMiembroToken) return false;
    _.forEach(MiembrosGrupo, (miembro) => {
      const {
        id,
        usuario,
        rol,
        fecha_aprobado,
        aprobacion,
        email,
        MiembroUsuario
      } = miembro;
      const datos = {
        id: usuario,
        usuarioGrupo: id,
        nombre: !MiembroUsuario ? null : MiembroUsuario.nombre,
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
      // imagen,
      instagram,
      facebook,
      email,
      esDirector: esMiembroToken.rol === rolGrupo.DIRECTOR,
      miembros: {
        aprobados,
        pendientes
      }
    };
  });
  if (!Grupo)
    return res.status(400).send({
      msj: "Usuario no pertenece al grupo."
    });
  else
    return res.status(200).send({
      Grupo: Grupo || []
    });
};

export const obtenerNombreGrupo = async (req, res) => {
  const { id } = req.params;

  const Grupo = await models.Grupo.findOne({ where: { id } }).then((g) => {
    if (g) return g.nombre;
  });

  return res.status(200).send({
    Grupo: Grupo || []
  });
};
