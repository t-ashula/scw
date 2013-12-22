// wmapper.js
'use strict';
var assert = require('power-assert'),
  WMapper = require(__dirname + '/../src/wmapper');

describe('wmapper', function () {
  it('should expose a function', function (done) {
    var expect  = 'function',
        actual  = typeof WMapper,
        message = 'wmapper should function';
    assert( actual === expect, message );
    done(); 
  });

  it('has function run', function (done) {
    var wmapper = new WMapper();
    var expect  = 'function',
        actual  = typeof wmapper.run,
        message = 'wmapper.run should function';
    assert( actual === expect, message );
    done();
  });

  describe('userAgent property', function () {
    it('getter', function (done) {
      var wmapper = new WMapper();
      var expect  = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        actual  = wmapper.userAgent(),
        message = 'wmapper default user agent';
      assert( actual === expect, message );
      done();
    });

    it('setter', function (done) {
      var wmapper = new WMapper();
      wmapper.userAgent('hoge');
      var expect  = 'hoge',
        actual  = wmapper.userAgent(),
        message = 'wmapper.userAgent("hoge") => "hoge"';
      assert( actual === expect, message );
      done();
    });

  });

  describe('loglevel property', function () {
    it('getter', function (done) {
      var wmapper = new WMapper();
      var expect  = 'normal',
        actual  = wmapper.loglevel(),
        message = 'wmapper default loglevel => normal';
      assert( actual === expect, message );
      done();
    });

    it('setter', function (done) {
      var wmapper = new WMapper();
      wmapper.loglevel('verbose');
      var expect  = 'verbose',
        actual  = wmapper.loglevel(),
        message = 'wmapper.loglevel("verboe") => "verbose"';
      assert( actual === expect, message );
      done();
    });

  });
});
