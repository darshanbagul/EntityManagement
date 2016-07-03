(function () {
  'use strict';

  angular
    .module('RetailPartners.city_profiles.services')
    .factory('CityProfile', CityProfile);

  CityProfile.$inject = ['$http'];

  /**
  * @namespace CityProfile
  */
  function CityProfile($http) {
    /**
    * @name CityProfile
    * @desc The factory to be returned
    * @memberOf RetailPartners.city_profiles.services.CityProfile
    */
    var CityProfile = {
      get: get,
    };

    return CityProfile;

    /////////////////////

    /**
    * @name get
    * @desc Gets the profile for user with username `username`
    * @param {string} username The username of the user to fetch
    * @returns {Promise}
    * @memberOf RetailPartners.city_profiles.services.Profile
    */
    function get(city_name) {
      console.log(city_name);
      return $http.get('/emd/get_city_profile?city=' + city_name);
    }
  }
})();