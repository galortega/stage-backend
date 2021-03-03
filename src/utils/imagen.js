import { uuid } from "uuidv4";
import axios from "axios";

const url = "https://images.stagedanceinternational.com/api/v1/upload";

export const subirImagen = async (bytes) => {
  const nombre = uuid();
  const res = await axios.post(url, { nombre, bytes });
  return res.respuesta;
};
