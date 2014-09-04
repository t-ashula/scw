// plugins/fakeflash.js
// jshint -W061
exports.name = 'fakeflash';
exports.desc = 'fake flash navigator.plugins';
exports.initializer = function (win) {
  'use strict';
  var d;
  try {
    if (win === void 0) {
      win = window;
    }

    if ( !win.__wmapper ) {
      win.__wmapper = {};
    }

    // fake plugins for SWFObj.js
    {
      win.navigator = win.navigator || {};
      win.navigator.plugins = win.navigator.plugins || {};
      win.navigator.plugins['Shockwave Flash'] = win.navigator.plugins['Shockwave Flash'] || {
        description: 'Shockwave Flash 14.0 r0'
      };
      win.navigator.mimeTypes = win.navigator.mimeTypes || {};
      win.navigator.mimeTypes['application/x-shockwave-flash'] = win.navigator.mimeTypes['application/x-shockwave-flash'] || {
        enabledPlugin: true
      };
    }
  }
  catch (ee) {
  }
  return win;

};
