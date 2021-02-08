import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { atributosExclude, categorias, estado } from "../constants";

export const validarSubTorneo = async (torneo, nivel, modalidad, division) => {
  return await models.SubTorneo.findOne({
    where: [
      { torneo },
      { nivel },
      { division },
      { modalidad },
      { estado: estado.ACTIVO }
    ]
  }).then((s) => (!s ? null : s.id));
};

export const crearSubTorneo = async (
  torneo,
  nivel,
  modalidad,
  division,
  categoria,
  t
) => {
  const datos = { id: uuid(), torneo, division, modalidad, nivel, categoria };
  return await models.SubTorneo.create(datos, { transation: t });
};

export const actualizarSubTorneos = async (req, res) => {
  const subTorneos = await models.SubTorneo.findAll({
    where: { estado: estado.ACTIVO },
    attributes: ["id"]
  }).then(
    async (arr) =>
      await Promise.all(
        _.map(arr, async (t) => {
          t = t.toJSON();
          return await models.SubTorneo.update(
            {
              categoria: "ffeef32b-abac-4304-abe1-a4b284ba7f6f"
            },
            { where: { id: t.id } }
          );
        })
      )
  );
  return res.status(200).send(subTorneos);
};
