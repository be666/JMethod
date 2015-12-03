<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/include.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <title><tiles:getAsString name="title" defaultValue="imethod"/></title>
    <%--user-scalable=no 移动 禁用缩放--%>
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/boot.min.css"/>
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/imethod.min.css"/>
    <link rel="stylesheet" type="text/css" href="${contextPath}/css/plugin.min.css"/>
    <script src="${contextPath}/js/lib.min.js" id="seajsnode"></script>
    <script src="${contextPath}/js/core.min.js"></script>
    <script>
        seajs.config({
            base: "${contextPath}/js"
        });
        iMethod.contextPath = "${contextPath}";
    </script>
    <style>

        .form-signin {
            max-width: 330px;
            padding: 15px;
            margin: 0 auto;
        }

        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }

        .form-signin .checkbox {
            font-weight: normal;
        }

        .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    </style>
</head>
<body>
<div class="iMethod-header-warp">
    <div class="row iMethod-header clear-fix">
        <div class="col-md-8 iMethod-header-left">
            <div class="iMethod-logo">
                <a href="${contextPath}/">
                    iMethod framework
                </a>
            </div>

        </div>
    </div>
</div>
<div class="iMethod-body">
    <div class="container">
        <form class="form-signin" method="post">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" id="inputEmail" class="form-control"
                   name="inputEmail"
                   placeholder="Email address or UserName" required=""
                   autofocus="">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword"
                   name="inputPassword" class="form-control" placeholder="Password"
                   required="">

            <%--<div class="checkbox">--%>
            <%--<label>--%>
            <%--<input type="checkbox" value="remember-me"> Remember me--%>
            <%--</label>--%>
            <%--</div>--%>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    </div>
</div>
<%@include file="/WEB-INF/jsp/common/footer.jsp" %>
<script src="${contextPath}/js/ui.min.js"></script>
<script src="${contextPath}/js/config.min.js"></script>
<script src="${contextPath}/js/plugin.min.js"></script>
<script>
    console.log("iMethod 1.0 ");
</script>
</body>
</html>
