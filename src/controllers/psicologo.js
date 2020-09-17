import models from "../models/index";
import { uuid } from "uuidv4";
import { Op, Sequelize } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";
import { paises } from "../constants/paises";
import { downloadResource } from '../utils/util';
import json2csv from "json2csv";

export const validarIDPsicologo = async (id) => {
  return await models.Psicologo.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((psicologo) => {
    if (!psicologo) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Psicologos = await models.Psicologo.findAll({
    where: {
      estado: estado.ACTIVO
    },
    attributes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Usuario,
        as: "UsuarioPsicologo",
        attributes: ["imagen", "nombre"]
      }
    ]
  });
  return res.status(200).send({
    Psicologos
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    attributtes: {
      exclude: atributosExclude
    },
    include: [
      {
        model: models.Tratamiento,
        as: "PsicologoTratamiento"
      }
    ]
  });
  return res.status(200).send({
    Psicologo: Psicologo || []
  });
};

export const crearPsicologo = async (req, res) => {
  req.body.id = uuid();
  req.body.UsuarioPsicologo.id = uuid();
  req.body.UsuarioPsicologo.usuario = req.body.id;

  const Psicologo = await models.Usuario.create(req.body, {
    include: [
      {
        model: models.Psicologo,
        as: "UsuarioPsicologo"
      }
    ]
  });

  return res.status(201).send({
    Psicologo,
    msj: "Psicologo ingresado correctamente."
  });
};

export const actualizarPsicologo = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Psicologo
  });
};

export const eliminarPsicologo = async (req, res) => {
  const id = req.params.id;
  const Psicologo = await models.Psicologo.update(
    { estado: estado.INACTIVO },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Psicologo
  });
};

export const reporteRating = async (req, res) => {
  const Ratings = await models.Psicologo.findAll({
    where: {
      estado: estado.ACTIVO
    }
  }).then((psicologos) => {
    let total = 0;
    let uno = 0;
    let dos = 0;
    let tres = 0;
    let cuatro = 0;
    let cinco = 0;
    _.forEach(psicologos, (psicologo) => {
      const rating = Math.floor(psicologo.rating);
      total += rating;
      switch (rating) {
        case 1:
          uno += rating;
          break;
        case 2:
          dos += rating;
          break;
        case 3:
          tres += rating;
          break;
        case 4:
          cuatro += rating;
          break;
        case 5:
          cinco += rating;
          break;
        default:
          break;
      }
    });
    return {
      1: ((uno / total) * 100).toFixed(2),
      2: ((dos / total) * 100).toFixed(2),
      3: ((tres / total) * 100).toFixed(2),
      4: ((cuatro / total) * 100).toFixed(2),
      5: ((cinco / total) * 100).toFixed(2)
    };
  });

  return res.status(200).send(Ratings);
};

export const reportePais = async (req, res) => {
  const reporte = paises;
  const Psicologos = [];
  await models.Psicologo.findAll({
    where: {
      estado: estado.ACTIVO
    },
    attributes: ["pais"]
  }).then((psicologos) => {
    _.map(psicologos, (p) => {
      if (p.pais === paises.p) {
        console.log(p);
      }
    });
  });
  const Paises = Psicologos.reduce(
    (a, c) => ((a[c] = (a[c] || 0) + 1), a),
    Object.create(null)
  );
  console.log(Paises);

  return res.status(200).send({ Paises, Psicologos });
};
export const buscarPorPais = async (pais) => {
  var attributes = ['pais'];

  const Psicologo = await models.Psicologo.findAll({
    where: { pais },

    include: [
      {
        model: models.Usuario,
        as: 'UsuarioPsicologo',
        attributes: ['nombre', 'email']
      }
    ],
    attributes: attributes,
  });
  if (Psicologo === null) {
    console.log("Not found!");
  } else {
    return Psicologo;
  }
};

export const download = async (req, res) => {
  const pais = req.params.pais;
  const fields = [
    {
      label: 'pais',
      value: 'pais'
    },
    {
      label: 'nombre',
      value: 'UsuarioPsicologo.nombre'
    },
    {
      label: 'email',
      value: 'UsuarioPsicologo.email'
    },
  ];
  const data = await buscarPorPais(pais);

  return downloadResource(res, 'psicologoPais.csv', fields, data);

}