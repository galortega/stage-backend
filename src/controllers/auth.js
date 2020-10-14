import { errorStatusHandle } from "../utils/error";
import _ from "lodash";
import jwt from "jsonwebtoken";
import models from "../models/index";
import { Op } from "sequelize";
import { estado } from "../constants/index";

export const autenticarUsuario = async (req, res) => {
  let { email, contrasena, rol } = req.body;
  email = _.toLower(email);

  const Usuario = await models.Usuario.findOne({
    where: {
      [Op.and]: [
        {
          email: {
            [Op.like]: "%" + email + "%"
          }
        },
        { estado: estado.ACTIVO }
      ]
    },
    include: [
      {
        model: models.UsuarioRol,
        as: "RolUsuario",
        attributes: ["rol"],
        where: { rol },
        include: [
          {
            model: models.Atributos,
            as: "AtributosUsuario",
            attributes: ["clave", "valor"]
          }
        ]
      }
    ]
  });

  if (_.isEmpty(Usuario)) return errorStatusHandle(res, "USUARIO_INEXISTENTE");
  else if (contrasena !== Usuario.contrasena)
    return errorStatusHandle(res, "CONTRASENA_INCORRECTA");

  const payload = {
    usuario: Usuario.id,
    nombre: Usuario.nombre,
    email: Usuario.email,
    rol: Usuario.RolUsuario[0].id,
    atributos: Usuario.RolUsuario[0].AtributosUsuario
  };

  jwt.sign(
    payload,
    process.env.KEY,
    {
      expiresIn: "120m"
    },
    async (error, token) => {
      if (error) {
        throw error;
      } else {
        res.json({ token, payload });
      }
    }
  );
};