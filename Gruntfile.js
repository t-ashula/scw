 /*
  */
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      all: {
        files: [
          'src/**/*.js',
          'test/**/*.js',
          'Gruntfile.js'
        ],
        tasks: ['default'],
        options: {
          debounceDelay: 1000
        }
      }
    },
    jshint: {
      files: ['<%= watch.all.files %>'],
      options: {
        node: true,
        curly: true,
        quotmark: 'single',
        'undef': true,
        'strict': true,
        'indent': 2,
        'phantom': true,
        'browser': true,
        globals: {
          module: false,
          describe: false,
          console: false,
          'it': false,
          'after': false,
          'before': false
        }
      }
    },
    espower: {
      all: {
        files: [{
          expand: true,
          cwd: 'test/',
          src: ['./**/*.js'],
          dest: 'test-espd/',
          ext: '.js'
        }]
      }
    },
    simplemocha: {
      options: {
        reporter: 'spec',
        ui: 'bdd',
        timeout: 5000
      },
      simple: {
        src: ['test/**/*.js']
      },
      powered: {
        src: ['test-espd/**/*.js']
      }
    }
  });
  
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('test', ['simplemocha:simple']);
  grunt.registerTask('testp', ['espower:all', 'simplemocha:powered']);
  grunt.registerTask('default', ['jshint', 'testp']);
};
