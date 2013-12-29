// plugins/domjson.js

'use strict';
var assert = require('power-assert'),
  libs = require(__dirname + '/../../src/plugins/domjson.js');

describe('plugin libraris detector', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof libs,
      message = 'plugin is object';
    assert.equal(actual, expect, message);
    done();
  });
  it('has name', function (done) {
    var expect = 'domjson',
      actual = libs.name,
      message = 'libs.name should "domjs"';
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
});
