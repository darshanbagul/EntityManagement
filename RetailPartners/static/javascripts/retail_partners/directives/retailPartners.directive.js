(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.directives')
    .directive('retailPartners',function() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf RetailPartners.retailPartners.directives.retailPartners
    */
    console.log("Dir")
    var directive = {
      controller: 'RetailPartnersController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        retail_partners: '='
      },
      templateUrl: '/static/templates/retail_partners/retail_partners.html'
    };

    return directive;
  }
);
})();