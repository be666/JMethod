/**
 * auth : bqxu
 * create_at: 15/10/23.
 * desc:
 * note:
 *  1.
 */
define('service/student_service', function (require, exports, module) {


  /**
   * 班次信息
   * @param classId
   * @param callback
   */
  exports.queryClass = function (classId, callback) {
    gxb._.ajax({
      url: "/classes/" + classId,
      type: "get",
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  /**
   *
   * 班次下学习进度百分比
   * @param classId
   * @param callback
   */
  exports.querySchedule = function (classId, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/schedule",
      data: {
        userId: gxb.user.getUserId()
      },
      type: "get",
      dateType: 'text',
      success: function (res) {
        callback && callback(res)
      }
    })
  };


  /**
   *
   * 班次下 最后学习纪录
   * @param classId
   * @param callback
   */
  exports.queryLastSchedule = function (classId, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/schedule/last",
      data: {
        userId: gxb.user.getUserId()
      },
      type: "get",
      dateType: 'json',
      success: function (res) {
        callback && callback(res)
      }
    })
  };


  /**
   * 班次下章＋节
   * @param classId
   * @param callback
   */
  exports.queryUnit = function (classId, callback) {
    gxb._.ajax({
      url: "/classes/" + classId + "/unit",
      type: "get",
      success: function (res) {
        callback && callback(res)
      }
    })
  };


  /**
   * 班次下章节学习进度
   * @param classId
   * @param callback
   */
  exports.queryChapterSchedule = function (classId, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/chapter/schedule",
      data: {
        userId: gxb.user.getUserId()
      },
      type: "get",
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  /**
   * 即将过期
   * @param classId
   * @param callback
   */
  exports.queryExpiringTask = function (classId, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/task/expiring",
      type: "get",
      dateType: 'json',
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  /**
   * 过期任务
   * @param classId
   * @param callback
   */

  exports.queryExpiredTask = function (classId, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/task/expired",
      type: "get",
      dateType: 'json',
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  /**
   *
   */
  exports.submitQuiz = function (classId, quiz, startTime, quizSubmission, callback) {
    gxb._.ajax({
      url: "/class/" + classId + "/quiz/" + quiz + "/submission",
      type: "post",
      data: {
        startTime: startTime,
        quizSubmission: JSON.stringify(quizSubmission)
      },
      dateType: 'json',
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  exports.queryChapter = function (classId, chapterId,callback) {
    gxb._.ajax({
      url: "class/"+classId+"/chapter/" + chapterId,
      type: "post",
      dateType: 'json',
      success: function (res) {
        callback && callback(res)
      }
    })
  };

  gxb.service.student_service = module.exports
});
