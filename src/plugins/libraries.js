// plugins/libraries.js
'use strict';

exports.name = 'libraries';
exports.evaluator = function (win) {
  var d,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }
    d = {
      'libs': librariesDetection(win)
    };
  }
  catch (ee) {
    d = {
      'libs': [],
      'exception': ee
    };
  }
  return d;


  // detectors
  // @return { name: 'str', version : 'str', info : {} }

  function librariesDetection(win) {
    var libs = [],
      detectors;
    detectors = initDetectors();

    detectors.forEach(function (d) {
      var res = d.test(win);
      if (res !== void 0) {
        libs.push(res);
      }
    });
    return libs;
  }

  function initDetectors() {
    var ds = [];
    ds.push(detector('jQuery', function (w) {
      if (isFunctionExist(w, 'jQuery')) {
        return {
          version: w.jQuery().jquery
        };
      }
      if (isFunction(w, '$') && typeof w.$.fn === 'object') {
        return {
          version: w.$().jquery
        };
      }
      return undef;
    }));
    ds.push(detector('Prototype.js', function (w) {
      if (w.Prototype !== undef && typeof w.Prototype === 'object') {
        return {
          version: w.Prototype.Version
        };
      }
      return undef;
    }));
    return ds;
  }

  function isFunctionExist(obj, fname) {
    return obj !== null && obj !== undef && isFunction(obj[fname]);
  }

  function isFunction(f) {
    return typeof f === 'function';
  }

  function detector(name, test) {
    return {
      name: name,
      test: function (w) {
        var res = test(w);
        if (res !== void 0) {
          res.name = name;
        }
        return res;
      }
    };
  }
};
