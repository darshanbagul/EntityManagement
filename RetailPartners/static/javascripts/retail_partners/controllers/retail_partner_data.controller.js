/**
* RetailPartnerDataController
* @namespace RetailPartners.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.controllers')
    .controller('RetailPartnerDataController', RetailPartnerDataController);

  RetailPartnerDataController.$inject = [
    '$location', '$routeParams', 'Authentication', 'retailPartners', 'Snackbar'
  ];

  /**
  * @namespace RetailPartnerDataController
  */
  function RetailPartnerDataController($location, $routeParams, Authentication, retailPartners, Snackbar) {
    var vm = this;
    vm.destroy = destroy;
    vm.update = update;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf RetailPartners.profiles.controllers.RetailPartnerDataController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      // var username = $routeParams.username.substr(1);
      var rp_id = $routeParams.id;
      // Redirect if not logged in
      // if (!authenticatedAccount) {
      //   $location.url('/');
      //   Snackbar.error('You are not authorized to view this page.');
      // } else {
      //   // Redirect if logged in, but not the owner of this profile.
      //   if (authenticatedAccount.username !== username) {
      //     $location.url('/');
      //     Snackbar.error('You are not authorized to view this page.');
      //   }
      // }

      retailPartners.fetch(rp_id).then(retailPartnersSuccessFn, retailPartnersErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Update `profile` for view
      */
      function retailPartnersSuccessFn(data, status, headers, config) {
        vm.retailPartner = data.data;
      }

      /**
      * @name profileErrorFn
      * @desc Redirect to index
      */
      function retailPartnersErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }
    }


    /**
    * @name destroy
    * @desc Destroy this user's profile
    * @memberOf RetailPartners.profiles.controllers.RetailPartnerDataController
    */
    function destroy() {
      retailPartners.destroy(vm.retailPartner.id).then(profileSuccessFn, profileErrorFn);

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

    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    function uploadImagesS3(files){
      if(files){
        AWS.config.update({accessKeyId: YOUR_ACCESS_ID, secretAccessKey: YOUR_SECRET_KEY});
        AWS.config.region = 'ap-southeast-1';
        var bucket = new AWS.S3({params: {Bucket: 'retail-partners-images'}});
        for(var i=0;i<files.length;i++) {
          var file = dataURItoBlob(files[i]['resized']['dataURL']);
          var break_url = files[i]['url'].split('/')
          var hash_name = break_url[break_url.length - 1]
          if (file) {
            var params = {Key: hash_name, ContentType: file.type, Body: file};
            bucket.upload(params, function (err, data) {
              console.log(err)
            });
          } 
        }
      }
    }

    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf RetailPartners.profiles.controllers.RetailPartnerDataController
    */
    function update() {
      try{
        vm.retailPartner.retail_partner_category = parseInt(vm.retailPartner.retail_partner_category);
      }catch(err){
        console.log(err);
      }
      uploadImagesS3(vm.retailPartner.files);
      vm.retailPartner.updated_by = Authentication.getAuthenticatedAccount().username;
      vm.retailPartner.status = 1
      retailPartners.update(vm.retailPartner).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Show success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Snackbar.show('Your profile has been updated.');
        window.location = '/';
      }


      /**
      * @name profileErrorFn
      * @desc Show error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();