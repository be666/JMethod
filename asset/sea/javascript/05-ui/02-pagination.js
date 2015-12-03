/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    var utils = $w.iMethod.utils;

    $w.iMethod.page = [];

    var def = {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 1,
        rowCount: 0,
        template: template("pagination"),
        templateEmpty: template("empty"),
        pageClick: null
    };
    var iMethodPage = function (targetId, args) {
        var params = utils.extend(def, args);
        var $target = $("#" + targetId);

        var page = function () {
            var rowCount = params['rowCount'];
            if (rowCount > 0) {
                var pageIndex = params['pageIndex'];
                var pageSize = params['pageSize'];
                var totalPage = params['totalPage'];
                var pages = params['pages'];
                $target.html(params.template({
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    totalPage: totalPage,
                    pages: pages,
                    rowCount: rowCount
                }));
            } else {
                $target.html(params.templateEmpty({
                    content: ""
                }));
            }
        };


        var pub = {
            setConfig: function (opts) {
                params = utils.extend(def, opts);
                page();
            },
            destroy: function () {

            }
        };

        $target.on("click.pageClick", "[data-page]", function () {
            var $this = $(this);
            var page = $this.attr("data-page");
            var pageClick = params['pageClick'];
            var pageSize = params['pageSize'];
            pageClick && pageClick(page, pageSize);
        });
        $target.on("click.pageClick", "[data-size]", function () {
            var $this = $(this);
            var page = params['pageIndex'];
            var pageClick = params['pageClick'];
            var pageSize = $this.attr("data-size");
            pageClick && pageClick(page, pageSize);
        });

        page();
        return pub;

    };
    $.fn.iMethodPage = function (args) {
        var $Target = $(this);
        var $TargetId = $Target.attr("id");
        if (typeof $TargetId == "undefined") {
            $TargetId = "iMethod_page_" + iMethod.seq();
            $Target.attr("id", $TargetId)
        }
        if ($Target.data("iMethodPage") !== "complete") {
            if (typeof $w.iMethod.page[$TargetId] != "undefined") {
                $w.iMethod.page[$TargetId].destroy()
            }
            $w.iMethod.page[$TargetId] = null
        }
        if (typeof $w.iMethod.page[$TargetId] == "undefined" || $w.iMethod.page[$TargetId] == null) {
            $w.iMethod.page[$TargetId] = new iMethodPage($TargetId, args)
        } else {
            $w.iMethod.page[$TargetId].setConfig(args)
        }
        return $w.iMethod.page[$TargetId];
    }

})(window, jQuery);