var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1] || 'about:blank',
  objName = system.args[2] || 'window';

page.open(url, function (status) {
  var res = page.evaluate(function (on) {
    var o = eval(on);
    return Object.keys(o).sort();
  }, objName);
  console.log(JSON.stringify(res));
  phantom.exit();
});
