"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enviarCorreo = void 0;

require("dotenv/config");

var _lodash = _interopRequireDefault(require("lodash"));

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.correo_emisor,
    pass: process.env.correo_pass
  }
});

var enviarCorreo = function enviarCorreo(correoReceptor, asunto, html, dataCorreo) {
  var mailOptions = {
    from: "PshyhoBooking <".concat(process.env.correo_emisor, ">"),
    to: correoReceptor,
    subject: asunto,
    html: html,
    attachments: []
  };

  if (dataCorreo) {
    _lodash["default"].forOwn(dataCorreo, function (i) {
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

exports.enviarCorreo = enviarCorreo;