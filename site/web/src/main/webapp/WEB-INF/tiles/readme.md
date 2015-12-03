# tiles 布局模版
    说明、知识 略
    使用意义
    * 规范页面布局
    * jsp 复用
    * 拒绝大范围 include head nav footer 的 页面
    * 页面 模块话管理
    * stylesheet javascript 按模块管理
    * 更多
## template
```
<definition name="template" template="/WEB-INF/jsp/template/template_main.jsp">
页面主模版 :/WEB-INF/jsp/template/template_main.jsp
    网站通用信息(title、head、bottom、站长统计等)内容 
    全局stylesheet:  
        <link href="${contextPath}/css/boot.min.css">
    全局javascript: 
        <script src="${contextPath}/js/lib.min.js" id="seajsnode"></script>
        <script src="${contextPath}/js/core.min.js"></script>
        <script src="${contextPath}/js/ui.min.js"></script>
        <script src="${contextPath}/js/config.min.js"></script>
```    
    

* template.lr,template.lcr,template.tb,template.tmb
简单页面模版:  lr(左右)、lcr(左中右)、tb(上下)、tmb(上中下)布局


* template.tlr,template.ltb,template.ltcr
嵌套页面模版: tlr 上＋下(左右)、ltb 左 ＋ 右（上下）、ltcr 左 ＋ 右(上 ＋下(中 ＋ 右))) 布局


