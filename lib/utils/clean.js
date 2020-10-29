"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = void 0;

var clean = function clean(obj) {
  var propNames = Object.getOwnPropertyNames(obj);

  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];

    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

exports.clean = clean;