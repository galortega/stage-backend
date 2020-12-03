import { uuid } from "uuidv4";
import { estado } from "../constants";
import models from "../models";
import _ from "lodash";
import { crearSubTorneo, validarSubTorneo } from "./subTorneo";
import { errorStatusHandle } from "../utils/error";

export const buscarTodos = async (req, res) => {
  const Coreografias = await models.Coreografia.findAll({
    where: { estado: estado.ACTIVO }
  });

  return res.status(200).send({
    Coreografias
  });
};

/* '
Se encarga de crear múltiples coregrafías ligadas a un Torneo y Grupo
1. Recorrer arreglo de Coreografías de Torneo (body) y Grupo (params):
    - Buscar si existe un SubTorneo de nivel, modalidad y id_torneo
    - Si existe, registrar Coreografía en ese subTorneo
    - Si no existe, crear el subTorneo y guardarla con el mismo
2. Recorrer arreglo de miembros:
    - Guardar cada usuariogrupo y rol con el id de coreografía
*/
export const crearCoreografias = async (req, res) => {
  const { grupo } = req.params;
  const { torneo, subtorneos } = req.body;
  const t = await models.db.sequelize.transaction();
  try {
    const datos = await Promise.all(
      _.map(subtorneos, async (c) => {
        let { subTorneo, precio, miembros, nivel, modalidad, division } = c;
        const coreografia = uuid();

        // Si no viene el id de subTorneo, entonces se valida otra vez por torneo, nivel, modalidad, division. Si no existe, se crea uno nuevo
        subTorneo = !subTorneo
          ? await validarSubTorneo(torneo, nivel, modalidad, division)
          : subTorneo;
        if (_.isEmpty(subTorneo))
          subTorneo = await crearSubTorneo(
            torneo,
            nivel,
            modalidad,
            division,
            t
          ).then((s) => (!s ? null : s.id));

        const CoreografiaParticipantes = _.map(miembros, (m) => {
          const { usuarioGrupo, rol } = m;
          return { id: uuid(), coreografia, usuarioGrupo, rol, subTorneo };
        });

        const datosCoreografia = {
          id: coreografia,
          subTorneo,
          grupo,
          precio,
          categoria: CoreografiaParticipantes
        };
        return datosCoreografia;
      })
    );
    console.log({ body: req.body, datos });

    const Coreografias = await models.Coreografia.bulkCreate(datos, {
      transaction: t,
      include: [
        {
          model: models.GrupoCoreografia,
          as: "CoreografiaParticipantes"
        }
      ]
    });

    await t.commit();

    return res.status(200).send(Coreografias);
  } catch (error) {
    console.log(error);
    await t.rollback();
    return errorStatusHandle(res, "TRANSACCION_FALLIDA");
  }
};

export const buscarPorGrupo = async (req, res) => {
  const { grupo } = req.params;

  const Coreografias = await models.Coreografia.findAll({
    where: [{ grupo }, { estado: estado.ACTIVO }]
  });

  return res.status(200).send({
    Coreografias
  });
};
