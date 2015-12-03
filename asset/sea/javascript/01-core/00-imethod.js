/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    $w._window = {};
    var iMethod = {
        _: {},
        ui: {},
        ui_home: "iMethod_ui_home",
        service: {},
        controller: {},
        contextPath: "/",
        extend: $.extend,
        _seq: {},
        seq: function () {
            var _id;
            do {
                _id = Math.random() + "00000000";
                _id = _id.substr(_id.indexOf(".") + 1, 6);
            } while (!!$w.iMethod._seq[_id]);
            $w.iMethod._seq[_id] = !0;
            return _id;
        }
    };
    $w.iMethod = $w.iMethod || iMethod;
})(window, jQuery);


