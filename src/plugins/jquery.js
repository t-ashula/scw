// plugins/libraries.js
'use strict';

exports.name = 'jquery';
exports.desc = 'detect jQuery related libraries page use';
exports.evaluator = function (win) {
  var d,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }
    d = {
      'plugins': detectJqueryPlugins(win)
    };
  }
  catch (ee) {
    d = {
      'plugins': [],
      'exception': ee
    };
  }
  return d;

  function detectJqueryPlugins(win) {
    var ret = [];
    
    return ret;
  }
};
