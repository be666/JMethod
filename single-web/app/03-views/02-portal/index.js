/**
 * auth : iMethod
 * create_at: 15/10/4.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var ctrl = initCtrl("index", ["$scope", svcName("index")], function ($scope, index) {

  });
  controllers.push(ctrl);
  routers.push(portalRouter("index", "", "/index.html", ctrl.name))
})();
