/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    $w.iMethod._.ajaxs = {
        _: {},
        push: function (id, xhr) {
            $w.iMethod._.ajaxs._[id] = xhr;
        },
        pop: function (id) {
            $w.iMethod._.ajaxs._[id] = null;
        },
        get: function (id) {
            return $w.iMethod._.ajaxs._[id];
        }
    };
    $w.iMethod._.ajax = function (url, options) {
        if (typeof url == "object") {
            options = url;
            url = null;
        }
        var def = {
            url: url || options.url || "",
            type: "get",
            dateType: "html",
            data: {}
        };
        options = $.extend(def, options);
        url = options.url;
        while (url[0] == "/" || url[0] == " ") {
            url = url.substring(1, url.length);
        }

        if (url.length == 0) {
            $w.console.log("无效的请求地址");
            return null;
        }
        var seq = $w.iMethod.seq();
        var params = {
            url: $w.iMethod.contextPath + "/" + url,
            data: options['data'] || {},
            dateType: options['dateType'] || "html",
            type: options['type'] || 'get',
            complete: function (response) {
                var complete = options['complete'];
                if (typeof complete == "function") {
                    complete(response)
                }
                $w.iMethod._.ajaxs.pop(seq);
            },
            success: function (response) {
                var success = options['success'];
                if (typeof success == "function") {
                    success(response)
                }
            },
            error: function (response) {
                var error = options['error'];
                if (typeof error == "function") {
                    error(response)
                } else {
                    iMethod.error({
                        title: "提示!",
                        content: "网络异常！"
                    });
                }
            }
        };
        var $ajax = $.ajax(params);
        return {
            abort: function () {
                $ajax.abort();
            }
        };
    };
})(window, jQuery);

