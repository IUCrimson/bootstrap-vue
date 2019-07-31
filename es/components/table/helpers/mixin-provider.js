"use strict";

exports.__esModule = true;
exports.default = void 0;

var _looseEqual = _interopRequireDefault(require("../../../utils/loose-equal"));

var _warn = _interopRequireDefault(require("../../../utils/warn"));

var _inspect = require("../../../utils/inspect");

var _listenOnRoot = _interopRequireDefault(require("../../../mixins/listen-on-root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  mixins: [_listenOnRoot.default],
  props: {
    // Prop override(s)
    items: {
      // Adds in 'Function' support
      type: [Array, Function],
      default: function _default()
      /* istanbul ignore next */
      {
        return [];
      }
    },
    // Additional props
    noProviderPaging: {
      type: Boolean,
      default: false
    },
    noProviderSorting: {
      type: Boolean,
      default: false
    },
    noProviderFiltering: {
      type: Boolean,
      default: false
    },
    apiUrl: {
      // Passthrough prop. Passed to the context object. Not used by b-table directly
      type: String,
      default: ''
    }
  },
  computed: {
    hasProvider: function hasProvider() {
      return (0, _inspect.isFunction)(this.items);
    },
    providerTriggerContext: function providerTriggerContext() {
      // Used to trigger the provider function via a watcher. Only the fields that
      // are needed for triggering a provider update are included. Note that the
      // regular this.context is sent to the provider during fetches though, as they
      // may need all the prop info.
      var ctx = {
        apiUrl: this.apiUrl,
        filter: null,
        sortBy: null,
        sortDesc: null,
        perPage: null,
        currentPage: null
      };

      if (!this.noProviderFiltering) {
        // Either a string, or could be an object or array.
        ctx.filter = this.localFilter;
      }

      if (!this.noProviderSorting) {
        ctx.sortBy = this.localSortBy;
        ctx.sortDesc = this.localSortDesc;
      }

      if (!this.noProviderPaging) {
        ctx.perPage = this.perPage;
        ctx.currentPage = this.currentPage;
      }

      return _objectSpread({}, ctx);
    }
  },
  watch: {
    // Provider update triggering
    items: function items(newVal, oldVal) {
      // If a new provider has been specified, trigger an update
      if (this.hasProvider || (0, _inspect.isFunction)(newVal)) {
        this.$nextTick(this._providerUpdate);
      }
    },
    providerTriggerContext: function providerTriggerContext(newVal, oldVal) {
      // Trigger the provider to update as the relevant context values have changed.
      if (!(0, _looseEqual.default)(newVal, oldVal)) {
        this.$nextTick(this._providerUpdate);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    // Call the items provider if necessary
    if (this.hasProvider && (!this.localItems || this.localItems.length === 0)) {
      // Fetch on mount if localItems is empty
      this._providerUpdate();
    } // Listen for global messages to tell us to force refresh the table


    this.listenOnRoot('bv::refresh::table', function (id) {
      if (id === _this.id || id === _this) {
        _this.refresh();
      }
    });
  },
  methods: {
    refresh: function refresh() {
      // Public Method: Force a refresh of the provider function
      this.$off('refreshed', this.refresh);

      if (this.computedBusy) {
        // Can't force an update when forced busy by user (busy prop === true)
        if (this.localBusy && this.hasProvider) {
          // But if provider running (localBusy), re-schedule refresh once `refreshed` emitted
          this.$on('refreshed', this.refresh);
        }
      } else {
        this.clearSelected();

        if (this.hasProvider) {
          this.$nextTick(this._providerUpdate);
        } else {
          /* istanbul ignore next */
          this.localItems = (0, _inspect.isArray)(this.items) ? this.items.slice() : [];
        }
      }
    },
    // Provider related methods
    _providerSetLocal: function _providerSetLocal(items) {
      this.localItems = (0, _inspect.isArray)(items) ? items.slice() : [];
      this.localBusy = false;
      this.$emit('refreshed'); // New root emit

      if (this.id) {
        this.emitOnRoot('bv::table::refreshed', this.id);
      }
    },
    _providerUpdate: function _providerUpdate() {
      var _this2 = this;

      // Refresh the provider function items.
      if (!this.hasProvider) {
        // Do nothing if no provider
        return;
      } // If table is busy, wait until refreshed before calling again


      if (this.computedBusy) {
        // Schedule a new refresh once `refreshed` is emitted
        this.$nextTick(this.refresh);
        return;
      } // Set internal busy state


      this.localBusy = true; // Call provider function with context and optional callback after DOM is fully updated

      this.$nextTick(function () {
        try {
          // Call provider function passing it the context and optional callback
          var data = _this2.items(_this2.context, _this2._providerSetLocal);

          if ((0, _inspect.isPromise)(data)) {
            // Provider returned Promise
            data.then(function (items) {
              // Provider resolved with items
              _this2._providerSetLocal(items);
            });
          } else if ((0, _inspect.isArray)(data)) {
            // Provider returned Array data
            _this2._providerSetLocal(data);
          } else if (_this2.items.length !== 2) {
            // Check number of arguments provider function requested
            // Provider not using callback (didn't request second argument), so we clear
            // busy state as most likely there was an error in the provider function

            /* istanbul ignore next */
            (0, _warn.default)("b-table provider function didn't request callback and did not return a promise or data");
            /* istanbul ignore next */

            _this2.localBusy = false;
          }
        } catch (e)
        /* istanbul ignore next */
        {
          // Provider function borked on us, so we spew out a warning
          // and clear the busy state
          (0, _warn.default)("b-table provider function error [".concat(e.name, "] ").concat(e.message));
          _this2.localBusy = false;

          _this2.$off('refreshed', _this2.refresh);
        }
      });
    }
  }
};
exports.default = _default2;