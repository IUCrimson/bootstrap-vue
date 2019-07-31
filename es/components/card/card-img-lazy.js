"use strict";

exports.__esModule = true;
exports.default = exports.BCardImgLazy = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _object = require("../../utils/object");

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _imgLazy = require("../image/img-lazy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copy of `<b-img-lazy>` props, and remove conflicting/non-applicable props
// The `omit()` util creates a new object, so we can just pass the original props
var lazyProps = (0, _object.omit)(_imgLazy.props, ['left', 'right', 'center', 'block', 'rounded', 'thumbnail', 'fluid', 'fluidGrow']);

var props = _objectSpread({}, lazyProps, {
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false // alias of 'left'

  },
  right: {
    type: Boolean,
    default: false
  },
  end: {
    type: Boolean,
    default: false // alias of 'right'

  } // @vue/component

});

exports.props = props;

var BCardImgLazy =
/*#__PURE__*/
_vue.default.extend({
  name: 'BCardImgLazy',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var baseClass = 'card-img';

    if (props.top) {
      baseClass += '-top';
    } else if (props.right || props.end) {
      baseClass += '-right';
    } else if (props.bottom) {
      baseClass += '-bottom';
    } else if (props.left || props.start) {
      baseClass += '-left';
    } // False out the left/center/right props before passing to b-img-lazy


    var lazyProps = _objectSpread({}, props, {
      left: false,
      right: false,
      center: false
    });

    return h(_imgLazy.BImgLazy, (0, _vueFunctionalDataMerge.mergeData)(data, {
      class: [baseClass],
      props: lazyProps
    }));
  }
});

exports.BCardImgLazy = BCardImgLazy;
var _default = BCardImgLazy;
exports.default = _default;