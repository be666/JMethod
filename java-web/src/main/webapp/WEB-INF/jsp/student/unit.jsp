<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<div class="unit-container" id="unitList">


</div>
<script>
    var unitList =${gxb:toJSONlLine(unit)};
    seajs.use(["controller/student/unit"], function (ctrl) {
        $(function () {
            ctrl.buildUnit('unitList', unitList, '${classes.classId}');
        });
    });
</script>