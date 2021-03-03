import { uuid } from "uuidv4";
import { urlSubirImagen } from "../constants";
import axios from "axios";

export const subirImagen = async (bytes) => {
  const nombre = uuid();
  const data = { nombre, bytes };
  const res = await axios.post(urlSubirImagen, data, {
    "content-type": "application/json"
  });
  if (res) return res.data.respuesta;
};
