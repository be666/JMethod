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