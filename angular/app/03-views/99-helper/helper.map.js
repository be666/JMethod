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
  routers.push(helperRouter("map", "/map", "/helper.map.html", ctrl.name))
})();