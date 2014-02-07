// libraries.js
'use strict';
var assert = require('power-assert'),
  libs = require(__dirname + '/../../src/plugins/library.js');

describe('plugin libraris detector', function () {
  it('plugin', function (done) {
    var expect = 'object',
      actual = typeof libs,
      message = 'detector is object';
    assert.equal(actual, expect, message);
    done();
  });

  it('has name', function (done) {
    var expect = 'library',
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
          info : {
            version: '1.8.3',
            url: 'http://jquery.com'
          }
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
          info : {
            version: '1.7.1',
            url: 'http://prototypejs.org'
          }
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
          info: {
            version: '1.2.6',
            url: 'http://angularjs.org'
          }
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
          info: {
            version: '1.1.0',
            url: 'http://backbonejs.org'
          }
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
          info : {
            version: '1.4.3',
            url: 'http://underscorejs.org'
          }
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
          info: {
            version: '2.x',
            url: 'http://code.google.com/p/swfobject/'
          }
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
          info : {
            version: '1.5.x',
            url: 'http://blog.deconcept.com/swfobject/'
          }
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
          info : {
            version: '2.7.1',
            url: 'http://modernizr.com/'
          }
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
          info: {
            version: '1.9.0 (NaN)',
            url: 'http://dojotoolkit.org/'
          }          
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect Dojo.js ';
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
          info: {
            version: '1.8.1',
            url: 'http://script.aculo.us/'
          }
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
          info: {
            version: '1.3dev',
            url: 'http://mootools.net/'
          }
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect MooTools';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect YUI3', function (done) {
      var window = {
        'YUI': function () {}
      };
      window.YUI.version = '3.14.1';

      var expect = {
        libs: [{
          name: 'YUI3',
          info : {
            version: '3.14.1',
            url: 'http://yuilibrary.com/projects/yui3/'
          }
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
          'VERSION': '2.9.0'
        }
      };

      var expect = {
        libs: [{
          name: 'YUI2',
          info: {
            version: '2.9.0',
            url: 'http://yuilibrary.com/projects/yui2/'
          }
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect YUI';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect ExtJS', function (done) {
      var window = {
        Ext: {
          versions: {
            extjs: {
              version: '4.1.1.1'
            }
          }
        }
      };
      var expect = {
        libs: [{
          name: 'ExtJS',
          info : {
            version: '4.1.1.1',
            url: 'http://www.sencha.com/products/extjs/'
          }
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect ExtJS';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jQuery UI', function (done) {
      var window = {
        jQuery: {
          ui: {
            version: '1.10.3'
          }
        }
      };
      var expect = {
        libs: [{
          name: 'jQuery UI',
          info : {
            version: '1.10.3',
            url: 'http://jqueryui.com/'
          }
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect jQuery UI';
      assert.deepEqual(actual, expect, message);
      done();
    });

    it('detect jQuery Mobile', function (done) {
      var window = {
        jQuery: {
          mobile: {
            version: '1.4.0'
          }
        }
      };
      var expect = {
        libs: [{
          name: 'jQuery Mobile',
          info : {
            version: '1.4.0',
            url: 'http://jquerymobile.com/'
          }
        }]
      },
        actual = libs.evaluator(window),
        message = 'libs.evaluator detect jQuery Mobile';
      assert.deepEqual(actual, expect, message);
      done();
    });
  });
});
