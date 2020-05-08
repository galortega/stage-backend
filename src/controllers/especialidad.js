import models from "../models/index";
import { uuid } from "uuidv4";
import { Op, UUID } from "sequelize";
import { estado, atributosExclude, adminDefecto } from "../constants/index";
import _ from "lodash";

export const validarIDEspecialidad = async (id) => {
  return await models.Especialidad.findOne({
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  }).then((especialidad) => {
    if (!especialidad) {
      return Promise.reject(new Error(`ID ingresado no es válido. ${id}`));
    }
  });
};

export const buscarTodos = async (req, res) => {
  const Especialidades = await models.Especialidad.findAll({
    where: {
      estado: estado.ACTIVO
    },
    atributtes: {
      exclude: atributosExclude
    }
  });
  return res.status(200).send({
    Especialidades
  });
};

export const buscarPorId = async (req,res) => {
  const { id } = req.params;

  const Especialidad = await buscarEspecialidadPorId(id);

  return res.status(200).send({
    Especialidad: Especialidad || []
  });
}



export const crearEspecialidad = async (req, res) => {
  const id = uuid();
  const usuarioCreacion = adminDefecto;
  const {
    nombre
  } = req.body;
  const datosEspecialidad = {
    id,
    nombre,
    usuarioCreacion,
  };

  const Especialidad = await models.Especialidad.create(datosEspecialidad);

  return res.status(201).send({
    Especialidad,
    msj: "Especialidad ingresada correctamente."
  });
};

export const actualizarEspecialidad = async (req, res) => {
  const id = req.params.id;
  const Especialidad = await models.Especialidad.update(req.body, {
    where: { [Op.and]: [{ id }, { estado: estado.ACTIVO }] }
  });
  return res.status(200).send({
    Especialidad
  });
};

export const eliminarEspecialidad = async (req, res) => {
  const id = req.params.id;
  const Especialidad = await models.Especialidad.update(
    { estado: estado.INACTIVO, usuarioActualizacion: req.usuarioAuth.id },
    {
      where: { id }
    }
  );
  return res.status(200).send({
    Especialidad
  });
};

export const buscarEspecialidadPorNombre = async (nombre) => {
  const Especialidad = await models.Especialidad.findOne({
    where: {
      [Op.and]: [{ nombre }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    }
  });

  return Especialidad
}

export const buscarEspecialidadPorId = async (id) => {
  const Especialidad = await models.Especialidad.findOne({
    where: {
      [Op.and]: [{ id }, { estado: estado.ACTIVO }]
    },
    atributtes: {
      exclude: atributosExclude
    },
    include: [{
      model: models.Doctor,
      as: "EspecialidadDoctor",
      atributtes: {
        exclude: atributosExclude
      }
    }]
  });

  return Especialidad
};