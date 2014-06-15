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
    var window;
    beforeEach(function() {
      window = {
        document: {
          querySelector: function () {
            return null;
          }
        }
      };
    });
    it('returns object', function (done) {
      var expect = {
          'gadgets': []
        },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator ret no gadgets';
      assert.deepEqual(actual, expect, message);
      done();
    });
    it('detect s_code', function (done) {
      window.s_code = {};
      var expect = {
          'gadgets': [{
            name: 's_code',
            info: {}
          }]
        },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator detect s_code';
      assert.deepEqual(actual.gadgets, expect.gadgets, message);
      done();
    });
    it('detect hatebu', function (done) {
      window.document.querySelector = function () {
        return true;
      };
      var expect = {
          'gadgets': [{
            name: 'hatenabookmark',
            info: {}
          }]
        },
        actual = plugin.evaluator(window),
        message = 'plugin.evaluator detect hatena-bookmark';
      assert.deepEqual(actual.gadgets, expect.gadgets, message);
      done();
    });
  });
});
