# frontend framework

##   00-lib
    引入 jquery bootstrap seajs arttemplate(模版引擎)
##   01-core
    基础组件与封装
    * 00-gxb.js     基础单元  
    * 01-log.js     conole.log 处理
    * 02-json.js    JSON 修正
    * 03-http.js    ajax 封装 
    * 04-dialog.js  alert,confirm 封装
    * 05-util.js    提供utils 支持
    * 06-heart.js   心跳组件
##   02-service
    数据 loading 和 处理单元
* demo  mvc_service.js
    ```
    define('service/mvc_service', function (require, exports, module) {
      exports.query = function (callback) {
        gxb._.ajax({
          url: "/mvc/demo",
          type: "post",
          success: function (res) {
            console.log(res);
            callback && callback(res)
          }
        })
      }
      gxb.service.mvc_service = module.exports
    });
    ```
    说明:
    1.固有格式,一个模块一个service ，如 user_service,class_service,quiz_service ...
    ```
    define('service/xxx_service', function (require, exports, module) {
          ....
          gxb.service.xxx_service = module.exports
    });
    ```
    2. gxb._.ajax  代替 $.ajax  为统一控制
    
##   04-template
    视图 模版 
   
##   05-ui
    ui 组件
##   06-controller
    交互
* demo   mvc/demo.js  
    ``` 
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
      gxb.controller.mvc = gxb.controller.mvc || {};
      gxb.controller.mvc.demo = module.exports;
    });
    ```
    说明:
        1.固有格式,可以一个页面一个 controller 也可以多页面 公用 
        ```
        define('controller/xxx', ['service/xxx', "view/xxx", "template"], function (require, exports, module) {
              var mvcService = require("service/xxx");
              var viewDemo = require("view/xxx");
              
              gxb.controller.xxx= module.exports;
            });
        ```
        2. 必须在[] 申明 依赖，在 require 取到对应对象，方法
##   07-config
    配置
    略