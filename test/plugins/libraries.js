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

  it('has description', function (done) {
    var expect = 'detect libraries page use',
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
        jQuery: function () {}
      };
      window.jQuery.fn = {
        jquery: '1.8.3'
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
          VERSION: '1.1.0'
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
        _: function () {}
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

    it('detect swfobject.js v2', function (done) {
      var window = {
        swfobject: {
          embedSWF: function () {}
        }
      };

      var expect = {
        libs: [{
          name: 'swfobject.js',
          version: '2.x'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect swfobject.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect swfobject.js v1.5', function (done) {
      var window = {
        deconcept: {
          SWFObject: function () {}
        }
      };

      var expect = {
        libs: [{
          name: 'swfobject.js',
          version: '1.5.x'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect swfobject.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect Modernizr', function (done) {
      var window = {
        Modernizr: {
          '_version': '2.7.1'
        }
      };

      var expect = {
        libs: [{
          name: 'Modernizr',
          version: '2.7.1'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Modernizr.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect Dojo', function (done) {
      var window = {
        dojo: {
          version: {
            major: 1,
            minor: 9,
            patch: 0,
            flag: '',
            revision: NaN,
            toString: function () {
              var v = window.dojo.version;
              return v.major + '.' + v.minor + '.' + v.patch + v.flag + ' (' + v.revision + ')';
            }
          }
        }
      };

      var expect = {
        libs: [{
          name: 'Dojo',
          version: '1.9.0 (NaN)'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Modernizr.js ';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect Script.aculo.us', function (done) {
      var window = {
        'Scriptaculous': {
          'Version': '1.8.1'
        }
      };

      var expect = {
        libs: [{
          name: 'script.aculo.us',
          version: '1.8.1'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect script.aculo.us';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect MooTools', function (done) {
      var window = {
        'MooTools': {
          'version': '1.3dev'
        }
      };

      var expect = {
        libs: [{
          name: 'MooTools',
          version: '1.3dev'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect MooTools';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect YUI3', function (done) {
      var window = {
        'YUI': function(){
        }
      };
      window.YUI.version = '3.14.1';

      var expect = {
        libs: [{
          name: 'YUI3',
          version: '3.14.1'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect YUI';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect YUI2', function (done) {
      var window = {
        'YAHOO': {
          'VERSION' : '2.9.0'
        }
      };

      var expect = {
        libs: [{
          name: 'YUI2',
          version: '2.9.0'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect YUI';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect ExtJS', function (done) {
      var window = { Ext : { versions : { extjs: { version : '4.1.1.1' } } } };
      var expect = {
        libs: [{
          name: 'ExtJS',
          version: '4.1.1.1'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect ExtJS';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jQuery UI', function (done) {
      var window = { jQuery : { ui : { version : '1.10.3' } } };
      var expect = {
        libs: [{
          name: 'jQuery UI',
          version: '1.10.3'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect jQuery UI';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jQuery Mobile', function (done) {
      var window = { jQuery : { mobile : { version : '1.4.0' } } };
      var expect = {
        libs: [{
          name: 'jQuery Mobile',
          version: '1.4.0'
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect jQuery Mobile';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
