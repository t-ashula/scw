var page = require('webpage').create(),
  system = require('system');
page.open(system.args[1] || 'about:blank', function (status) {
  var res = page.evaluate(function () {
    return {
      'navigator.userAgent': navigator.userAgent,
      'Object.keys(window).sort()': Object.keys(window).sort()
    };
  });
  console.log(JSON.stringify(res));
  phantom.exit();
});
