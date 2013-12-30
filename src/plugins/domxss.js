// plugins/domxss.js
// jshint -W061
exports.name = 'domxss';
exports.desc = 'dom based xss scanner';
exports.initializer = function (win) {
  'use strict';
  var d;
  try {
    if (win === void 0) {
      win = window;
    }
    if ( !win.__wmapper ) {
      win.__wmapper = {};
    }
    win.__wmapper.domxssReports = {
      'calls': {}
    };
    initInstrument(win);
  }
  catch (ee) {
    win.__wmapper.domxssInit = JSON.stringify(ee);
  }
  return win;

  function initInstrument(win){
    win.document.write = inst(win.document.write, 'doc.write');
    win.document.writeln = inst(win.document.writeln, 'doc.writeln');
    win.eval = inst(win.eval, 'eval');
    win.setTimeout = inst(win.setTimeout, 'setTimeout');
    win.setInterval = inst(win.setInterval, 'setInterval');
    /*
      // WebKit can not do this.
      var innerHTMLdescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
      Object.defineProperty(Element.prototype, 'innerHTML', {
      set: function (htmlVal) {
        callCounter('innerHTML');
        innerHTMLdescriptor.set.call(this, htmlVal);
      }
    });*/
  }
  
  function inst(f, name) {
    return function () {
      callCounter(name);
      return f.apply(this, arguments);
    };
  }

  function callCounter(name) {
    var c = win.__wmapper.domxssReports.calls;
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
      d.exception = win.__wmapper.domxssInit;
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
    return w.__wmapper.domxssReports;
  }
};
