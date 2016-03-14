/**
 * auth : iMethod
 * create_at: 15/11/7.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    var utils = iMethod.utils;
    $w.iMethod._.scroll = [];
    var scroll = {
        push: function (name, func) {
            if (utils.isFunc(name)) {
                func = name;
                name = name.name;
            }
            scroll.pop(name, func);
            $w.iMethod._.scroll.push({
                name: name,
                func: func
            })
        },
        pop: function (name, func) {
            if (utils.isFunc(name)) {
                func = name;
                name = name.name;
            }
            if (name != null || utils.isFunc(func)) {
                var scroll = $w.iMethod._.scroll;
                var fl = scroll.length;
                while (fl > 0) {
                    fl--;
                    var _scroll = scroll[fl] || {};
                    if (name == _scroll['name'] ||
                        func == _scroll['func']) {
                        delete _scroll;
                    }
                }
            }
        }


    };
    $w.iMethod.scroll = scroll;
    $(window).scroll(function () {
        var scroll = $w.iMethod._.scroll;
        var fl = scroll.length;
        while (fl > 0) {
            fl--;
            var func = scroll[fl]['func'];
            if (utils.isFunc(func)) {
                func();
            }
        }
    });
})(window, jQuery);
