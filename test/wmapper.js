// wmapper.js
'use strict';
var assert = require('power-assert'),
  wmapper = require(__dirname + '/../src/wmapper');

describe('wmapper', function () {
  it('should expose a function', function (done) {
    var expect  = 'function',
        actual  = typeof wmapper,
        message = 'wmapper should function';
    assert.equal( expect, actual, message );
    done();
  });
});
