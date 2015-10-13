/**
 * auth : iMethod
 * create_at: 15/10/8.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("index.test", ["$scope", svcName("index")], function ($scope, index) {

  });
  controllers.push(ctrl);
  routers.push(portalRouter("index.test", "/test", "/index.test.html", ctrl.name))
})();