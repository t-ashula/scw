// plugins/domxss.js

exports.name = 'domxss';
exports.desc = 'dom based xss scanner';
exports.initializer = function (win) {
  'use strict';
  var d;
  try {
    if (win === void 0) {
      win = window;
    }
    win.___domxss = 1;
    win.document.write = function () {
      return 1;
    };
  }
  catch (ee) {
    win.__domxss = ee;
  }
  return win;
};
exports.evaluator = function (win) {
  'use strict';
  var d,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }
    d = { reports :scan(win) };
  }
  catch (ee) {
    d = {
      'keys': [],
      'exception': ee
    };
  }
  return d;

  function scan(w) {
    var d = w.document;
    // w.alert(1);
    return w.___domxss;
  }
};
