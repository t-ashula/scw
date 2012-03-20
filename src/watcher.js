var url = 'http://puchi.co/phantom/test.html';
var page = new WebPage();
page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
    console.log('  ', item.file, ':', item.line);
  });
};
page.open(url, function(status){
  if ( status !== 'success' ) {
    console.log('something wrong');
  }
  else{
    var dom = page.evaluate(function(){
      function convert(D){
        function getDoctype (D) {
          var doctype = D.doctype, code = '';
          if (doctype) {
            code = '<!DOCTYPE ' + doctype.nodeName
              + (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '')
              + (doctype.systemId ? ' "' + doctype.systemId + '"' : '') + '>';
          }
          return code;
        }

        function getElements(E) {
          var TYPE = 'type', NAME = 'name', ATTR = 'attr', CHILD = 'child', VALUE = 'val', ele = {};
          switch (E.nodeType){
           case Node.ELEMENT_NODE:
            ele = (function(E){
              var children = E.childNodes, child, i, cs = [], c, ele = {};
              if (E.hasChildNodes()){
                for ( i = 0; child = children[ i ]; ++i ){
                  c = getElements( child ) ;
                  if ( c[TYPE] === 'text' && c[VALUE] === '' ){
                    continue;
                  }
                  cs.push( c );
                }
              }
              ele[TYPE] = 'element';
              ele[NAME] = E.localName;
              ele[ATTR] = getAttrs( E );
              ele[CHILD] = cs;
              return ele;
            })(E);
            break;
           case Node.TEXT_NODE:
            ele = (function(E){
              var ele = {};
              ele[TYPE] = 'text';
              ele[VALUE] = getText( E );
              return ele;
            })(E);
            break;
           case Node.CDATA_SECTION_NODE :
            ele = (function(E){
              var ele = {};
              ele[TYPE] = 'cdata';
              ele[VALUE] = getText( E );
              return ele;
            })(E);    
            break;
           case Node.COMMENT_NODE:
            ele = (function(E){
              var ele = {};
              ele[TYPE] = 'comment';
              ele[VALUE] = getText( E );
              return ele;
            })(E);
            break;
          }
          return ele;
        }

        function getText( E ){
          return E.nodeValue.replace(/^\s+$/g, '');
        }
        
        function getAttrs( E ){
          var attrs = E.attributes, attr, val, ret = [], i, tag = E.localName, name;
          for ( i = 0; attr = attrs[i]; ++i ){
            name = attr.name;
            val = E.getAttribute( name );
            if ( isUriAttribute( tag, name ) ) {
              val = getAbsUrl( name, val );
            }
            ret.push( { 'name' : name, 'val' : val } );
          }
          return ret;
        }

        function isUriAttribute( tag, aname ){
          /*
           * http://dev.w3.org/html5/spec/section-index.html#attributes-1
           * http://www.w3.org/TR/html401/index/attributes.html
           */
          var uriAttrs = {
            'action'     : ['form'],
            'background' : ['body'],
            'cite'       : ['blockquote','q','del','ins'],
            'classid'    : ['object'],
            'codebase'   : ['object','applet'],
            'data'       : ['object'],
            'formaction' : ['button','input'],
            'href'       : ['a','area','link','base'],
            'icon'       : ['command'],
            'longdesc'   : ['img','frame','iframe'],
            'manifest'   : ['html'],
            'poster'     : ['video'],
            'profile'    : ['head'],            
            'src'        : ['script','input','frame','iframe','img','video','audio','embed','source','track'],
            'usemap'     : ['img','input','object']
          };
          var attr;
          tag = tag.toLowerCase();
          aname = aname.toLowerCase();
          for (attr in uriAttrs) if (uriAttrs.hasOwnProperty( attr )){
            if ( aname === attr ){
              return uriAttrs[attr].some(function(t){ return t === tag; });
            }
          }
          return false;
        }

        function getAbsUrl( name, val ) {
          var a = D.createElement( 'a' );
          a.href = val;
          return a.href;
        }
        
        return {
          'url'      : D.location.href,
          'doctype'  : getDoctype( D ),
          'elements' : getElements( D.documentElement )
        };
      }
      
      return convert(document) ;
    });
    console.log(JSON.stringify(dom));
  }
  phantom.exit();  
});


