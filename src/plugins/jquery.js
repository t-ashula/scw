// plugins/jquery.js
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
    var cands = deepJqueryDetector(win),
      ret = [];
    if (cands.length < 1) {
      return ret;
    }
    return ret;
  }

  function deepJqueryDetector(win) {
    var cands = Object.keys(win).filter(function (k) {
      return Object.prototype.toString.call(win[k]) === '[object Function]';
    }).filter(function (k) {
      var o = win[k], n = 'fn';
      return n in o && typeof o[n] === 'object';
    }).filter(function (k) {
      var o = win[k], n = 'noConflict';
      return n in o && typeof o[n] === 'function';
    });
    return cands;
  }

  function migrate(){
    
  }
};
