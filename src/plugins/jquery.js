// plugins/jquery.js
'use strict';

exports.name = 'jquery';
exports.desc = 'detect jQuery related libraries page use';
exports.evaluator = function (win) {
  var d, r,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }
    r = detectJqueryPlugins(win);
    d = {
      'plugins': r.plugins,
      'extras': r.extras
    };
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

  function detectJqueryPlugins(win) {
    var cands = getJqueryKeys(win),
      ds = initDetectors(),
      ps = [];
    if (cands.length < 1) {
      return {
        'plugins': [],
        'extras': []
      };
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
        ps.push(p);
      });
    });

    return {
      plugins: ps,
      extras: getExtraKeys(win, cands)
    };
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
      d('prettyPhoto', function ($) {
        return 'prettyPhoto' in $ && 'prettyPhoto' in $.fn;
      }, function ($) {
        return {
          'version': $.prettyPhoto.version
        };
      })
    );
    return ds;
  }

  function getJqueryKeys(win) {
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

    if (keys.length < 2) {
      return keys;
    }

    ret = [];
    for (var i = 0, k;
      (k = keys[i]); ++i) {
      f = false;
      for (var j = 0, r;
        (r = ret[j]); ++j) {
        if (win[r].fn.jquery === win[k].fn.jquery) {
          f = true;
          break;
        }
      }
      if (!f) {
        ret.push(k);
      }
    }
    return ret;
  }

  function getExtraKeys(win, jqkeys) {
    var keyDicts = {
      '2.0.0-beta3': {
        'jQuery': {
          'deled': ['_evalUrl']
        }
      },
      '2.0.0b2': {
        'jQuery': {
          'deled': ['_evalUrl']
        }
      },
      '2.0.0b1': {
        'jQuery': {
          'added': ['cache', 'noData'],
          'deled': ['_evalUrl']
        }
      },
      '1.9.0b1': {
        'jQuery': {
          'added': ['clean'],
          'deled': ['buildFragment']
        },
        'jQuery.fn': {
          'added': ['die', 'live'],
          'deled': ['finish']
        }
      },
      '1.8rc1': {
        'jQuery': {
          'deled': ['attrFn']
        }
      },
      '1.8b2': {
        'jQuery': {
          'deled': ['attrFn']
        }
      },
      '1.8b1': {
        'jQuery': {
          'added': ['cssExpand']
        }
      },
      '1.7b1': {
        'jQuery': {
          'added': ['attrFix', 'isNaN'],
          'deled': ['isNumeric']
        }
      },
      '1.5rc1': {
        'jQuery': {
          'added': ['subclass'],
          'deled': ['sub']
        }
      },
      '1.5b1': {
        'jQuery': {
          'added': ['subclass'],
          'deled': ['_data', 'clone', 'sub']
        }
      },
      '1.4.4': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'fadeToggle', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.4rc3': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'fadeToggle', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.4rc2': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'fadeToggle', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.4rc1': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'fadeToggle', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.3': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.3rc2': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.3rc1': {
        'jQuery': {
          'added': ['acceptData', 'access', 'buildFragment', 'camelCase', 'cleanData', 'cssHooks', 'cssNumber', 'cssProps', 'error', 'handleComplete', 'handleSuccess', 'isNaN', 'isWindow', 'now', 'parseJSON', 'readyWait', 'removeEvent', 'text', 'triggerGlobal', 'type', 'uuid'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.2': {
        'jQuery': {
          'added': ['cleanData', 'error', 'parseJSON', 'text'],
          'deled': ['getText']
        },
        'jQuery.fn': {
          'added': ['delegate', 'undelegate'],
          'deled': ['_load', 'setArray']
        }
      },
      '1.4.1': {
        'jQuery': {
          'added': ['cleanData', 'error', 'parseJSON']
        }
      },
      '1.4rc1': {
        'jQuery.fn': {
          'deled': ['focusin', 'focusout']
        }
      },
      '1.4a2': {
        'jQuery': {
          'deled': ['guid', 'noop', 'proxy', 'uaMatch']
        },
        'jQuery.fn': {
          'deled': ['focusin', 'focusout']
        }
      },
      '1.4a1': {
        'jQuery': {
          'added': ['isObjectLiteral', 'readyList'],
          'deled': ['attrFn', 'bindReady', 'contains', 'getText', 'guid', 'isPlainObject', 'noData', 'noop', 'proxy', 'uaMatch']
        },
        'jQuery.fn': {
          'deled': ['focusin', 'focusout', 'has']
        }
      },
      '1.3.2': {
        'jQuery': {
          'deled': ['timerId']
        },
        'jQuery.fn': {
          'added': ['sort', 'splice']
        }
      },
      '1.3.1': {
        'jQuery': {
          'deled': ['timerId']
        }
      },
      '1.3.1rc1': {
        'jQuery': {
          'deled': ['timerId']
        }
      },
      '1.3b2': {
        'jQuery.fn': {
          'deled': ['push']
        }
      },
      '1.3b1': {
        'jQuery': {
          'deled': ['Event', 'dequeue', 'queue']
        },
        'jQuery.fn': {
          'deled': ['push']
        }
      },
      '1.2.6': {
        'jQuery': {
          'added': ['timerId'],
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['_load', 'data', 'eq', 'innerHeight', 'innerWidth', 'offsetParent', 'outerHeight', 'outerWidth', 'position', 'removeData', 'scrollLeft', 'scrollTop']
        }
      },
      '1.2.5': {
        'jQuery': {
          'added': ['timerId'],
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['_load', 'data', 'eq', 'innerHeight', 'innerWidth', 'offsetParent', 'outerHeight', 'outerWidth', 'position', 'removeData', 'scrollLeft', 'scrollTop']
        }
      },
      '1.2.4': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['data', 'eq', 'innerHeight', 'innerWidth', 'outerHeight', 'outerWidth', 'removeData']
        }
      },
      '1.2.4b': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['data', 'eq', 'innerHeight', 'innerWidth', 'outerHeight', 'outerWidth', 'removeData']
        }
      },
      '1.2.4a': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['data', 'eq', 'innerHeight', 'innerWidth', 'outerHeight', 'outerWidth', 'removeData']
        }
      },
      '1.2.3': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['data', 'eq', 'removeData']
        }
      },
      '1.2.3b': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['data', 'eq', 'removeData']
        }
      },
      '1.2.3a': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['eq']
        }
      },
      '1.2.2': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['eq']
        }
      },
      '1.2.2b2': {
        'jQuery': {
          'deled': ['styleFloat']
        },
        'jQuery.fn': {
          'added': ['eq']
        }
      },
      '1.2.2b': {
        'jQuery': {
          'deled': ['ready', 'readyList', 'styleFloat']
        },
        'jQuery.fn': {
          'added': ['eq']
        }
      },
      '1.2.1': {
        'jQuery.fn': {
          'added': ['eq']
        }
      },
      '1.1.4': {
        'jQuery': {
          'added': ['classFilter', 'isXMLDoc', 'mergeNum', 'nodeName', 'props', 'styleFloat', 'timers', 'unique'],
          'deled': ['getAll', 'safariTimer', 'token']
        },
        'jQuery.fn': {
          'added': ['init', 'slice']
        }
      },
      '1.1.3': {
        'jQuery': {
          'added': ['chars', 'classFilter', 'isXMLDoc', 'mergeNum', 'nodeName', 'props', 'styleFloat', 'timers', 'unique'],
          'deled': ['getAll', 'token']
        },
        'jQuery.fn': {
          'added': ['init']
        }
      },
      '1.1.3a': {
        'jQuery': {
          'added': ['chars', 'classFilter', 'isXMLDoc', 'mergeNum', 'nodeName', 'timers', 'unique'],
          'deled': ['getAll']
        },
        'jQuery.fn': {
          'added': ['init']
        }
      },
      '1.1.2': {
        'jQuery': {
          'added': ['isXMLDoc', 'nodeName']
        }
      },
      '1.1.1': {
        'jQuery': {
          'added': ['nodeName']
        }
      },
      '1.1b': {
        'jQuery': {
          'deled': ['isFunction']
        }
      },
      '1.1a': {
        'jQuery': {
          'deled': ['isFunction', 'multiFilter']
        },
        'jQuery.fn': {
          'added': ['set'],
          'deled': ['height', 'pushStack', 'width']
        }
      },
      '1.0.4': {
        'jQuery': {
          'added': ['getJSON', 'globalEval', 'safariTimer'],
          'deled': ['setAuto']
        },
        'jQuery.fn': {
          'added': ['ajaxSend', 'evalScripts', 'serialize', 'set']
        }
      },
      '1.0.3': {
        'jQuery': {
          'added': ['getJSON', 'safariTimer']
        },
        'jQuery.fn': {
          'added': ['evalScripts', 'serialize']
        }
      },
      '1.0.2': {
        'jQuery': {
          'added': ['getJSON', 'safariTimer']
        },
        'jQuery.fn': {
          'added': ['serialize']
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
        bd[key] = bd[key].split('/').concat(df[key].added).sort().join('/');
      }

      if ('deled' in df[key]) {
        bd[key] = '/' + bd[key] + '/';
        df[key].deled.forEach(function (k) {
          bd[key] = bd[key].replace('/' + k + '/', '/');
        });
      }
    }

    function getDict(ver) {
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

    return jqkeys.map(function (jqk) {
      var jq = win[jqk],
        ks = Object.keys(jq).sort(),
        fns = Object.keys(jq.fn).sort(),
        ver = jq.fn.jquery,
        dict = getDict(ver),
        ret = {}, t, d;
      if ('jQuery' in dict) {
        d = dict.jQuery.split('/');
        t = ks.filter(function (k) {
          return d.indexOf(k) === -1;
        });
        if (t.length > 0) {
          ret.jQuery = t;
        }
      }

      if ('jQuery.fn' in dict) {
        d = dict['jQuery.fn'].split('/');
        t = fns.filter(function (k) {
          return d.indexOf(k) === -1;
        });

        if (t.length > 0) {
          ret.fn = t;
        }
      }

      if (('jQuery' in ret) || ('fn' in ret)) {
        ret.key = jqk;
        ret.ver = ver;
        return ret;
      }

      return {};
    });
  }
};
