/**
 * auth : bqxu
 * create_at: 15/11/3.
 * desc:
 * note:
 *  1.
 */
define('controller/student/chapter', [
  'service/student_service',
  "controller/play/video",
  "controller/play/doc",
  "view/student/chapter/info",
  'view/student/chapter/video',
  'view/student/chapter/doc',
  'view/student/chapter/assignment',
  'view/student/chapter/quiz',
  'view/student/chapter/topic',
  'view/student/chapter/page',
  "template"
], function (require, exports, module) {
  var studentService = require("service/student_service");
  var chapterInfo = require("view/student/chapter/info");
  var playDoc = require("controller/play/doc");
  var playVideo = require("controller/play/video");
  var videoView = require('view/student/chapter/video');
  var docView = require('view/student/chapter/doc');
  var assignmentView = require('view/student/chapter/assignment');
  var quizView = require('view/student/chapter/quiz');
  var topicView = require('view/student/chapter/topic');
  var pageView = require('view/student/chapter/page');
  var utils = gxb.utils;
  var _chaperList = [];
  var _classId = null;
  var chapterHash = new gxbHash();
  var chapterTargetId = null;
  var chapterMenuId = null;
  exports.initChapter = function (targetId, menuId, unitList, classId, chapterId) {
    chapterTargetId = targetId;
    chapterMenuId = menuId;
    _classId = classId;
    var uLength = unitList.length;
    for (var i = 0; i < uLength; i++) {
      var chapterList = unitList[i].chapterList || [];
      var cLength = chapterList.length;
      var chapter;
      for (var j = 0; j < cLength; j++) {
        chapter = chapterList[j];
        if (!utils.nothing(chapter)) {
          chapter['index'] = _chaperList.length;
          _chaperList.push(chapter);
        }
      }
    }
    publishChapterHash();
    initChapterHash(chapterId);
    var $target = $("#" + targetId);
    $target.on("click.chapterPre", ".chapter-pre", preChapter);
    $target.on("click.chapterPre", ".chapter-next", nextChapter);
    $("#" + menuId).on("click.chapterInfo", ".chapter-info", clickChapter);
  };

  var preChapter = function () {
    var hash = chapterHash.getHash() || {};
    var chapterId = hash['chapterId'];
    var chapter = utils.arrFind(_chaperList, function (obj, i, arr) {
        return obj['chapterId'] == chapterId ? obj : null;
      }) || [];
    chapter = chapter[0] || {};
    var index = chapter['index'];
    if (index == 0) {
      return;
    }
    var pre = _chaperList[index - 1];
    chapterHash.change({
      chapterId: pre['chapterId']
    })
  };


  var nextChapter = function () {
    var hash = chapterHash.getHash() || {};
    var chapterId = hash['chapterId'];
    var chapter = utils.arrFind(_chaperList, function (obj, i, arr) {
        return obj['chapterId'] == chapterId ? obj : null;
      }) || [];
    chapter = chapter[0] || {};
    var index = chapter['index'];
    if (index == _chaperList.length - 1) {
      return;
    }
    var next = _chaperList[index + 1];
    chapterHash.change({
      chapterId: next['chapterId']
    })
  };

  var clickChapter = function () {
    var $this = $(this);
    console.log($this);
    var chapterId = $this.attr("chapter_id");
    chapterHash.change({
      chapterId: chapterId
    })
  };

  var publishChapterHash = function () {
    chapterHash.publish("chapter", function (arg) {
      var chapterId = arg['chapterId'];
      changeViewByChapterId(chapterId);
    });
  };

  var initChapterHash = function (chapterId) {
    var hash = chapterHash.getHash() || {};
    if (utils.nothing(hash['chapterId'])) {
      hash['chapterId'] = chapterId;
    }
    if (utils.nothing(hash['state'])) {
      hash['state'] = 'chapter';
    }
    chapterHash.init(hash);
  };


  var changeViewByChapterId = function (chapterId) {
    var chapter = utils.arrFind(_chaperList, function (obj, i, arr) {
        return obj['chapterId'] == chapterId ? obj : null;
      }) || [];
    chapter = chapter[0] || {};
    var $target = $("#" + chapterTargetId);
    //chapter-info
    $(".chapter-info", $target).html(chapterInfo({title: chapter['title']}));
    $(".chapter-info", $target).find(".chapter-pre").show();
    $(".chapter-info", $target).find(".chapter-next").show();
    if (chapter['index'] == 0) {
      $(".chapter-info", $target).find(".chapter-pre").hide()
    }
    if (chapter['index'] == _chaperList.length - 1) {
      $(".chapter-info", $target).find(".chapter-next").hide()
    }
    //unit Info
    var unitId = chapter['unitId'];
    var chapterId = chapter["chapterId"];
    console.log()
    $('#' + chapterMenuId).find(".unit-list >ul").addClass("gxb-hide");
    $('#' + chapterMenuId).find("[data-unit-id=" + unitId + "] >ul").removeClass("gxb-hide");
    $('#' + chapterMenuId).find(".chapter-info").closest("li").removeClass("active");
    $('#' + chapterMenuId).find(".chapter-info[chapter_id=" + chapterId + "]").closest("li").addClass("active");
    switch (chapter['contentType']) {
      case "Video":
        toVideoView(chapter);
        break;
      case "Quiz":
        toQuizView(chapter);
        break;
      case "Assignment":
        toAssignmentView(chapter);
        break;
      case "Page":
        toPageView(chapter);
        break;
      case "Asset":
        toDocView(chapter);
        break;
      case "Topic":
        toTopicView(chapter);
        break;
    }
  };

  var toDocView = function (chapter) {
    var $target = $("#" + chapterTargetId);
    $(".chapter-content", $target).html("docView");
    $(".chapter-content", $target).html(docView());
    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {
      docView("docScope", res);
    })
  };

  var toVideoView = function (chapter) {
    var $target = $("#" + chapterTargetId);

    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {
        chapter=res['chapter']||{};
        var school=res['school']||{};
        var host=school['schoolHost']||{};
        var video=chapter['video'];
        $(".chapter-content", $target).html(videoView({video:video}));
        playVideo("videoScope", {
            video:video,
            host:host
        });
    })
  };


  var toQuizView = function (chapter) {
    var $target = $("#" + chapterTargetId);
    $(".chapter-content", $target).html(quizView());
    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {

    })
  };

  var toAssignmentView = function (chapter) {
    var $target = $("#" + chapterTargetId);
    $(".chapter-content", $target).html(assignmentView());
    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {

    })
  };

  var toTopicView = function (chapter) {
    var $target = $("#" + chapterTargetId);
    $(".chapter-content", $target).html(topicView());
    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {

    })
  };

  var toPageView = function (chapter) {

    var $target = $("#" + chapterTargetId);
    studentService.queryChapter(_classId, chapter['chapterId'], function (res) {
        chapter=res['chapter'];
        var page=chapter['page'];
        $(".chapter-content", $target).html(pageView({page:page}));
    });
  };

  gxb.controller.student = gxb.controller.student || {};
  gxb.controller.student.chapter = module.exports;
});