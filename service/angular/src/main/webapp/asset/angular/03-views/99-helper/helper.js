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