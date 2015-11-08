/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
  if (typeof $w.JSON == "undefined") {
    $w.JSON = {
      parse: function () {
        $w.console.log("json undefined wanted parse ", arguments)
      },
      stringify: function () {
        $w.console.log("json undefined wanted stringify", arguments)
      }
    }
  }
  $w._window.parseJSON = $w.JSON.parse;
  $w.JSON.parse = function (data, reviver) {
    var _r = {};
    try {
      _r = $w._window.parseJSON(data, reviver);
      return _r;
    } catch (e) {
      $w.console.log("JSON.parse error " + data)
    }
    var rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
    if (data === null) {
      return data
    }
    if (typeof data === "string") {
      data = $.trim(data);
      if (data) {
        if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
          return (new Function("return " + data))()
        }
      }
    }
  }
})(window, jQuery);
