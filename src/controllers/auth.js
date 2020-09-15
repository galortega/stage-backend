import { errorStatusHandle, clean } from "../utils/utils";
import _ from "lodash";
import jwt from "jsonwebtoken";
import models from "../models/index";
import { Op } from "sequelize";
import { estado } from "../constants/index";

export const autenticarUsuario = async (req, res) => {
  let { email, contrasena } = req.body;
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
    }
  });

  if (_.isEmpty(Usuario)) return errorStatusHandle(res, "USUARIO_INEXISTENTE");
  else if (contrasena !== Usuario.contrasena)
    return errorStatusHandle(res, "CONTRASENA_INCORRECTA");

  const payload = {
    id: Usuario.id,
    Usuario
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
