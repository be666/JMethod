<%@ page import="java.io.OutputStream" %>
<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/22
  Time: 13:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String RequestUrl = (String) request.getAttribute("RequestUrl");
    String responseBody = (String) request.getAttribute("responseBody");
    Object exception = request.getAttribute("exception");
    String errorMsg = "";

//    if (exception instanceof ApiException) {
//        ApiException apiException = (ApiException) exception;
//        errorMsg = apiException.getMessage();
//    }
    if ("true".equals(responseBody)) {
        response.setContentType("application/json; charset=UTF-8");
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(errorMsg.getBytes("utf-8"));
        outputStream.flush();
        outputStream.close();
        response.setStatus(500);
        return;
    } else {
        response.setContentType("text/html; charset=UTF-8");
        response.setStatus(500);
    }
%>
500 页面；
