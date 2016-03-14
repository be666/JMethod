/**
 * auth : iMethod
 * create_at: 15/10/23.
 * desc:
 * note:
 *  1.
 */
define('controller/common/portal', [
    'service/permission_service',
    'view/portal/nav',
    "template"], function (require, exports, module) {

    var perService = require("service/permission_service");
    var navView = require("view/portal/nav");
    exports.loadMenu = function (targetId) {
        var $target = $("#" + targetId);
        perService.loadMenu(function (dataMap) {
            var menuList = dataMap['menuList'];
            $target.html(navView({
                menuList: menuList
            }));
        });
        $target.on("click.menu", "a", function () {
            var $this = $(this);
            var menu_id = $this.attr("menu_id");
            var content = $this.attr("content");
            if (!iMethod.utils.isEmptyStr(content)) {
                window.location.href = iMethod.utils.resoleUrl(iMethod.contextPath + "/" + content);
            } else {
                if ($this.closest("li").hasClass("active")) {
                    $this.closest("li").removeClass("active");
                    $(".nav-toggle", $this).html("&#9660");
                } else {
                    $this.closest("li").addClass("active");
                    $(".nav-toggle", $this).html("&#9650");
                }
            }
        });


    };

    iMethod.controller.common = iMethod.controller.common || {};
    iMethod.controller.common.portal = module.exports;
});