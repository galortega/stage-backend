import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import {
  estado,
  atributosExclude,
  estadoAprobado,
  niveles,
  nivelesTrayectoria
} from "../constants/index";
import _ from "lodash";
import { errorStatusHandle } from "../utils/error";
import moment from "moment";

export const validarIDUsuario = async (id) => {
  return await models.Usuario.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((usuario) => {
    if (!usuario) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const validarUsuarioRol = async (email, rol) => {
  return await models.Usuario.findOne({
    where: { [Op.and]: [{ email }, { estado: estado.ACTIVO }] },
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        where: { rol },
        attributes: ["rol"]
      }
    ]
  }).then((usuario) => {
    if (_.isEmpty(usuario.UsuarioRol)) {
      return Promise.reject(new Error("El usuario no posee el rol ingresado."));
    } else return Promise.resolve();
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
      const value = atributos[key];
      switch (key) {
        case "edad":
          const edad = parseInt(value);
          if (!_.isNumber(edad) || !_.inRange(edad, 0, 150) || _.isNaN(edad))
            throw new Error("Edad debe ser un número.");
        case "nivel":
          const nivel = value;
          if (!_.isString(nivel) && _.includes(niveles.values, nivel))
            throw new Error(`Nivel debe ser un string. ${niveles.values}`);
        case "trayectoria":
          const trayectoria = parseInt(value);
          if (!_.isInteger(trayectoria))
            throw new Error("Trayectoria debe debe ser un número entero.");
        default:
          break;
      }
    });
};

// Query params: rol
export const buscarTodos = async (req, res) => {
  const { rol } = req.query;
  const Usuarios = await models.Usuario.findAll({
    where: {
      estado: estado.ACTIVO
    },
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        where: rol ? { rol } : null,
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

export const buscarPorCorreo = async (req, res) => {
  const { email } = req.query;
  console.log({ email });
  const Usuario = await models.Usuario.findOne({
    where: {
      [Op.and]: [{ email }, { estado: estado.ACTIVO }]
    }
  });
  return res.status(200).send({
    Usuario: Usuario || null
  });
};

const validarNivel = (trayectoria, esProfesional, fechaNacimiento) => {
  if (
    esProfesional &&
    moment.duration(moment().diff(fechaNacimiento)).asYears() >= 18 //INCLUIR EN CONSTANTS
  )
    return niveles.PROFESIONAL;
  else if (trayectoria <= nivelesTrayectoria.BEGGINER) return niveles.BEGGINER;
  else if (trayectoria >= nivelesTrayectoria.ADVANCED) return niveles.ADVANCED;
};

export const crearUsuario = async (req, res) => {
  const t = await models.db.sequelize.transaction();

  let {
    nombre,
    email,
    contrasena,
    rol,
    atributos,
    usuarioGrupo,
    aprobacion,
    pais,
    telefono,
    fechaNacimiento,
    representante
  } = req.body;
  const id = uuid();
  const idUsuarioRol = uuid();
  const idRepresentante = uuid();

  const { trayectoria, esProfesional } = atributos; //
  atributos.nivel =
    _.isEmpty(trayectoria) || _.isEmpty(esProfesional)
      ? null
      : validarNivel(trayectoria, esProfesional, fechaNacimiento);
  atributos = _.compact(atributos);

  const AtributosUsuario = _.map(Object.keys(atributos), (a) => {
    return {
      id: uuid(),
      usuarioRol: idUsuarioRol,
      clave: a,
      valor: atributos[a]
    };
  });

  const datosUsuario = {
    id,
    nombre,
    email,
    contrasena,
    pais,
    telefono,
    representante: idRepresentante,
    fechaNacimiento,
    UsuarioRol: {
      id: idUsuarioRol,
      usuario: id,
      rol,
      AtributosUsuario
    }
  };
  try {
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
      ],
      transaction: t
    });
    let Representante;
    if (!_.isEmpty(representante)) {
      const usuarioRol = uuid();
      Object.assign(representante, {
        id: idRepresentante,
        pais,
        telefono,
        contrasena,
        UsuarioRolRepresentante: {
          id: usuarioRol,
          usuario: idRepresentante,
          rol,
          AtributosUsuario: {
            id: uuid(),
            usuarioRol: usuarioRol,
            clave: "cedula",
            valor: representante.cedula
          }
        }
      });
      Representante = await models.Representante.create(representante, {
        include: [
          {
            model: models.UsuarioRol,
            as: "UsuarioRolRepresentante",
            include: [
              {
                model: models.Atributos,
                as: "AtributosUsuario"
              }
            ]
          }
        ],
        transaction: t
      });
    }

    let UsuarioGrupo;
    if (!_.isEmpty(usuarioGrupo) && !_.isEmpty(aprobacion)) {
      const datos = {
        usuario: id,
        aprobacion,
        estado:
          aprobacion === estadoAprobado.PENDIENTE
            ? estado.INACTIVO
            : estado.ACTIVO
      };
      UsuarioGrupo = await models.UsuarioGrupo.update(datos, {
        where: { id: usuarioGrupo },
        transaction: t
      });
    }

    await t.commit();
    return res.status(201).send({
      Usuario,
      UsuarioGrupo,
      Representante,
      msj: "Usuario ingresado correctamente."
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return errorStatusHandle(res, "TRANSACCION_FALLIDA");
  }
};

const actualizarAtributos = async (atributos, usuario, idUsuarioRol) => {
  const AtributosUsuario = await Promise.all(
    _.map(Object.keys(atributos), async (a) => {
      const atributo = await models.UsuarioRol.findOne({
        where: { usuario },
        include: [
          {
            model: models.Atributos,
            as: "AtributosUsuario",
            where: { clave: a }
          }
        ]
      });
      if (!_.isEmpty(atributo))
        return {
          id: atributo.AtributosUsuario[0].id,
          usuarioRol: atributo.id,
          clave: a,
          valor: atributos[a],
          existe: true
        };
      else
        return {
          id: uuid(),
          usuarioRol: idUsuarioRol,
          clave: a,
          valor: atributos[a],
          existe: false
        };
    })
  );
  return AtributosUsuario;
};

// Agregar el resto de campos
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { rol, atributos } = req.body;

  let idUsuarioRol;
  if (!_.isEmpty(rol))
    idUsuarioRol = await models.UsuarioRol.findOne({
      where: [{ usuario: id, rol }]
    }).then((u) => (!u ? null : u.id));

  let UsuarioRol;
  if (!_.isEmpty(rol) && _.isEmpty(idUsuarioRol)) {
    idUsuarioRol = uuid();
    UsuarioRol = await models.UsuarioRol.create({
      id: idUsuarioRol,
      usuario: id,
      rol
    });
  }

  let Atributos;
  let datosAtributos;
  if (!_.isEmpty(atributos)) {
    datosAtributos = await actualizarAtributos(atributos, id, idUsuarioRol);
    Atributos = await models.Atributos.bulkCreate(datosAtributos, {
      updateOnDuplicate: ["clave", "valor"]
    });
  }

  const Usuario = await models.Usuario.update(req.body, {
    where: [{ id }, { estado: estado.ACTIVO }]
  });

  return res.status(200).send({
    Usuario,
    UsuarioRol,
    Atributos
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
