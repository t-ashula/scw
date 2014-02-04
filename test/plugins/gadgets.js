// gadgets.js
'use strict';
var assert = require('power-assert'),
  plugin = require(__dirname + '/../../src/plugins/gadgets.js');

describe('plugin gadgets detector', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof plugin,
      message = 'detector is object';
    assert.equal(actual, expect, message);
    done();
  });

  it('has name', function (done) {
    var expect = 'gadgets',
      actual = plugin.name,
      message = 'plugin.name should "jquery"';
    assert.equal(actual, expect, message);
    done();
  });

  it('has description', function (done) {
    var expect = 'detect 3rd party gadgets',
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
      };
      var expect = {
        'gadgets' : []
      },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator ret no gadgets';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
