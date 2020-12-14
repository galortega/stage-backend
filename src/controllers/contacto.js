import models from "../models";
import _ from "lodash";
import { uuid } from "uuidv4";

export const crearContacto = async (req, res) => {
  const { nombre, email, pais } = req.body;
  const datos = {
    id: uuid(),
    nombre,
    email,
    pais
  };
  const Contacto = await models.Contacto.create(datos);

  return res.status(200).send({
    Contacto,
    msj: "Contacto ingresada correctamente."
  });
};
