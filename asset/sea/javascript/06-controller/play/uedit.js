/**
 * auth : bqxu
 * create_at: 15/11/5.
 * desc:
 * note:
 *  1.
 */
define('controller/play/uedit', [], function (require, exports, module) {

    var _init = null;
    var utils = gxb.utils;
    gxb.script.insert([
        gxb.contextPath + "/js/uedit/ueditor.config.js",
        gxb.contextPath + "/js/uedit/ueditor.all.js"
    ], function () {

        _init && _init();
    });

    exports.getEditor = function (a, b) {
        return UE.getEditor(a, b);
    };

    exports.init = function (callback) {
        var UE = UE || null;
        if (utils.isNull(UE) || utils.isUndef(UE.getEditor)) {
            _init = callback;
        }
        else {
            callback && callback();
        }
    };

    gxb.controller.play = gxb.controller.play || {};
    gxb.controller.play.uedit = module.exports;
});