import { uuid } from "uuidv4";
import { estado } from "../constants";
import models from "../models";
import _ from "lodash";

export const crearCategoria = async (req, res) => {
  const { categorias } = req.body;

  const datos = _.map(categorias, (m) => {
    const { nombre, maximo, minimo, tiempo } = m;
    return {
      id: uuid(),
      nombre,
      maximo,
      minimo,
      tiempo
    };
  });
  const Categorias = await models.Categoria.bulkCreate(datos);

  return res.status(200).send({
    Categorias,
    msj: "Categoria ingresada correctamente."
  });
};

export const getCategorias = async (req, res) => {
  const Categorias = await models.Categoria.findAll({
    where: { estado: estado.ACTIVO },
    attributes: ["id", "nombre", "minimo", "maximo", "tiempo"]
  });

  return res.status(200).send(Categorias);
};
