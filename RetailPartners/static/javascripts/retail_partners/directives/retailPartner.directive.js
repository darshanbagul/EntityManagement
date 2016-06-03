(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.directives')
    .directive('retailPartner', function() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf RetailPartners.retail_partners.directives.retailPartners
    */
    console.log("Test")
    var directive = {
      restrict: 'E',
      scope: {
        retailPartner: '='
      },
      templateUrl: '/static/templates/retail_partners/retail_partner.html'
    };

    return directive;
  }
);
})();