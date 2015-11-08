/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("exam", ["$scope", svcName("exam")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(examRouter("exam", "/exam", "/exam.html", ctrl.name))
})();