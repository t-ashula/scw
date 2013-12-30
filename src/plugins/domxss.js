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
    win.__domxssReports = {
      'calls': {}
    };
    var document = win.document;
    win.document.write = override(win.document.write, function (f) {
      callCounter('document.write');
      f.apply(this, arguments);
    });
    win.document.createElement = override(win.document.createElement, function (f) {
      callCounter('document.createElement');
      return f.apply(this, arguments);
    });
  }
  catch (ee) {
    win.__domxssInit = ee;
  }
  return win;

  function override(f, g) {
    return function () {
      return g(f);
    };
  }

  function callCounter(name) {
    var c = win.__domxssReports.calls;
    if (name in c) {
      c[name]++;
    }
    else {
      c[name] = 1;
    }
  }
};
exports.evaluator = function (win) {
  'use strict';
  var d,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }

    d = {
      'reports': reports(win)
    };
    if (win.__domxssInit) {
      d.exception = win.__domxssInit;
    }
  }
  catch (ee) {
    d = {
      'reports': [],
      'exception': ee
    };
  }
  return d;

  function reports(w) {
    return w.__domxssReports;
  }
};
