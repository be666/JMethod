/**
 * auth : bqxu
 * create_at: 15/11/4.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
  var utils = $w.gxb.utils;


  $w.gxb.hash = [];

  $w.gxbHash = function () {
    var getHash = function () {
      var hash = window.location.hash;
      if (hash.indexOf("#!") != 0) {
        return {};
      }
      hash = hash.replace("#!", "");
      hash = utils.split(hash, "&");
      var hObj = {};
      for (var i = 0; i < hash.length; i++) {
        var h = hash[i];
        h = utils.split(h, "=");
        if (h.length == 2) {
          hObj[h[0]] = h[1];
        }
      }
      return hObj;
    };
    var hashChange = function () {
      var hObj = getHash();
      var state = hObj['state'];
      if (!utils.nothing(state)) {
        state = state.split(".");
        var _state = [];
        for (var i = 0; i < state.length; i++) {
          _state.push(state[i]);
          utils.eachArr($w.gxb.hash, function (obj, i, arr) {
            if (obj['state'] == _state.join(".")) {
              if (utils.isFunc(obj['callback'])) {
                obj['callback'](hObj);
              }
              return false;
            }
          });
        }
      }
    };
    window.onhashchange = hashChange;
    return {
      publish: function (state, callback) {
        utils.eachArr($w.gxb.hash, function (obj, i, arr) {
          if (obj['state'] == state) {
            delete  obj;
          }
        });
        $w.gxb.hash.push({state: state, callback: callback})
      },
      init: function (state, args) {
        args = args || {};
        if (!utils.isStr(state)) {
          args = state || args;
          state = args['state'] || "";
        }
        args = utils.extend({}, args);
        if (utils.nothing(state)) {
          return;
        }
        var hash = [];
        hash.push("#!state=" + state);

        var ks = [];
        for (var k in args) {
          if (k != 'state' && !utils.inArr(ks, k + "")) {
            ks.push(k + "")
          }
        }
        ks = utils.sortStrArr(ks);
        for (var i = 0; i < ks.length; i++) {
          var _k = ks[i];
          if (!utils.nothing(args[_k])) {
            hash.push(_k + "=" + args[_k]);
          }
        }
        window.location.hash = "";
        window.location.hash = hash.join('&');
      },
      change: function (args) {
        args = utils.extend({}, args);
        var hObj = getHash();
        if (utils.nothing(args['state']) || args['state'] == hObj['state']) {
          hObj = utils.extend(hObj, args);
        } else {
          hObj = args;
        }
        if (utils.nothing(hObj['state'])) {
          return;
        }
        var hash = [];
        hash.push("#!state=" + hObj['state']);
        var ks = [];
        for (var k in args) {
          if (k != 'state') {
            ks.push(k + "");
          }
        }
        ks = utils.sortStrArr(ks);
        for (var i = 0; i < ks.length; i++) {
          var _k = ks[i];
          if (!utils.nothing(args[k])) {
            hash.push(_k + "=" + args[k]);
          }
        }
        window.location.hash = hash.join('&');
      },
      getHash: function () {
        return getHash();
      }
    }
  }
})(window, jQuery);