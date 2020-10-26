import { estado, rolGrupo, tipoGrupo } from "../constants";
import models from "../models";
import _ from "lodash";
import { uuid } from "uuidv4";

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
        attributes: ["nombre", "tipo"]
      }
    ]
  }).then((grupos) => {
    return _.forEach(grupos, (g) => {
      const { tipo, nombre } = g.MiembrosGrupo;
      const data = {
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
  const datos = await Promise.all(
    _.map(miembros, async (miembro) => {
      const { email, rol } = miembro;
      const usuario = await models.Usuario.findOne({
        where: [{ email }, { estado: estado.ACTIVO }]
      });
      return {
        id: uuid(),
        usuario: usuario ? usuario.id : null,
        grupo,
        email,
        rol
      };
    })
  );
  const Miembros = await models.UsuarioGrupo.bulkCreate(datos);
  return res.status(200).send({
    Miembros
  });
};
