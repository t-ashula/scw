// plugins/window.js
'use strict';

exports.name = 'window';
exports.desc = 'get extra keys in window';
exports.evaluator = function (win) {
  var d,
    undef = void 0;
  try {
    if (win === void 0) {
      win = window;
    }
    d = {
      keys: extraKeys(win)
    };
  }
  catch (ee) {
    d = {
      'keys': [],
      'exception': ee
    };
  }
  return d;

  function extraKeys(win) {
    var defwinkeys = ['ArrayBuffer', 'Attr', 'Audio', 'BeforeLoadEvent', 'Blob', 'CDATASection', 'CSSCharsetRule', 'CSSFontFaceRule', 'CSSImportRule', 'CSSMediaRule', 'CSSPageRule', 'CSSPrimitiveValue', 'CSSRule', 'CSSRuleList', 'CSSStyleDeclaration', 'CSSStyleRule', 'CSSStyleSheet', 'CSSValue', 'CSSValueList', 'CanvasGradient', 'CanvasPattern', 'CanvasRenderingContext2D', 'CharacterData', 'ClientRect', 'ClientRectList', 'Clipboard', 'Comment', 'Counter', 'DOMException', 'DOMImplementation', 'DOMParser', 'DOMSettableTokenList', 'DOMStringList', 'DOMStringMap', 'DOMTokenList', 'DataView', 'Document', 'DocumentFragment', 'DocumentType', 'Element', 'Entity', 'EntityReference', 'Event', 'EventException', 'EventSource', 'File', 'FileError', 'FileList', 'FileReader', 'Float32Array', 'FormData', 'HTMLAllCollection', 'HTMLAnchorElement', 'HTMLAppletElement', 'HTMLAreaElement', 'HTMLAudioElement', 'HTMLBRElement', 'HTMLBaseElement', 'HTMLBaseFontElement', 'HTMLBlockquoteElement', 'HTMLBodyElement', 'HTMLButtonElement', 'HTMLCanvasElement', 'HTMLCollection', 'HTMLDListElement', 'HTMLDirectoryElement', 'HTMLDivElement', 'HTMLDocument', 'HTMLElement', 'HTMLEmbedElement', 'HTMLFieldSetElement', 'HTMLFontElement', 'HTMLFormElement', 'HTMLFrameElement', 'HTMLFrameSetElement', 'HTMLHRElement', 'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement', 'HTMLIFrameElement', 'HTMLImageElement', 'HTMLInputElement', 'HTMLIsIndexElement', 'HTMLKeygenElement', 'HTMLLIElement', 'HTMLLabelElement', 'HTMLLegendElement', 'HTMLLinkElement', 'HTMLMapElement', 'HTMLMarqueeElement', 'HTMLMediaElement', 'HTMLMenuElement', 'HTMLMetaElement', 'HTMLMeterElement', 'HTMLModElement', 'HTMLOListElement', 'HTMLObjectElement', 'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLOutputElement', 'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPreElement', 'HTMLProgressElement', 'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLStyleElement', 'HTMLTableCaptionElement', 'HTMLTableCellElement', 'HTMLTableColElement', 'HTMLTableElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTextAreaElement', 'HTMLTitleElement', 'HTMLUListElement', 'HTMLVideoElement', 'HashChangeEvent', 'Image', 'ImageData', 'Int16Array', 'Int32Array', 'Int8Array', 'KeyboardEvent', 'MediaError', 'MediaList', 'MessageChannel', 'MessageEvent', 'MessagePort', 'MimeType', 'MimeTypeArray', 'MouseEvent', 'MutationEvent', 'NamedNodeMap', 'Node', 'NodeFilter', 'NodeList', 'Notation', 'Option', 'OverflowEvent', 'PageTransitionEvent', 'Plugin', 'PluginArray', 'ProcessingInstruction', 'ProgressEvent', 'RGBColor', 'Range', 'RangeException', 'Rect', 'SQLException', 'SVGAElement', 'SVGAltGlyphElement', 'SVGAngle', 'SVGAnimateColorElement', 'SVGAnimateElement', 'SVGAnimateTransformElement', 'SVGAnimatedAngle', 'SVGAnimatedBoolean', 'SVGAnimatedEnumeration', 'SVGAnimatedInteger', 'SVGAnimatedLength', 'SVGAnimatedLengthList', 'SVGAnimatedNumber', 'SVGAnimatedNumberList', 'SVGAnimatedPreserveAspectRatio', 'SVGAnimatedRect', 'SVGAnimatedString', 'SVGAnimatedTransformList', 'SVGCircleElement', 'SVGClipPathElement', 'SVGColor', 'SVGComponentTransferFunctionElement', 'SVGCursorElement', 'SVGDefsElement', 'SVGDescElement', 'SVGDocument', 'SVGElement', 'SVGElementInstance', 'SVGElementInstanceList', 'SVGEllipseElement', 'SVGException', 'SVGFEBlendElement', 'SVGFEColorMatrixElement', 'SVGFEComponentTransferElement', 'SVGFECompositeElement', 'SVGFEConvolveMatrixElement', 'SVGFEDiffuseLightingElement', 'SVGFEDisplacementMapElement', 'SVGFEDistantLightElement', 'SVGFEDropShadowElement', 'SVGFEFloodElement', 'SVGFEFuncAElement', 'SVGFEFuncBElement', 'SVGFEFuncGElement', 'SVGFEFuncRElement', 'SVGFEGaussianBlurElement', 'SVGFEImageElement', 'SVGFEMergeElement', 'SVGFEMergeNodeElement', 'SVGFEMorphologyElement', 'SVGFEOffsetElement', 'SVGFEPointLightElement', 'SVGFESpecularLightingElement', 'SVGFESpotLightElement', 'SVGFETileElement', 'SVGFETurbulenceElement', 'SVGFilterElement', 'SVGFontElement', 'SVGFontFaceElement', 'SVGFontFaceFormatElement', 'SVGFontFaceNameElement', 'SVGFontFaceSrcElement', 'SVGFontFaceUriElement', 'SVGForeignObjectElement', 'SVGGElement', 'SVGGlyphElement', 'SVGGradientElement', 'SVGHKernElement', 'SVGImageElement', 'SVGLength', 'SVGLengthList', 'SVGLineElement', 'SVGLinearGradientElement', 'SVGMarkerElement', 'SVGMaskElement', 'SVGMatrix', 'SVGMetadataElement', 'SVGMissingGlyphElement', 'SVGNumber', 'SVGNumberList', 'SVGPaint', 'SVGPathElement', 'SVGPathSeg', 'SVGPathSegArcAbs', 'SVGPathSegArcRel', 'SVGPathSegClosePath', 'SVGPathSegCurvetoCubicAbs', 'SVGPathSegCurvetoCubicRel', 'SVGPathSegCurvetoCubicSmoothAbs', 'SVGPathSegCurvetoCubicSmoothRel', 'SVGPathSegCurvetoQuadraticAbs', 'SVGPathSegCurvetoQuadraticRel', 'SVGPathSegCurvetoQuadraticSmoothAbs', 'SVGPathSegCurvetoQuadraticSmoothRel', 'SVGPathSegLinetoAbs', 'SVGPathSegLinetoHorizontalAbs', 'SVGPathSegLinetoHorizontalRel', 'SVGPathSegLinetoRel', 'SVGPathSegLinetoVerticalAbs', 'SVGPathSegLinetoVerticalRel', 'SVGPathSegList', 'SVGPathSegMovetoAbs', 'SVGPathSegMovetoRel', 'SVGPatternElement', 'SVGPoint', 'SVGPointList', 'SVGPolygonElement', 'SVGPolylineElement', 'SVGPreserveAspectRatio', 'SVGRadialGradientElement', 'SVGRect', 'SVGRectElement', 'SVGRenderingIntent', 'SVGSVGElement', 'SVGScriptElement', 'SVGSetElement', 'SVGStopElement', 'SVGStringList', 'SVGStyleElement', 'SVGSwitchElement', 'SVGSymbolElement', 'SVGTRefElement', 'SVGTSpanElement', 'SVGTextContentElement', 'SVGTextElement', 'SVGTextPathElement', 'SVGTextPositioningElement', 'SVGTitleElement', 'SVGTransform', 'SVGTransformList', 'SVGUnitTypes', 'SVGUseElement', 'SVGVKernElement', 'SVGViewElement', 'SVGZoomEvent', 'SharedWorker', 'Storage', 'StorageEvent', 'StyleSheet', 'StyleSheetList', 'Text', 'TextEvent', 'TextMetrics', 'TimeRanges', 'TouchEvent', 'UIEvent', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'WebKitAnimationEvent', 'WebKitBlobBuilder', 'WebKitCSSKeyframeRule', 'WebKitCSSKeyframesRule', 'WebKitCSSMatrix', 'WebKitCSSTransformValue', 'WebKitPoint', 'WebKitTransitionEvent', 'WebSocket', 'WheelEvent', 'Worker', 'XMLDocument', 'XMLHttpRequest', 'XMLHttpRequestException', 'XMLHttpRequestUpload', 'XMLSerializer', 'XPathEvaluator', 'XPathException', 'XPathResult', '_phantom', 'applicationCache', 'callPhantom', 'clientInformation', 'closed', 'console', 'crypto', 'defaultStatus', 'defaultstatus', 'devicePixelRatio', 'document', 'event', 'frameElement', 'frames', 'history', 'innerHeight', 'innerWidth', 'length', 'localStorage', 'location', 'locationbar', 'menubar', 'name', 'navigator', 'offscreenBuffering', 'onabort', 'onbeforeunload', 'onblur', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'oncontextmenu', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onhashchange', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmessage', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpause', 'onplay', 'onplaying', 'onpopstate', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onsearch', 'onseeked', 'onseeking', 'onselect', 'onstalled', 'onstorage', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontouchcancel', 'ontouchend', 'ontouchmove', 'ontouchstart', 'onunload', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkittransitionend', 'opener', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent', 'personalbar', 'screen', 'screenLeft', 'screenTop', 'screenX', 'screenY', 'scrollX', 'scrollY', 'scrollbars', 'self', 'sessionStorage', 'status', 'statusbar', 'styleMedia', 'toolbar', 'top', 'webkitNotifications', 'webkitURL', 'window', '__wmapper', 'setInterval', 'setTimeout', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent'],
      pages = Object.keys(win),
      extkeys = pages.filter(function (i) {
        return defwinkeys.indexOf(i) < 0;
      }),
      ret = [];

    function valType(v) {
      return Object.prototype.toString.call(v);
    }
    ret = extkeys.map(function (k) {
      var r = {
        'name': k,
        'type': valType(win[k])
      };
      if (/ (Function|Object)\]/i.test(r.type)) {
        r.keys = Object.keys(win[k]);
      }
      return r;
    });

    return ret;
  }
};
