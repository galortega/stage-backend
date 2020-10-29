"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEmail = exports.downloadResource = void 0;

var _json2csv = require("json2csv");

var downloadResource = function downloadResource(res, fileName, fields, data) {
  var json2csv = new _json2csv.Parser({
    fields: fields
  });
  var csv = json2csv.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  return res.send(csv);
};

exports.downloadResource = downloadResource;

var isValidEmail = function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.isValidEmail = isValidEmail;