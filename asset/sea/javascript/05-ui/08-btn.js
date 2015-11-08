/**
 * auth : bqxu
 * create_at: 15/10/30.
 * desc:
 * 封装按钮事件 提交 ,取消
 * extend  ajax 提交
 * 参考 bootstrap btn
 * btn 状态 disable(no click) 0  normal(click) 1  submitting (no click) 2 complete (no click) 3
 * 首先实现  按钮 的  状态变化
 *
 * note:
 *  1.
 */
(function ($w, $) {
    var utils = $w.gxb.utils;

    $w.gxb.btn = [];
    $w.gxb.def = {};
    //参数配置
    var status = {
        disable: 0,
        normal: 1,
        submitting: 2,
        complete: 3
    }

    $w.gxb.def.btn = {
        disableText: "提交x",
        normalText: "提交",
        submittingText: "提交中",
        completeText: "提交y",
        init: function () {
            // return 0 1 3；
        },

        click: function () {
            //判断状态
            //执行 事件  (状态 改变submitting)

            // return 0 1 3；
        },
        url: null,
        data: null,
        type: null,
        dataType: null,
        success: function () {

        },
        error: function () {

        }
    };

    var gxbBtn = function (targetId, args) {
        var _t = "#" + targetId;
        var $btn = $(_t);
        $btn.data("gxbBtn", "complete");
        var handler = {
            setStatus: function (status) {
                switch (status) {
                    case 0:
                        $btn.html(config.disableText);
                        $btn.data("btnStatus", 0);
                        break;
                    case 1:
                        $btn.html(config.normalText);
                        $btn.data("btnStatus", 1);
                        break;
                    case 2:
                        $btn.html(config.submittingText);
                        $btn.data("btnStatus", 2);
                        break;
                    case 3:
                        $btn.html(config.completeText);
                        $btn.data("btnStatus", 3);
                        break;
                }
            },
            beforeClick: function () {
                if (config.beforeClick) {
                    return config.beforeClick();
                }
                return true;
            },
            ajax: function () {
                if (config.url) {
                    gxb._.ajax({
                        url: config.url,
                        data: config.data,
                        type: config.type,
                        dataType: config.dataType,
                        async: true,
                        success: function (res) {
                            // {state:0,1,3}
                            return config.success(res)
                        },
                        error: function (res) {
                            // {state:0,1,3}
                            return config.error(res)
                        }
                    });
                }
                return {state: 3};
            },
            click: function () {
                if (config.ajax()) {
                    if (config.click) {
                        return config.click();
                    }
                }
                return 0;
            }
        };

        var pub = {
            destroy: function () {

            },
            setConfig: function (args) {
                config = $.extend({}, config, args);
                return pub
            }
        };

        var config = $.extend({}, $w.gxb.def.btn, args);
        $btn.on("click", function () {
            if (handler.beforeClick()) {
                handler.setStatus(status.submitting);
                handler.setStatus(handler.click());
            }
        });
        return pub;

    };

    $w.gxb.btn = [];

    $.fn.gxbBtn = function (args) {
        var $Target = $(this);
        var $TargetId = $Target.attr("id");
        if (typeof $TargetId == "undefined") {
            $TargetId = "gxb_btn_" + gxb.seq();
            $Target.attr("id", $TargetId)
        }
        if ($Target.data("gxbBtn") !== "complete") {
            if (typeof $w.gxb.btn[$TargetId] != "undefined") {
                $w.gxb.btn[$TargetId].destroy()
            }
            $w.gxb.btn[$TargetId] = null
        }
        if (typeof $w.gxb.btn[$TargetId] == "undefined" || $w.gxb.btn[$TargetId] == null) {
            $w.gxb.btn[$TargetId] = new gxbBtn($TargetId, args)
        } else {
            $w.gxb.btn[$TargetId].setConfig(args)
        }
        return $w.gxb.btn[$TargetId];
    }

})(window, jQuery);