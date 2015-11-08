# Template （artTemplate）

## 编写模板

在 ``04-template``的``ui&view``编写模板：
	
	<h1>{{title}}</h1>
	<ul>
	    {{each list as value i}}
	        <li>索引 {{i + 1}} ：{{value}}</li>
	    {{/each}}
	</ul>
	
	* ui    组件模版
	* view  页面模版

## 渲染模板
* 原生渲染 （ui）
	```
	var data = {
		title: '标签',
		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
	};
	var html = template('test', data);
	document.getElementById('content').innerHTML = html;
	```
	
* seajs 集成（view）
	```
	在 controller 中 调用service ，service 返回数据，调用view 执行view 生成 html
	define('controller/mvc/demo', ['service/mvc_service', "view/mvc/demo", "template"], function (require, exports, module) {
      var mvcService = require("service/mvc_service");
      var viewDemo = require("view/mvc/demo");
      exports.init = function () {
        mvcService.query(function (res) {
          console.log(viewDemo);
          console.log(viewDemo(res));
          $("<div></div>").html(viewDemo(res)).appendTo("body")
        })
      }
    });
    ```


##	模板语法

有两个版本的模板语法可以选择。

###	简洁语法
    不推荐使用
[查看语法与演示](https://github.com/aui/artTemplate/wiki/syntax:simple)

###	原生语法
	推荐使用
	<%if (admin){%>
		<%include('admin_content')%>
	
		<%for (var i=0;i<list.length;i++) {%>
			<div><%=i%>. <%=list[i].user%></div>
		<%}%>
	<%}%>

[查看语法与演示](https://github.com/aui/artTemplate/wiki/syntax:native)

## 方法 help.js

###	template.``helper``(name, callback)

添加辅助方法，可在模版中使用

