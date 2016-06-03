(function () {
  'use strict';

  angular
    .module('RetailPartners.mapview.controllers')
    .controller('MapViewController', MapViewController);

    function MapViewController($scope) {
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
    }

});