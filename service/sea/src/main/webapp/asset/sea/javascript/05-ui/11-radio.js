/**
 * auth : iMethod
 * create_at:  15/11/28.
 * desc:
 * note:
 *  1.
 */
;
(function ($w, $) {
    var utils = $w.iMethod.utils;
    var cDef = {
        root: "body",
        item: null
    };

    var iMethodRadio = function (opts) {
        var params = utils.extend(cDef, opts);
        var $root = $(params['root']);
        var $item = params['item'];
        var pub = {
            getChecked: function (attrId) {
                var _$item = $($item, $root);
                var iL = _$item.length;
                var item = null;
                for (var i = 0; i < iL; i++) {
                    var _item = _$item.eq(i);
                    if (_item.hasClass("check")) {
                        if (!utils.nothing(attrId)) {
                            _item = _item.attr(attrId);
                        }
                        item = _item;
                        break;
                    }
                }
                return item;
            }
        };

        $root.on("click.item", $item, function () {
            var $this = $(this);
            var _$item = $($item, $root);
            if ($this.hasClass("check")) {
                $this.removeClass("check");
            } else {
                _$item.removeClass("check");
                $this.addClass("check");
            }
        });

        return pub;
    }

    $w.iMethod.radio = iMethodRadio;
})(window, jQuery);