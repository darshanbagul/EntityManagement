(function () {
  'use strict';

  angular
    .module('RetailPartners.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Snackbar','Authentication'];

  /**
  * @namespace LoginController
  */
  function LoginController($location, $scope, Snackbar,Authentication) {
    var vm = this;
    vm.loginSuccess = true;
    vm.login = login;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf RetailPartners.authentication.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/emd');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf RetailPartners.authentication.controllers.LoginController
    */
    function login() {
      Authentication.login(vm.email, vm.password).then(loginSuccessFn, loginErrorFn);
      
      function loginSuccessFn(data, status, headers, config) {
        vm.loginSuccess = Authentication.data.loginSuccess;
      }

      function loginErrorFn(data, status, headers, config) {
        console.log("Unexpected Error!")
      }
    }
  }
})();