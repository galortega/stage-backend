import { uuid } from "uuidv4";
import models from "../models";
import _ from "lodash";
import { atributosExclude, estado } from "../constants";
import { Op } from "sequelize";
import { subirImagen } from "../utils/imagen";

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
  const { id } = req.params;
  let { subTorneos, paquete } = req.query;

  subTorneos = subTorneos === "true";

  const Torneo = await models.Torneo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    include: !subTorneos
      ? { model: models.Pais, as: "Pais" }
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
                attributes: ["nombre", "id"]
              },
              {
                model: models.Modalidad,
                as: "ModalidadSubTorneo",
                attributes: ["nombre", "id"]
              },
              {
                model: models.Categoria,
                as: "CategoriaSubTorneo",
                attributes: ["nombre", "id"]
              }
            ]
          }
        ],
    attributes: {
      exclude: atributosExclude
    }
  }).then((res) => {
    res = res.toJSON();
    res = res.SubTorneos
      ? _.map(res.SubTorneos, (subTorneo) => {
          const {
            id,
            DivisionSubTorneo,
            ModalidadSubTorneo,
            CategoriaSubTorneo,
            nivel
          } = subTorneo;
          return {
            id,
            modalidad: ModalidadSubTorneo.nombre,
            division: DivisionSubTorneo.nombre,
            categoria: CategoriaSubTorneo.nombre,
            _modalidad: ModalidadSubTorneo.id,
            _division: DivisionSubTorneo.id,
            _categoria: CategoriaSubTorneo.id,
            nivel
          };
        })
      : _(res).defaults({ nombrePais: res.Pais.pais }).omit(["Pais"]);
    return res;
  });
  let Paquetes;
  if (paquete)
    Paquetes = await models.PaqueteTorneo.findAll({
      where: [{ estado: estado.ACTIVO }, { torneo: id }],
      include: [
        { model: models.Paquete, attributes: { exclude: atributosExclude } }
      ]
    }).then((res) => _.map(res, (paqueteTorneo) => paqueteTorneo.Paquete));
  return res.status(200).send({
    Torneo: Torneo || [],
    Paquetes: Paquetes || []
  });
};

export const crearTorneo = async (req, res) => {
  const t = await models.db.sequelize.transaction();

  let {
    inicioInscripcion,
    finInscripcion,
    inicioTorneo,
    finTorneo,
    nombre,
    pais,
    ciudad,
    imagen,
    subTorneos,
    paquetes
  } = req.body;
  const id = uuid();

  imagen = imagen ? await subirImagen(imagen) : null;

  const datos = {
    id,
    inicioInscripcion,
    finInscripcion,
    inicioTorneo,
    finTorneo,
    nombre,
    pais,
    ciudad,
    imagen,
    SubTorneos: []
  };

  _.map(subTorneos, (subTorneo) => {
    const { division, modalidad, nivel, categoria } = subTorneo;

    datos.SubTorneos.push({
      id: uuid(),
      torneo: id,
      division,
      modalidad,
      categoria,
      nivel
    });
  });
  const datosPaqueteTorneo =
    !_.isEmpty(paquetes) &&
    _.map(paquetes, (paquete) => {
      return { id: uuid(), torneo: id, paquete };
    });
  try {
    const Torneo = await models.Torneo.create(datos, {
      include: [
        {
          model: models.SubTorneo,
          as: "SubTorneos"
        }
      ],
      transaction: t
    });

    const Paquetes =
      !_.isEmpty(datosPaqueteTorneo) &&
      (await models.PaqueteTorneo.bulkCreate(datosPaqueteTorneo, {
        transaction: t
      }));
    await t.commit();

    return res.status(200).send({
      Torneo,
      Paquetes,
      msj: "Torneo ingresado correctamente."
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return errorStatusHandle(res, "TRANSACCION_FALLIDA");
  }
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

export const actualizarTorneo = async (req, res) => {
  const { id } = req.params;

  let {
    inicioInscripcion,
    finInscripcion,
    inicioTorneo,
    finTorneo,
    nombre,
    pais,
    ciudad
  } = req.body;

  imagen = imagen ? await subirImagen(imagen) : null;

  const Torneo = await models.Torneo.update(
    {
      inicioInscripcion,
      finInscripcion,
      inicioTorneo,
      finTorneo,
      nombre,
      pais,
      ciudad,
      imagen
    },
    { where: { id } }
  );

  return res.status(Torneo[0] === 1 ? 200 : 204).send(Torneo);
};

export const eliminarTorneo = async (req, res) => {
  const { id } = req.params;
  const datos = {
    estado: estado.INACTIVO
  };
  const Torneo = await models.Torneo.update(datos, { where: { id } });

  const PaqueteTorneo = await models.PaqueteTorneo.update(datos, {
    where: { torneo: id }
  });

  return res
    .status(Torneo[0] === 1 ? 200 : 204)
    .send({ Torneo, PaqueteTorneo });
};
