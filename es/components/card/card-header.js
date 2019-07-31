"use strict";

exports.__esModule = true;
exports.default = exports.BCardHeader = exports.props = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _vueFunctionalDataMerge = require("vue-functional-data-merge");

var _prefixPropName = _interopRequireDefault(require("../../utils/prefix-prop-name"));

var _copyProps = _interopRequireDefault(require("../../utils/copy-props"));

var _html = require("../../utils/html");

var _cardMixin = _interopRequireDefault(require("../../mixins/card-mixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = _objectSpread({}, (0, _copyProps.default)(_cardMixin.default.props, _prefixPropName.default.bind(null, 'header')), {
  header: {
    type: String,
    default: null
  },
  headerHtml: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Object, Array],
    default: null
  } // @vue/component

});

exports.props = props;

var BCardHeader =
/*#__PURE__*/
_vue.default.extend({
  name: 'BCardHeader',
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.headerTag, (0, _vueFunctionalDataMerge.mergeData)(data, {
      staticClass: 'card-header',
      class: [props.headerClass, (_ref2 = {}, _defineProperty(_ref2, "bg-".concat(props.headerBgVariant), Boolean(props.headerBgVariant)), _defineProperty(_ref2, "border-".concat(props.headerBorderVariant), Boolean(props.headerBorderVariant)), _defineProperty(_ref2, "text-".concat(props.headerTextVariant), Boolean(props.headerTextVariant)), _ref2)]
    }), children || [h('div', {
      domProps: (0, _html.htmlOrText)(props.headerHtml, props.header)
    })]);
  }
});

exports.BCardHeader = BCardHeader;
var _default = BCardHeader;
exports.default = _default;