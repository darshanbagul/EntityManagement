(function () {
  'use strict';

  angular
    .module('RetailPartners.authentication', [
      'RetailPartners.authentication.controllers',
      'RetailPartners.authentication.services'
    ]);

  angular
    .module('RetailPartners.authentication.controllers', []);

  angular
    .module('RetailPartners.authentication.services', ['ngCookies']);
})();