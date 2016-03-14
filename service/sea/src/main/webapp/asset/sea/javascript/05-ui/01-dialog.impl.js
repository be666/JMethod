(function ($w, $) {
    var utils = $w.iMethod.utils;

    var def = {
        viewTemplate: "dialog.panel.def", //dialog
        content: null,
        title: null,
        mask: true,
        buttons: [],
        pos: {
            my: "center",
            at: "center",
            of: $w
        }
    };

    var btn = {
        id: null,
        name: null,
        value: null,
        click: null
    };

    var bindClick = function ($target, btn) {
        var className = btn['className'];
        var onclick = btn['click'];
        $("." + className, $target).data("data-click", onclick);
        $target.on("click." + className, "." + className, function () {
            onclick && onclick($target);
        })
    }

    $w.iMethod.dialogFactory = {};
    var dialog = function (opt) {
        var params = utils.extend(def, opt);
        var pos = utils.extend(def['pos'], opt['pos']);
        params['pos'] = pos;
        var viewTemplate = template(params['viewTemplate']);
        var $target = $(viewTemplate({
            className: params['className'],
            title: params['title'],
            content: params['content'],
            buttons: params['buttons']
        }));
        $target.appendTo($("#" + iMethod.ui_home));
        if (params['mask']) {
            $target.wrap("<div class='iMethod-dialog-wap'></div>");
            $target.before("<div class='iMethod-dialog-mask'></div>")
        }
        var $targetId = $target.attr("id");
        if (!utils.nothing($w.iMethod.dialogFactory[$targetId])) {
            return $w.iMethod.dialogFactory[$targetId];
        }
        if (typeof $targetId == "undefined") {
            $targetId = iMethod.seq();
            $target.attr("id", $targetId)
        }
        var buttons = params['buttons'] || [];
        var bl = buttons.length;
        for (var i = 0; i < bl; i++) {
            var btn = buttons[i];
            bindClick($target, btn);
        }

        $target.on("click.target", function () {
            var click = params['click'];
            click && click(pub);
        });
        $target.on("click.target", ".iMethod-dialog-close", function () {
            var click = params['close'];
            var flag = true;
            if (utils.isFunc(click)) {
                flag = !!click(pub);
            }
            if (flag) {
                pub.close();
            }
        });
        var pub = {
            target: $target,
            close: function () {
                if (params['mask']) {
                    $target.parent().remove();
                    if ($("body").hasClass("no-scroll")) {
                        if ($(".iMethod-dialog-wap").length == 0) {
                            $("body").removeClass("no-scroll")
                        }
                    }
                } else {
                    $target.remove();
                }
                $w.iMethod.dialogFactory[$targetId] == null;

            },
            hide: function () {
                if (params['mask']) {
                    $target.parent().remove();
                } else {
                    $target.remove();
                }
            },
            show: function () {
                if (params['mask']) {
                    $target.parent().show();
                } else {
                    $target.show();
                }
                pub.position();
            },
            position: function () {
                if (params['mask']) {
                    var wH = $(window).height();
                    var ww = $(window).width();
                    $target.closest(".iMethod-dialog-wap").css({width: ww + "px", height: wH + "px"});
                    $target.prev().css({width: ww + "px", height: wH + "px"});
                    $(".iMethod-dialog-wap").position({
                        my: "center",
                        at: "center",
                        of: $w
                    });
                    params['pos']['of'] = $target.closest(".iMethod-dialog-wap");
                    $target.position(params['pos']);
                    if (!$("body").hasClass("no-scroll")) {
                        $("body").addClass("no-scroll")
                    }
                } else {
                    $target.position(params['pos']);
                }
            },
            getConfig: function () {
                return params;
            }
        };
        pub.position();
        iMethod.scroll.push("dialog_" + $targetId, function () {
            var $target = $("#" + $targetId);
            if ($target.length == 0) {
                iMethod.scroll.pop("dialog_" + $targetId);
                return;
            }
            pub.position();
        });
        iMethod.resize.push("dialog_" + $targetId, function () {
            pub.position();
        });
        $w.iMethod.dialogFactory[$targetId] = pub;
        return pub;
    };
    $w.iMethod.tips = {};
    $w.iMethod.tips.success = function (msg) {
        if (utils.isStr(msg)) {
            msg = {
                content: msg
            }
        }
        msg = utils.extend({
            className: "iMethod-dialog-tips-success",
            viewTemplate: "dialog.def",
            content: "提交成功!",
            timeout: "3000",
            click: function (pub) {
                pub.close();
            }
        }, msg);
        var $dialog = dialog(msg);
        if (!!msg['timeout']) {
            setTimeout(function () {
                $dialog.close();
            }, msg['timeout'] || 3000);
        }
        return $dialog;
    };
    $w.iMethod.tips.error = function (msg) {
        if (utils.isStr(msg)) {
            msg = {
                content: msg
            }
        }
        msg = utils.extend({
            className: "iMethod-dialog-tips-error",
            viewTemplate: "dialog.def",
            content: "提交失败,请重试!",
            timeout: "3000",
            click: function (pub) {
                pub.close();
            }
        }, msg);
        var $dialog = dialog(msg);
        if (!!msg['timeout']) {
            setTimeout(function () {
                $dialog.close();
            }, msg['timeout'] || 3000);
        }
        return $dialog;
    };
    $w.iMethod.tips.time = function (msg) {
        if (utils.isStr(msg)) {
            msg = {
                content: msg
            }
        }
        msg = utils.extend({
            className: "iMethod-dialog-tips-time",
            viewTemplate: "dialog.def",
            content: "操作成功!",
            click: function (pub) {
                pub.close();
            }
        }, msg);
        return dialog(msg);
    };
    $w.iMethod.confirm = function (msg, sure, cancel) {
        return dialog({
            viewTemplate: "dialog.panel.def",
            content: msg || "操作成功！",
            buttons: [{
                className: "iMethod-sure",
                text: "确认",
                click: function () {
                    sure && sure()
                }
            }, {
                className: "iMethod-cancel",
                text: "取消",
                click: function () {
                    sure && sure()
                }
            }]
        });
    };
    $w.iMethod.warn = function (msg, sure) {
        return dialog({
            viewTemplate: "dialog.panel.def",
            content: msg || "警告！",
            buttons: [{
                className: "iMethod-sure",
                text: "确认",
                click: function () {
                    sure && sure()
                }
            }]
        });
    };
    $w.iMethod.error = function (msg) {
        if (utils.isStr(msg)) {
            msg = {
                content: msg
            }
        }
        msg = utils.extend({
            viewTemplate: "dialog.panel.def",
            content: "错误"
        }, msg);
        return dialog(msg);
    };

    $w.iMethod.dialog = dialog;

    $w.iMethod.resize.push("dialog", function () {
        var df = $w.iMethod.dialogFactory || {};
        var v;
        for (var k in df) {
            v = df[k];
            if (!utils.nothing(v)) {
                v.position();
            }
        }
    });
    $(function () {
        var ui_home = document.getElementById(iMethod.ui_home);
        if (utils.nothing(ui_home)) {
            var div = document.createElement("div");
            div.id = iMethod.ui_home;
            div.width = "0";
            div.height = "0";
            document.body.appendChild(div);
        }
    })
})
(window, jQuery);