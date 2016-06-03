(function () {
  'use strict';

  angular
    .module('RetailPartners.communication.controllers')
    .controller('MultipleEmailClient', MultipleEmailClient);

  MultipleEmailClient.$inject = ['$rootScope', '$routeParams','$location','$scope', 'Authentication', 'Snackbar', 'retailPartners', 'emailEntities'];

  /**
  * @namespace MultipleEmailClient
  */
  function MultipleEmailClient($rootScope, $routeParams, $location, $scope, Authentication, Snackbar, retailPartners, emailEntities) {
    var vm = this;
    vm.submit = submit;
    activate();

    function activate(){
      vm.email = emailEntities.getEmailList();
      console.log(vm.email);
    }
    /** 
    * @name submit
    * @desc Create a new Post
    * @memberOf RetailPartners.communication.controllers.MultipleEmailClient
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