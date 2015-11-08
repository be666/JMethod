<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<header class="gxb-header">
    <div class="gxb-header-container">
        <a class="gxb-logo pull-left" href="http://hotfix-buaa.gaoxiaobang.cn/">
            <img alt="Logo color" class="logo-img pull-left" data-at2x="/assets/images/logo_color@2x.png"
                 src="http://gxb-test1.s3.bj.xs3cnc.com/uploads/institution_top_white_badge_image/link/450411/__60.png">

            <div class="tenant-name pull-left">北京航空航天大学</div>
        </a>
        <nav class="pull-left">
            <ul class="nav nav-pills">
                <li><a href="http://hotfix-buaa.gaoxiaobang.cn/" class="cms-index-link">首页</a></li>
                <li class="active"><a href="http://hotfix-buaa.gaoxiaobang.cn/gxb#/port/course_square"
                                      class="cms-course-link">课程</a></li>
                <li><a href="http://hotfix-buaa.gaoxiaobang.cn/gxb#/home" class="personal-center-link">个人中心</a></li>
                <li><a href="http://hotfix-buaa.gaoxiaobang.cn/gxb#/port/manager_enter" class="cms-admin-link">管理员入口</a>
                </li>
            </ul>
        </nav>
        <div class="user-menu pull-right">
            <div class="dropdown user">
                <div class="dropdown-toggle" id="user-menu" data-toggle="dropdown">
                    <img src="http://hotfix-cms.gaoxiaobang.cn/users/avatars/6790" alt="avatar">
                    <span class="username user-name-or-student-number">尚帝</span>
                    <span class="caret"></span>
                </div>
                <ul class="dropdown-menu" role="menu" aria-labelledby="user-menu">
                    <!-- <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)" class="personal-center-link">我的高校邦</a></li> -->
                    <li role="presentation"><a role="menuitem" tabindex="-1"
                                               href="http://hotfix-buaa.gaoxiaobang.cn/gxb#/home/collection"
                                               class="personal-collection-link">我的课程</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1"
                                               href="http://hotfix-buaa.gaoxiaobang.cn/users/edit"
                                               class="personal-setting-link">设置</a></li>
                    <!-- <li role="presentation"><a role="menuitem" tabindex="-1" href="http://hotfix-cms.gaoxiaobang.cn/users/edit">设置</a></li> -->
                    <li role="presentation"><a role="menuitem" tabindex="-1"
                                               href="/users/sign_out?redirect_to=http%3A%2F%2Fhotfix-buaa.gaoxiaobang.cn"
                                               class="logout-link">退出</a></li>
                </ul>
            </div>
        </div>
        <div class="search-blk pull-right">
            <form action="" class="form-inline gxb-header-search">
                <div class="form-group">
                    <label for="" class="sr-only"></label>
                    <input type="text" class="form-control" name="gxb-header-search">
                </div>
                <button href="#" class="btn btn-link search-btn"><span class="glyphicon glyphicon-search"></span>
                </button>
            </form>
        </div>
    </div>
</header>