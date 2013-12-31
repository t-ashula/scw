// plugins/libraries.js
'use strict';

exports.name = 'libraries';
exports.desc = 'detect libraries page use';
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
    ds.push(detector('swfobject.js', function (w) {
      var key1 = 'deconcept',
        key2 = 'swfobject',
        key11 = 'SWFObject',
        key22 = 'embedSWF',
        ver1 = '1.5.x',
        ver2 = '2.x';
      if (isObjectExist(w, key2) && isFunctionExist(w[key2], key22)) {
        return {
          version: ver2
        };
      }
      if (isObjectExist(w, key1) && isFunctionExist(w[key1], key11)) {
        return {
          version: ver1
        };
      }
      return undef;
    }));

    ds.push(simpleDetector('underscore.js', ['_','VERSION']));
    ds.push(simpleDetector('jQuery', ['jQuery', 'fn', 'jquery']));
    ds.push(simpleDetector('jQuery$', ['$', 'fn', 'jquery']));
    ds.push(simpleDetector('Prototype.js', ['Prototype', 'Version']));
    ds.push(simpleDetector('Angular.js', ['angular', 'version', 'full']));
    ds.push(simpleDetector('Backbone.js', ['Backbone', 'VERSION']));
    ds.push(simpleDetector('Modernizr', ['Modernizr', '_version']));
    
    return ds;
  }

  function simpleDetector(name, keys) {
    return detector(name, function (w) {
      var o = w;
      for (var i = 0, iz = keys.length; i < iz - 1; ++i) {
        if (!isDefined(o, keys[i])) {
          return undef;
        }
        o = o[keys[i]];
      }
      return { version : o[keys[iz - 1]] };
    });
  }

  function isDefined(obj, oname) {
    return (oname in obj) && (obj[oname] !== null) && (obj[oname] !== undef);
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
