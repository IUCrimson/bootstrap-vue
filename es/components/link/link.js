"use strict";

exports.__esModule = true;
exports.default = exports.BLink = exports.props = exports.propsFactory = void 0;

var _vue = _interopRequireDefault(require("../../utils/vue"));

var _normalizeSlot = _interopRequireDefault(require("../../mixins/normalize-slot"));

var _array = require("../../utils/array");

var _inspect = require("../../utils/inspect");

var _router = require("../../utils/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The Link component is used in many other BV components.
 * As such, sharing its props makes supporting all its features easier.
 * However, some components need to modify the defaults for their own purpose.
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props.
 *
 * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 * @return {{}}
 */
var propsFactory = function propsFactory() {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // router-link specific props
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    activeClass: {
      type: String // default: undefined

    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String // default: undefined

    },
    routerTag: {
      type: String,
      default: 'a'
    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  };
};

exports.propsFactory = propsFactory;
var props = propsFactory(); // @vue/component

exports.props = props;

var BLink =
/*#__PURE__*/
_vue.default.extend({
  name: 'BLink',
  mixins: [_normalizeSlot.default],
  inheritAttrs: false,
  props: propsFactory(),
  computed: {
    computedTag: function computedTag() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return (0, _router.computeTag)({
        to: this.to,
        disabled: this.disabled
      }, this);
    },
    isRouterLink: function isRouterLink() {
      return (0, _router.isRouterLink)(this.computedTag);
    },
    computedRel: function computedRel() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return (0, _router.computeRel)({
        target: this.target,
        rel: this.rel
      });
    },
    computedHref: function computedHref() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return (0, _router.computeHref)({
        to: this.to,
        href: this.href
      }, this.computedTag);
    },
    computedProps: function computedProps() {
      return this.isRouterLink ? _objectSpread({}, this.$props, {
        tag: this.routerTag
      }) : {};
    }
  },
  methods: {
    onClick: function onClick(evt) {
      var _arguments = arguments;
      var evtIsEvent = (0, _inspect.isEvent)(evt);
      var isRouterLink = this.isRouterLink;
      var suppliedHandler = this.$listeners.click;

      if (evtIsEvent && this.disabled) {
        // Stop event from bubbling up
        evt.stopPropagation(); // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing it's thing

        evt.stopImmediatePropagation();
      } else {
        /* istanbul ignore next: difficult to test, but we know it works */
        if (isRouterLink && evt.currentTarget.__vue__) {
          // Router links do not emit instance `click` events, so we
          // add in an $emit('click', evt) on it's vue instance
          evt.currentTarget.__vue__.$emit('click', evt);
        } // Call the suppliedHandler(s), if any provided


        (0, _array.concat)(suppliedHandler).filter(function (h) {
          return (0, _inspect.isFunction)(h);
        }).forEach(function (handler) {
          handler.apply(void 0, _toConsumableArray(_arguments));
        }); // Emit the global $root click event

        this.$root.$emit('clicked::link', evt);
      } // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'


      if (evtIsEvent && (this.disabled || !isRouterLink && this.computedHref === '#')) {
        evt.preventDefault();
      }
    },
    focus: function focus() {
      if (this.$el && this.$el.focus) {
        this.$el.focus();
      }
    },
    blur: function blur() {
      if (this.$el && this.$el.blur) {
        this.$el.blur();
      }
    }
  },
  render: function render(h) {
    var tag = this.computedTag;
    var rel = this.computedRel;
    var href = this.computedHref;
    var isRouterLink = this.isRouterLink; // We want to overwrite any click handler since our callback
    // will invoke the user supplied handler9s) if !props.disabled

    var handlers = _objectSpread({}, this.$listeners, {
      click: this.onClick
    });

    var componentData = {
      class: {
        active: this.active,
        disabled: this.disabled
      },
      attrs: _objectSpread({}, this.$attrs, {
        rel: rel,
        target: this.target,
        tabindex: this.disabled ? '-1' : (0, _inspect.isUndefined)(this.$attrs.tabindex) ? null : this.$attrs.tabindex,
        'aria-disabled': this.disabled ? 'true' : null
      }),
      props: this.computedProps,
      on: isRouterLink ? {} : handlers,
      nativeOn: isRouterLink ? handlers : {} // If href attribute exists on <router-link> (even undefined or null) it fails working on
      // SSR, so we explicitly add it here if needed (i.e. if computedHref() is truthy)

    };

    if (href) {
      componentData.attrs.href = href;
    } else {
      // Ensure the prop HREF does not exist for router links
      delete componentData.props.href;
    }

    return h(tag, componentData, this.normalizeSlot('default'));
  }
});

exports.BLink = BLink;
var _default = BLink;
exports.default = _default;