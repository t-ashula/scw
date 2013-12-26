// plugins/jquery.js

exports.evaluator = function () {
  'use strict';
  var d;
  try {
    d = {
      'jquery': window.jQuery ? 'found' : 'not found'
    };
  }
  catch (ee) {
    d = {
      'exception': ee
    };
  }
  return d;
};
