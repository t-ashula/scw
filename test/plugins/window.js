// window.js
'use strict';
var assert = require('power-assert'),
  libs = require(__dirname + '/../../src/plugins/window.js');

describe('window plugin', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof libs,
      message = 'detector is object';
    assert.equal(actual, expect, message);
    done();
  });
  it('has name', function (done) {
    var expect = 'window',
      actual = libs.name,
      message = 'libs.name should "window"';
    assert.equal(actual, expect, message);
    done();
  });

  it('has description', function(done) {
    var expect = 'get extra keys in window',
      actual = libs.desc,
      message = 'libs should have desc';
    assert.equal(actual, expect, message);
    done();
  });

  it('has evaluator function', function (done) {
    var expect = 'function',
      actual = typeof libs.evaluator,
      message = 'libs.evaluator should function';
    assert.equal(actual, expect, message);
    done();
  });
  describe('evaluator', function () {
    it('returns object', function (done) {
      var window = {};
      var expect = {
        keys: []
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator ret no keys';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jquery', function (done) {
      var window = {
        jQuery: function () {
        }
      };
      var expect = {
        keys: [{
          name: 'jQuery',
          type: 'function',
          keys: []
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect window.jquery ';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
