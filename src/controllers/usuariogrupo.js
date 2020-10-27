import { estado, rolGrupo, tipoGrupo } from "../constants";
import models from "../models";
import _ from "lodash";
import { uuid } from "uuidv4";
import { QueryTypes, Op } from "sequelize";

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
        esDirector: g.rol === rolGrupo.DIRECTOR,
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
  const datos = [];
  for (const miembro of miembros) {
    const { email, rol } = miembro;
    await models.Usuario.findOne({
      where: [{ email }, { estado: estado.ACTIVO }],
      include: [
        {
          model: models.UsuarioGrupo,
          as: "MiembroUsuario"
        }
      ]
    }).then(async (u) => {
      let validarGrupo;
      // De existir el usuario, se obtiene el id
      if (u) {
        u = u.toJSON();
        // Si existe el usuario, no se puede ingresar a un grupo donde ya se ingresó
        validarGrupo = _.isEmpty(_.find(u.MiembroUsuario, { grupo }));
      } // De no existir, verifico que la invitación no haya sido enviada
      else
        validarGrupo = _.isEmpty(
          await models.UsuarioGrupo.findOne({
            where: [{ email }, { grupo }]
          })
        );
      // Solo se envía la invitación si el usuario no se encuentra registrado en el grupo o la invitación no ha sido enviada
      if (validarGrupo)
        datos.push({
          id: uuid(),
          usuario: u ? u.id : null,
          grupo,
          email,
          rol
        });
    });
  }
  const Miembros = await models.UsuarioGrupo.bulkCreate(datos, {
    updateOnDuplicate: ["email"]
  });
  return res.status(200).send({
    Miembros
  });
};
