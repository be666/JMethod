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

## 模块划分 
### portal
```
 <definition name="portal" extends="template">
 首页(前台基础)模版  上中下布局
```

### console 
```
 <definition name="console" extends="template">
 后台模版(预留待定) 上中下
```

### student 
```
 <definition name="student" extends="template">
 学习中心 基础模版
```            
#### student.ltb 
学习中心 通用模版 左 ＋ 上 ＋ 下 布局
/WEB-INF/jsp/student/nav.jsp    复用左侧导航
/WEB-INF/jsp/student/next.jsp   复用页头，当前课程内容学习提示   
````
<definition name="student.ltb" extends="template.ltb">
    <put-attribute name="content_l" value="/WEB-INF/jsp/student/nav.jsp"/>
    <put-attribute name="content_t" value="/WEB-INF/jsp/student/next.jsp"/>
</definition>
````
##### demo 1
章节导航
页面主体布局 继承 student
页面内容布局 继承 student.ltb
只需编写 /WEB-INF/jsp/student/unit.jsp页面 其他布局类似
```` 
<definition name="student.unit" extends="student">
    <put-attribute name="content">
        <definition extends="student.ltb">
            <put-attribute name="content_b" value="/WEB-INF/jsp/student/unit.jsp"/>
        </definition>
    </put-attribute>
</definition>
````
#### demo 2
课程公告
页面主体布局 继承 student
页面内容布局 继承 template.ltcr ()
需开发 /WEB-INF/jsp/student/announcements.jsp 
需开发 /WEB-INF/jsp/student/learning.jsp
````
<definition name="student.announcements" extends="student">
    <put-attribute name="content">
        <definition extends="template.ltcr">
            <put-attribute name="content_l" value="/WEB-INF/jsp/student/nav.jsp"/>
            <put-attribute name="content_t" value="/WEB-INF/jsp/student/next.jsp"/>
            <put-attribute name="content_c" value="/WEB-INF/jsp/student/announcements.jsp"/>
            <put-attribute name="content_r" value="/WEB-INF/jsp/student/learning.jsp"/>
        </definition>
    </put-attribute>
</definition>
````

### teacher
```
 <definition name="teacher" extends="template">
 教学中心基础模版
```

### tenant
```
<definition name="tenant" extends="template">
租户后台管理基础模版
```

