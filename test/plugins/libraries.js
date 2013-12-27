// wmapper.js
'use strict';
var assert = require('power-assert'),
  libs = require(__dirname + '/../../src/plugins/libraries.js');

describe('plugin libraris detector', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof libs,
      message = 'detector is object';
    assert.equal(actual, expect, message);
    done();
  });
  it('has name', function (done) {
    var expect = 'libraries',
      actual = libs.name,
      message = 'libs.name should "libraries"';
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
      var window = {
        document: {}
      };
      var expect = {
        libs: []
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator ret no lib';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jquery', function (done) {
      var window = {
        jQuery: function () {
          return {
            jquery: '1.8.3'
          };
        }
      };
      var expect = {
        libs: [{
          name: 'jQuery',
          version: '1.8.3'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator ret no lib';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
