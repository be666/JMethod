<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp"%>
<div class="<tiles:getAsString name="class_lcr" defaultValue="gxb-body"/>">
    <tiles:insertAttribute name="content_l"/>
    <tiles:insertAttribute name="content_c"/>
    <tiles:insertAttribute name="content_r"/>
</div>