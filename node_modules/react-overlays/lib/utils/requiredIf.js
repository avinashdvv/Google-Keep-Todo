"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredIf;
function requiredIf(propType, matcher) {
  return function () {
    var pt = propType;

    if (matcher.apply(undefined, arguments)) {
      pt = pt.isRequired;
    }

    return pt.apply(undefined, arguments);
  };
}
module.exports = exports["default"];