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