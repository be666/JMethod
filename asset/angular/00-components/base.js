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