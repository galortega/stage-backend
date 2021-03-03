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
  const { nombre, email, pais, descripcion } = req.body;
  const datos = {
    id: uuid(),
    nombre,
    email,
    pais,
    descripcion
  };
  const Contacto = await models.Contacto.create(datos);

  return res.status(200).send({
    Contacto,
    msj: "Contacto ingresada correctamente."
  });
};

export const getContactos = async (req, res) => {
  const Contactos = await models.Contacto.findAll({
    where: { estado: estado.ACTIVO },
    include: [{ model: models.Pais, as: "ContactoPais", attributes: ["pais"] }]
  }).then((res) =>
    _.map(res, (r) => {
      r = r.toJSON();
      const pais = r.ContactoPais.pais;
      r = _.omit(r, ["pais", "ContactoPais"]);
      r.pais = pais;
      return r;
    })
  );

  return res.status(200).send(Contactos);
};

export const eliminarContacto = async (req, res) => {
  const { id } = req.params;
  const Contacto = await models.Contacto.update(
    { estado: estado.INACTIVO },
    { where: { id } }
  );
  return res.status(200).send(Contacto);
};
