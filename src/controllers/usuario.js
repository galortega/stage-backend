import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import {
  estado,
  atributosExclude,
  estadoAprobado,
  niveles
} from "../constants/index";
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

export const buscarPorCorreo = async (req, res) => {
  const { email } = req.query;
  console.log({email});
  const Usuario = await models.Usuario.findOne({
    where: {
      [Op.and]: [{ email }, { estado: estado.ACTIVO }]
    }
  });
  return res.status(200).send({
    Usuario: Usuario || []
  });
};

export const crearUsuario = async (req, res) => {
  const t = await models.db.sequelize.transaction();

  const {
    nombre,
    email,
    contrasena,
    rol,
    atributos,
    usuarioGrupo,
    aprobacion,
    pais,
    telefono,
    fechaNacimiento
  } = req.body;
  const id = uuid();
  const idUsuarioRol = uuid();

  // atributos.push({ nivel: niveles.PRINCIPIANTE });
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
