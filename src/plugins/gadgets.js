// plugins/gadgets.js

'use strict';
exports.name = 'gadgets';
exports.desc = 'detect 3rd party gadgets';
exports.evaluator = function (win) {
  var d, r, j, cands,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }

    d = {
      'gadgets' : detectGadgets(win)
    };
  }
  catch (ee) {
    d = {
      'exception': ee
    };
  }

  return d;

  function detectGadgets(win) {
    
    return [];
  }
};
