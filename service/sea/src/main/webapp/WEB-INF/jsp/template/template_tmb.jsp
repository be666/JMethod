<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<div class="<tiles:getAsString name="class_tmb" defaultValue=""/>">
    <tiles:insertAttribute name="content_t"/>
    <tiles:insertAttribute name="content_m"/>
    <tiles:insertAttribute name="content_b"/>
</div>