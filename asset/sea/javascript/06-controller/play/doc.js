/**
 * auth : bqxu
 * create_at: 15/11/5.
 * desc:
 * note:
 *  1.
 */
define('controller/play/doc', [], function (require, exports, module) {
  var $ = jQuery;
  $.fn.gxbDocView = function (options) {
    var defaults = {
      width: 600,
      height: 400,
      url: ''
    };
    var opts = $.extend(defaults, options);
    var $this = $(this);

    var width = $this.attr("width");
    var height = $this.attr("height");
    if (!width) {
      width = $this.width();
    }
    if (!height) {
      height = $this.height();
    }
    if (!width) {
      width = opts.width;
    }
    if (!height) {
      height = opts.height;
    }
    var iframe = document.createElement("iframe");
    iframe.setAttribute("width", width);
    iframe.setAttribute("height", height);
    iframe.setAttribute("frameborder", "no");
    iframe.setAttribute("border", 0);
    iframe.setAttribute("src", "http://101.200.188.133/view/url?url=" + opts.url);
    // 修改
    $this.after(iframe);
    $this.hide();
  };
  module.exports = function (targetId, pages) {
    $("#" + targetId).gxbDocView(pages);
  };
  gxb.controller.play = gxb.controller.play || {};
  gxb.controller.play.doc = module.exports;
});