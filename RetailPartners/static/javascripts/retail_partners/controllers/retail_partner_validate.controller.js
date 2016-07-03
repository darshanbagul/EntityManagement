/**
* ProfileController
* @namespace RetailPartners.retail_partners.controllers
*/
(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.controllers')
    .controller('RetailPartnerValidateController', RetailPartnerValidateController);

  RetailPartnerValidateController.$inject = ['$location', '$routeParams', 'retailPartners', 'Authentication','Snackbar'];

  /**
  * @namespace RetailPartnerValidateController
  */
  function RetailPartnerValidateController($location, $routeParams, retailPartners, Authentication, Snackbar) {
    var vm = this;
    console.log(vm)
    vm.retailPartner = undefined;
    vm.review_data_entry = review_data_entry;
    vm.destroy = destroy;
    vm.validate = validate;
    vm.restore = restore;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf RetailPartners.retail_partners.controllers.RetailPartnerValidateController
    */
    function activate() {
      // var username = $routeParams.username.substr(1);
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount);
      if (!authenticatedAccount || !authenticatedAccount.is_admin) {
        $location.url('/emd');
        Snackbar.error('You are not authorized to view this page.');
      } 

      var rp_id = $routeParams.id;
      // Profile.get(username).then(retail_partnersuccessFn, profileErrorFn);
      retailPartners.fetch(rp_id).then(retailPartnersSuccessFn, retailPartnersErrorFn);
    
      /**
        * @name retailPartnersSucessFn
        * @desc Update `retailPartners` on viewmodel
        */
      function retailPartnersSuccessFn(data, status, headers, config) {
        vm.retailPartner = data.data;
        vm.map = { center: { latitude: vm.retailPartner.location_latitude, longitude: vm.retailPartner.location_longitude }, zoom: 12  };
        vm.marker = {latitude: vm.retailPartner.location_latitude, longitude: vm.retailPartner.location_longitude}
        console.log(vm)
      }


      /**
        * @name retailPartnersErrorFn
        * @desc Show error snackbar
        */
      function retailPartnersErrorFn(data, status, headers, config) {
        $location.url('/emd');
        Snackbar.error('Error fetching retail partner');
      }
    }

    function review_data_entry() {
      retailPartners.send_for_review(vm.retailPartner.id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        window.location = '/emd';
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

    function validate() {
      console.log(vm.retailPartner.status)
      retailPartners.validate(vm.retailPartner.id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        // window.location = '/';
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

    function destroy() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount);
      if (!authenticatedAccount || !authenticatedAccount.is_admin) {
        $location.url('/emd');
        Snackbar.error('You are not authorized to view this page.');
      }
      retailPartners.deactivate_admin(vm.retailPartner.id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        // window.location = '/';
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

    function restore() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount);
      if (!authenticatedAccount || !authenticatedAccount.is_admin) {
        $location.url('/emd');
        Snackbar.error('You are not authorized to view this page.');
      }
      retailPartners.restore_admin(vm.retailPartner.id).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        // window.location = '/';
        Snackbar.show('Retail Partner has been reactivated');
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