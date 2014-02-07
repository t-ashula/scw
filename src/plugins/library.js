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
    var libs, detectors = initDetectors();
    libs = detectors.filter(function (d) {
      return d.test(win) === true;
    }).map(function (d) {
      return {
        name: d.name,
        info: d.info(win)
      };
    });
    return libs;
  }

  function initDetectors() {
    var ds = [];
    ds.push(simpleDetector('underscore.js', 'http://underscorejs.org', ['_', 'VERSION']));
    ds.push(simpleDetector('jQuery', 'http://jquery.com', ['jQuery', 'fn', 'jquery']));
    ds.push(simpleDetector('jQuery$', 'http://jquery.com', ['$', 'fn', 'jquery']));
    ds.push(simpleDetector('jQuery UI', 'http://jqueryui.com/', ['jQuery', 'ui', 'version']));
    ds.push(simpleDetector('jQuery Mobile', 'http://jquerymobile.com/', ['jQuery', 'mobile', 'version']));
    ds.push(simpleDetector('Prototype.js', 'http://prototypejs.org', ['Prototype', 'Version']));
    ds.push(simpleDetector('Angular.js', 'http://angularjs.org', ['angular', 'version', 'full']));
    ds.push(simpleDetector('Backbone.js', 'http://backbonejs.org', ['Backbone', 'VERSION']));
    ds.push(simpleDetector('Modernizr', 'http://modernizr.com/', ['Modernizr', '_version']));
    ds.push(simpleDetector('Dojo', 'http://dojotoolkit.org/', ['dojo', 'version']));
    ds.push(simpleDetector('script.aculo.us', 'http://script.aculo.us/', ['Scriptaculous', 'Version']));
    ds.push(simpleDetector('MooTools', 'http://mootools.net/', ['MooTools', 'version']));
    ds.push(simpleDetector('YUI3', 'http://yuilibrary.com/projects/yui3/', ['YUI', 'version']));
    ds.push(simpleDetector('YUI2', 'http://yuilibrary.com/projects/yui2/', ['YAHOO', 'VERSION']));
    ds.push(simpleDetector('ExtJS', 'http://www.sencha.com/products/extjs/', ['Ext', 'versions', 'extjs', 'version']));
    ds.push({
      name: 'swfobject.js',
      test: function (w) {
        return this.ver(w) !== undef;
      },
      ver: function (w) {
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
      },
      info: function (w) {
        var v = this.ver(w),
          u = '';
        if (v) {
          u = v.version === '1.5.x' ? 'http://blog.deconcept.com/swfobject/' :
            v.version === '2.x' ? 'http://code.google.com/p/swfobject/' : '';
        }
        return {
          version: v ? v.version : 'N/A',
          url: u
        };
      }
    });

    ds.push({
      name: 'ThickBox',
      test: function (w) {
        return isDefined(w, 'tb_pathToImage') && ['tb_detectMacXFF', 'tb_getPageSize', 'tb_init', 'tb_parseQuery', 'tb_position', 'tb_remove', 'tb_show', 'tb_showIframe'].every(function (f) {
          return isFunctionExist(w, f);
        });
      },
      info: function (w) {
        return {
          url: 'http://codylindley.com/thickbox/'
        };
      }
    });
    ds.push({
      name: 'DivinePlayer',
      test: function (w) {
        return 'DivinePlayer' in w;
      },
      info: function (w) {
        return {
          version: 'N/A',
          url: 'https://github.com/cameronhunter/divine-player'
        };
      }
    });

    return ds;
  }

  function simpleDetector(name, url, verkeys) {
    return {
      name: name,
      test: function (w) {
        return getVersion(w, verkeys) !== undef;
      },
      info: function (w) {
        return {
          version: getVersion(w, verkeys).version,
          url: url
        };
      }
    };
  }

  function getVersion(w, keys) {
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
};
