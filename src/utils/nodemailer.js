import "dotenv/config";
import _ from "lodash";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.correo_emisor,
    pass: process.env.correo_pass
  }
});

export const enviarCorreo = (correoReceptor, asunto, html, dataCorreo) => {
  const mailOptions = {
    from: `PshyhoBooking <${process.env.correo_emisor}>`,
    to: correoReceptor,
    subject: asunto,
    html,
    attachments: []
  };
  if (dataCorreo) {
    _.forOwn(dataCorreo, (i) => {
      mailOptions.attachments.push(i);
    });
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response + " " + correoReceptor);
    }
  });
};
