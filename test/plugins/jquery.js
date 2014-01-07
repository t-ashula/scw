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
});
