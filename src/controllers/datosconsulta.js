import models from "../models/index";
import { uuid } from "uuidv4";
import { Op, UUID } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const crearDatosConsulta = async (req, res) => {
  const doctor = req.params.id;
  const iddatos = uuid();
  const usuarioCreacion = adminDefecto;
  const {
    tipo,
    descripcion,
    precio
  } = req.body;
  const datos = {
    iddatos,
    doctor,
    tipo,
    descripcion,
    precio,
    usuarioCreacion,
  };

  const DatosConsulta = await models.DatosConsulta.create(datos);

  return res.status(201).send({
    DatosConsulta,
    msj: "Especialidad ingresada correctamente."
  });

}