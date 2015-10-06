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
