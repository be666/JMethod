<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 11:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="gxb-next" id="lastSchedule">

</div>
<script>

    seajs.use(["controller/student/next"], function (ctrl) {
        $(function () {
            ctrl.buildNext('lastSchedule', '${classes.classId}');
        });
    });

</script>