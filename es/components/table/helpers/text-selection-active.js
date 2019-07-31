"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dom = require("../../../utils/dom");

// Helper to determine if a there is an active text selection on the document page
// Used to filter out click events caused by the mouse up at end of selection
//
// Accepts an element as only argument to test to see if selection overlaps or is
// contained within the element
var textSelectionActive = function textSelectionActive() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var sel = (0, _dom.getSel)();
  return sel && sel.toString().trim() !== '' && sel.containsNode && (0, _dom.isElement)(el) ? sel.containsNode(el, true) : false;
};

var _default = textSelectionActive;
exports.default = _default;