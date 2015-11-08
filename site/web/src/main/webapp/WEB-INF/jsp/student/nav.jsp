<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 10:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<div class="gxb-left clear-fix">
    <div class="classInfo">
        <div class="class-name">
            ${classes.className}
        </div>

        <span class="class-time">
            开课时间:${classes.startAtStr}
        </span>
    </div>
    <div class="study-per" id="userProgress">
        <div class="study-progress">
            <div class="progress-outer">
                <div class="progress-inner"></div>
            </div>
        </div>
        <span>
        学习进度
        </span>
    </div>
    <div class="menu-wrap" id="stuMenu">
    </div>
</div>
<script>
    var menuList = [{
        menuId: 1,
        menuText: "课程公告",
        menuUrl: "javascript:navTo(1)"
    }, {
        menuId: 2,
        menuText: "章节导航",
        menuUrl: "javascript:navTo(2)"
    }, {
        menuId: 3,
        menuText: "测验",
        menuUrl: "javascript:navTo(3)"
    }, {
        menuId: 4,
        menuText: "作业",
        menuUrl: "javascript:navTo(4)"
    }, {
        menuId: 5,
        menuText: "讨论区",
        menuUrl: "javascript:navTo(5)"
    }, {
        menuId: 6,
        menuText: "评分标准",
        menuUrl: "javascript:navTo(6)"
    }, {
        menuId: 7,
        menuText: "帮助中心",
        menuUrl: "javascript:navTo(7)"
    }];

    seajs.use(["controller/student/nav"], function (ctrl) {
        $(function () {
            ctrl.initMenu('stuMenu', menuList);
            ctrl.loadSchedule('userProgress', '${classes.classId}');
        });
    });

    var navTo = function (id) {
        switch (id) {
            case 1:
                window.location.href = "${contextPath}/class/${classId}/announcement";
                break;
            case 2:
                window.location.href = "${contextPath}/class/${classId}/unit";
                break;
            case 3:
                window.location.href = "${contextPath}/class/${classId}/quiz";
                break;
            case 4:
                window.location.href = "${contextPath}/class/${classId}/assignment";
                break;
            case 5:
                window.location.href = "${contextPath}/class/${classId}/forum";
                break;
            case 6:
                window.location.href = "${contextPath}/class/${classId}/score";
                break;
            case 7:
                window.location.href = "${contextPath}/class/${classId}/help";
                break;
        }
    }
</script>