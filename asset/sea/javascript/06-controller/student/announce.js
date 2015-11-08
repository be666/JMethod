define('controller/student/announce', ['service/student_service',"view/student/announce/info","view/student/announce/task","view/student/announce/calendar", "template"], function (require, exports, module) {
    var studentService = require("service/student_service");
    var announceView = require("view/student/announce/info");
    var expireView = require("view/student/announce/task");
    var calendarView = require("view/student/announce/calendar");

    exports.buildAnnounce = function (targetId, announceList) {
        var $target = $("#" + targetId);
        $target.html(announceView({
            announceList: announceList
        }));

        $(".open-close").eq(0).addClass("open").prev(".announcement-content").addClass("open");

        $(".open-close").on("click",function(){
            $(this).toggleClass("open");
            if($(this).hasClass("open")){
              $(this).prev(".announcement-content").addClass("open");
            }else{
                $(this).prev(".announcement-content").removeClass("open");
            }
        })

    };

    exports.buildExpiring = function(targetId,classId,expiringList){
        var $target = $("#" + targetId);
        studentService.queryExpiringTask(classId,function(res){
            $target.html(expireView({
                taskList:res||expiringList||[]
            }));
        });

    }

    /**
     * 过期任务
     * @param targetId
     * @param expiredList
     */
    exports.buildExpired = function(targetId, classId,expiringList){
        var $target = $("#" + targetId);
        studentService.queryExpiredTask(classId,function(res){
            $target.html(expireView({
                taskList:res||expiringList||[]
            }));
        })

    };


    /**
     * 课程日历
     * @type {{}|*}
     */
    exports.buildCalendar = function(targetId, calendarList){
        var $target = $("#" + targetId);
        $target.html(calendarView({
            calendarList: calendarList
        }));
       $(".sequence-chart li").eq(0).addClass("first");
    }




    gxb.controller.student = gxb.controller.student || {};
    gxb.controller.student.announce = module.exports;
});