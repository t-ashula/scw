// wmapper.js

'use strict';
exports = module.exports = WMapper;

function WMapper(opt) {
  this.options = {
    'agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'loglevel': 'normal'
  };
  if (opt) {
    for (var k in opt) {
      if (opt.hasOwnProperty(k)) {
        this.options[k] = opt[k];
      }
    }
  }
}

WMapper.prototype.run = function () {
  console.log('options:' + JSON.stringify(this.options));
};

WMapper.prototype.userAgent = function (ua) {
  if (ua !== undefined) {
    this.options.agent = ua;
  }

  return this.options.agent;
};

WMapper.prototype.loglevel = function (level) {
  switch (level) {
  case 'verbose':
  case 'normal':
  case 'quiet':
    this.options.loglevel = level;
    break;
  }

  return this.options.loglevel;
};
