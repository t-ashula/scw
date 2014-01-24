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

  function toStr(o) {
    return Object.prototype.toString.call(o);
  }

  function detectJqueryPlugins(win) {
    var cands = getJqueryKeys(win),
      ds = initDetectors(),
      ret = [];
    if (cands.length < 1) {
      return [];
    }

    ds.forEach(function (d) {
      cands.filter(function (c) {
        return d.test(win[c]);
      }).map(function (c) {
        return {
          'name': d.name,
          'info': d.info(win[c]),
          'parent': {
            'name': c,
            'ver': win[c].fn.jquery
          }
        };
      }).forEach(function (p) {
        ret.push(p);
      });
    });

    return ret;
  }

  function initDetectors() {
    function d(n, t, i) {
      return {
        name: n,
        test: t,
        info: i
      };
    }
    var ds = [];
    ds.push(
      d('migrate', function ($) {
        return ('migrateTrace' in $);
      }, function ($) {
        return {
          'version': 'N/A'
        };
      }),
      d('prettyPhoto',function($){
        return 'prettyPhoto' in $ && 'prettyPhoto' in $.fn;
      }, function($){
        return { 'version': $.prettyPhoto.version };
      })
    );
    return ds;
  }

  function getJqueryKeys(win){
    var keys, ret, f;

    keys = Object.keys(win).filter(function (k) {
      return toStr(win[k]) === '[object Function]';
    }).filter(function (k) {
      var o = win[k],
        n = 'fn';
      return n in o && typeof o[n] === 'object';
    }).filter(function (k) {
      var o = win[k],
        n = 'noConflict';
      return n in o && typeof o[n] === 'function';
    });
    
    if ( keys.length < 2 ) {
      return keys;
    }
    
    ret = [];
    for ( var i = 0, k; (k = keys[i]); ++i ){
      f = false;
      for( var j = 0, r; (r = ret[j]); ++j ) {
        if (win[r].fn.jquery === win[k].fn.jquery) {
          f = true;
          break;
        }
      }
      if ( !f ) {
        ret.push(k);
      }
    }
    return ret;
  }
};
