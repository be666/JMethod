/**
 * auth : iMethod
 * create_at: 15/10/20.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {

    var getRID = function (text) {
        text = text || "";
        return text + iMethod.seq();
    }
    var heartFactory = function (targetId, args) {
        var _t = "#" + targetId;
        var $Div = $(_t);
        var pro = {InterValObj: null, userTime: 0, lastExecTime: 0};
        var defArg = {timeout: 1, execTime: 10 * 60, heartExec: null, execWaitingOut: 10};
        var element = {};
        var handler = {
            SetRemainTime: function () {
                if ($("#" + targetId).length == 0 || typeof $("#" + targetId).data("heartFactory_UNQ") == "undefined") {
                    pub.heartStop();
                    return
                }
                pro.userTime = pro.userTime + 1;
                if ($Div.data("heartExec") == "free") {
                    $Div.data("heartExec", "exec");
                    console.log(pro.userTime);
                    if (pro.userTime - pro.lastExecTime > config.execTime) {
                        console.log("heartExec");
                        if (typeof config.heartExec == "function" && config.heartExec()) {
                            pro.lastExecTime = pro.userTime;
                            $Div.data("heartExec", "free")
                        }
                    } else {
                        $Div.data("heartExec", "free")
                    }
                } else {
                    if (pro.userTime - pro.lastExecTime > config.execTime + config.execWaitingOut) {
                        $Div.data("heartExec", "free")
                    }
                }
            }
        };
        var pub = {
            setConfig: function () {
                config = $.extend({}, config, args);
                return pub
            }, heartStart: function () {
                $Div.data("heartExec", "free");
                if (pro.InterValObj) {
                    window.clearInterval(pro.InterValObj);
                    pro.InterValObj = null
                }
                pro.InterValObj = window.setInterval(handler.SetRemainTime, config.timeout * 1000)
            }, heartRestart: function () {
                $Div.data("heartExec", "free");
                if (pro.InterValObj) {
                    window.clearInterval(pro.InterValObj);
                    pro.InterValObj = null
                }
                pro.userTime = 0;
                pro.InterValObj = window.setInterval(handler.SetRemainTime, config.timeout * 1000)
            }, heartStop: function () {
                $Div.data("heartExec", "free");
                if (pro.InterValObj) {
                    window.clearInterval(pro.InterValObj);
                    pro.InterValObj = null
                }
            }, destroy: function () {
                pub.heartStop();
                if (utils.isFunc(config.destroy)) {
                    config.destroy();
                }
                $Div.data("heartFactory", "destroy");
            }, getUseTime: function () {
                return pro.userTime
            }
        };
        var config = $.extend({}, defArg, args);
        $Div.data("heartFactory", "complete");
        $Div.data("heartFactory_UNQ", getRID());
        return pub
    };
    $w.iMethod.heartFactory = $w.iMethod.heartFactory || {};
    $.fn.heartFactory = function (args) {
        var $Target = $(this);
        var $TargetId = $Target.attr("id");
        if (typeof $TargetId == "undefined") {
            $TargetId = getRID("heart_factory");
            $Target.attr("id", $TargetId)
        }
        if ($Target.data("heartFactory") !== "complete") {
            if (typeof $w.iMethod.heartFactory[$TargetId] != "undefined") {
                $w.iMethod.heartFactory[$TargetId].destroy()
            }
            $w.iMethod.heartFactory[$TargetId] = null
        }
        if (typeof $w.iMethod.heartFactory[$TargetId] == "undefined" || $w.iMethod.heartFactory[$TargetId] == null) {
            $w.iMethod.heartFactory[$TargetId] = new heartFactory($TargetId, args)
        } else {
            $w.iMethod.heartFactory[$TargetId].setConfig(args)
        }
        return $w.iMethod.heartFactory[$TargetId]
    }
})(window, jQuery);