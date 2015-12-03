/**
 * auth : iMethod
 * create_at: 15/11/6.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    var utils = $w.iMethod.utils;
    var script = {
        insert: function (files, valid, callback) {
            if (utils.isFunc(valid)) {
                callback = callback || valid;
                valid = true;
            }
            var fL = files.length;
            for (var i = 0; i < fL; i++) {
                var file = files[i];
                if (valid && !!script.exist(file)) {
                    if (i < fL - 1) {
                        script.exec(files, callback);
                    }
                    continue;
                }
                var _doc = document.getElementsByTagName('head')[0];
                var js = document.createElement('script');
                js.setAttribute('type', 'text/javascript');
                js.setAttribute('src', file);
                _doc.appendChild(js);
                script.bind(js, i, file, files, valid, callback);

                break;
            }
        },
        exist: function (file) {
            var scripts = document.getElementsByTagName("script");
            var sl = scripts.length;
            for (var i = 0; i < sl; i++) {
                var script = scripts[i];
                if (script.src.indexOf(file) > -1) {
                    return true;
                }
            }
            return false;
        },
        check: function (files) {
            files = files || [];
            var fl = files.length;
            while (fl > 0) {
                fl--;
                if (!script.exist(files[fl])) {
                    return false;
                }
            }
            return true;
        },
        exec: function (files, callback) {
            if (script.check(files)) {
                callback && callback();
            }
        },
        bind: function (js, i, file, files, valid, callback) {
            if (!/*@cc_on!@*/0) { //if not IE
                js.onload = function () {
                    script.insert(files, valid, callback);
                }
            } else {
                js.onreadystatechange = function () {
                    if (js.readyState == 'loaded' || js.readyState == 'complete') {
                        script.insert(files, valid, callback);
                    }
                }
            }
        }
    };
    $w.iMethod.script = script;
})(window, jQuery);