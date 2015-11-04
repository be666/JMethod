# 页面响应规范
    原因:
    服务器支持 tilesViewResolver 、InternalResourceViewResolver

## 渲染  
* tilesViewResolver 
请求返回页面使用tiles模版渲染
通过 WEB-INF/tiles 下定义的 xml 中 definition 的name 渲染返回视图  
对应 jsp 文件在 WEB-INF/jsp 下进行开发
    
* InternalResourceViewResolver
请求返回页面使用jsp渲染 (仅单个jsp 情况下,存在页面复用的时候，请使用tiles)
对应 jsp 文件在 WEB-INF/view 下进行开发

## 说明 
* WEB-INF/include.jsp
在该文件中定义系统使用到的taglib，拒接重复定义，避免路径不一，导致系统exception
提供全局对象:
 contextPath 虚拟上下文
 basePath    虚拟上下文 全路径
在jsp 中${contextPath},${basePath} 直接使用它们

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="tilesx" uri="http://tiles.apache.org/tags-tiles-extras" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    request.setAttribute("contextPath", path);
    request.setAttribute("basePath", basePath);
%>
```

* 优先级
tilesViewResolver  1
InternalResourceViewResolver 2
返回页面时 默认返回 tiles 模版页（如果有定义）





   

