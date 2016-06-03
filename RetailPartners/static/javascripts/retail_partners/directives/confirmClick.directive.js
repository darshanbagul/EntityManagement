(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.directives')
    .directive('ngConfirmClick', function() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf RetailPartners.retail_partners.directives.retailPartners
    */
   return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  });
})();