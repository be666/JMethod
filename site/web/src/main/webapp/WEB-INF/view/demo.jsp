<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/13
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<html>
<head>

    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title></title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/boot.min.css"/>
    <script src="<%= request.getContextPath() %>/js/lib.min.js" id="seajsnode"></script>
    <script src="<%= request.getContextPath() %>/js/core.min.js"></script>
    <script src="<%= request.getContextPath() %>/js/ui.min.js"></script>
    <script src="<%= request.getContextPath() %>/js/config.min.js"></script>
    <script>

        // 异步独立加载 jquery
        seajs.config({
            base: "<%= request.getContextPath() %>/js",
            vars: {
                "contextPath": "<%= request.getContextPath() %>"
            }
        });
        gxb.contextPath = "<%= request.getContextPath() %>";
    </script>
</head>
<body>
<script>
    seajs.use(["controller/mvc/demo"], function (ctrl) {
        ctrl.init()
    });
    $("<div></div>").html(template("pagination", {
        pageObj: {
            pageList: [1, 3, 4, 5, 6, 7],
            curPage: 1,
            totalPages: 2
        }
    })).appendTo("body")
</script>
</body>
</html>
