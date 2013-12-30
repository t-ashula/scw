var page = require('webpage').create();
page.open('about:blank', function (status) {
  var res = page.evaluate(function () {
    return {
      'navigator.userAgent': navigator.userAgent,
      'Object.keys(window).sort()': Object.keys(window).sort()
    };
  });
  console.log(JSON.stringify(res));
  phantom.exit();
});
