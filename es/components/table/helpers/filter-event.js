"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dom = require("../../../utils/dom");

var _constants = require("./constants");

var TABLE_TAG_NAMES = ['TD', 'TH', 'TR']; // Returns `true` if we should ignore the click/double-click/keypress event
// Avoids having the user need to use `@click.stop` on the form control

var filterEvent = function filterEvent(evt) {
  // Exit early when we don't have a target element
  if (!evt || !evt.target) {
    /* istanbul ignore next */
    return false;
  }

  var el = evt.target; // Exit early when element is disabled or a table element

  if (el.disabled || TABLE_TAG_NAMES.indexOf(el.tagName) !== -1) {
    return false;
  } // Ignore the click when it was inside a dropdown menu


  if ((0, _dom.closest)('.dropdown-menu', el)) {
    return true;
  }

  var label = el.tagName === 'LABEL' ? el : (0, _dom.closest)('label', el); // If the label's form control is not disabled then we don't propagate event
  // Modern browsers have `label.control` that references the associated input, but IE11
  // does not have this property on the label element, so we resort to DOM lookups

  if (label) {
    var labelFor = (0, _dom.getAttr)(label, 'for');
    var input = labelFor ? (0, _dom.getById)(labelFor) : (0, _dom.select)('input, select, textarea', label);

    if (input && !input.disabled) {
      return true;
    }
  } // Otherwise check if the event target matches one of the selectors in the
  // event filter (i.e. anchors, non disabled inputs, etc.)
  // Return `true` if we should ignore the event


  return (0, _dom.matches)(el, _constants.EVENT_FILTER);
};

var _default = filterEvent;
exports.default = _default;