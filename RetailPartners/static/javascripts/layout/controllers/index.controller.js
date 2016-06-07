(function () {
  'use strict';

  angular
    .module('RetailPartners.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'retailPartners', 'emailEntities','Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, retailPartners, emailEntities, Snackbar) {
    var vm = this;
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.retailPartners = [];
    vm.toggleCheckList = toggleCheckList;
    vm.destroy = destroy;
    var itemsCheckedList = false;
    vm.getCheckedList = getCheckedList;
    activate();

    function getCheckedList(){
      var email_list = [];
      vm.retailPartners.map(function(item){
        if(vm.checked_items.indexOf(item.id) > -1){
          email_list.push(item.email)
          return 1;
        }
        else{
          return 0;
        }
      })
      emailEntities.addEmails(email_list);
    }

    function destroy(){
      retailPartners.deactivate_bulk(vm.checked_items).then(deactivationSuccess, deactivationError);

      /**
      * @name deactivationSuccess
      * @desc Redirect to index and display success snackbar
      */
      function deactivationSuccess(data, status, headers, config) {
        window.location = '/emd';
        Snackbar.show('Retail Partners deactivation request successfull!');
      }


      /**
      * @name deactivationError
      * @desc Display error snackbar
      */
      function deactivationError(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf RetailPartners.layout.controllers.IndexController
    */
    function toggleCheckList(){
      console.log(vm);
      itemsCheckedList = !itemsCheckedList;
      console.log(itemsCheckedList);
      if(itemsCheckedList){
          vm.checked_items = vm.retailPartners.map(function(item) { return item.id; });
      }
      else{
          vm.checked_items = []
      }
    }

    function activate() {
      retailPartners.all().then(retailPartnersSuccessFn, retailPartnersErrorFn);
      $scope.$on('retailPartners.created', function (event, retailPartners) {
        console.log(retailPartners);
        vm.retailPartners.unshift(retailPartners);
        console.log(vm.retailPartners);
      });

      $scope.$on('retailPartners.created.error', function () {
        vm.retailPartners.shift();
      });

      $scope.openProfile = function(){
        window.location = '/emd/retail_partner/' + this.retail_partner.id;
      }
      /**
      * @name retailPartnersSuccessFn
      * @desc Update retailPartners array on view
      */
      function retailPartnersSuccessFn(data, status, headers, config){
        vm.retailPartners = data.data;
        //Number of RPs added daily, line chart
        var past_week = [];
        var rps_per_day = {};
        var values_list = []
        var rps_per_city = {};
        var city_rp_count = []

        for (var i=6; i>=0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            date = d.toLocaleDateString();
            past_week.push(date)
            rps_per_day[date] = 0
        }

        for(var obj in vm.retailPartners){
          var city = vm.retailPartners[obj].city
          var date =  (new Date(vm.retailPartners[obj].created_at)).toLocaleDateString();
          if($.inArray(date, past_week) > 0){          
              rps_per_day[date]++;
          }

          if(rps_per_city[city]){
            rps_per_city[city]++;
          }
          else{
            rps_per_city[city] = 1;
          }
        }

        for(var key in rps_per_day) {
            values_list.push(rps_per_day[key]);
        }
        Highcharts.chart('weekly_rp_distribution', {
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

        var sorted_city_list = Object.keys(rps_per_city).sort(function(a, b) {return -(rps_per_city[a] - rps_per_city[b])});
        i = 0
        for(var key in sorted_city_list) {
            console.log(key);
            if(i==5){
              break;
            }
            city_rp_count.push(rps_per_city[sorted_city_list[key]]);
            i++;
        }
        Highcharts.chart('rp_city_distribution', {
          chart: {
                  type: 'column',
                  width: 600,
                  height: 300,
                  backgroundColor: "#EEEEEE"
          },
          legend: {
            enabled: false
          },
          title: {
              text: 'Entities: City wide distribution'
          },
          xAxis: {
              categories: sorted_city_list
          },

          series: [{
              color: '#00b29c',
              data: city_rp_count
          }]
        });

      }
      /**
      * @name retailPartnersErrorFn
      * @desc Show snackbar with error
      */
      function retailPartnersErrorFn(data, status, headers, config){
        Snackbar.error(data.error);
      }
    }
  }
})();