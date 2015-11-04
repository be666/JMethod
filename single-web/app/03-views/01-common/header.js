/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var dct = initDir("Header", [svcName("common.header")], function (hSvc) {
    return {
      restrict: 'EMCA',
      replace: true,
      transclude: true,
      controller: ["$scope", "$element", "$state", "$stateParams", function ($scope, $element, $state, $stateParams) {
        $scope.$state = $state;
        $scope.navList = hSvc.queryNavList();
        $scope.logo = hSvc.queryLogo();
      }],
      templateUrl: commonUrl + "/header.html"
    };
  });
  directives.push(dct);
})();