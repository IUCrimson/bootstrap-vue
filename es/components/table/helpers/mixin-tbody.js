"use strict";

exports.__esModule = true;
exports.default = void 0;

var _mixinTbodyRow = _interopRequireDefault(require("./mixin-tbody-row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  mixins: [_mixinTbodyRow.default],
  props: {
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTransitionProps: {
      type: Object // default: undefined

    },
    tbodyTransitionHandlers: {
      type: Object // default: undefined

    }
  },
  methods: {
    renderTbody: function renderTbody() {
      var _this = this;

      // Render the tbody element and children
      var h = this.$createElement;
      var items = this.computedItems; // Prepare the tbody rows

      var $rows = []; // Add the item data rows or the busy slot

      var $busy = this.renderBusy ? this.renderBusy() : null;

      if ($busy) {
        // If table is busy and a busy slot, then return only the busy "row" indicator
        $rows.push($busy);
      } else {
        // Table isn't busy, or we don't have a busy slot
        // Add static Top Row slot (hidden in visibly stacked mode as we can't control data-label attr)
        $rows.push(this.renderTopRow ? this.renderTopRow() : h()); // render the rows

        items.forEach(function (item, rowIndex) {
          // Render the individual item row (rows if details slot)
          $rows.push(_this.renderTbodyRow(item, rowIndex));
        }); // Empty Items / Empty Filtered Row slot (only shows if items.length < 1)

        $rows.push(this.renderEmpty ? this.renderEmpty() : h()); // Static bottom row slot (hidden in visibly stacked mode as we can't control data-label attr)

        $rows.push(this.renderBottomRow ? this.renderBottomRow() : h());
      } // If tbody transition enabled


      var isTransGroup = this.tbodyTransitionProps || this.tbodyTransitionHandlers;
      var tbodyProps = {};
      var tbodyOn = {};

      if (isTransGroup) {
        tbodyOn = this.tbodyTransitionHandlers || {};
        tbodyProps = _objectSpread({}, this.tbodyTransitionProps || {}, {
          tag: 'tbody'
        });
      } // Assemble rows into the tbody


      var $tbody = h(isTransGroup ? 'transition-group' : 'tbody', {
        props: tbodyProps,
        on: tbodyOn,
        class: [this.tbodyClass],
        attrs: {
          role: 'rowgroup'
        }
      }, $rows); // Return the assembled tbody

      return $tbody;
    }
  }
};
exports.default = _default;