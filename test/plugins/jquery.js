// jquery.js
'use strict';
var assert = require('power-assert'),
  plugin = require(__dirname + '/../../src/plugins/jquery.js');

describe('plugin jquery-related detector', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof plugin,
      message = 'detector is object';
    assert.equal(actual, expect, message);
    done();
  });

  it('has name', function (done) {
    var expect = 'jquery',
      actual = plugin.name,
      message = 'plugin.name should "jquery"';
    assert.equal(actual, expect, message);
    done();
  });

  it('has description', function (done) {
    var expect = 'detect jQuery related libraries page use',
      actual = plugin.desc,
      message = 'plugin should have desc';
    assert.equal(actual, expect, message);
    done();
  });

  it('has evaluator function', function (done) {
    var expect = 'function',
      actual = typeof plugin.evaluator,
      message = 'plugin.evaluator should function';
    assert.equal(actual, expect, message);
    done();
  });

  describe('evaluator', function () {
    it('returns object', function (done) {
      var window = {
        jQuery: function () {}
      };
      window.jQuery.fn = {};
      window.jQuery.noConflict = function () {};
      var expect = {
        plugins: []
      },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator ret no plugin';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect migrate plugin', function (done) {
      var window = {
        jQuery: function () {}
      };
      window.jQuery.fn = { jquery: '2.0.3' };
      window.jQuery.noConflict = function () {};
      window.jQuery.migrateTrace = true;
      var expect = {
        plugins: [{
          'name': 'migrate',
          'info': {
            'version': 'N/A'
          },
          'parent' : { 'name' : 'jQuery', 'ver' : '2.0.3' }
        }]
      },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator ret no plugin';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
