import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { atributosExclude, estado } from "../constants";

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

export const crearSubTorneo = async (torneo, nivel, modalidad, division, t) => {
  const datos = { id: uuid(), torneo, division, modalidad, nivel };
  return await models.SubTorneo.create(datos, { transation: t });
};
