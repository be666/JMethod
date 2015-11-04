/**
 * auth : bqxu
 * create_at: 15/10/23.
 * desc:
 * note:
 *  1.
 */
define('controller/student/unit', ['service/student_service', "view/student/unit/list", "template"], function (require, exports, module) {
  var studentService = require("service/student_service");
  var unitListView = require("view/student/unit/list");


  var refershChapterSchedule = function (targetId, classId) {
    var $target = $("#" + targetId);
    studentService.queryChapterSchedule(classId, function (res) {
      var rl = res.length;
      for (var i = 0; i < rl; i++) {
        var chapter = res[i];
        if (chapter['learnStatus'] == 1) {
          $("[chapterId=" + chapter['chapterId'] + "]", $target).prev().addClass("gxb-icon-ing");
        } else if (chapter['learnStatus'] == 2) {
          $("[chapterId=" + chapter['chapterId'] + "]", $target).prev().addClass("gxb-icon-end");
        }
      }

    });
  };


  exports.buildUnit = function (targetId, unitList, classId) {
    var $target = $("#" + targetId);
    $target.html(unitListView({
      unitList: unitList,
      toggleClass: "toggle-chapter"
    }));


    refershChapterSchedule(targetId, classId);
    $(".toggle-chapter", $target).on("click", function (e) {
      var $this = $(this);
      $this.toggleClass("active");
      $this.parent().next().toggleClass("gxb-hide").toggleClass("gxb-show");
      $this.closest(".unit-list").siblings().find(".toggle-chapter").removeClass("active");
      $this.closest(".unit-list").siblings().find(".gxb-show").removeClass("gxb-show").addClass("gxb-hide");
    })

  };


  gxb.controller.student = gxb.controller.student || {};
  gxb.controller.student.unit = module.exports;
});