// plugins/gadgets.js

'use strict';
exports.name = 'gadgets';
exports.desc = 'detect 3rd party gadgets';
exports.evaluator = function (win) {
  var d, r, j, cands,
    undef = void 0;
  try {
    if (win === undef) {
      win = window;
    }

    d = {
      'gadgets': detectGadgets(win)
    };
  }
  catch (ee) {
    d = {
      'exception': ee
    };
  }

  return d;

  function initDetectors() {
    var ds = [];
    ds.push({
      'name': 's_code',
      'test': function (w) {
        return 's_code' in w;
      },
      'info': function (w) {
        return {};
      }
    });
    ds.push({
      'name': 'hatenabookmark',
      'test': function (w) {
        function _e(q) {
          return w.document.querySelector(q) !== null;
        }
        return _e('iframe[class="hatena-bookmark-button-frame"]') || _e('script[src$="//b.st-hatena.com/js/bookmark_button.js"]');
      },
      'info': function (w) {
        return {};
      }
    });
    return ds;
  }

  function detectGadgets(win) {
    return initDetectors()
      .filter(function (d) {
        return d.test(win);
      })
      .map(function (d) {
        return {
          name: d.name,
          info: d.info(win)
        };
      });
  }
};
