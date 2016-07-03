(function () {
  'use strict';

  angular
    .module('RetailPartners.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate,
      data : {}
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf RetailPartners.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/emd/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password);
      }
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }


    function login(email, password) {
      return $http.post('/emd/api/v1/auth/login/', {
        email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);
      
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        Authentication.data.loginSuccess = true;
        window.location = '/emd';
      }

      function loginErrorFn(data, status, headers, config) {
        Authentication.data.loginSuccess = false;
      }
    }

    function logout() {
      return $http.post('/emd/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/emd';
      }
      function logoutErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }
      return JSON.parse($cookies.authenticatedAccount);
    }
    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }
    function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }
    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }

  }
})();