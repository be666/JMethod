<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<div class="<tiles:getAsString name="class_ltb" defaultValue="imethod-body body-ltb"/>">
    <tiles:insertAttribute name="content_l"/>
    <div class="<tiles:getAsString name="class_tb" defaultValue="imethod-right" />">
        <div class="<tiles:getAsString name="class_c" defaultValue="imethod-content" />">
            <tiles:insertAttribute name="content_t"/>
            <tiles:insertAttribute name="content_b"/>
        </div>
        <tiles:insertAttribute name="content_r"/>
    </div>
</div>
