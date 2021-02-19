import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { atributosExclude, estado } from "../constants";
import { Op } from "sequelize";

export const validarIDTorneo = async (id) => {
  return await models.Torneo.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((Torneo) => {
    if (!Torneo) {
      return Promise.reject(
        new Error("El id ingresado no pertenece a un torneo.")
      );
    } else return Promise.resolve();
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  let { subTorneos } = req.query;

  if (_.isEmpty(subTorneos)) subTorneos = true;
  else subTorneos = subTorneos === "true";

  const Torneo = await models.Torneo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    include: !subTorneos
      ? null
      : [
          {
            model: models.SubTorneo,
            as: "SubTorneos",
            attributes: {
              exclude: atributosExclude
            },
            include: [
              {
                model: models.Division,
                as: "DivisionSubTorneo",
                attributes: ["nombre"]
              },
              {
                model: models.Modalidad,
                as: "ModalidadSubTorneo",
                attributes: ["nombre"]
              }
            ]
          }
        ],
    attributes: {
      exclude: atributosExclude
    }
  }).then((res) => {
    res.SubTorneos = _.forEach(res.SubTorneos, (subTorneo) => {
      subTorneo.modalidad = subTorneo.ModalidadSubTorneo.nombre;
      subTorneo.division = subTorneo.DivisionSubTorneo.nombre;
    });
    return res;
  });
  return res.status(200).send({
    Torneo: Torneo || []
  });
};

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
  let { subTorneos } = req.query;

  if (_.isEmpty(subTorneos)) subTorneos = true;
  else subTorneos = subTorneos === "true";

  const Torneos = await models.Torneo.findAll({
    include: _.compact([
      !subTorneos
        ? null
        : {
            model: models.SubTorneo,
            as: "SubTorneos",
            attributes: {
              exclude: atributosExclude
            }
          },
      { model: models.Pais, as: "Pais", attributes: ["pais"] }
    ]),
    where: { estado: estado.ACTIVO },
    attributes: {
      exclude: atributosExclude
    },
    order: [["inicioTorneo", "DESC"]]
  }).then((torneos) => {
    return subTorneos ? _.groupBy(torneos, "Pais.pais") : torneos;
  });

  return res.status(200).send(Torneos);
};
