// plugins/libraries.js
'use strict';

exports.name = 'library';
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
    ds.push(simpleDetector('underscore.js', ['_', 'VERSION']));
    ds.push(simpleDetector('jQuery', ['jQuery', 'fn', 'jquery']));
    ds.push(simpleDetector('jQuery$', ['$', 'fn', 'jquery']));
    ds.push(simpleDetector('jQuery UI', ['jQuery', 'ui', 'version']));
    ds.push(simpleDetector('jQuery Mobile', ['jQuery', 'mobile', 'version']));
    ds.push(simpleDetector('Prototype.js', ['Prototype', 'Version']));
    ds.push(simpleDetector('Angular.js', ['angular', 'version', 'full']));
    ds.push(simpleDetector('Backbone.js', ['Backbone', 'VERSION']));
    ds.push(simpleDetector('Modernizr', ['Modernizr', '_version']));
    ds.push(simpleDetector('Dojo', ['dojo', 'version']));
    ds.push(simpleDetector('script.aculo.us', ['Scriptaculous', 'Version']));
    ds.push(simpleDetector('MooTools', ['MooTools', 'version']));
    ds.push(simpleDetector('YUI3', ['YUI', 'version']));
    ds.push(simpleDetector('YUI2', ['YAHOO', 'VERSION']));
    ds.push(simpleDetector('ExtJS', ['Ext', 'versions', 'extjs', 'version']));
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

    ds.push(detector('ThickBox', function(w) {
      var tbFuncs = ['tb_detectMacXFF', 'tb_getPageSize', 'tb_init', 'tb_parseQuery', 'tb_position', 'tb_remove', 'tb_show', 'tb_showIframe'];
      if(tbFuncs.every(function(f){ return isFunctionExist(w, f); })) {
        if (isDefined(w, 'tb_pathToImage') ) {
          return {
            version: 'N/A'
          };
        }
      }
      return undef;
    }));

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
      return {
        version: o[keys[iz - 1]] + ''
      };
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
