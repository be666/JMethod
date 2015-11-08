/**
 * auth : bqxu
 * create_at: 15/10/24.
 * desc:
 * note:
 *  1.
 */
define('controller/student/next', ['service/student_service', "view/student/next", "template"], function (require, exports, module) {
  var studentService = require("service/student_service");
  var nextView = require("view/student/next");

  exports.buildNext = function (targetId, classId) {
    var $target = $("#" + targetId);
    studentService.queryLastSchedule(classId, function (res) {
      console.log(res);
      console.log(nextView({
        learnLog: res
      }));
      $target.html(nextView({
        learnLog: res
      }))
    })
  };


  gxb.controller.student = gxb.controller.student || {};
  gxb.controller.student.next = module.exports;
});