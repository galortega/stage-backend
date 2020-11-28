import {
  asuntos,
  atributosExclude,
  estado,
  estadoAprobado,
  nombreRolGrupo,
  rolesId,
  rolGrupo,
  tipoGrupo
} from "../constants";
import models from "../models";
import _ from "lodash";
import { uuid } from "uuidv4";
import { QueryTypes, Op } from "sequelize";
import { enviarCorreo } from "../utils/nodemailer";
import { invitacionParticipante } from "../templates/invitacion";
import moment from "moment";

export const validarIDUsuarioGrupo = async (id) => {
  return await models.UsuarioGrupo.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((usuario) => {
    if (!usuario) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const getGrupos = async (req, res) => {
  const { usuario } = req.token;
  const Grupos = [];
  const Academias = [];
  await models.UsuarioGrupo.findAll({
    where: [{ usuario }, { estado: estado.ACTIVO }],
    attributes: ["rol"],
    include: [
      {
        model: models.Grupo,
        as: "MiembrosGrupo",
        attributes: ["nombre", "tipo", "id"]
      }
    ]
  }).then((grupos) => {
    return _.forEach(grupos, (g) => {
      const { tipo, nombre, id } = g.MiembrosGrupo;
      const data = {
        id,
        esDirector: _.includes([rolGrupo.DIRECTOR, rolGrupo.LIDER], g.rol),
        tipo,
        nombre
      };
      if (tipo === tipoGrupo.ACADEMIA) Academias.push(data);
      else if (tipo === tipoGrupo.GRUPOINDEPENDIENTE) Grupos.push(data);
    });
  });
  return res.status(200).send({
    Academias,
    Grupos
  });
};

export const agregarMiembros = async (req, res) => {
  const { miembros } = req.body;
  const grupo = req.params.id;

  const Miembros = await invitarMiembros(miembros, grupo);
  return res.status(200).send(Miembros);
};

export const invitarMiembros = async (miembros, grupo) => {
  const datos = [];
  const nombreGrupo = await models.Grupo.findOne({ where: { id: grupo } }).then(
    (g) => g.nombre
  );
  for (const miembro of miembros) {
    const { email, rol, trayectoria } = miembro;
    await models.Usuario.findOne({
      where: [{ email }, { estado: estado.ACTIVO }],
      include: [
        {
          model: models.UsuarioGrupo,
          as: "MiembroUsuario",
          where: { estado: estado.ACTIVO }
        }
      ]
    }).then(async (u) => {
      let validarGrupo;
      // De existir el usuario, se obtiene el id
      if (!_.isEmpty(u)) {
        u = u.toJSON();
        // Si existe el usuario, no se puede ingresar a un grupo donde ya se ingresó
        validarGrupo = _.isEmpty(_.find(u.MiembroUsuario, { grupo }));
      } // De no existir, verifico que la invitación no haya sido enviada
      else
        validarGrupo = _.isEmpty(
          await models.UsuarioGrupo.findOne({
            where: [{ email }, { grupo }, { estado: estado.ACTIVO }]
          })
        );
      // Solo se envía la invitación si el usuario no se encuentra registrado en el grupo o la invitación no ha sido enviada
      const id = uuid();
      console.log({ validarGrupo });
      if (validarGrupo) {
        datos.push({
          id,
          usuario: u ? u.id : null,
          grupo,
          email,
          rol
        });
        enviarCorreo(
          email,
          `${asuntos.InvitarParticipante}${nombreGrupo}`,
          invitacionParticipante({
            registrado: !u ? false : true,
            nombreGrupo,
            grupo,
            trayectoria,
            rol: nombreRolGrupo[rol],
            usuariogrupo: id,
            email
          })
        );
      }
    });
  }
  const Miembros = await models.UsuarioGrupo.bulkCreate(datos, {
    updateOnDuplicate: ["email"]
  });
  return Miembros;
};

export const desactivarMiembro = async (req, res) => {
  const usuarioGrupo = req.params.id;

  const UsuarioGrupo = await models.UsuarioGrupo.update(
    {
      aprobacion: estadoAprobado.PENDIENTE,
      estado: estado.INACTIVO
    },
    { where: [{ id: usuarioGrupo }] }
  );

  return res.status(200).send({
    UsuarioGrupo
  });
};

export const confirmarMiembro = async (req, res) => {
  const { id } = req.params;
  const { aprobacion } = req.body;

  const datos = {
    fecha_aprobado: moment(),
    aprobacion,
    estado:
      aprobacion === estadoAprobado.PENDIENTE ? estado.INACTIVO : estado.ACTIVO
  };

  const UsuarioGrupo = await models.UsuarioGrupo.update(datos, {
    where: { id }
  });

  return res.status(200).send(UsuarioGrupo);
};

export const getGruposLider = async (req, res) => {
  const { usuario } = req.token;
  const GI = [];
  const A = [];
  await models.UsuarioGrupo.findAll({
    where: [
      { usuario },
      { rol: { [Op.in]: [rolGrupo.DIRECTOR, rolGrupo.LIDER] } }
    ],
    include: [
      {
        model: models.Grupo,
        as: "MiembrosGrupo",
        attributes: ["nombre", "tipo"]
      }
    ],
    attributes: {
      exclude: atributosExclude
    }
  }).then((grupos) => {
    if (grupos)
      return _.map(grupos, (g) => {
        const { grupo, MiembrosGrupo } = g;
        const { nombre, tipo } = MiembrosGrupo;
        switch (tipo) {
          case tipoGrupo.ACADEMIA:
            A.push({ grupo, nombre });
            break;
          case tipoGrupo.GRUPOINDEPENDIENTE:
            GI.push({ grupo, nombre });
            break;
          default:
            break;
        }
      });
  });

  return res.status(200).send({ A, GI });
};
