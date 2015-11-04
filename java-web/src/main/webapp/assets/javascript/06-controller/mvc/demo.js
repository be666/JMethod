/**
 * auth : bqxu
 * create_at: 15/10/14.
 * desc:
 * note:
 *  1.
 */
define('controller/mvc/demo', ['service/mvc_service', "view/mvc/demo", "template"], function (require, exports, module) {
  var mvcService = require("service/mvc_service");
  var viewDemo = require("view/mvc/demo");
  exports.init = function () {
    mvcService.query(function (res) {
      console.log(viewDemo);
      console.log(viewDemo(res));
      $("<div></div>").html(viewDemo(res)).appendTo("body")
    })
  }
  gxb.controller.mvc = gxb.controller.mvc || {};
  gxb.controller.mvc.demo = module.exports;
});