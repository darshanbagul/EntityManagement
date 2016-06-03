/**
* DataValidationController
* @namespace RetailPartners.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('RetailPartners.profiles.controllers')
    .controller('DataValidationController', DataValidationController);

  DataValidationController.$inject = ['$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar','retailPartners'];

  /**
  * @namespace DataValidationController
  */
  function DataValidationController($location, $routeParams, Authentication, Profile, Snackbar,retailPartners) {
    var vm = this;

    vm.profile = undefined;
    vm.retailPartners = [];
    vm.openProfile = function(rp_id){
      window.location = '/retail_partner/' + rp_id + '/validate';
    }
    vm.review_data_entry = review_data_entry;
    vm.validate = validate;
    vm.destroy = destroy;
    vm.restore = restore;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf RetailPartners.profiles.controllers.DataValidationController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      // var username = $routeParams.username.substr(1);

      // Redirect if not logged in
      if (!authenticatedAccount || !authenticatedAccount.is_admin) {
        $location.url('/');
        Snackbar.error('You are not authorized to view this page.');
      }

      // Profile.get(username).then(profileSuccessFn, profileErrorFn);
      retailPartners.get_data_approval().then(retailPartnersSuccessFn, retailPartnersErrorFn);
      
      /**
        * @name retailPartnersSucessFn
        * @desc Update `retailPartners` on viewmodel
        */
      function retailPartnersSuccessFn(data, status, headers, config) {
        vm.retailPartners = data.data;
        console.log(vm)
      }


      /**
        * @name retailPartnersErrorFn
        * @desc Show error snackbar
        */
      function retailPartnersErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }

    function review_data_entry(event, rp_id) {
      event.preventDefault();
      event.stopPropagation();
      retailPartners.send_for_review(rp_id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        window.location = '/';
        Snackbar.show('Retail Partner has been sent for review');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    function validate(event, rp_id) {
      event.preventDefault();
      event.stopPropagation();
      retailPartners.validate(rp_id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        window.location = '/';
        Snackbar.show('Retail Partner has been deactivated');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    function destroy(event, rp_id) {
      event.preventDefault();
      event.stopPropagation();
      retailPartners.deactivate_admin(rp_id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        window.location = '/';
        Snackbar.show('Retail Partner has been deactivated!');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    function restore(event, rp_id) {
      event.preventDefault();
      event.stopPropagation();
      retailPartners.restore_admin(rp_id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        window.location = '/';
        Snackbar.show('Retail Partner has been reactivated!');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

  }
})();