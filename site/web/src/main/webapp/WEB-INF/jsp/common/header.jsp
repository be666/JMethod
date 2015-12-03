<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 10:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<div class="iMethod-header-warp">
    <div class="row iMethod-header clear-fix">
        <div class="col-md-8 iMethod-header-left">
            <div class="iMethod-logo">
                <a href="${contextPath}/">
                    iMethod framework
                </a>
            </div>

        </div>
        <c:if test="${!LUser.guest}">
            <div class="col-md-4 iMethod-header-right">
                <div class="iMethod-user-info pull-right" id="iMethodUser">

                    <div class="text">
                        <span class="user-name">${LUser.user.userName}</span>
                        <span class="nav-toggle">&#9660</span>
                        <ul class="iMethod-hide">
                            <li><a href="${contextPath}/logout">退出</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </c:if>
    </div>
</div>
<script>
    $(function () {
        var $toggle = $(".nav-toggle", "#iMethodUser");
        $toggle.parent().on("click", function () {
            var $this = $(this);
            $this.find("ul").toggleClass("iMethod-hide");
        })
    })
</script>