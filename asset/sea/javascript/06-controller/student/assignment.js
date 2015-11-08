define('controller/student/assignment', [
    'service/student_service',
    "view/student/assignment/list",
    "template"
], function (require, exports, module) {
    var playEdit = require("controller/play/uedit");
    var studentService = require("service/student_service");
    var assignmentListView = require("view/student/assignment/list");

    exports.buildAssignment = function (targetId, assignmentList) {
        var $target = $("#" + targetId);
        $target.html(assignmentListView({
            assignmentList: assignmentList,
            toggleClass: "toggle-chapter"
        }));


        $(".toggle-chapter", $target).on("click", function (e) {
            var $this = $(this);
            $this.toggleClass("active");
            $this.parent().next().toggleClass("gxb-hide").toggleClass("gxb-show");
            $this.closest(".unit-list").siblings().find(".toggle-chapter").removeClass("active");
            $this.closest(".unit-list").siblings().find(".gxb-show").removeClass("gxb-show").addClass("gxb-hide");
        });

        $target.on("click.quizTitle", ".quiz-title", function () {
            var $this = $(this);
            $this.next().toggleClass("gxb-hide");
        });

        $target.on("click.joinQuiz", ".quiz-join", function () {
            var $this = $(this);
            var classId = $this.attr("context_id");
            var assignmentId = $this.attr("assignment_id");
            window.location.href = gxb.contextPath + "/class/" + classId + "/assignment/" + assignmentId;
        });

        //$target.on("click.viewQuiz", ".quiz-view", function () {
        //    var $this = $(this);
        //    var quizSubmissionId = $this.attr("quiz_submission_id");
        //    var classId = $this.attr("context_id");
        //    var quizId = $this.attr("quiz_id");
        //    window.location.href = gxb.contextPath + "/class/" + classId + "/quiz/" + quizId + "/submission/" + quizSubmissionId;
        //});
    };

    gxb.controller.student = gxb.controller.student || {};
    gxb.controller.student.assignment = module.exports;
});