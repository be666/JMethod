<%--
  Created by IntelliJ IDEA.
  User: Bcaring
  Date: 2015/6/2
  Time: 23:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <title><tiles:getAsString name="title" defaultValue="高校邦"/></title>
    <%--user-scalable=no 移动 禁用缩放--%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/gxb.min.css"/>
    <script src="${contextPath}/js/lib.min.js" id="seajsnode"></script>
    <script src="${contextPath}/js/core.min.js"></script>
    <script>
        seajs.config({
            base: "${basePath}/js"
        });
        gxb.contextPath = "${contextPath}";
        gxb.user.setUser({
//            userId: 541513
        })
    </script>
</head>
<body>
<tiles:insertAttribute name="header"/>
<tiles:insertAttribute name="content"/>
<tiles:insertAttribute name="footer"/>
<script src="${contextPath}/js/ui.min.js"></script>
<script src="${contextPath}/js/config.min.js"></script>
<script>
    console.log("高校邦 2.0 ");
</script>
</body>
</html>
