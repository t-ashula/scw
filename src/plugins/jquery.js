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
    var keyDict = {
      '1.2.6': {
        'jQuery.fn': '_load/_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/click/clone/contents/css/data/dblclick/dequeue/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/filter/find/focus/get/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/length/load/map/mousedown/mousemove/mouseout/mouseover/mouseup/next/nextAll/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/position/prepend/prependTo/prev/prevAll/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/serialize/serializeArray/setArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/stop/submit/text/toggle/toggleClass/trigger/triggerHandler/unbind/unload/val/width/wrap/wrapAll/wrapInner',
        'jQuery': 'active/ajax/ajaxSettings/ajaxSetup/attr/boxModel/browser/cache/classFilter/className/clean/css/curCSS/data/dir/each/easing/event/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/handleError/httpData/httpNotModified/httpSuccess/inArray/isFunction/isReady/isXMLDoc/lastModified/makeArray/map/merge/multiFilter/noConflict/nodeName/nth/param/parse/post/prop/props/ready/readyList/removeData/sibling/speed/swap/timerId/timers/trim/unique'
      },
      '1.6': {
        'jQuery': 'Deferred/Event/_Deferred/_data/_mark/_unmark/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrFix/attrFn/attrHooks/bindReady/boxModel/browser/buildFragment/cache/camelCase/clean/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/curCSS/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fragments/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNaN/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/noData/nodeName/noop/now/nth/offset/param/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/sub/support/swap/text/timers/trim/type/uaMatch/unique/uuid/valHooks/when',
        'jQuery.fn': '_toggle/add/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/css/data/dblclick/delay/delegate/dequeue/detach/die/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/live/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/offset/offsetParent/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner'
      },
      '2.0': {
        'jQuery.fn': 'add/addBack/addClass/after/ajaxComplete/ajaxError/ajaxSend/ajaxStart/ajaxStop/ajaxSuccess/andSelf/animate/append/appendTo/attr/before/bind/blur/change/children/clearQueue/click/clone/closest/constructor/contents/contextmenu/css/data/dblclick/delay/delegate/dequeue/detach/domManip/each/empty/end/eq/error/extend/fadeIn/fadeOut/fadeTo/fadeToggle/filter/find/finish/first/focus/focusin/focusout/get/has/hasClass/height/hide/hover/html/index/init/innerHeight/innerWidth/insertAfter/insertBefore/is/jquery/keydown/keypress/keyup/last/length/load/map/mousedown/mouseenter/mouseleave/mousemove/mouseout/mouseover/mouseup/next/nextAll/nextUntil/not/off/offset/offsetParent/on/one/outerHeight/outerWidth/parent/parents/parentsUntil/position/prepend/prependTo/prev/prevAll/prevUntil/promise/prop/push/pushStack/queue/ready/remove/removeAttr/removeClass/removeData/removeProp/replaceAll/replaceWith/resize/scroll/scrollLeft/scrollTop/select/selector/serialize/serializeArray/show/siblings/size/slice/slideDown/slideToggle/slideUp/sort/splice/stop/submit/text/toArray/toggle/toggleClass/trigger/triggerHandler/unbind/undelegate/unload/unwrap/val/width/wrap/wrapAll/wrapInner',
        'jQuery': 'Animation/Callbacks/Deferred/Event/Tween/_data/_evalUrl/_queueHooks/_removeData/acceptData/access/active/ajax/ajaxPrefilter/ajaxSettings/ajaxSetup/ajaxTransport/attr/attrHooks/buildFragment/camelCase/cleanData/clone/contains/css/cssHooks/cssNumber/cssProps/data/dequeue/dir/each/easing/error/etag/event/expando/expr/extend/filter/find/fn/fx/get/getJSON/getScript/globalEval/grep/guid/hasData/holdReady/inArray/isArray/isEmptyObject/isFunction/isNumeric/isPlainObject/isReady/isWindow/isXMLDoc/lastModified/makeArray/map/merge/noConflict/nodeName/noop/now/offset/param/parseHTML/parseJSON/parseXML/post/prop/propFix/propHooks/proxy/queue/ready/readyWait/removeAttr/removeData/removeEvent/sibling/speed/style/support/swap/text/timers/trim/type/unique/valHooks/when'
      }
    };

    function getDict(ver) {
      if (ver in keyDict) {
        return keyDict[ver];
      }

      var v2 = ver.split('.');
      v2.pop();
      v2 = v2.join('.');
      if (v2 in keyDict) {
        return keyDict[v2];
      }

      return {};
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
