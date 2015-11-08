/**
 * auth : bqxu
 * create_at: 15/10/23.
 * desc:
 * note:
 *  1.
 */
define('controller/student/nav', ['service/student_service', "view/student/nav", "template"], function (require, exports, module) {
  var studentService = require("service/student_service");
  var navView = require("view/student/nav");

  exports.initMenu = function (targetId, menuList,active) {
    var $target = $("#" + targetId);
    $target.html(navView({
      menuList: menuList,
      active:active
    }));
  };

  exports.initClassInfo = function (targetId, classId) {
    var $target = $("#" + targetId);
    studentService.queryClass(classId, function (res) {
      $target.html(navView({
        menuList: menuList
      }));
    })
  };

  exports.loadSchedule = function (targetId, classId) {
    var $target = $("#" + targetId);
    studentService.querySchedule(classId, function (res) {
      res = res || 50;
      $(".progress-inner", $target).css({width: res + "%"});
    });


  };


  gxb.controller.student = gxb.controller.student || {};
  gxb.controller.student.nav = module.exports;
});