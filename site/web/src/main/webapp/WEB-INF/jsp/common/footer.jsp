<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 15/10/16
  Time: 10:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="iMethod-footer-warp">
    <div class="iMethod-footer" style="text-align: center;">
        Copyright &copy;2015 iMethod
    </div>
</div>
<script>
    $(function () {
        var fixHeight = function () {
            var wh = $(window).height();
            var min_bh = wh - 144;
            $(".iMethod-body").css({"min-height": min_bh + "px"})
        };
        iMethod.resize.push("fixHeight", fixHeight);
        fixHeight();
    })
</script>