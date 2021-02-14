import { errorStatusHandle } from "../utils/error";
import _ from "lodash";
import jwt from "jsonwebtoken";
import models from "../models/index";
import { Op } from "sequelize";
import { atributosExclude, estado, rolesId } from "../constants/index";

export const login = async (req, res) => {
  let { email, contrasena, rol } = req.body;
  email = _.trim(_.toLower(email));
  const Usuario = await models.Usuario.findOne({
    where: [{ email }, { estado: estado.ACTIVO }],
    include: [
      {
        model: models.UsuarioRol,
        as: "UsuarioRol",
        where: { rol },
        attributes: ["rol"],
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
    rol: Usuario.UsuarioRol[0].rol,
    atributos: _.map(Usuario.UsuarioRol[0].AtributosUsuario, (atributo) => {
      if (atributo) {
        const { clave, valor } = atributo;
        const object = {};
        object[clave] = valor;
        return object;
      }
    })
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
