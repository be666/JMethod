/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  window.appName = window.appName || 'IMethod';
  window.modelName = window.modelName || 'IMethod.models';
  window.models = window.models || [];
  window.serviceName = window.serviceName || 'IMethod.services';
  window.services = window.services || [];
  window.controllerName = window.controllerName || 'IMethod.controllers';
  window.controllers = window.controllers || [];
  window.directiveName = window.directiveName || 'IMethod.directives';
  window.directives = window.directives || [];
  window.routers = window.routers || [];
  window.commonUrl = "/app/03-views/01-common";
  window.portalUrl = "/app/03-views/02-portal";
  window.consoleUrl = "/app/03-views/03-console";
  window.resourceUrl = "/app/03-views/04-resource";
  window.examUrl = "/app/03-views/05-exam";
  window.forumUrl = "/app/03-views/06-forum";
  window.chartsUrl = "/app/03-views/07-charts";
  window.chartsUrl = "/app/03-views/07-charts";
  window.xlsUrl = "/app/03-views/08-xls";
  window.demoUrl = "/app/03-views/09-demo";
  window.helperUrl = "/app/03-views/99-helper";

  window.DefNS = function (name, val) {
    name = name || "";
    name = name.split(".");
    var l = name.length;
    var i = 0;
    var $this = window;
    while (i < l) {
      if (i == l - 1) {
        $this[name[i]] = val || $this[name[i]] || {};
      } else {
        $this[name[i]] = $this[name[i]] || {};
      }
      $this = $this[name[i]];
      i++;
    }
  }
})();

var baseFunc = function () {
  console.log(arguments)
};
var dirName = function (cn) {
  return  "iMod" + cn;
};
var ctrlName = function (cn) {
  return controllerName + "." + cn;
};

var svcName = function (cn) {
  return serviceName + "." + cn;
};
var modName = function (cn) {
  return modelName + "." + cn;
};

var baseComponent = function (name, dep, func) {
  func = func || (typeof dep == "function" ? dep : baseFunc );
  dep = angular.extend([], dep);
  if (typeof name != "string") {
    return null
  } else {
    //DefNS(name,func);
    dep.push(func);
    return {
      name: name,
      config: dep
    }
  }
};

var initDir = function (name, dep, func) {
  return baseComponent(dirName(name), dep, func)
};

var initCtrl = function (name, dep, func) {
  return baseComponent(ctrlName(name), dep, func)
};

var initSvc = function (name, dep, func) {
  return baseComponent(svcName(name), dep, func)
};

var baseRouter = function (state, url, templateUrl, controller) {
  return {
    state: state,
    url: url,
    templateUrl: templateUrl,
    controller: controller
  }
};

var commonRouter = function (state, url, templateUrl, controller) {
  templateUrl = commonUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};

var portalRouter = function (state, url, templateUrl, controller) {
  templateUrl = portalUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};

var consoleRouter = function (state, url, templateUrl, controller) {
  templateUrl = consoleUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};

var resourceRouter = function (state, url, templateUrl, controller) {
  templateUrl = resourceUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var examRouter = function (state, url, templateUrl, controller) {
  templateUrl = examUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var forumRouter = function (state, url, templateUrl, controller) {
  templateUrl = forumUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var chartsRouter = function (state, url, templateUrl, controller) {
  templateUrl = chartsUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var xlsRouter = function (state, url, templateUrl, controller) {
  templateUrl = xlsUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var demoRouter = function (state, url, templateUrl, controller) {
  templateUrl = demoUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
var helperRouter = function (state, url, templateUrl, controller) {
  templateUrl = helperUrl + templateUrl;
  return baseRouter(state, url, templateUrl, controller)
};
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */

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

    }
  };

  services.push(initSvc("common.footer", [], svc))
})();
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
          url: "#",
          state:"index"
        }, {
          name: "资源中心",
          url: "#/resource",
          state:"resource"
        }, {
          name: "考试系统",
          url: "#/exam",
          state:"exam"
        }, {
          name: "论坛",
          url: "#/forum",
          state:"forum"
        }, {
          name: "图表",
          url: "#/charts",
          state:"charts"
        }, {
          name: "报表",
          url: "#/xls",
          state:"xls"
        }, {
          name: "帮助中心",
          url: "#/helper",
          state:"helper"
        }, {
          name: "作品展示",
          url: "#/demo",
          state:"demo"
        }, {
          name: "后台管理",
          url: "#/console",
          state:"console"
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
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("index",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {

    }
  };

  services.push(initSvc("console",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("resource",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("exam",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("forum",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("charts",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("xls",[],svc))
})();
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
      getId: function () {
        return 1;
      }
    }
  };

  services.push(initSvc("demo", [], svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("helper",[],svc))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var dct = initDir("Footer", function () {
    return {
      restrict: 'AE',
      replace: true,
      controller: ["$scope", "$element", function ($scope, $element) {
      }],
      templateUrl: commonUrl + "/footer.html"
    };
  });
  directives.push(dct);
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var dct = initDir("Header", [svcName("common.header")], function (hSvc) {
    return {
      restrict: 'AE',
      replace: true,
      controller: ["$scope", "$element", "$state", "$stateParams", function ($scope, $element, $state, $stateParams) {
        $scope.$state = $state;
        $scope.navList = hSvc.queryNavList();
        $scope.logo = hSvc.queryLogo();
      }],
      templateUrl: commonUrl + "/header.html"
    };
  });
  directives.push(dct);
})();
/**
 * auth : iMethod
 * create_at: 15/10/4.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var ctrl = initCtrl("index", ["$scope", svcName("index")], function ($scope, index) {

  });
  controllers.push(ctrl);
  routers.push(portalRouter("index", "", "/index.html", ctrl.name))
})();

/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("console", ["$scope", svcName("console")], function ($scope, cSvc) {
    console.log("console")
  });
  controllers.push(ctrl);
  routers.push(consoleRouter("console", "/console", "/console.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("resource", ["$scope", svcName("resource")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(resourceRouter("resource", "/resource", "/resource.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("exam", ["$scope", svcName("exam")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(examRouter("exam", "/exam", "/exam.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("forum", ["$scope", svcName("forum")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(forumRouter("forum", "/forum", "/forum.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("charts", ["$scope", svcName("charts")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(chartsRouter("charts", "/charts", "/charts.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("xls", ["$scope", svcName("xls")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(xlsRouter("xls", "/xls", "/xls.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("demo", ["$scope", svcName("demo")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(demoRouter("demo", "/demo", "/demo.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("helper", ["$scope", svcName("helper")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(helperRouter("helper", "/helper", "/helper.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("map", ["$scope", svcName("map")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(helperRouter("map", "/map", "/map/map.html", ctrl.name))
})();
/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var svcModule = angular.module(serviceName, []);
  var ctrlModule = angular.module(controllerName, [serviceName]);
  var directiveModule = angular.module(directiveName, [serviceName]);
// homeModule
  angular.forEach(services, function (svc) {
    svcModule.service(svc.name, svc.config)
  });
  angular.forEach(controllers, function (ctrl) {
    ctrlModule.controller(ctrl.name, ctrl.config)
  });

  angular.forEach(directives, function (dct) {
    directiveModule.directive(dct.name, dct.config)
  });

})();

/**
 * auth : iMethod
 * create_at: 15/10/4.
 * desc:
 * note:
 *  1.
 */
function routerConfig($stateProvider, $urlRouterProvider) {

  angular.forEach(routers, function (rout) {
    $stateProvider.state(rout.state, {
      url: rout.url,
      templateUrl: rout.templateUrl,
      controller: rout.controller
    })
  });
  $urlRouterProvider.otherwise("");
}

/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function(){
  angular.module(appName, ['ui.router', serviceName,controllerName,directiveName])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) {
      routerConfig($stateProvider, $urlRouterProvider);
      $sceProvider.enabled(false);
    }]);
})();

