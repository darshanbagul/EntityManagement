(function () {
  'use strict';

  angular
    .module('RetailPartners.mapview', [
      'RetailPartners.mapview.controllers',
    ]);

  angular
    .module('RetailPartners.mapview.controllers', ['uiGmapgoogle-maps']);
})();