// plugins/domxss.js

exports.name = 'domxss';
exports.desc = 'dom based xss scanner';
exports.evaluator = function(){
  'use strict';
  var d;
  try {
    d = {};
  }
  catch (ee) {
    d = {
      'url': document.location.href,
      'exception': ee
    };
  }
  return d;
};
