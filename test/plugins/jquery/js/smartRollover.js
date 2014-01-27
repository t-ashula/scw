function smartRollover() {   
  if(document.getElementsByTagName) {   
    var tags = ["img","input"];   
    var len = tags.length;   
    for( var i=0; i<len; i++ ) {   
      var el = document.getElementsByTagName(tags[i]);   
      var len2 = el.length;   
      for(var j=0; j<len2; j++) {   
        var attr = el[j].getAttribute("src");   
        if( attr ) {   
          if(el[j].getAttribute("src").match(/_off\./))   
          {   
            el[j].onmouseover = function() {   
              this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));   
            }   
            el[j].onmouseout = function() {   
              this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));   
            }   
          }   
        }   
      }   
    }   
  }   
}   
if(window.addEventListener) {   
  window.addEventListener("load", smartRollover, false);   
}   
else if(window.attachEvent) {   
  window.attachEvent("onload", smartRollover);   
}  


$(function() {
	$(".alpha a, .ch a, .back a").hover(function() {
		 $(this).stop().fadeTo(500, 0.5);
	},function() {
		$(this).stop().fadeTo(500, 1.0);
	});
});