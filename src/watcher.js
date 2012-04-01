function userAgent(opts) {
  this.def = {};
  if (opts) {
    for (var k in opts) {
      this.def[k] = opts[k];
    }
  }
  this.loading = 0;
  this.dom = {};
  this.init();
}
userAgent.prototype.run = function (url) {
  this.url = url;
  //this.page.settings['webSecurity'] = 'no';
  this.page.settings['userAgent'] = this.def['ua'] || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19';
  this.page.open(this.url);
};
userAgent.prototype.init = function () {
  var ua = this;
  ua.loading = 0;
  ua.page = new WebPage();
  ua.page.onLoadStarted = function () {
    //console.log("onLoadStarted");
    ua.loading++;
  };
  ua.page.onError = function (msg, trace) {
    //console.log(msg); trace.forEach(function(item) {  console.log('  ', item.file, ':', item.line);  });
    ua.loading--;
    phantom.exit();
  };
  ua.page.onLoadFinished = function (status) {
    //console.log(status + ":" + ua.url);
    ua.dom = ua.page.evaluate(function () {
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
          };
          var attr;
          tag = tag.toLowerCase();
          aname = aname.toLowerCase();
          for (attr in uriAttrs) if (uriAttrs.hasOwnProperty(attr)) {
            if (aname === attr) {
              return uriAttrs[attr].some(function (t) {
                return t === tag;
              });
            }
          }
          return false;
        }

        function getElements(E) {
          var TYPE = 'type',
            NAME = 'name',
            ATTR = 'attr',
            CHILD = 'child',
            VALUE = 'val',
            ele = {};
          switch (E.nodeType) {
          case Node.ELEMENT_NODE:
            ele = (function (E) {
              var children = E.childNodes,
                child, i, cs = [],
                c, ele = {},
                ats;
              if (E.hasChildNodes()) {
                for (i = 0;
                (child = children[i]); ++i) {
                  c = getElements(child);
                  if (c[TYPE] === 'text' && c[VALUE] === '') {
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
                  //console.log(x);
                }
              }
              ele[TYPE] = 'element';
              ele[NAME] = E.localName;
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
          return E.nodeValue.replace(/^\s+$/g, '');
        }

        function getAttrs(E) {
          var attrs = E.attributes,
            attr, val, ret = [],
            i, tag = E.localName,
            name;
          for (i = 0; attr = attrs[i]; ++i) {
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
          var i, d, dc = D.childNodes,
            ood = [];
          for (i = 0; d = dc[i]; ++i) {
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
            return {
              'css': rule.cssText
            };
          }
        }

        function getStyle(stylesheet) {
          var rules = stylesheet.cssRules,
            rule, i, rjson = [],
            ret = {};
          for (i = 0; rule = rules[i]; ++i) {
            rjson.push(getStyleRule(rule));
          }
          ret['rules'] = rjson;
          for (i in stylesheet) if (stylesheet.hasOwnProperty(i)) {
            if (i == 'rules') continue;
            if (i == 'cssRules') continue;
            if (i.match(/^owner/i)) continue;
            if (i.match(/^parent/i)) continue;
            ret[i] = stylesheet[i];
          }
          return ret;
        }

        function getStyles(D) {
          var i, ss, ssl, ret = [];
          if (!D.styleSheets) {}
          else {
            ssl = D.styleSheets;
            for (i = 0; ss = ssl[i]; ++i) {
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
      return convert(document);
    });
    console.log(JSON.stringify(ua.dom));
    phantom.exit();
  };
};
var system = require('system');
var url = system.args[1] || 'http://t-ashula.github.com/scw/';
var phantomUA = new userAgent({'ua':'ahuu'});
phantomUA.run(url);
