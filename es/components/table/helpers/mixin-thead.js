"use strict";

exports.__esModule = true;
exports.default = void 0;

var _keyCodes = _interopRequireDefault(require("../../../utils/key-codes"));

var _startcase = _interopRequireDefault(require("../../../utils/startcase"));

var _config = require("../../../utils/config");

var _html = require("../../../utils/html");

var _filterEvent = _interopRequireDefault(require("./filter-event"));

var _textSelectionActive = _interopRequireDefault(require("./text-selection-active"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  props: {
    headVariant: {
      type: String,
      default: function _default() {
        return (0, _config.getComponentConfig)('BTable', 'headVariant');
      }
    },
    theadClass: {
      type: [String, Array, Object],
      default: null
    },
    theadTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    headClasses: function headClasses() {
      return [this.headVariant ? 'thead-' + this.headVariant : '', this.theadClass];
    }
  },
  methods: {
    fieldClasses: function fieldClasses(field) {
      // Header field (<th>) classes
      return [field.variant ? 'table-' + field.variant : '', field.class ? field.class : '', field.thClass ? field.thClass : ''];
    },
    headClicked: function headClicked(evt, field, isFoot) {
      if (this.stopIfBusy && this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return;
      } else if ((0, _filterEvent.default)(evt)) {
        // Clicked on a non-disabled control so ignore
        return;
      } else if ((0, _textSelectionActive.default)(this.$el)) {
        // User is selecting text, so ignore

        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return;
      }

      evt.stopPropagation();
      evt.preventDefault();
      this.$emit('head-clicked', field.key, field, evt, isFoot);
    },
    renderThead: function renderThead() {
      var _this = this;

      var isFoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var h = this.$createElement;
      var fields = this.computedFields || [];

      if (this.isStacked === true || fields.length === 0) {
        // In always stacked mode, we don't bother rendering the head/foot.
        // Or if no field headings (empty table)
        return h();
      } // Helper function to generate a field <th> cell


      var makeCell = function makeCell(field, colIndex) {
        var ariaLabel = null;

        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users

          /* istanbul ignore next */
          ariaLabel = (0, _startcase.default)(field.key);
        }

        var hasHeadClickListener = _this.$listeners['head-clicked'] || _this.isSortable;
        var handlers = {};

        if (hasHeadClickListener) {
          handlers.click = function (evt) {
            _this.headClicked(evt, field, isFoot);
          };

          handlers.keydown = function (evt) {
            var keyCode = evt.keyCode;

            if (keyCode === _keyCodes.default.ENTER || keyCode === _keyCodes.default.SPACE) {
              _this.headClicked(evt, field, isFoot);
            }
          };
        }

        var sortAttrs = _this.isSortable ? _this.sortTheadThAttrs(field.key, field, isFoot) : {};
        var sortClass = _this.isSortable ? _this.sortTheadThClasses(field.key, field, isFoot) : null;
        var data = {
          key: field.key,
          class: [_this.fieldClasses(field), sortClass],
          style: field.thStyle || {},
          attrs: _objectSpread({
            // We only add a tabindex of 0 if there is a head-clicked listener
            tabindex: hasHeadClickListener ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            role: 'columnheader',
            scope: 'col',
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel
          }, sortAttrs),
          on: handlers
        };
        var fieldScope = {
          label: field.label,
          column: field.key,
          field: field
        };
        var slot;

        if (isFoot && _this.hasNormalizedSlot(["FOOT[".concat(field.key, "]"), 'FOOT[]', "FOOT_".concat(field.key)])) {
          // TODO: `FOOT_${field.key}` is deprecated, to be removed in future release
          slot = _this.normalizeSlot(["FOOT[".concat(field.key, "]"), 'FOOT[]', "FOOT_".concat(field.key)], fieldScope);
        } else {
          // TODO: `HEAD_${field.key}` is deprecated, to be removed in future release
          slot = _this.normalizeSlot(["HEAD[".concat(field.key, "]"), 'HEAD[]', "HEAD_".concat(field.key)], fieldScope);
        }

        if (!slot) {
          data.domProps = (0, _html.htmlOrText)(field.labelHtml);
        }

        return h('th', data, slot || field.label);
      }; // Generate the array of <th> cells


      var $cells = fields.map(makeCell).filter(function (th) {
        return th;
      }); // Genrate the row(s)

      var $trs = [];

      if (isFoot) {
        $trs.push(h('tr', {
          class: this.tfootTrClass,
          attrs: {
            role: 'row'
          }
        }, $cells));
      } else {
        var scope = {
          columns: fields.length,
          fields: fields
        };
        $trs.push(this.normalizeSlot('thead-top', scope) || h());
        $trs.push(h('tr', {
          class: this.theadTrClass,
          attrs: {
            role: 'row'
          }
        }, $cells));
      }

      return h(isFoot ? 'tfoot' : 'thead', {
        key: isFoot ? 'tfoot' : 'thead',
        class: isFoot ? this.footClasses : this.headClasses,
        attrs: {
          role: 'rowgroup'
        }
      }, $trs);
    }
  }
};
exports.default = _default2;