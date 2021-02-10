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

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;

  const Categoria = await models.Categoria.update(req.body, { where: { id } });

  return res.status(Categoria === 0 ? 409 : 200).send({
    Categoria,
    msj:
      Categoria === 0
        ? "Error al actualizar"
        : "Categoria actualizada correctamente."
  });
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  const Categoria = await models.Categoria.update(
    { estado: estado.INACTIVO },
    { where: { id } }
  );

  return res.status(Categoria === 0 ? 409 : 200).send({
    Categoria,
    msj:
      Categoria === 0
        ? "Error al actualizar"
        : "Categoria actualizada correctamente."
  });
};
