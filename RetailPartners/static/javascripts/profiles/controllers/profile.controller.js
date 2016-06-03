/**
* ProfileController
* @namespace RetailPartners.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('RetailPartners.profiles.controllers')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location', '$routeParams', 'retailPartners', 'Profile', 'Snackbar'];

  /**
  * @namespace ProfileController
  */
  function ProfileController($location, $routeParams, retailPartners, Profile, Snackbar) {
    var vm = this;

    vm.profile = undefined;
    vm.retailPartners = [];
    vm.openProfile = function(rp_id){
      window.location = '/retail_partner/' + rp_id;
    }
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf RetailPartners.profiles.controllers.ProfileController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      retailPartners.get(username).then(retailPartnersSuccessFn, retailPartnersErrorFn);
      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }


      /**
        * @name retailPartnersSucessFn
        * @desc Update `retailPartners` on viewmodel
        */
      function retailPartnersSuccessFn(data, status, headers, config) {
        vm.retailPartners = data.data;
        console.log(vm)
        var past_week = [];
        var rps_per_day = {};
        var values_list = []
        for (var i=6; i>=0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            date = d.toLocaleDateString();
            past_week.push(date)
            rps_per_day[date] = 0
        }
        for(var obj in vm.retailPartners){
          var date =  (new Date(vm.retailPartners[obj].created_at)).toLocaleDateString();
          if($.inArray(date, past_week) > 0){          
              rps_per_day[date]++;
          }
        }

        for(var key in rps_per_day) {
            values_list.push(rps_per_day[key]);
        }
        Highcharts.chart('my_contribution_last_week', {
          chart: {
                  width: 600,
                  height: 300,
                  backgroundColor: "#EEEEEE"
          },
          title: {
              text: 'Entities added in last 7 days'
          },
          xAxis: {
              categories: Object.keys(rps_per_day)
          },
          legend: {
            enabled: false
          },
          series: [{
              color: '#00a1be',
              data: values_list
          }]
        });
      }


      /**
        * @name retailPartnersErrorFn
        * @desc Show error snackbar
        */
      function retailPartnersErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();