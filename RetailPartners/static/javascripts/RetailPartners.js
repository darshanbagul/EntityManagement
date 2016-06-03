(function () {
  'use strict';

  angular
    .module('RetailPartners', [
      'RetailPartners.config',
      'RetailPartners.routes',
      'RetailPartners.authentication',
      'RetailPartners.layout',
      'RetailPartners.retail_partners',
      'RetailPartners.utils',
      'RetailPartners.profiles',
      'RetailPartners.city_profiles',
      'RetailPartners.mapview',
      'RetailPartners.communication',
      'angularUtils.directives.dirPagination',
    ]);

   angular
  	.module('RetailPartners.config', []);

  angular
    .module('RetailPartners.routes', ['ngRoute']);  

angular
  .module('RetailPartners')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}

})();

// angular
//   .module('RetailPartners')
//   .run(run);

// run.$inject = ['$http'];

// *
// * @name run
// * @desc Update xsrf $http headers to align with Django's defaults

// function run($http) {
//   $http.defaults.xsrfHeaderName = 'X-CSRFToken';
//   $http.defaults.xsrfCookieName = 'csrftoken';
// }