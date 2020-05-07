import models from "../models/index";
import { uuid } from "uuidv4";
import { Op, UUID } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
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

export const buscarTodos = async (req, res) => {
  const ciudades = {
    "1": {
      provincia: "AZUAY",
      cantones: {
        "101": {
          canton: "CUENCA"
        },
        "102": {
          canton: "GIRÓN"
        },
        "103": {
          canton: "GUALACEO"
        },
        "104": {
          canton: "NABÓN"
        },
        "105": {
          canton: "PAUTE"
        },
        "106": {
          canton: "PUCARA"
        },
        "107": {
          canton: "SAN FERNANDO"
        },
        "108": {
          canton: "SANTA ISABEL"
        },
        "109": {
          canton: "SIGSIG"
        },
        "110": {
          canton: "OÑA"
        },
        "111": {
          canton: "CHORDELEG"
        },
        "112": {
          canton: "EL PAN"
        },
        "113": {
          canton: "SEVILLA DE ORO"
        },
        "114": {
          canton: "GUACHAPALA"
        },
        "115": {
          canton: "CAMILO PONCE ENRÍQUEZ"
        }
      }
    },
    "2": {
      provincia: "BOLIVAR",
      cantones: {
        "201": {
          canton: "GUARANDA"
        },
        "202": {
          canton: "CHILLANES"
        },
        "203": {
          canton: "CHIMBO"
        },
        "204": {
          canton: "ECHEANDÍA"
        },
        "205": {
          canton: "SAN MIGUEL"
        },
        "206": {
          canton: "CALUMA"
        },
        "207": {
          canton: "LAS NAVES"
        }
      }
    },
    "3": {
      provincia: "CAÑAR",
      cantones: {
        "301": {
          canton: "AZOGUES"
        },
        "302": {
          canton: "BIBLIÁN"
        },
        "303": {
          canton: "CAÑAR"
        },
        "304": {
          canton: "LA TRONCAL"
        },
        "305": {
          canton: "EL TAMBO"
        },
        "306": {
          canton: "DÉLEG"
        },
        "307": {
          canton: "SUSCAL"
        }
      }
    }
  };

  _.map(ciudades, (p) => {
    _.map(p, c => {
      const cantones = [];
      _.map(c, u => {
        if (u.canton != undefined) {
          cantones.push(u.canton)
        }
        console.log(cantones);
      })

    });
    
    
  });
  const Usuarios = await models.Usuario.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
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
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Usuario: Usuario || []
  });
};

export const crearUsuario = async (req, res) => {
  const id = uuid();
  const usuario_creacion = adminDefecto;
  const {
    nombres,
    apellidos,
    fecha_nacimiento,
    imagen,
    peso,
    estatura,
    tipoSangre,
    alergias
  } = req.body;
  const datosUsuario = {
    id,
    nombres,
    apellidos,
    usuario_creacion,
    InfoUsuario: {
      id: uuid(),
      usuario: id,
      fecha_nacimiento: Date.now(),
      imagen,
      peso,
      estatura,
      tipoSangre,
      alergias,
      usuario_creacion
    }
  };

  const Usuario = await models.Usuario.create(datosUsuario, {
    include: [
      {
        model: models.InfoPersonal,
        as: "InfoUsuario"
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
    { estado: estado.INACTIVO, usuario_actualizacion: req.usuarioAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Usuario
  });
};
