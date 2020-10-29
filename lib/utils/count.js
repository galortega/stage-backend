"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = void 0;

var count = function count(arr) {
  var counts = {};

  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }

  return counts;
};

exports.count = count;