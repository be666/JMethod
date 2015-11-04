<%@ page import="com.gxb.sites.web.sys.client.RestClient" %>
<%@ page import="java.util.*" %>
<%@ page import="com.gxb.sites.web.sys.ApplicationHelper" %>
<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/22
  Time: 10:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
   
%>
<%--<%=ApplicationHelper.getBean(RestClient.class)%>--%>
<%
    Properties property = System.getProperties();
    Enumeration<?> propertyNames = property.propertyNames();
    while (propertyNames.hasMoreElements()) {
        String pName = (String) propertyNames.nextElement();
        System.out.print(pName);
        System.out.print("\t");
        System.out.println(property.getProperty(pName));
    }
    Map<String, String> envs = System.getenv();
    Set<Map.Entry<String, String>> entrySet = envs.entrySet();
    Iterator<Map.Entry<String, String>> iterator = entrySet.iterator();
    while (iterator.hasNext()) {
        Map.Entry<String, String> entry = iterator.next();
        System.out.print(entry.getKey());
        System.out.print("\t");
        System.out.println(entry.getValue());
    }
%>