/**
 * auth : bqxu
 * create_at: 15/10/28.
 * desc:
 * note:
 *  1.
 */
define('controller/student/quiz', [
  'service/student_service',
  "view/student/quiz/list",
  "view/student/quiz/question",
  "template"], function (require, exports, module) {
  var studentService = require("service/student_service");
  var quizListView = require("view/student/quiz/list");
  var questionListView = require("view/student/quiz/question");


  /**
   * 测验 quizList
   * @param targetId
   * @param quizList
   */
  exports.buildQuiz = function (targetId, quizList) {
    var $target = $("#" + targetId);
    $target.html(quizListView({
      quizList: quizList,
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
      var quizId = $this.attr("quiz_id");
      window.location.href = gxb.contextPath + "/class/" + classId + "/quiz/" + quizId;
    });

    $target.on("click.viewQuiz", ".quiz-view", function () {
      var $this = $(this);
      var quizSubmissionId = $this.attr("quiz_submission_id");
      var classId = $this.attr("context_id");
      var quizId = $this.attr("quiz_id");
      window.location.href = gxb.contextPath + "/class/" + classId + "/quiz/" + quizId + "/submission/" + quizSubmissionId;
    });
  };


  /**
   * join quiz
   * @type {{}|*}
   */
  exports.quizView = function (targetId, quizId, questionList) {
    $("#" + targetId).html(questionListView({
      questionList: questionList
    }));
  };

  exports.submissionView = function (targetId, quizSubmissionId, quizSubmission) {
    var $target = $("#" + targetId);
    //var submissionList = submitssion.quizSubmissionList;
    //var sl = submissionList.length;
    var submission = quizSubmission;
    var submissionData = submission['submissionData'];
    var i = null;
    //for (i = 0; i < sl; i++) {
    //  submission = submissionList[i];
    //  if (quizSubmissionId == submission['quizSubmissionId']) {
    //    submissionData = submission['submissionData'];
    //    break;
    //  }
    //}
    var quizSubData = JSON.parse(submissionData);
    var qL = quizSubData.length;
    for (i = 0; i < qL; i++) {
      var sub = quizSubData[i];
      var text = sub['text'];
      var questionId = sub['question_id'];
      var answerWap = $(".answer-wap[question_id=" + questionId + "]").eq(0);
      var questionType = answerWap.attr("question_type");
      var j;
      var answerId;
      if (questionType == "multiple_choice") {
        for (j = 0; j < text.length; j++) {
          answerId = text[j];
          $(".gxb-icon-radio[answer_id=" + answerId + "]", answerWap).addClass("checked");
        }
      }
      else if (questionType == "multiple_answers") {
        for (j = 0; j < text.length; j++) {
          answerId = text[j];
          $(".gxb-icon-check[answer_id=" + answerId + "]", answerWap).addClass("checked");
        }
      }
      else if (questionType == "fill_in_blank") {

      }
    }
  };

  exports.quizSubmit = function (targetId, btn, classId, quizId, startTime) {
    var $target = $("#" + targetId);
    var $btn = $("#" + btn);

    $($target).on("click", ".gxb-icon-check", function () {
      var $this = $(this);
      $this.toggleClass("checked");
    });

    $($target).on("click", ".gxb-icon-radio", function () {
      var $this = $(this);
      $this.toggleClass("checked");
      $this.closest(".answer").siblings().find(".gxb-icon-radio").removeClass("checked")
    });

    $btn.on("click", function () {
      studentService.submitQuiz(classId, quizId, startTime, submission($target), function (res) {
        alert(res);
      });
    });
  };

  var submission = function ($this) {
    var list = [];
    var answerWap = $(".answer-wap", $this);
    var l = answerWap.length;
    for (var i = 0; i < l; i++) {
      var $a = answerWap.eq(i);
      var questionId = $a.attr("question_id");
      var questionType = $a.attr("question_type");
      var answer = [];
      var $ck = null;
      var cl = null;
      var j = null;
      var $c = null;
      if (questionType == "multiple_choice") {
        $ck = $a.find(".gxb-icon-radio.checked");
        cl = $ck.length;
        for (j = 0; j < cl; j++) {
          $c = $ck.eq(j);
          if (!gxb.utils.nothing($c.attr("answer_id"))) {
            answer.push($c.attr("answer_id"))
          }
        }
      }
      else if (questionType == "multiple_answers") {
        $ck = $a.find(".gxb-icon-check.checked");
        cl = $ck.length;
        for (j = 0; j < cl; j++) {
          $c = $ck.eq(j);
          if (!gxb.utils.nothing($c.attr("answer_id"))) {
            answer.push($c.attr("answer_id"))
          }
        }
      }
      else if (questionType == "fill_in_blank") {

      }
      list.push({
        question_id: questionId,
        text: answer
      });
    }

    return list;
  };

  gxb.controller.student = gxb.controller.student || {};
  gxb.controller.student.quiz = module.exports;
})
;