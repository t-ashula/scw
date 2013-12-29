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
      if (res !== undef) {
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
      var key = 'Prototype', ver = 'Version';
      if (isObjectExist(w, key)) {
        return {
          version: w[key][ver]
        };
      }
      return undef;
    }));

    ds.push(detector('Angular.js', function (w) {
      var key = 'angular',
        ver = 'version';
      if (isObjectExist(w, key) && isObjectExist(w[key], ver)) {
        return {
          version: w[key][ver].full
        };
      }
      return undef;
    }));

    ds.push(detector('Backbone.js', function (w) {
      var key = 'Backbone',
        ver = 'VERSION';
      if (isObjectExist(w, key)) {
        return {
          version: w[key][ver]
        };
      }
      return undef;
    }));

    ds.push(detector('underscore.js', function (w) {
      var key = '_',
        ver = 'VERSION';
      if (isFunctionExist(w, key)) {
        return {
          version: w[key][ver]
        };
      }
      return undef;
    }));

    return ds;
  }

  function isObjectExist(obj, oname) {
    var o = obj[oname];
    return o !== undef && (o === null || (typeof o === 'object' && !Array.isArray(o)));
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
        if (res !== undef) {
          res.name = name;
        }
        return res;
      }
    };
  }
};
