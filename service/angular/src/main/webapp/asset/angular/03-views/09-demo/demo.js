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