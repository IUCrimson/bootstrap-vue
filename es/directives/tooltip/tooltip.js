"use strict";

exports.__esModule = true;
exports.default = exports.VBTooltip = void 0;

var _popper = _interopRequireDefault(require("popper.js"));

var _tooltip = _interopRequireDefault(require("../../utils/tooltip.class"));

var _warn = _interopRequireDefault(require("../../utils/warn"));

var _config = require("../../utils/config");

var _env = require("../../utils/env");

var _inspect = require("../../utils/inspect");

var _object = require("../../utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Key which we use to store tooltip object on element
var BV_TOOLTIP = '__BV_ToolTip__'; // Valid event triggers

var validTriggers = {
  focus: true,
  hover: true,
  click: true,
  blur: true // Directive modifier test regular expressions. Pre-compile for performance

};
var htmlRE = /^html$/;
var noFadeRE = /^nofade$/i;
var placementRE = /^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/;
var boundaryRE = /^(window|viewport|scrollParent)$/;
var delayRE = /^d\d+$/;
var offsetRE = /^o-?\d+$/;
var variantRE = /^v-.+$/; // Build a ToolTip config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object

/* istanbul ignore next: not easy to test */

var parseBindings = function parseBindings(bindings)
/* istanbul ignore next: not easy to test */
{
  // We start out with a basic config
  var NAME = 'BTooltip';
  var config = {
    delay: (0, _config.getComponentConfig)(NAME, 'delay'),
    boundary: String((0, _config.getComponentConfig)(NAME, 'boundary')),
    boundaryPadding: parseInt((0, _config.getComponentConfig)(NAME, 'boundaryPadding'), 10) || 0,
    variant: (0, _config.getComponentConfig)(NAME, 'variant'),
    customClass: (0, _config.getComponentConfig)(NAME, 'customClass') // Process bindings.value

  };

  if ((0, _inspect.isString)(bindings.value)) {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value;
  } else if ((0, _inspect.isFunction)(bindings.value)) {
    // Title generator function
    config.title = bindings.value;
  } else if ((0, _inspect.isObject)(bindings.value)) {
    // Value is config object, so merge
    config = _objectSpread({}, config, {}, bindings.value);
  } // If argument, assume element ID of container element


  if (bindings.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.container = "#".concat(bindings.arg);
  } // Process modifiers


  (0, _object.keys)(bindings.modifiers).forEach(function (mod) {
    if (htmlRE.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (noFadeRE.test(mod)) {
      // No animation
      config.animation = false;
    } else if (placementRE.test(mod)) {
      // Placement of tooltip
      config.placement = mod;
    } else if (boundaryRE.test(mod)) {
      // Boundary of tooltip
      config.boundary = mod;
    } else if (delayRE.test(mod)) {
      // Delay value
      var delay = parseInt(mod.slice(1), 10) || 0;

      if (delay) {
        config.delay = delay;
      }
    } else if (offsetRE.test(mod)) {
      // Offset value, negative allowed
      var offset = parseInt(mod.slice(1), 10) || 0;

      if (offset) {
        config.offset = offset;
      }
    } else if (variantRE.test(mod)) {
      // Variant
      config.variant = mod.slice(2) || null;
    }
  }); // Special handling of event trigger modifiers trigger is
  // a space separated list

  var selectedTriggers = {}; // Parse current config object trigger

  var triggers = (0, _inspect.isString)(config.trigger) ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Parse modifiers for triggers

  (0, _object.keys)(validTriggers).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  }); // Sanitize triggers

  config.trigger = (0, _object.keys)(selectedTriggers).join(' ');

  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }

  if (!config.trigger) {
    // Remove trigger config
    delete config.trigger;
  }

  return config;
}; // Add or update ToolTip on our element


var applyTooltip = function applyTooltip(el, bindings, vnode) {
  if (!_env.isBrowser) {
    /* istanbul ignore next */
    return;
  }

  if (!_popper.default) {
    // Popper is required for ToolTips to work

    /* istanbul ignore next */
    (0, _warn.default)('v-b-tooltip: Popper.js is required for ToolTips to work');
    /* istanbul ignore next */

    return;
  }

  var config = parseBindings(bindings);

  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].updateConfig(config);
  } else {
    el[BV_TOOLTIP] = new _tooltip.default(el, config, vnode.context);
  }
}; // Remove ToolTip on our element


var removeTooltip = function removeTooltip(el) {
  if (el[BV_TOOLTIP]) {
    el[BV_TOOLTIP].destroy();
    el[BV_TOOLTIP] = null;
    delete el[BV_TOOLTIP];
  }
};
/*
 * Export our directive
 */


var VBTooltip = {
  bind: function bind(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyTooltip(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode)
  /* istanbul ignore next: not easy to test */
  {
    if (bindings.value !== bindings.oldValue) {
      applyTooltip(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removeTooltip(el);
  }
};
exports.VBTooltip = VBTooltip;
var _default = VBTooltip;
exports.default = _default;