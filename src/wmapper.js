// wmapper.js

'use strict';
exports = module.exports = WMapper;


function WMapper (opt) {
  this.options = opt;
  this.ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36';
}

WMapper.prototype = {
  run : function (){
    console.log(this.options);
  },
  userAgent : function (ua) {
    if ( ua !== undefined ) {
      this.ua = ua;
    }
    return this.ua;
  }
};
