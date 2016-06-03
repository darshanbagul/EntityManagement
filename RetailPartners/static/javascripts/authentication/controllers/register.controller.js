(function () {
  'use strict';

  angular
    .module('RetailPartners.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name register
    * @desc Register a new user
    * @memberOf RetailPartners.authentication.controllers.RegisterController
    */
    function register() {
      console.log(vm.email)
      Authentication.register(vm.email, vm.password, vm.username);
    }
  }
})();