/**
 * auth : iMethod
 * create_at: 15/10/4.
 * desc:
 * note:
 *  1.
 */
function routerConfig($stateProvider, $urlRouterProvider) {

  angular.forEach(routers, function (rout) {
    $stateProvider.state(rout.state, {
      url: rout.url,
      templateUrl: rout.templateUrl,
      controller: rout.controller
    })
  });
  $urlRouterProvider.otherwise("");
}
