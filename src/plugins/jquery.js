// plugins/jquery.js

'use strict';
exports.name = 'jquery';
exports.desc = 'detect jQuery related libraries page use';
exports.initializer = function (win) {
  if (win === void 0) {
    win = window;
  }
  win.__wmapper = win.__wmapper ? win.__wmapper : {};
  /**/
  win.__wmapper.jqs = [];
  win.__wmapper.jqc = [];
  (function (wm) {
    var q;
    if ('jQuery' in win) {
      q = win.jQuery;
      delete win.jQuery;
    }
    Object.defineProperty(window, 'jQuery', {
      set: function (q) {
        wm.jqs.push(q);
        wm.jqc.push('jQuery.S.' + ((q && q.fn) ? q.fn.jquery : '') + ';' + (typeof q) + ';' + wm.jqs.join(','));
      },
      get: function () {
        var q = wm.jqs[wm.jqs.length - 1];
        wm.jqc.push('jQuery.G.' + ((q && q.fn) ? q.fn.jquery : q) + ';' + wm.jqs.join(','));
        return q;
      }
    });
    if (q !== void 0) {
      win.jQuery = q;
    }
  })(win.__wmapper);
  /**/
};
exports.evaluator = function (win) {
  var d, r, j, cands, ds,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }

    j = win.__wmapper && win.__wmapper.jqs && win.__wmapper.jqs.filter(function (q) {
      return q !== undef && q.fn !== undef;
    }).map(function (q) {
      return q.fn.jquery;
    }) || [];

    if (j.length > 0) {
      win.__wmapper.jqs.filter(function (q) {
        return q !== undef && q.fn !== undef;
      }).forEach(function (q) {
        win['__wmapper_' + q.fn.jquery] = q;
      });
    }

    ds = initDetectors();
    cands = getJqueryKeys(win);
    d = {
      'plugins': detectJqueryPlugins(win, cands, ds),
      'extras': getExtraKeys(win, cands, ds),
      'jqueries': j
    };

    if (j.length > 0) {
      win.__wmapper.jqs.filter(function (q) {
        return q !== undef && q.fn !== undef;
      }).forEach(function (q) {
        delete win['__wmapper_' + q.fn.jquery];
      });
    }
  }
  catch (ee) {
    d = {
      'exception': ee
    };
  }

  return d;

  function toStr(o) {
    return Object.prototype.toString.call(o);
  }

  function detectJqueryPlugins(win, cands, ds) {
    var ps = [];
    if (cands.length < 1) {
      return ps;
    }

    cands.forEach(function (c) {
      ps = ps.concat(
        ds.filter(function (d) {
          return d.test(win[c], win);
        }).map(function (d) {
          return {
            'name': d.name,
            'info': d.info(win[c]),
            'parent': {
              'name': c,
              'ver': win[c].fn.jquery
            }
          };
        })
      );
    });

    return ps;
  }

  function initDetectors() {
    var ds = [];
    ds.push({
      name: 'migrate',
      test: function ($) {
        return 'migrateTrace' in $;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/jquery/jquery-migrate/'
        };
      },
      provides: {
        'jQuery': ['attrFn', 'browser', 'clean', 'migrateReset', 'migrateTrace', 'migrateWarnings', 'sub', 'uaMatch'],
        'jQuery.fn': ['die', 'live']
      }
    });
    ds.push({
      name: 'prettyPhoto',
      test: function ($) {
        return 'prettyPhoto' in $ && 'prettyPhoto' in $.fn;
      },
      info: function ($) {
        return {
          'version': $.prettyPhoto.version,
          'url': 'http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/'
        };
      },
      provides: {
        'jQuery': ['prettyPhoto'],
        'jQuery.fn': ['prettyPhoto']
      }
    });
    ds.push({
      name: 'pageScroller',
      test: function ($, w) {
        return 'top' in $.fn && 'left' in $.fn && 'coliss' in w && 'pageScroll' in w.coliss;
      },
      info: function ($) {
        return {
          'url': 'http://coliss.com/articles/build-websites/operation/javascript/296.html'
        };
      },
      provides: {
        'jQuery.fn': ['top', 'left', 'width', 'height']
      }
    });
    ds.push({
      name: 'colorbox',
      test: function ($) {
        return 'colorbox' in $ && 'colorbox' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/jackmoore/colorbox/'
        };
      },
      provides: {
        'jQuery': ['colorbox'],
        'jQuery.fn': ['colorbox']
      }
    });
    ds.push({
      name: 'Camera Slideshow',
      test: function ($) {
        return ['camera', 'cameraPause', 'cameraResume', 'cameraStop'].every(function (c) {
          return c in $.fn;
        });
      },
      info: function ($) {
        return {
          'url': 'http://www.pixedelic.com/plugins/camera/'
        };
      },
      provides: {
        'jQuery.fn': ['camera', 'cameraPause', 'cameraResume', 'cameraStop']
      }
    });
    ds.push({
      name: 'jScrollPane',
      test: function ($) {
        return 'jScrollPane' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/vitch/jScrollPane/'
        };
      },
      provides: {
        'jQuery.fn': ['jScrollPane']
      }
    });
    ds.push({
      name: 'jQuery Easing',
      test: function ($) {
        if ('easing' in $) {
          return Object.keys($.easing).some(function (k) {
            return k !== 'linear' && k !== 'swing';
          });
        }
        return false;
      },
      info: function ($) {
        return {
          'url': 'http://gsgd.co.uk/sandbox/jquery/easing/'
        };
      }
    });
    ds.push({
      name: 'jQuery Mouse Wheel',
      test: function ($) {
        return 'mousewheel' in $.fn && 'unmousewheel' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/brandonaaron/jquery-mousewheel/',
          'version': $.event.special.mousewheel ? $.event.special.mousewheel.version : 'N/A'
        };
      },
      provides: {
        'jQuery.fn': ['mousewheel', 'unmousewheel']
      }
    });
    ds.push({
      name: 'jQuery UI',
      test: function ($) {
        return 'ui' in $;
      },
      info: function ($) {
        return {
          'url': 'http://jqueryui.com/',
          'version': $.ui.version
        };
      },
      provides: {
        'jQuery': ['Color', 'Widget', 'datepicker', 'effects', 'position', 'ui', 'widget'],
        'jQuery.fn': ['accordion', 'autocomplete', 'button', 'buttonset', 'cssUnit', 'datepicker', 'dialog', 'disableSelection', 'draggable', 'droppable', 'effect', 'enableSelection', 'menu', 'mouse', 'progressbar', 'removeUniqueId', 'resizable', 'scrollParent', 'selectable', 'slider', 'sortable', 'spinner', 'switchClass', 'tabs', 'tooltip', 'uniqueId', 'zIndex']
      }
    });
    ds.push({
      name: 'jQuery Alert Dialog',
      test: function ($) {
        return 'alerts' in $ && typeof $.alerts === 'object';
      },
      info: function ($) {
        return {
          'url': 'http://abeautifulsite.net/'
        };
      }
    });
    ds.push({
      name: 'jGrowl',
      test: function ($) {
        return 'jGrowl' in $ && 'jGrowl' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/stanlemon/jGrowl/'
        };
      }
    });
    ds.push({
      name: 'jQuery Cycle Plugin',
      test: function ($) {
        return 'cycle' in $.fn && typeof $.fn.cycle === 'function';
      },
      info: function ($) {
        return {
          'url': 'http://jquery.malsup.com/cycle/',
          'version': typeof $.fn.cycle.ver === 'function' ? $.fn.cycle.ver() : 'N/A'
        };
      }
    });
    ds.push({
      name: 'carouFredSel',
      test: function ($) {
        return 'caroufredsel' in $.fn && 'carouFredSel' in $.fn && typeof $.fn.carouFredSel === 'function';
      },
      info: function ($) {
        return {
          'url': 'http://dev7studios.com/plugins/caroufredsel'
        };
      }
    });
    ds.push({
      name: 'jQuery Templates Plugin',
      test: function ($) {
        return ['tmpl', 'template', 'tmplItem'].every(function (f) {
          return f in $.fn && f in $;
        });
      },
      info: function ($) {
        return {
          'url': 'http://github.com/jquery/jquery-tmpl'
        };
      }
    });
    ds.push({
      name: 'jquery-plugin-query-object',
      test: function ($) {
        return 'query' in $ && 'keys' in $.query;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/alrusdi/jquery-plugin-query-object'
        };
      }
    });
    ds.push({
      name: 'Background position animation for jQuery',
      test: function ($) {
        return 'Tween' in $ && 'propHooks' in $.Tween && 'backgroundPosition' in $.Tween.propHooks;
      },
      info: function ($) {
        return {
          'url': 'http://keith-wood.name/backgroundPos.html'
        };
      }
    });
    ds.push({
      name: 'jQuery Fly Side Menu',
      test: function ($) {
        return 'fly_sidemenu' in $.fn && 'toggleMenu' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/peachananr/fly_sidemenu'
        };
      }
    });
    ds.push({
      name: 'AnythingSlider',
      test: function ($) {
        return 'anythingSlider' in $ && 'anythingSlider' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/CSS-Tricks/AnythingSlider'
        };
      },
      provides: {
        'jQuery': ['anythingSlider'],
        'jQuery.fn': ['anythingSlider']
      }
    });
    ds.push({
      name: 'AnythingSlider Video Controller',
      test: function ($) {
        return 'anythingSliderVideo' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/CSS-Tricks/AnythingSlider'
        };
      },
      provides: {
        'jQuery.fn': ['anythingSliderVideo']
      }
    });
    ds.push({
      name: 'AnythingSlider Fx',
      test: function ($) {
        return 'anythingSliderFx' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/CSS-Tricks/AnythingSlider'
        };
      },
      provides: {
        'jQuery.fn': ['anythingSliderFx']
      }
    });
    ds.push({
      name: 'Just Another ToolTip',
      test: function ($) {
        return 'jatt' in $;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/Mottie/Jatt'
        };
      },
      provides: {
        'jQuery': ['jatt']
      }
    });
    ds.push({
      name: 'jQuery Social Button',
      test: function ($) {
        return 'socialbutton' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'http://itra.jp/jquery_socialbutton_plugin/'
        };
      },
      provides: {
        'jQuery.fn': ['cosialbutton']
      }
    });
    ds.push({
      name: 'jQuery pjax',
      test: function ($) {
        return 'pjax' in $ && 'pjax' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/defunkt/jquery-pjax'
        };
      },
      provides: {
        'jQuery': ['pjax'],
        'jQuery.fn': ['pjax']
      }
    });
    ds.push({
      name: 'jQuery bottom',
      test: function ($) {
        return 'bottom' in $.fn;
      },
      info: function ($) {
        return {
          'url': 'https://github.com/jimyi/jquery_bottom'
        };
      },
      provides: {
        'jQuery.fn': ['bottom']
      }
    });

    return ds;
  }

  function getJqueryKeys(win) {
    var keys, ret;

    keys = Object.keys(win).concat(['jQuery', '$']).reverse().filter(function (k) {
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

    if (keys.length < 2) {
      return keys;
    }

    ret = [];
    keys.forEach(function (k) {
      if (ret.every(function (r) {
        return win[r].fn.jquery !== win[k].fn.jquery;
      })) {
        ret.push(k);
      }
    });
    return ret;
  }

  function getDict(ver) {
    var keyDicts = {
      '2.0.0-beta3': {
        'jQuery': {
          'deled': '_evalUrl'
        }
      },
      '2.0.0b2': {
        'jQuery': {
          'deled': '_evalUrl'
        }
      },
      '2.0.0b1': {
        'jQuery': {
          'added': 'cache/noData',
          'deled': '_evalUrl'
        }
      },
      '1.9.0b1': {
        'jQuery': {
          'added': 'clean',
          'deled': 'buildFragment'
        },
        'jQuery.fn': {
          'added': 'die/live',
          'deled': 'finish'
        }
      },
      '1.8rc1': {
        'jQuery': {
          'deled': 'attrFn'
        }
      },
      '1.8b2': {
        'jQuery': {
          'deled': 'attrFn'
        }
      },
      '1.8b1': {
        'jQuery': {
          'added': 'cssExpand'
        }
      },
      '1.7b1': {
        'jQuery': {
          'added': 'attrFix/isNaN',
          'deled': 'isNumeric'
        }
      },
      '1.5rc1': {
        'jQuery': {
          'added': 'subclass',
          'deled': 'sub'
        }
      },
      '1.5b1': {
        'jQuery': {
          'added': 'subclass',
          'deled': '_data/clone/sub'
        }
      },
      '1.4.4': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/fadeToggle/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.4rc3': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/fadeToggle/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.4rc2': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/fadeToggle/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.4rc1': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/fadeToggle/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.3': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.3rc2': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.3rc1': {
        'jQuery': {
          'added': 'acceptData/access/buildFragment/camelCase/cleanData/cssHooks/cssNumber/cssProps/error/handleComplete/handleSuccess/isNaN/isWindow/now/parseJSON/readyWait/removeEvent/text/triggerGlobal/type/uuid',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.2': {
        'jQuery': {
          'added': 'cleanData/error/parseJSON/text',
          'deled': 'getText'
        },
        'jQuery.fn': {
          'added': 'delegate/undelegate',
          'deled': '_load/setArray'
        }
      },
      '1.4.1': {
        'jQuery': {
          'added': 'cleanData/error/parseJSON'
        }
      },
      '1.4rc1': {
        'jQuery.fn': {
          'deled': 'focusin/focusout'
        }
      },
      '1.4a2': {
        'jQuery': {
          'deled': 'guid/noop/proxy/uaMatch'
        },
        'jQuery.fn': {
          'deled': 'focusin/focusout'
        }
      },
      '1.4a1': {
        'jQuery': {
          'added': 'isObjectLiteral/readyList',
          'deled': 'attrFn/bindReady/contains/getText/guid/isPlainObject/noData/noop/proxy/uaMatch'
        },
        'jQuery.fn': {
          'deled': 'focusin/focusout/has'
        }
      },
      '1.3.2': {
        'jQuery': {
          'deled': 'timerId'
        },
        'jQuery.fn': {
          'added': 'sort/splice'
        }
      },
      '1.3.1': {
        'jQuery': {
          'deled': 'timerId'
        }
      },
      '1.3.1rc1': {
        'jQuery': {
          'deled': 'timerId'
        }
      },
      '1.3b2': {
        'jQuery.fn': {
          'deled': 'push'
        }
      },
      '1.3b1': {
        'jQuery': {
          'deled': 'Event/dequeue/queue'
        },
        'jQuery.fn': {
          'deled': 'push'
        }
      },
      '1.2.6': {
        'jQuery': {
          'added': 'timerId',
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': '_load/data/eq/innerHeight/innerWidth/offsetParent/outerHeight/outerWidth/position/removeData/scrollLeft/scrollTop'
        }
      },
      '1.2.5': {
        'jQuery': {
          'added': 'timerId',
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': '_load/data/eq/innerHeight/innerWidth/offsetParent/outerHeight/outerWidth/position/removeData/scrollLeft/scrollTop'
        }
      },
      '1.2.4': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'data/eq/innerHeight/innerWidth/outerHeight/outerWidth/removeData'
        }
      },
      '1.2.4b': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'data/eq/innerHeight/innerWidth/outerHeight/outerWidth/removeData'
        }
      },
      '1.2.4a': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'data/eq/innerHeight/innerWidth/outerHeight/outerWidth/removeData'
        }
      },
      '1.2.3': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'data/eq/removeData'
        }
      },
      '1.2.3b': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'data/eq/removeData'
        }
      },
      '1.2.3a': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'eq'
        }
      },
      '1.2.2': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'eq'
        }
      },
      '1.2.2b2': {
        'jQuery': {
          'deled': 'styleFloat'
        },
        'jQuery.fn': {
          'added': 'eq'
        }
      },
      '1.2.2b': {
        'jQuery': {
          'deled': 'ready/readyList/styleFloat'
        },
        'jQuery.fn': {
          'added': 'eq'
        }
      },
      '1.2.1': {
        'jQuery.fn': {
          'added': 'eq'
        }
      },
      '1.1.4': {
        'jQuery': {
          'added': 'classFilter/isXMLDoc/mergeNum/nodeName/props/styleFloat/timers/unique',
          'deled': 'getAll/safariTimer/token'
        },
        'jQuery.fn': {
          'added': 'init/slice'
        }
      },
      '1.1.3': {
        'jQuery': {
          'added': 'chars/classFilter/isXMLDoc/mergeNum/nodeName/props/styleFloat/timers/unique',
          'deled': 'getAll/token'
        },
        'jQuery.fn': {
          'added': 'init'
        }
      },
      '1.1.3a': {
        'jQuery': {
          'added': 'chars/classFilter/isXMLDoc/mergeNum/nodeName/timers/unique',
          'deled': 'getAll'
        },
        'jQuery.fn': {
          'added': 'init'
        }
      },
      '1.1.2': {
        'jQuery': {
          'added': 'isXMLDoc/nodeName'
        }
      },
      '1.1.1': {
        'jQuery': {
          'added': 'nodeName'
        }
      },
      '1.1b': {
        'jQuery': {
          'deled': 'isFunction'
        }
      },
      '1.1a': {
        'jQuery': {
          'deled': 'isFunction/multiFilter'
        },
        'jQuery.fn': {
          'added': 'set',
          'deled': 'height/pushStack/width'
        }
      },
      '1.0.4': {
        'jQuery': {
          'added': 'getJSON/globalEval/safariTimer',
          'deled': 'setAuto'
        },
        'jQuery.fn': {
          'added': 'ajaxSend/evalScripts/serialize/set'
        }
      },
      '1.0.3': {
        'jQuery': {
          'added': 'getJSON/safariTimer'
        },
        'jQuery.fn': {
          'added': 'evalScripts/serialize'
        }
      },
      '1.0.2': {
        'jQuery': {
          'added': 'getJSON/safariTimer'
        },
        'jQuery.fn': {
          'added': 'serialize'
        }
      }
    };

    var baseDicts = {
      '2.1': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_evalUrl/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '2.0': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_evalUrl/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '1.11': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_evalUrl/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/cache/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '1.10': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_evalUrl/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/cache/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '1.9': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/cache/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '1.8': {
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_queueHooks/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrFn/attrHooks/browser/buildFragment/cache/camelCase/clean/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/deletedIds/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/sub/support/swap/text/timers/trim/type/uaMatch/unique/uuid/valHooks/when',
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'

      },
      '1.7': {
        'jQuery': 'Callbacks/Deferred/Event/_data/_mark/_unmark/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrFn/attrHooks/bindReady/boxModel/browser/buildFragment/cache/camelCase/clean/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/curCSS/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/nth/offset/param/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/sub/support/swap/text/timers/trim/type/uaMatch/unique/uuid/valHooks/when',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'

      },
      '1.6': {
        'jQuery': 'Deferred/Event/_Deferred/_data/_mark/_unmark/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrFix/attrFn/attrHooks/bindReady/boxModel/browser/buildFragment/cache/camelCase/clean/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/curCSS/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNaN/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/nth/offset/param/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/sub/support/swap/text/timers/trim/type/uaMatch/unique/uuid/valHooks/when',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/css/data/dblclick/delay/delegate/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'

      },
      '1.5': {
        'jQuery': 'Deferred/Event/_Deferred/_data/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrFn/bindReady/boxModel/browser/buildFragment/cache/camelCase/clean/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/curCSS/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/inArray/isArray/isEmptyObject/isFunction/isNaN/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/nth/offset/param/parseJSON/parseXML/post/props/proxy/queue/ready/readyWait/removeData/removeEvent/sibling/speed/style/sub/support/swap/text/timers/trim/type/uaMatch/unique/uuid/when',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/css/data/dblclick/delay/delegate/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'

      },
      '1.4': {
        'jQuery': 'Event/active/ajax/ajaxSettings/ajaxSetup/attr/attrFn/bindReady/boxModel/browser/cache/clean/contains/css/curCSS/data/dequeue/dir/each/easing/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/getText/globalEval/grep/guid/handleError/httpData/httpNotModified/httpSuccess/inArray/isArray/isEmptyObject/isFunction/isPlainObject/isReady/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/nth/offset/param/post/props/proxy/queue/ready/removeData/sibling/speed/style/support/swap/timers/trim/uaMatch/unique',
        'jQuery.fn': '_load/_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/contents/css/data/dblclick/delay/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/setArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '1.3': {
        'jQuery': 'Event/active/ajax/ajaxSettings/ajaxSetup/attr/boxModel/browser/cache/className/clean/css/curCSS/data/dequeue/dir/each/easing/event/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/handleError/httpData/httpNotModified/httpSuccess/inArray/isArray/isFunction/isReady/isXMLDoc/lastModified/makeArray/map/merge/multiFilter/noConflict/nodeName/nth/offset/param/post/prop/props/queue/ready/readyList/removeData/sibling/speed/support/swap/timerId/timers/trim/unique',
        'jQuery.fn': '_load/_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/click/clone/closest/contents/css/data/dblclick/dequeue/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/filter/find/focus/get/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/position/prepend/prependTo/prev/prevAll/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/setArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/stop/submit/text/toggle/toggleClass/trigger/triggerHandler/unbind/unload/val/width/wrap/wrapAll/wrapInner'
      },
      '1.2': {
        'jQuery': 'active/ajax/ajaxSettings/ajaxSetup/attr/boxModel/browser/cache/classFilter/className/clean/css/curCSS/data/dir/each/easing/event/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/handleError/httpData/httpNotModified/httpSuccess/inArray/isFunction/isReady/isXMLDoc/lastModified/makeArray/map/merge/multiFilter/noConflict/nodeName/nth/param/parse/post/prop/props/ready/readyList/removeData/sibling/speed/styleFloat/swap/timers/trim/unique',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/click/clone/contents/css/dblclick/dequeue/domManip/each/empty/end/error/extend/fadeIn/fadeOut/fadeTo/filter/find/focus/get/hasClass/height/hide/hover/html/index/init/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/length/load/map/mousedown/mousemove/mouseout/mouseover/mouseup/next/nextAll/not/offset/one/parent/parents/prepend/prependTo/prev/prevAll/pushStack/queue/ready/remove/removeAttr/removeClass/replaceAll/replaceWith/resize/scroll/select/serialize/serializeArray/setArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/stop/submit/text/toggle/toggleClass/trigger/triggerHandler/unbind/unload/val/width/wrap/wrapAll/wrapInner'
      },
      '1.1': {
        'jQuery': 'active/ajax/ajaxSettings/ajaxSetup/ajaxTimeout/attr/boxModel/browser/className/clean/css/curCSS/dequeue/each/easing/event/expr/extend/filter/find/fn/fx/get/getAll/getIfModified/getJSON/getScript/globalEval/grep/handleError/httpData/httpNotModified/httpSuccess/inArray/isFunction/isReady/lastModified/makeArray/map/merge/multiFilter/noConflict/nth/param/parents/parse/post/prop/queue/ready/readyList/safariTimer/sibling/speed/swap/token/trim',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/animate/append/appendTo/attr/before/bind/blur/change/children/click/clone/contains/css/dblclick/domManip/each/empty/end/eq/error/evalScripts/extend/fadeIn/fadeOut/fadeTo/filter/find/focus/get/gt/height/hide/hover/html/index/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/length/load/loadIfModified/lt/mousedown/mousemove/mouseout/mouseover/mouseup/next/not/one/parent/parents/prepend/prependTo/prev/pushStack/queue/ready/remove/removeAttr/removeClass/resize/scroll/select/serialize/setArray/show/siblings/size/slideDown/slideToggle/slideUp/submit/text/toggle/toggleClass/trigger/unbind/unload/val/width/wrap'
      },
      '1.0': {
        'jQuery': 'active/ajax/ajaxTimeout/attr/boxModel/browser/className/clean/css/curCSS/dequeue/each/event/expr/extend/filter/find/fn/fx/get/getAll/getIfModified/getScript/grep/httpData/httpNotModified/httpSuccess/init/initDone/isReady/lastModified/macros/map/merge/param/parents/parse/post/queue/ready/readyList/setAuto/sibling/speed/swap/timeout/token/trim',
        'jQuery.fn': '_hide/_show/_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxStart/ajaxStop/ajaxSuccess/ancestors/animate/append/appendTo/attr/background/before/bind/blur/change/children/click/clone/color/contains/css/dblclick/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/filter/find/float/focus/get/gt/height/hide/hover/href/html/id/index/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/left/load/loadIfModified/lt/mousedown/mousemove/mouseout/mouseover/mouseup/name/next/not/oneblur/onechange/oneclick/onedblclick/oneerror/onefocus/onekeydown/onekeypress/onekeyup/oneload/onemousedown/onemousemove/onemouseout/onemouseover/onemouseup/onereset/oneresize/onescroll/oneselect/onesubmit/oneunload/overflow/parent/parents/position/prepend/prependTo/prev/pushStack/queue/ready/rel/remove/removeAttr/removeClass/reset/resize/scroll/select/show/siblings/size/slideDown/slideToggle/slideUp/src/submit/text/title/toggle/toggleClass/top/trigger/unbind/unblur/unchange/unclick/undblclick/unerror/unfocus/unkeydown/unkeypress/unkeyup/unload/unmousedown/unmousemove/unmouseout/unmouseover/unmouseup/unreset/unresize/unscroll/unselect/unsubmit/ununload/val/width/wrap'
      }
    };

    function applyDiff(bd, df, key) {
      if ('added' in df[key]) {
        bd[key] = (bd[key] + '/' + df[key].added).split('/').sort().join('/');
      }

      if ('deled' in df[key]) {
        bd[key] = '/' + bd[key] + '/';
        df[key].deled.split('/').forEach(function (k) {
          bd[key] = bd[key].replace('/' + k + '/', '/');
        });
      }
    }

    ver = ver === '@VERSION' ? '1.8b1' :
      ver === '$Rev: 509' ? '1.0' : ver;
    var baseVer = ver.split('.', 2).join('.').replace(/[a-z]+[0-9]*/g, ''),
      baseDict, diffDict;
    if (!(baseVer in baseDicts)) {
      return {};
    }

    baseDict = baseDicts[baseVer];
    if (!(ver in keyDicts)) {
      return baseDict;
    }

    diffDict = keyDicts[ver];
    if ('jQuery' in diffDict) {
      applyDiff(baseDict, diffDict, 'jQuery');
    }

    if ('jQuery.fn' in diffDict) {
      applyDiff(baseDict, diffDict, 'jQuery.fn');
    }

    return baseDict;
  }

  function getExtraKeys(win, jqkeys, ds) {
    function findKeys(dict, dk, ks) {
      var ts = [];
      if (dk in dict) {
        d = dict[dk].split('/');
        ts = ks.filter(function (k) {
          return d.indexOf(k) === -1;
        });
        if (ts.length > 0) {
          ds.filter(function (d) {
            return 'provides' in d && dk in d.provides;
          }).forEach(function (d) {
            ts = ts.map(function (t) {
              var tt = t.replace(/(:.+)*$/, '');
              if (d.provides[dk].indexOf(tt) !== -1) {
                return t + (t !== tt ? ',' : ':') + d.name;
              }
              else {
                return t;
              }
            });
          });
        }
      }
      return ts;
    }

    return jqkeys.map(function (jqk) {
      var jq = win[jqk],
        ver = jq.fn.jquery,
        dict = getDict(ver),
        ret = {}, ts;
      ts = findKeys(dict, 'jQuery', Object.keys(jq).sort());
      if (ts.length > 0) {
        ret.jQuery = ts;
      }

      ts = findKeys(dict, 'jQuery.fn', Object.keys(jq.fn).sort());
      if (ts.length > 0) {
        ret.fn = ts;
      }

      if (('jQuery' in ret) || ('fn' in ret)) {
        ret.key = jqk;
        ret.ver = ver;
      }

      return ret;
    });
  }
};
