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