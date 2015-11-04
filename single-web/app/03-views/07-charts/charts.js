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