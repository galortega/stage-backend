import { uuid } from "uuidv4";
import axios from "axios";

const url = "https://images.stagedanceinternational.com/api/v1/upload";

export const subirImagen = async (imagen) => {
  const nombre = uuid();
  const res = await axios.post(url, { nombre, imagen });
  return res;
};
