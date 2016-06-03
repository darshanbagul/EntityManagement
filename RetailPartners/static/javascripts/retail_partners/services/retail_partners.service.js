(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.services')
    .factory('retailPartners', retailPartners);

  retailPartners.$inject = ['$http'];

  /**
  * @namespace retailPartners
  * @returns {Factory}
  */
  function retailPartners($http) {
    var retailPartners = {
      all: all,
      create: create,
      get: get,
      fetch: fetch,
      update: update,
      destroy: destroy,
      deactivate_bulk : deactivate_bulk,
      restore: restore,
      get_data_approval : get_data_approval,
      validate : validate,
      send_for_review : send_for_review,
      deactivate_admin : deactivate_admin,
      restore_admin : restore_admin,
      send_mail : send_mail
    };

    return retailPartners;

    /**
    * @name all
    * @desc Get all retailPartners
    * @returns {Promise}
    * @memberOf RetailPartners.retailPartners.services.retailPartners
    */
    function all() {
      return $http.get('/api/v1/retail_partners/');
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf RetailPartners.retailPartners.services.retailPartners
    */
    function create(vm) {
      return $http.post('/api/v1/retail_partners/', {
        contact_name: vm.contact_name,
        business_name: vm.business_name,
        email:vm.email,
        contact_number:vm.contact_number,
        address_line_1:vm.address_line_1,
        address_line_2:vm.address_line_2,
        city:vm.city,
        state:vm.state,
        country:vm.country,
        pin:vm.pincode,
        location_string:vm.location_string,
        location_latitude:parseFloat(vm.latitude),
        location_longitude:parseFloat(vm.longitude),
        strategic_advantage:vm.strategic_advantage,
        retail_location_type:vm.retail_location_type,
        files:vm.files,
        retail_partner_category:vm.retail_partner_category,
        status:1
      });
    }

    function send_mail(vm) {
      return $http.post('/send_mail', {
        email: vm.email,
        message: vm.message,
        subject: vm.subject
      });
    }

    /**
     * @name get
     * @desc Get the retailPartners of a given user
     * @param {string} username The username to get retailPartners for
     * @returns {Promise}
     * @memberOf RetailPartners.retailPartners.services.retailPartners
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/retail_partners/');
    }

    function fetch(id){
      return $http.get('/get_rp_profile?id=' + id);
    }

    function update(retail_partner) {
      return $http.put('/retail_partner/update', retail_partner);
    }

    function destroy(id){
      return $http.post('/deactivate', {
        deactivate_list: [id]
      }); 
    }

    function deactivate_bulk(deactivate_list){
      return $http.post('/deactivate', {
        deactivate_list: deactivate_list
      });
    }

    function deactivate_admin(id){
      return $http.get('/deactivate_admin?id=' + id); 
    }

    function restore(id){
      return $http.get('/reactivate?id=' + id); 
    }

    function restore_admin(id){
      return $http.get('/reactivate_admin?id=' + id); 
    }

    function get_data_approval(){
      return $http.get('/fetch_data_for_validation');
    }

    function validate(id){
      return $http.get('/validate?id=' + id); 
    }

    function send_for_review(id){
      return $http.get('/send_for_review?id=' + id); 
    }
  }
})();