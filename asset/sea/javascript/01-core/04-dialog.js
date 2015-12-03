/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w) {
    $w.iMethod._.dialog = {
        ext: {
            alert: null,
            confirm: null,
            warn: null,
            error: null,
            dialog: null
        },
        history: [],
        alert: function (msg, callback) {
            $w.iMethod._.dialog.history.push(msg);
            if ($w.iMethod._.dialog.ext.alert) {
                return $w.iMethod._.dialog.ext.alert(msg, callback);
            } else {
                $w.alert(msg);
                callback && callback();
                return {};
            }
        },
        confirm: function (msg, callback) {
            $w.iMethod._.dialog.history.push(msg);
            if ($w.iMethod._.dialog.ext.confirm) {
                return $w.iMethod._.dialog.ext.confirm(msg, callback);
            } else {
                var flag = $w.confirm(msg);
                if (flag) {
                    callback && callback(!0);
                } else {
                    callback && callback(!!0);
                }
                return {};
            }
        },
        warn: function (msg, callback) {
            $w.iMethod._.dialog.history.push(msg);
            if ($w.iMethod._.dialog.ext.warn) {
                return $w.iMethod._.dialog.ext.warn(msg, callback);
            } else {
                $w.alert(msg);
                callback && callback();
                return {};
            }
        },
        error: function (msg, callback) {
            $w.iMethod._.dialog.history.push(msg);
            if ($w.iMethod._.dialog.ext.error) {
                return $w.iMethod._.dialog.ext.error(msg, callback);
            } else {
                $w.alert(msg);
                callback && callback();
                return {};
            }
        },
        prompt: function (msg, callback) {
            $w.iMethod._.dialog.history.push(msg);
            if ($w.iMethod._.dialog.ext.prompt) {
                return $w.iMethod._.dialog.ext.prompt(msg, callback);
            } else {
                var msg = $w.prompt(msg);
                callback && callback(msg);
                return {};
            }
        },
        dialog: function (text, opts) {
            $w.iMethod._.dialog.history.push(text);
            if ($w.iMethod._.dialog.ext.dialog) {
                return $w.iMethod._.dialog.ext.dialog(text, opts);
            } else {
                $w.alert(text);
                return {};
            }
        }
    };
    $w.iMethod.alert = $w.iMethod._.dialog.alert;
    $w.iMethod.confirm = $w.iMethod._.dialog.confirm;
    $w.iMethod.success = $w.iMethod._.dialog.alert;
    $w.iMethod.error = $w.iMethod._.dialog.error;
    $w.iMethod.warn = $w.iMethod._.dialog.warn;
    $w.iMethod.dialog = $w.iMethod._.dialog.dialog;
    $w.iMethod.prompt = $w.iMethod._.dialog.prompt;
})(window);