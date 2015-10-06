/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function () {
  var dct = initDir("Footer", function () {
    return {
      restrict: 'AE',
      replace: true,
      controller: ["$scope", "$element", function ($scope, $element) {
      }],
      templateUrl: commonUrl + "/footer.html"
    };
  });
  directives.push(dct);
})();