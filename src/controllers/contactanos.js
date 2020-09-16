import { enviarCorreo } from "../utils/nodemailer";
import { contactanos } from "../templates/contactanos";
import { errorStatusHandle } from "../utils/error";

export const enviarCorreoContactanos = (req, res) => {
  const { nombre, apellido, email, telefono, detalles } = req.body;
  try {
    enviarCorreo(
      email,
      "CONTÁCTANOS",
      contactanos(nombre, apellido, detalles, telefono, email)
    );
    return res.status(200).send({
      msj: "Correo enviado con éxito."
    });
  } catch (error) {
    return errorStatusHandle(res, "INTERNAL_SERVER_ERROR");
  }
};
