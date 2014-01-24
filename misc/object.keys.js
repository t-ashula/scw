var page = require('webpage').create(),
  system = require('system'),
  url = system.args[1] || 'about:blank',
  objName = system.args[2] || 'window';

page.open(url, function (status) {
  var res = page.evaluate(function (ons) {
    Array.prototype.selectMany = function (fn) {
      return this.map(fn).reduce(function (x, y) { return x.concat(y); }, []);
    };
    return ons.split(',').filter(function (on) {
      return on !== '';
    }).map(function (on) {
      var o = window,
        ns = on.split(/\./g);
      for (var i = 0, n; n = ns[i]; ++i) {
        o = o[n];
        if (o === undefined) {
          return [];
        }
      }
      return Object.keys(o).sort().map(function(k){ return on + "." + k; } );
    }).selectMany(function(x){ return x; });    
  }, objName);
  console.log(JSON.stringify(res, null, 2));
  phantom.exit();
});
