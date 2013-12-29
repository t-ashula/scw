// libraries.js
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
        message = 'libs.evaluator detect jquery 1.8.3';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect prototype.js', function (done) {
      var window = {
        Prototype: {
          Version: '1.7.1'
        }
      };
      var expect = {
        libs: [{
          name: 'Prototype.js',
          version: '1.7.1'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Prototype.js 1.7.1';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect Angular.js', function (done) {
      var window = {
        angular: {
          version: {
            'full': '1.2.6',
            'major': 1,
            'minor': 2,
            'dot': 6,
            'codeName': 'taco-salsafication'
          }
        }
      };
      var expect = {
        libs: [{
          name: 'Angular.js',
          version: '1.2.6'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Angular.js 1.2.6';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect Backbone.js', function (done) {
      var window = {
        Backbone: {
          VERSION : '1.1.0'
        }
      };
      var expect = {
        libs: [{
          name: 'Backbone.js',
          version: '1.1.0'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Backbone.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect underscore.js', function (done) {
      var window = {
        _: function() {
        }
      };
      window._.VERSION = '1.4.3';
      var expect = {
        libs: [{
          name: 'underscore.js',
          version: '1.4.3'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect underscore.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
