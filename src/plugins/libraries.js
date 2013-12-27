// plugins/libraries.js
'use strict';

exports.name = 'libraries';
exports.evaluator = function (win) {
  var d;
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
    var ds = [],
      undef = void 0;
    ds.push(detector('jQuery', function (w) {
      if (typeof w.jQuery !== undef && typeof w.jQuery === 'function') {
        return {
          version: w.jQuery().jquery
        };
      }
      if (typeof w.$ !== undef && typeof w.$ === 'function' && typeof w.$.fn === 'object') {
        return {
          version: w.$().jquery          
        };
      }
      return undef;
    }));
    return ds;
  }

  function detector(name, test) {
    return {
      name: name,
      test: function(w){
        var res = test(w);
        if ( res !== void 0 ){
          res.name = name;
        }
        return res;
      }
    };
  }
};
