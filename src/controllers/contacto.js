import models from "../models";
import _ from "lodash";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado } from "../constants";


export const validarEmailContacto = async (email) => {
  return await models.Contacto.findOne({
    where: { [Op.and]: [{ email }, { estado: estado.ACTIVO }] }
  }).then((Contacto) => {
    if (Contacto) {
      return Promise.reject(
        new Error("El email ingresado ya se encuentra en uso.")
      );
    } else return Promise.resolve();
  });
};

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
