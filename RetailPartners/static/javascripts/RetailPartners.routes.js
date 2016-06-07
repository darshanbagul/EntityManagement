(function () {
  'use strict';

  angular
    .module('RetailPartners.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider
    .when('/emd/register', {
      controller: 'RegisterController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    })
    .when('/emd/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    })
    .when('/emd/+:username', {
      controller: 'ProfileController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/profiles/profile.html'
    })
    .when('/emd/+:username/settings', {
      controller: 'ProfileSettingsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/profiles/settings.html'
    })
    .when('/emd/+:username/validations', {
      controller: 'DataValidationController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/profiles/validate_data.html'
    })
    .when('/emd/retail_partner/:id', {
      controller: 'RetailPartnerProfileController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/retail_partners/rp_profile.html'
    })
    .when('/emd/retail_partner/:id/validate', {
      controller: 'RetailPartnerValidateController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/retail_partners/rp_profile_validate.html'
    })
    .when('/emd/retail_partner/:id/edit', {
      controller: 'RetailPartnerDataController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/retail_partners/rp_profile_edit.html'
    })
    .when('/emd/retail_partners/:city', {
      controller: 'CityProfileController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/city_profiles/city_profile.html'
    })
    .when('/emd', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    })
    .otherwise('/');
  }
})();