// wmapper.js

'use strict';

exports = module.exports = WMapper;

var phantomPath = require('phantomjs').path,
  phantom = require('node-phantom'),
  async = require('async'),
  path = require('path'),
  fs = require('fs');

function WMapper(opt) {
  var wm = this;
  wm.options = {
    'agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.76 Safari/537.36',
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

  wm.url = '';
  wm.initPlugins();
}

WMapper.prototype.nooutput = function () {
  this.devnull = true;
};

WMapper.prototype.initPlugins = function () {
  var wm = this,
    pluginDir = 'plugins';
  wm.plugins = {};
  wm.pluginTypes = ['evaluator', 'initializer'];
  wm.pluginTypes.forEach(function (t) {
    wm.plugins[t + 's'] = [];
  });
  fs.readdirSync(__dirname + '/' + pluginDir).forEach(function (file) {
    var fpath = path.resolve(__dirname, pluginDir, file),
      plugin = require(fpath);
    wm.pluginTypes.forEach(function (t) {
      if (t in plugin && typeof plugin[t] === 'function') {
        wm.plugins[t + 's'].push({
          name: plugin.name,
          func: plugin[t],
          enable: true,
          desc: plugin.desc
        });
      }
    });
  });
};

WMapper.prototype.settings = function (key, val) {
  var wm = this,
    hasVal = val !== void 0;
  if (typeof key === 'string') {
    if (/^userAgent$/i.test(key)) {
      if (hasVal) {
        wm.options.agent = val;
      }

      return wm.options.agent;
    }

    if (/^loglevel$/i.test(key)) {
      if (hasVal) {
        switch (val) {
        case 'verbose':
        case 'normal':
        case 'quiet':
          wm.options.loglevel = val;
          break;
        }
      }
      return wm.options.loglevel;
    }

    if (!(key in wm.options)) {
      return void 0;
    }

    if (hasVal) {
      wm.options[key] = val;
    }
  }

  return wm.options;
};

WMapper.prototype.userAgent = function (ua) {
  var wm = this;
  return wm.settings('userAgent', ua);
};

WMapper.prototype.loglevel = function (level) {
  var wm = this;
  return wm.settings('loglevel', level);
};

WMapper.prototype.run = function (url) {
  var wm = this,
    plan = [],
    pre = [],
    evfs = [],
    post = [];
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

  pre = [

    function create(next) {
      phantom.create(function (err, ph) {
        next(null, ph);
      }, {
        'web-security': 'no',
        'ignore-ssl-errors': 'true',
        phantomPath: phantomPath
      });
    },
    function createCallback(ph, next) {
      wm.ph = ph;
      wm.ph.createPage(function (err, page) {
        next(null, page);
      });
    },
    function createPageCallback(page, next) {
      wm.page = page;
      wm.page.set('settings.userAgent', wm.options.agent);
      wm.page.set('viewportSize', {
        'width': wm.options.width,
        'height': wm.options.height
      });
      wm.page.onInitialized = function (status) {
        wm.plugins.initializers.filter(function (ip) {
          return ip.enable;
        }).forEach(function (ip) {
          wm.page.evaluate(ip.func);
        });
      };
      wm.page.open(wm.url, function (err, status) {
        next(null, status);
      });
    },
    function pageOpenCallback(status, next) {
      next(null, {
        openStatus: status,
        evalResults: []
      });
    }
  ];
  evfs = wm.plugins.evaluators
    .filter(function (ep) {
      return ep.enable;
    })
    .map(function (ep) {
      return function (res, next) {
        if (res.openStatus !== 'success') {
          next(null, res);
        }
        else {
          wm.page.evaluate(ep.func, function (err, result) {
            res.evalResults.push({
              name: ep.name,
              result: result
            });
            next(null, res);
          });
        }
      };
    });
  post = [

    function evaluated(res, last) {
      res.url = wm.url;
      last(null, res);
    }
  ];

  plan = [].concat(pre).concat(evfs).concat(post);

  async.waterfall(plan, function (err, res) {
    if (err) {
      console.log('E:run:err:' + err);
    }
    if (wm.ph !== null) {
      wm.ph.exit();
    }
    wm.result = res;
    wm.output();
  });
};

WMapper.prototype.output = function (res) {
  var wm = this,
    ret;
  if (!res) {
    res = wm.result;
  }
  ret = JSON.stringify(res, null, 2);
  if (!wm.devnull) {
    console.log(ret);
  }
  return ret;
};

WMapper.prototype.allPlugins = function () {
  var wm = this,
    ret = [];
  if (!wm.plugins) {
    wm.initPlugins();
  }

  wm.pluginTypes.forEach(function (t) {
    ret = ret.concat(wm.plugins[t + 's'].map(function (ev) {
      return {
        'name': ev.name,
        'type': t,
        'enable': ev.enable,
        'desc': ev.desc
      };
    }));
  });
  return ret;
};

WMapper.prototype._changePluginState = function (pname, state) {
  var wm = this,
    ret = false;
  wm.pluginTypes.forEach(function (t) {
    var ps = wm.plugins[t + 's'];
    for (var i = 0, iz = ps.length; i < iz; ++i) {
      if (ps[i].name === pname) {
        ps[i].enable = state;
        ret = true;
      }
    }
  });
  return ret;
};

WMapper.prototype.disablePlugin = function (pname) {
  var wm = this;
  return wm._changePluginState(pname, false);
};

WMapper.prototype.enablePlugin = function (pname) {
  var wm = this;
  return wm._changePluginState(pname, true);
};
