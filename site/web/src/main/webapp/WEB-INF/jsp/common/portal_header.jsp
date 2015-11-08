<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="gxb-header">
    <div class="gxb-header-content clear-fix">
        <div class="gxb-header-left">
            <div class="gxb-logo">
                <a href="#">
                    <img class="logo-img" src="${contextPath}/image/logo.png"/>
                </a>
            </div>
            <div class="gxb-nav-content">
                <a href="#">首页</a>
                <a href="#">课程</a>
                <a class="active" href="#">个人中心</a>
                <a href="#">管理员入口</a>
            </div>
        </div>
        <div class="gxb-header-right">
            <div class="gxb-search">
                <span class="gxb-icon-search"></span>
                <input class="gxb-search-input" name="keyword" id="keyword" placeholder="搜索关键词" maxlength="30" type="text">
            </div>
            <div class="gxb-user-info" id="gxbUser">
                <img src="${contextPath}/image/avatar.png">
                <sapn class="text">${gxbUser.user.userName}<i class="gxb-icon-toggle"></i></sapn>
                <div class="gxb-opts gxb-hide">
                    <ul>
                        <li><a href="#">我的课程</a></li>
                        <li><a href="#">个人设置</a></li>
                        <li><a href="#">退出</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function(){
        var $toggle=$(".gxb-icon-toggle","#gxbUser");
        $toggle.on("click",function(){
            $toggle.parent().next().toggleClass("gxb-hide").toggleClass("gxb-show")
        })
    })
</script>