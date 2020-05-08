import models from "../models/index";
import { uuid } from "uuidv4";
import { Op } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";
import { buscarEspecialidadPorNombre } from "./especialidad";

export const validarIDDoctor = async (id) => {
  return await models.Doctor.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((doctor) => {
    if (!doctor) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Doctores = await models.Doctor.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Doctores
  });
};

export const buscarPorId = async (req, res) => {
  const id = req.params.id;
  const Doctor = await models.Doctor.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Doctor: Doctor || []
  });
};

export const obtenerTratamientos = async (req, res) => {
  const id = req.params.id;
  const Tratamientos = await models.DatosConsulta.findAll({
    where: {
      [Op.and]: [{ doctor: id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Tratamientos: Tratamientos || []
  });
};

export const buscarPorEspecialidad = async (req, res) => {
  const { especialidad } = req.body;
  const Doctor = await models.Doctor.findAll({
    where: {
      [Op.and]: [{ especialidad }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Doctor: Doctor || []
  });
};

export const crearDoctor = async (req, res) => {
  const id = uuid();
  const usuarioCreacion = adminDefecto;
  let {
    usuario,
    especialidad,
    rating,
    descripcion
  } = req.body;

  const Especialidad = await buscarEspecialidadPorNombre(especialidad)
  if (!Especialidad) {
    const datosEspecialiad = {
      id: uuid(),
      nombre: especialidad,
      usuarioCreacion
    }
    models.Especialidad.create(datosEspecialiad)
    especialidad = datosEspecialiad.id;
  } else especialidad = Especialidad.getDataValue("id");

  const datosDoctor = {
    id,
    especialidad,
    usuario,
    rating,
    descripcion,
    usuarioCreacion
  };

  const Doctor = await models.Doctor.create(datosDoctor);

  return res.status(201).send({
    Doctor,
    msj: "Doctor ingresado correctamente."
  });
};

export const actualizarDoctor = async (req, res) => {
  const id = req.params.id;
  const Doctor = await models.Doctor.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Doctor
  });
};

export const eliminarDoctor = async (req, res) => {
  const id = req.params.id;
  const Doctor = await models.Doctor.update(
    { estado: estado.INACTIVO, usuarioActualizacion: req.doctorAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Doctor
  });
};


