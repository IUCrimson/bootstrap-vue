"use strict";

exports.__esModule = true;
exports.default = exports.BCol = void 0;

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _memoize = _interopRequireDefault(require("../../utils/memoize"));

var _suffixPropName = _interopRequireDefault(require("../../utils/suffix-prop-name"));

var _array = require("../../utils/array");

var _inspect = require("../../utils/inspect");

var _object = require("../../utils/object");

var _config = require("../../utils/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Generates a prop object with a type of `[Boolean, String, Number]`
var boolStrNum = function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  };
}; // Generates a prop object with a type of `[String, Number]`


var strNum = function strNum() {
  return {
    type: [String, Number],
    default: null
  };
}; // Compute a breakpoint class name


var computeBreakpoint = function computeBreakpoint(type, breakpoint, val) {
  var className = type;

  if ((0, _inspect.isUndefined)(val) || (0, _inspect.isNull)(val) || val === false) {
    return undefined;
  }

  if (breakpoint) {
    className += "-".concat(breakpoint);
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm></b-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += "-".concat(val);
  return className.toLowerCase();
}; // Memoized function for better performance on generating class names


var computeBreakpointClass = (0, _memoize.default)(computeBreakpoint); // Cached copy of the breakpoint prop names

var breakpointPropMap = (0, _object.create)(null); // Lazy evaled props factory for BCol

var generateProps = function generateProps() {
  // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
  var breakpoints = (0, _config.getBreakpointsUpCached)().filter(Boolean); // Supports classes like: .col-sm, .col-md-6, .col-lg-auto

  var breakpointCol = breakpoints.reduce(function (propMap, breakpoint) {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum();
    }

    return propMap;
  }, (0, _object.create)(null)); // Supports classes like: .offset-md-1, .offset-lg-12

  var breakpointOffset = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[(0, _suffixPropName.default)(breakpoint, 'offset')] = strNum();
    return propMap;
  }, (0, _object.create)(null)); // Supports classes like: .order-md-1, .order-lg-12

  var breakpointOrder = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[(0, _suffixPropName.default)(breakpoint, 'order')] = strNum();
    return propMap;
  }, (0, _object.create)(null)); // For loop doesn't need to check hasOwnProperty
  // when using an object created from null

  breakpointPropMap = (0, _object.assign)((0, _object.create)(null), {
    col: (0, _object.keys)(breakpointCol),
    offset: (0, _object.keys)(breakpointOffset),
    order: (0, _object.keys)(breakpointOrder)
  }); // Return the generated props

  return _objectSpread({
    // Generic flexbox .col (xs)
    col: {
      type: Boolean,
      default: false
    },
    // .col-[1-12]|auto  (xs)
    cols: strNum()
  }, breakpointCol, {
    offset: strNum()
  }, breakpointOffset, {
    order: strNum()
  }, breakpointOrder, {
    // Flex alignment
    alignSelf: {
      type: String,
      default: null,
      validator: function validator(str) {
        return (0, _array.arrayIncludes)(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
      }
    },
    tag: {
      type: String,
      default: 'div'
    }
  });
}; // We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component


var BCol = {
  name: 'BCol',
  functional: true,

  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props; // eslint-disable-next-line no-return-assign

    return this.props = generateProps();
  },

  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var classList = []; // Loop through `col`, `offset`, `order` breakpoint props

    for (var type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      var _keys = breakpointPropMap[type];

      for (var i = 0; i < _keys.length; i++) {
        // computeBreakpoint(col, colSm => Sm, value=[String, Number, Boolean])
        var c = computeBreakpointClass(type, _keys[i].replace(type, ''), props[_keys[i]]); // If a class is returned, push it onto the array.

        if (c) {
          classList.push(c);
        }
      }
    }

    var hasColClasses = classList.some(function (className) {
      return /^col-/.test(className);
    });
    classList.push((_classList$push = {
      // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
      col: props.col || !hasColClasses && !props.cols
    }, _defineProperty(_classList$push, "col-".concat(props.cols), props.cols), _defineProperty(_classList$push, "offset-".concat(props.offset), props.offset), _defineProperty(_classList$push, "order-".concat(props.order), props.order), _defineProperty(_classList$push, "align-self-".concat(props.alignSelf), props.alignSelf), _classList$push));
    return h(props.tag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: classList
    }), children);
  }
};
exports.BCol = BCol;
var _default = BCol;
exports.default = _default;