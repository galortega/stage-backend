import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { atributosExclude, estado } from "../constants";

export const crearTorneo = async (req, res) => {
  const {
    inicioInscripcion,
    finInscripcion,
    inicioTorneo,
    finTorneo,
    nombre,
    pais,
    ciudad,
    subTorneos
  } = req.body;
  const id = uuid();

  const datos = {
    id,
    inicioInscripcion,
    finInscripcion,
    inicioTorneo,
    finTorneo,
    nombre,
    pais,
    ciudad,
    SubTorneos: []
  };

  _.map(subTorneos, (subTorneo) => {
    const { division, modalidad, nivel } = subTorneo;

    datos.SubTorneos.push({
      id: uuid(),
      torneo: id,
      division,
      modalidad,
      nivel
    });
  });

  const Torneo = await models.Torneo.create(datos, {
    include: [
      {
        model: models.SubTorneo,
        as: "SubTorneos"
      }
    ]
  });

  return res.status(200).send({
    Torneo,
    msj: "Torneo ingresado correctamente."
  });
};

export const buscarTodos = async (req, res) => {
  const Torneos = await models.Torneo.findAll({
    include: [{ model: models.Pais, as: "Pais", attributes: ["pais"] }],
    where: { estado: estado.ACTIVO },
    attributes: {
      exclude: atributosExclude
    }
  }).then((torneos) => {
    return _.groupBy(torneos, "Pais.pais");
  });

  return res.status(200).send(Torneos);
};
