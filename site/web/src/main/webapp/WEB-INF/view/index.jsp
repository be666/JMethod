<%@ page import="org.springframework.data.redis.core.RedisTemplate" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.springframework.data.redis.core.BoundValueOperations" %>
<%@ page import="java.util.concurrent.TimeUnit" %>
<%@ page import="org.springframework.data.redis.core.BoundHashOperations" %>
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
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/gxb.min.css"/>
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
<%
    RedisTemplate redisTemplate= (RedisTemplate) WebApplicationContextUtils.getWebApplicationContext(request.getServletContext()).getBean("redisTemplate");
    BoundHashOperations boundValueOperations=redisTemplate.boundHashOps("test");
    boundValueOperations.put("test", "fuck");
    boundValueOperations.expire(100000l, TimeUnit.DAYS);
    System.out.println(redisTemplate.keys("test").size());
%>
<a href="${contextPath}/ui">ui</a>
<a href="${contextPath}/class/2086/unit">unit</a>
</body>
</html>
