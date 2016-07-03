(function () {
  'use strict';

  angular
    .module('RetailPartners.profiles.services')
    .factory('Profile', Profile);

  Profile.$inject = ['$http'];

  /**
  * @namespace Profile
  */
  function Profile($http) {
    /**
    * @name Profile
    * @desc The factory to be returned
    * @memberOf RetailPartners.profiles.services.Profile
    */
    var Profile = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Profile;

    /////////////////////

    /**
    * @name destroy
    * @desc Destroys the given profile
    * @param {Object} profile The profile to be destroyed
    * @returns {Promise}
    * @memberOf RetailPartners.profiles.services.Profile
    */
    function destroy(profile) {
      return $http.delete('/emd/api/v1/accounts/' + profile.id + '/');
    }


    /**
    * @name get
    * @desc Gets the profile for user with username `username`
    * @param {string} username The username of the user to fetch
    * @returns {Promise}
    * @memberOf RetailPartners.profiles.services.Profile
    */
    function get(username) {
      console.log("Here I am")
      return $http.get('/emd/api/v1/accounts/' + username + '/');
    }


    /**
    * @name update
    * @desc Update the given profile
    * @param {Object} profile The profile to be updated
    * @returns {Promise}
    * @memberOf RetailPartners.profiles.services.Profile
    */
    function update(profile) {
      return $http.put('/emd/api/v1/accounts/' + profile.username + '/', profile);
    }
  }
})();