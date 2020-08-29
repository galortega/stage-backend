import { errorStatusHandle, clean } from "../utils/utils";
import _ from "lodash";

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
        model: models.Administrador,
        as: "UsuarioAdministrador"
      },
      {
        model: models.Psicologo,
        as: "UsuarioPsicologo"
      },
      {
        model: models.Paciente,
        as: "UsuarioPaciente"
      }
    ]
  }).then((u) => {
    if (_.isEmpty(u)) return errorStatusHandle(res, "USUARIO_INEXISTENTE");
    else return u.toJSON();
  });
  clean(Usuario);

  if (contrasena !== Usuario.contrasena)
    return errorStatusHandle(res, "CONTRASENA_INCORRECTA");

  const payload = {
    id: Usuario.idUsuario,
    rol,
    Usuario
  };

  jwt.sign(
    payload,
    process.env.KEY,
    {
      expiresIn: tiempoToken
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
