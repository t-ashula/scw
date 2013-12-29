// wmapper.js
'use strict';
var assert = require('power-assert'),
  WMapper = require(__dirname + '/../src/wmapper');

describe('wmapper', function () {
  it('should expose a function', function (done) {
    var expect = 'function',
      actual = typeof WMapper,
      message = 'wmapper should function';
    assert(actual === expect, message);
    done();
  });

  describe('run', function () {
    it('has function run', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.run,
        message = 'wmapper.run should function';
      assert(actual === expect, message);
      done();
    });
    it('run', function (done) {
      var wmapper = new WMapper();
      wmapper.nooutput();
      var expect,
        actual = wmapper.run('about:blank'),
        message = 'wmapper.run ret undef';
      setTimeout(function () {
        assert(wmapper.result);
        assert(actual === expect, message);
        done();
      }, 500);
    });
  });

  describe('settings function', function () {
    it('has function settings', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.settings,
        message = 'WMapper.settings should function';
      assert(actual === expect, message);
      done();
    });
    it('return all settings when no argument passed', function (done) {
      var wmapper = new WMapper();
      var expect = {
        'agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        'loglevel': 'normal',
        'width': 1280,
        'height': 1024
      },
        actual = wmapper.settings(),
        message = 'WMapper.settings return all settings';
      assert.deepEqual(actual, expect, message);
      done();
    });
    it('return userAgent string when argument is "userAgent"', function (done) {
      var wmapper = new WMapper();
      var expect = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        actual = wmapper.settings('userAgent'),
        message = 'WMapper.settings("userAgent") return ua settings';
      assert.ok(actual, expect, message);
      done();
    });
    it('return "new-userAgent" string when arguments are "userAgent" and "new-userAgent" ', function (done) {
      var wmapper = new WMapper();
      var expect = 'new-userAgent',
        actual = wmapper.settings('userAgent', 'new-userAgent'),
        message = 'WMapper.settings("userAgent", "new-userAgent") return ua settings';
      assert.ok(actual === expect, message);
      done();
    });
  });

  describe('userAgent property', function () {
    it('getter', function (done) {
      var wmapper = new WMapper();
      var expect = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        actual = wmapper.userAgent(),
        message = 'wmapper default user agent';
      assert(actual === expect, message);
      done();
    });

    it('setter', function (done) {
      var wmapper = new WMapper();
      wmapper.userAgent('hoge');
      var expect = 'hoge',
        actual = wmapper.userAgent(),
        message = 'wmapper.userAgent("hoge") => "hoge"';
      assert(actual === expect, message);
      done();
    });

  });

  describe('loglevel property', function () {
    it('getter', function (done) {
      var wmapper = new WMapper();
      var expect = 'normal',
        actual = wmapper.loglevel(),
        message = 'wmapper default loglevel => normal';
      assert(actual === expect, message);
      done();
    });

    it('setter', function (done) {
      var wmapper = new WMapper();
      wmapper.loglevel('verbose');
      var expect = 'verbose',
        actual = wmapper.loglevel(),
        message = 'wmapper.loglevel("verboe") => "verbose"';
      assert(actual === expect, message);
      done();
    });

  });

  describe('output function', function () {
    it('has output function', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.output,
        message = 'wmapper has output function';
      assert(actual === expect, message);
      done();
    });

    it('return string', function (done) {
      var wmapper = new WMapper();
      wmapper.nooutput();
      var expect = '{}',
        actual = wmapper.output({}),
        message = 'wmapper.output({}) => "{}"';
      assert(actual === expect, message);
      done();
    });

  });

  describe('allPlugins function', function () {
    it('has allPlugins function', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.allPlugins,
        message = 'wmapper has allPlugin function';
      assert(actual === expect, message);
      done();
    });

    it('return Array', function (done) {
      var wmapper = new WMapper();
      var expect,
        actual = Array.isArray(wmapper.allPlugins()),
        message = 'wmapper.allPlugins() => array';
      assert(actual, message);
      done();
    });

    it('return objects has name, type, enable', function (done) {
      var wmapper = new WMapper();
      var expect = ['name', 'type', 'enable', 'desc'].sort(),
        actual = Object.keys(wmapper.allPlugins()[0]).sort(),
        message = 'wmapper.allPlugins()[0] has => array';
      assert.deepEqual(actual, expect, message);
      done();
    });

  });

  describe('disable Plugin function', function () {
    it('has disablePlugin function', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.disablePlugin,
        message = 'wmapper has disablePlugin function';
      assert(actual === expect, message);
      done();
    });

    it('return true when plugin exist', function (done) {
      var wmapper = new WMapper();
      var expect,
        actual = wmapper.disablePlugin('window'),
        message = 'wmapper.disablePlugin("window") => true';
      assert(actual, message);
      done();
    });

    it('return false when plugin not exist', function (done) {
      var wmapper = new WMapper();
      var expect = false,
        actual = wmapper.disablePlugin('nosuchplugin'),
        message = 'wmapper.disablePlugin("nosuchplugin") => false';
      assert(actual === expect, message);
      done();
    });

    it('disablePlugin() set plugin.enable to false', function (done) {
      var wmapper = new WMapper();
      wmapper.enablePlugin('window');
      wmapper.disablePlugin('window');
      var expect = false,
        actual = wmapper.allPlugins().filter(function (p) {
          return p.name === 'window';
        })[0].enable,
        message = 'wmapper.disablePlugin("window") => plugin[].enable === false';
      assert(actual === expect, message);
      done();
    });

    it('disablePlugin() disable plugin', function (done) {
      var wmapper = new WMapper();
      wmapper.nooutput();
      wmapper.disablePlugin('domjson');
      var expect = wmapper.allPlugins().filter(function (p) {
        return p.enable;
      }).map(function (p) {
        return p.name;
      }),
        actual,
        message = 'wmapper.disablePlugin("domjson") => result.evajResult.domjson is notdefined';
      wmapper.run('about:blank');
      setTimeout(function(){
        var res = JSON.parse(wmapper.output());
        actual = res.evalResults.map(function(r){ return r.name; } );
        assert.deepEqual(actual, expect, message);
        done();
      }, 500);
    });

  });

  describe('enablePlugin function', function () {
    it('has enablePlugin function', function (done) {
      var wmapper = new WMapper();
      var expect = 'function',
        actual = typeof wmapper.enablePlugin,
        message = 'wmapper has enablePlugin function';
      assert(actual === expect, message);
      done();
    });

    it('return true when plugin exist', function (done) {
      var wmapper = new WMapper();
      var expect,
        actual = wmapper.enablePlugin('window'),
        message = 'wmapper.enablePlugins(window) => true';
      assert(actual, message);
      done();
    });

    it('return false when plugin not exist', function (done) {
      var wmapper = new WMapper();
      var expect = false,
        actual = wmapper.enablePlugin('nosuchplugin'),
        message = 'wmapper.enablePlugins(nosuchplugin) => false';
      assert(actual === expect, message);
      done();
    });

    it('enablePlugin() set plugin.enable to true', function (done) {
      var wmapper = new WMapper();
      wmapper.disablePlugin('window');
      wmapper.enablePlugin('window');
      var expect = true,
        actual = wmapper.allPlugins().filter(function (p) {
          return p.name === 'window';
        })[0].enable,
        message = 'wmapper.enablePlugin("window") => plugin[].enable === true';
      assert(actual === expect, message);
      done();
    });

    it('enablePlugin() enable plugin', function (done) {
      var wmapper = new WMapper();
      wmapper.nooutput();
      wmapper.allPlugins().forEach(function (p) { wmapper.disablePlugin(p.name); });
      wmapper.enablePlugin('window');
      var expect = ['window'],
        actual,
        message = 'disable all plugin. wmapper.enablePlugin("window") => only result.evajResult.window is defined';
      wmapper.run('about:blank');
      setTimeout(function(){
        var res = JSON.parse(wmapper.output());
        actual = res.evalResults.map(function(r){ return r.name; } );
        assert.deepEqual(actual, expect, message);
        done();
      }, 500);
    });
  });
});
