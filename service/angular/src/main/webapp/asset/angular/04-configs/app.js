/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
(function(){
  angular.module(appName, ['ui.router', serviceName,controllerName,directiveName])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) {
      routerConfig($stateProvider, $urlRouterProvider);
      $sceProvider.enabled(false);
    }]);
})();

