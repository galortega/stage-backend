import { uuid } from "uuidv4";
import axios from "axios";
import { urlImagen } from "../constants";

export const subirImagen = async (bytes) => {
  const nombre = uuid();
  const res = await axios.post(urlImagen, { nombre, bytes });
  return res.respuesta;
};
