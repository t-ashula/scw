// domxss.js
'use strict';
var assert = require('power-assert'),
  libs = require(__dirname + '/../../src/plugins/domxss.js');

describe('window plugin', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof libs,
      message = 'plugin is object';
    assert.equal(actual, expect, message);
    done();
  });
  it('has name', function (done) {
    var expect = 'domxss',
      actual = libs.name,
      message = 'libs.name should "domxss"';
    assert.equal(actual, expect, message);
    done();
  });

  it('has description', function(done) {
    var expect = 'dom based xss scanner',
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
  });
});
