"use strict";

exports.__esModule = true;
exports.default = void 0;

var _get = _interopRequireDefault(require("../../../utils/get"));

var _inspect = require("../../../utils/inspect");

var _stringifyObjectValues = _interopRequireDefault(require("./stringify-object-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default sort compare routine
//
// TODO: Add option to sort by multiple columns (tri-state per column,
//       plus order of columns in sort)  where sortBy could be an array
//       of objects [ {key: 'foo', sortDir: 'asc'}, {key:'bar', sortDir: 'desc'} ...]
//       or an array of arrays [ ['foo','asc'], ['bar','desc'] ]
//       Multisort will most likely be handled in mixin-sort.js by
//       calling this method for each sortBy
var defaultSortCompare = function defaultSortCompare(a, b, sortBy, formatter, localeOpts, locale) {
  var aa = (0, _get.default)(a, sortBy, '');
  var bb = (0, _get.default)(b, sortBy, '');

  if ((0, _inspect.isFunction)(formatter)) {
    aa = formatter(aa, sortBy, a);
    bb = formatter(bb, sortBy, b);
  }

  aa = (0, _inspect.isUndefined)(aa) || (0, _inspect.isNull)(aa) ? '' : aa;
  bb = (0, _inspect.isUndefined)(bb) || (0, _inspect.isNull)(bb) ? '' : bb;

  if ((0, _inspect.isDate)(aa) && (0, _inspect.isDate)(bb) || (0, _inspect.isNumber)(aa) && (0, _inspect.isNumber)(bb)) {
    // Special case for comparing dates and numbers
    // Internally dates are compared via their epoch number values
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  } else {
    // Do localized string comparison
    return (0, _stringifyObjectValues.default)(aa).localeCompare((0, _stringifyObjectValues.default)(bb), locale, localeOpts);
  }
};

var _default = defaultSortCompare;
exports.default = _default;