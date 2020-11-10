import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { errorStatusHandle } from "../utils/error";
import { estado } from "../constants";
import { Op } from "sequelize";


export const validarIDPais = async (id) => {
  return await models.Pais.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((pais) => {
    if (!pais) {
      return Promise.reject(new Error(`ID de país ingresado no es válido. ${id}`));
    }
  });
};

export const agregarPaises = async (req, res) => {
  const { paises } = req.body;

  const datos = _.map(paises, (pais) => {
    const { nombre, iso2 } = pais;
    return {
      id: uuid(),
      pais: nombre,
      codigo: iso2
    };
  });
  try {
    const Paises = await models.Pais.bulkCreate(datos);
    return res.status(200).send({ Paises });
  } catch (error) {
    console.log(error);
    return errorStatusHandle(res, "TRANSACCION_FALLIDA");
  }
};

export const buscarTodos = async (req, res) => {
  const Paises = await models.Pais.findAll({
    where: { estado: estado.ACTIVO },
    attributes: ["id", "pais"]
  });

  return res.status(200).send(Paises);
};
