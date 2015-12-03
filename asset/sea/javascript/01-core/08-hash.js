/**
 * auth : iMethod
 * create_at: 15/11/4.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    var utils = $w.iMethod.utils;


    $w.iMethod.hash = [];

    $w.iMethodHash = function () {
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
                    utils.eachArr($w.iMethod.hash, function (obj, i, arr) {
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
                utils.eachArr($w.iMethod.hash, function (obj, i, arr) {
                    if (obj['state'] == state) {
                        delete  obj;
                    }
                });
                $w.iMethod.hash.push({state: state, callback: callback})
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
                if (window.location.hash != hash.join('&')) {
                    window.location.hash = hash.join('&');
                } else {
                    hashChange();
                }
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
                for (var k in hObj) {
                    if (k != 'state') {
                        ks.push(k + "");
                    }
                }
                ks = utils.sortStrArr(ks);
                for (var i = 0; i < ks.length; i++) {
                    var _k = ks[i];
                    if (!utils.nothing(hObj[_k])) {
                        hash.push(_k + "=" + hObj[_k]);
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