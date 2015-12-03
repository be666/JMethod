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
        all: null,
        item: null
    };

    var iMethodCheck = function (opts) {
        var params = utils.extend(cDef, opts);
        var $root = $(params['root']);
        var $all = params['all'];
        var $item = params['item'];
        var pub = {
            getChecked: function (attrId) {
                var _$item = $($item, $root);
                var iL = _$item.length;
                var item = [];
                for (var i = 0; i < iL; i++) {
                    var _item = _$item.eq(i);
                    if (_item.hasClass("check")) {
                        if (!utils.nothing(attrId)) {
                            _item = _item.attr(attrId);
                        }
                        item.push(_item);
                    }
                }
                return item;
            }
        };

        $root.on("click.item", $item, function () {
            var $this = $(this);
            if ($this.hasClass("check")) {
                $this.removeClass("check");
            } else {
                $this.addClass("check");
            }
            var _$item = $($item, $root);
            var _$all = $($all, $root);
            var iL = _$item.length;
            for (var i = 0; i < iL; i++) {
                var _item = _$item.eq(i);
                if (!_item.hasClass("check")) {
                    _$all.removeClass("check");
                    return;
                }
            }
            _$all.addClass("check");
        });

        $root.on("click.all", $all, function () {
            var $this = $(this);
            var _$item = $($item, $root);
            if ($this.hasClass("check")) {
                $this.removeClass("check");
                _$item.removeClass("check");
            } else {
                $this.addClass("check");
                _$item.addClass("check");
            }
        });

        return pub;
    }

    $w.iMethod.checkBox = iMethodCheck;
})(window, jQuery);