// wmapper.js

'use strict';

exports = module.exports = WMapper;

var phantomPath = require('phantomjs').path,
  phantom = require('phantom'),
  async = require('async');

function WMapper(opt) {
  var wm = this;
  wm.options = {
    'agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'loglevel': 'normal',
    'width': 1280,
    'height': 1024
  };

  if (opt) {
    for (var k in opt) {
      if (opt.hasOwnProperty(k)) {
        wm.options[k] = opt[k];
      }
    }
  }
  wm.loading = 0;
  wm.url = '';
}

WMapper.prototype.userAgent = function (ua) {
  var wm = this;
  if (ua !== undefined) {
    wm.options.agent = ua;
  }

  return wm.options.agent;
};

WMapper.prototype.loglevel = function (level) {
  var wm = this;
  switch (level) {
  case 'verbose':
  case 'normal':
  case 'quiet':
    wm.options.loglevel = level;
    break;
  }

  return wm.options.loglevel;
};

WMapper.prototype.run = function (url) {
  var wm = this;
  if (typeof url !== 'string') {
    console.log('E: no url given');
    return;
  }

  if (wm.err) {
    console.log('E: phantom.js error ' + wm.err);
    return;
  }

  wm.url = url;
  wm.ph = wm.page = null;
  async.waterfall([

    function create(next) {
      phantom.create(
        '--web-security=no', '--ignore-ssl-errors=true', {
          'binary': phantomPath
        },
        function (ph) {
          next(null, ph);
        });
    },
    function createCallback(ph, next) {
      console.log('V:createCallback.ph:' + ph);
      wm.ph = ph;
      wm.ph.createPage(function (page) {
        next(null, page);
      });
    },
    function createPageCallback(page, next) {
      console.log('V:createPageCallback.page:' + page);
      wm.page = page;
      wm.page.set('settings.userAgent', wm.options.agent);
      wm.page.set('viewportSize', {
        'width': wm.options.width,
        'height': wm.options.height
      });
      wm.page.open(wm.url, function (status) {
        next(null, status);
      });
    },
    function pageOpenCallback(status, next) {
      console.log('V:pageOpenCallback.status:' + status);
      if (status === 'success') {
        wm.page.evaluate(WMapper.pageEvaluate, function (evalResult) {
          next(null, {
            openStatus: 'success',
            results: evalResult
          });
        });
      }
      else {
        next(null, {
          openStatus: 'failed',
          resutls: {}
        });
      }
    },
    function evaluated(res, last) {
      last(null, res);
    }
  ], function (err, res) {
    if (err) {
      console.log('E:run:err:' + err);
    }
    wm.ph.exit();
    wm.output(res);
  });
};

WMapper.prototype.output = function (res) {
  console.log(JSON.stringify(res, null, 2));
};

WMapper.pageEvaluate = function () {
  function convert(D) {
    var crossFrames = [];

    function getDoctype(D) {
      var doctype = D.doctype,
        code = '';
      if (doctype) {
        code = '<!DOCTYPE ' + doctype.nodeName + (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '') + (doctype.systemId ? ' "' + doctype.systemId + '"' : '') + '>';
      }
      return code;
    }

    function isUriAttribute(tag, aname) {
      var uriAttrs = {
        'action': ['form'],
        'background': ['body'],
        'cite': ['blockquote', 'q', 'del', 'ins'],
        'classid': ['object'],
        'codebase': ['object', 'applet'],
        'data': ['object'],
        'formaction': ['button', 'input'],
        'href': ['a', 'area', 'link', 'base'],
        'icon': ['command'],
        'longdesc': ['img', 'frame', 'iframe'],
        'manifest': ['html'],
        'poster': ['video'],
        'profile': ['head'],
        'src': ['script', 'input', 'frame', 'iframe', 'img', 'video', 'audio', 'embed', 'source', 'track'],
        'usemap': ['img', 'input', 'object']
      }, attr;
      tag = tag.toLowerCase();
      aname = aname.toLowerCase();
      for (attr in uriAttrs) {
        if (uriAttrs.hasOwnProperty(attr)) {
          if (aname === attr) {
            return uriAttrs[attr].indexOf(tag) !== -1;
          }
        }
      }
      return false;
    }

    function getElements(E) {
      var TYPE = 'type',
        NAME = 'name',
        ATTR = 'attrs',
        CHILD = 'child',
        VALUE = 'val',
        STYLE = '_styles',
        SOURCE = 'source',
        ele = {};
      switch (E.nodeType) {
      case Node.ELEMENT_NODE:
        ele = (function (E) {
          var children = E.childNodes,
            child, i, cs, c, ele, style, ats, href, src, rel, xhr;
          cs = [];
          ele = {};
          if (E.hasChildNodes()) {
            for (i = 0;
              (child = children[i]); ++i) {
              c = getElements(child);
              if (c[TYPE] === 'text' && c[VALUE].length === 1 && c[VALUE][0] === '') {
                continue;
              }
              cs.push(c);
            }
          }

          if (E.localName.match(/iframe/i)) {
            try {
              ele.inner = convert(E.contentDocument);
            }
            catch (x) {
              if (E.src && E.src.match(/^http/i)) {
                crossFrames.push(E.src);
              }
            }
          }

          if (E.localName.match(/^link$/)) {
            href = E.getAttribute('href');
            rel = E.getAttribute('rel');
            if (/stylesheet/i.test(rel) && href) {
              try {
                xhr = new XMLHttpRequest();
                xhr.open('GET', href, false);
                xhr.onreadystatechange = (function (ele, xhr) {
                  return function () {
                    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                      ele[SOURCE] = xhr.responseText;
                    }
                  };
                })(ele, xhr);
                xhr.send(null);
              }
              catch (x) {}
            }
          }

          if (E.localName.match(/^script$/)) {
            src = E.getAttribute('src');
            if (src) {
              try {
                xhr = new XMLHttpRequest();
                xhr.open('GET', src, false);
                xhr.onreadystatechange = (function (ele, xhr) {
                  return function () {
                    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                      ele[SOURCE] = xhr.responseText;
                    }
                  };
                })(ele, xhr);
                xhr.send(null);
              }
              catch (x) {}
            }
          }

          if (ele[SOURCE] && typeof ele[SOURCE] === 'string') {
            ele[SOURCE] = ele[SOURCE].split(/\n/);
          }

          ele[TYPE] = 'element';
          ele[NAME] = E.localName;
          ele[STYLE] = {};

          style = D.defaultView.getComputedStyle(E);
          ['height', 'width', 'top', 'bottom', 'left', 'right', 'color', 'display', 'visibility'].forEach(function (i) {
            ele[STYLE][i] = style.getPropertyValue(i);
          });
          if ((ats = getAttrs(E)) && ats.length !== 0) {
            ele[ATTR] = getAttrs(E);
          }

          if (cs && cs.length !== 0) {
            ele[CHILD] = cs;
          }
          return ele;
        })(E);
        break;
      case Node.TEXT_NODE:
        ele = (function (E) {
          var ele = {};
          ele[TYPE] = 'text';
          ele[VALUE] = getText(E);
          return ele;
        })(E);
        break;
      case Node.CDATA_SECTION_NODE:
        ele = (function (E) {
          var ele = {};
          ele[TYPE] = 'cdata';
          ele[VALUE] = getText(E);
          return ele;
        })(E);
        break;
      case Node.COMMENT_NODE:
        ele = (function (E) {
          var ele = {};
          ele[TYPE] = 'comment';
          ele[VALUE] = getText(E);
          return ele;
        })(E);
        break;
      }
      return ele;

    }

    function getText(E) {
      return E.nodeValue; //.replace(/^\s+$/g, '').split(/\n/);
    }

    function getAttrs(E) {
      var attrs = E.attributes,
        tag = E.localName,
        ret = [],
        attr, val, name, i;
      for (i = 0;
        (attr = attrs[i]); ++i) {
        name = attr.name;
        val = E.getAttribute(name);
        if (isUriAttribute(tag, name)) {
          val = getAbsUrl(name, val);
        }
        ret.push({
          'name': name,
          'val': val
        });
      }
      return ret;
    }

    function getAbsUrl(name, val) {
      var a = D.createElement('a');
      a.href = val;
      return a.href;
    }

    function getOutofDocument(D) {
      var dc = D.childNodes,
        ood = [],
        d, i;
      for (i = 0;
        (d = dc[i]); ++i) {
        switch (d.nodeType) {
        case Node.DOCUMENT_TYPE_NODE:
          break;
        case Node.ELEMENT_NODE:
          break;
        case Node.COMMENT_NODE:
          ood.push({
            'type': 'comment',
            'val': getText(d)
          });
          break;
        default:
          ood.push({
            'type': d.nodeType,
            'val': d.nodeValue
          });
        }
      }
      return ood;
    }

    function getStyleRule(rule) {
      if (rule.type == 3) {
        return {
          'style': getStyle(rule.styleSheet)
        };
      }
      else {
        return rule.cssText;
      }
    }

    function getStyle(stylesheet) {
      var rules = stylesheet.cssRules,
        RULES = 'rules',
        rjson = [],
        ret = {},
        rule, i;
      if (rules) {
        for (i = 0;
          (rule = rules[i]); ++i) {
          rjson.push(getStyleRule(rule));
        }
      }
      ret[RULES] = rjson;
      Object.keys(stylesheet).forEach(function (i) {
        if (!((i == 'rules') || (i == 'cssRules') || (i.match(/^owner/i)) || (i.match(/^parent/i)))) {
          ret[i] = stylesheet[i];
        }
      });

      return ret;
    }

    function getStyles(D) {
      var i, ss, ssl, ret = [];
      if (!D.styleSheets) {}
      else {
        ssl = D.styleSheets;
        for (i = 0;
          (ss = ssl[i]); ++i) {
          ret.push(getStyle(ss));
        }
      }
      return ret;
    }

    var domjson = {
      'url': D.location.href,
      'doctype': getDoctype(D),
      'elements': getElements(D.documentElement),
      'outofdoc': getOutofDocument(D),
      'styles': getStyles(D)
    };
    if (crossFrames && crossFrames.length !== 0) {
      domjson.crosses = crossFrames;
    }
    return domjson;
  }
  var d;
  try {
    d = convert(document);
  }
  catch (ee) {
    d = {
      'url': document.location.href,
      'exception': ee
    };
  }
  return d;
};
