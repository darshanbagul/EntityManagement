(function () {
  'use strict';

  angular
    .module('RetailPartners.communication.controllers')
    .controller('EmailClient', EmailClient);

  EmailClient.$inject = ['$rootScope', '$routeParams','$location','$scope', 'Authentication', 'Snackbar', 'retailPartners'];

  /**
  * @namespace EmailClient
  */
  function EmailClient($rootScope, $routeParams, $location, $scope, Authentication, Snackbar, retailPartners) {
    var vm = this;
    vm.submit = submit;
    activate();

    function activate(){
      var rp_id = $routeParams.id;
      retailPartners.fetch(rp_id).then(retailPartnersSuccessFn, retailPartnersErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Update `profile` for view
      */
      function retailPartnersSuccessFn(data, status, headers, config) {
        vm.email = [data.data.email];
        console.log(vm.email);
        
      }

      /**
      * @name profileErrorFn
      * @desc Redirect to index
      */
      function retailPartnersErrorFn(data, status, headers, config) {
        $location.url('/emd');
        Snackbar.error('That user does not exist.');
      }
    }
    /** 
    * @name submit
    * @desc Create a new Post
    * @memberOf RetailPartners.communication.controllers.EmailClient
    */
    function submit() {
      console.log(vm);
      $scope.closeThisDialog();
      retailPartners.send_mail(vm).then(createPostSuccessFn, createPostErrorFn);

      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        Snackbar.show('Email Sent Successfully!');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();