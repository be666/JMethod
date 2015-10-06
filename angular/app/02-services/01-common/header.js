/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var svc = function () {
    return {
      queryNavList: function () {
        return [{
          name: "首页",
          url: "#"
        }, {
          name: "资源中心",
          url: "#/resource"
        }, {
          name: "考试系统",
          url: "#/exam"
        }, {
          name: "论坛",
          url: "#/forum"
        }, {
          name: "图表",
          url: "#/charts"
        }, {
          name: "报表",
          url: "#/xls"
        }, {
          name: "帮助中心",
          url: "#/helper"
        }, {
          name: "作品展示",
          url: "#/demo"
        }, {
          name: "后台管理",
          url: "#/console"
        }];
      },
      queryLogo:function(){
        return {
          src:"",
          alt:"alt"
        }
      }
    }
  };

  services.push(initSvc("common.header", [], svc))
})();