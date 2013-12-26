// wmapper.js

'use strict';

exports = module.exports = WMapper;

var phantomPath = require('phantomjs').path,
  phantom = require('phantom'),
  async = require('async'),
  path = require('path'),
  fs = require('fs');

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
  wm.initPlugins();
}

WMapper.prototype.initPlugins = function () {
  var wm = this,
    pluginDir = 'plugins';
  wm.plugins = {
    evaluators: []
  };
  fs.readdirSync(__dirname + '/' + pluginDir).forEach(function (file) {
    var fpath = path.resolve(__dirname, pluginDir, file),
      plugin = require(fpath);
    if ('evaluator' in plugin && typeof plugin.evaluator === 'function') {
      wm.plugins.evaluators.push({ name : plugin.name, func: plugin.evaluator } );
    }
  });

};

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
  var wm = this,
    plan = [],
    pre = [],
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
      phantom.create(
        '--web-security=no', '--ignore-ssl-errors=true', {
          'binary': phantomPath
        },
        function (ph) {
          next(null, ph);
        });
    },
    function createCallback(ph, next) {
      wm.ph = ph;
      wm.ph.createPage(function (page) {
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
      wm.page.open(wm.url, function (status) {
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
  post = [
    function evaluated(res, last) {
      last(null, res);
    }
  ];
  var evfs = wm.plugins.evaluators.map(function (evf) {
    return function (res, next) {
      if ( res.openStatus !== 'success' ) {        
        next(null, res);
      }
      else{
        wm.page.evaluate(evf.func, function (evalResult) {
          res.evalResults.push({ name : evf.name, result : evalResult });
          next(null, res);
        });
      }
    };
  });

  plan = [].concat(pre).concat(evfs).concat(post);

  async.waterfall(plan, function (err, res) {
    if (err) {
      console.log('E:run:err:' + err);
    }
    wm.ph.exit();
    wm.output(res);
  });
};

WMapper.prototype.output = function (res) {
  console.log(res); // JSON.stringify(res, null, 2));
};
