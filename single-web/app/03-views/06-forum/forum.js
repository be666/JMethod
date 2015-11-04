/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function () {
  var ctrl = initCtrl("forum", ["$scope", svcName("forum")], function ($scope, mSvc) {
  });
  controllers.push(ctrl);
  routers.push(forumRouter("forum", "/forum", "/forum.html", ctrl.name))
})();