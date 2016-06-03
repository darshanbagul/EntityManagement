(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners', [
      'RetailPartners.retail_partners.controllers',
      'RetailPartners.retail_partners.directives',
      'RetailPartners.retail_partners.services',
    ]);

  angular
    .module('RetailPartners.retail_partners.controllers', []);

  angular
    .module('RetailPartners.retail_partners.directives', ['ngDialog']);

  angular
    .module('RetailPartners.retail_partners.services', []);
})();