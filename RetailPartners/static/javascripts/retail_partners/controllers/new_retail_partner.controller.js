(function () {
  'use strict';

  angular
    .module('RetailPartners.retail_partners.controllers')
    .controller('NewRetailPartnerController', NewRetailPartnerController);

  NewRetailPartnerController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'retailPartners'];

  /**
  * @namespace NewRetailPartnerController
  */
  function NewRetailPartnerController($rootScope, $scope, Authentication, Snackbar, retailPartners) {
    var vm = this;
    vm.hideForm = false;
    vm.reviewForm = true;

    // vm.submit = submit;
    vm.loadMap = loadMap;
    vm.preventSubmit = preventSubmit;
    vm.toggleForms = toggleForms;

    function toggleForms(){
      vm.reviewForm = !vm.reviewForm;
    }

    function preventSubmit(event){
      submit();
      if(event.keyCode == 13){
        event.preventDefault();
        event.stopPropagation();
      }
    }
    // activate();
    function loadMap(){

      if($("#rp_data_entry").valid()){
        vm.hideForm = !vm.hideForm;
        // vm.reviewForm = !vm.reviewForm;
        vm.location_string = vm.address_line_1;
        var mapOptions = {
          zoom: 14,
          center: new google.maps.LatLng(30.7333, 76.7794),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $('#pac-input').val(vm.address_line_1);
        var latlng = vm.map.getCenter().toUrlValue();
        var LatLngSplit = latlng.split(",");
        vm.latitude = LatLngSplit[0];
        vm.longitude = LatLngSplit[1];
        vm.location_string = $('#pac-input').val();
        google.maps.event.addListener(vm.map, "dragend", function() {
            latlng = vm.map.getCenter().toUrlValue();
            LatLngSplit = latlng.split(",");
            vm.latitude = LatLngSplit[0];
            vm.longitude = LatLngSplit[1];
            vm.location_string = $('#pac-input').val();
        });
        var input = document.getElementById('pac-input');
        vm.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          var autocomplete = new google.maps.places.Autocomplete(input);
          // autocomplete.bindTo('bounds', $scope.map);
          autocomplete.addListener('place_changed', function () {
              setPlace();
          });


          var setPlace = function () {
              //infoWindow.close();
              var place = autocomplete.getPlace();
              if (!place.geometry) {
                  window.alert("Autocomplete's returned place contains no geometry");
                  return;
              }

              // If the place has a geometry, then present it on a map.
              if (place.geometry.viewport) {
                  vm.map.fitBounds(place.geometry.viewport);
              } else {
                  vm.map.setCenter(place.geometry.location);
              }
              latlng = vm.map.getCenter().toUrlValue();
              LatLngSplit = latlng.split(",");
              vm.latitude = LatLngSplit[0];
              vm.longitude = LatLngSplit[1];
              vm.location_string = $('#pac-input').val()
          }
          $scope.openInfoWindow = function (e, selectedMarker) {
              e.preventDefault();
              google.maps.event.trigger(selectedMarker, 'click');
          }
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


    function sleep(miliseconds) {
       var currentTime = new Date().getTime();

       while (currentTime + miliseconds >= new Date().getTime()) {
       }
    }


    function uploadImagesS3(files){
      if(files){
        AWS.config.update({accessKeyId: 'AKIAJP7W6Y6BHJL5JYAQ', secretAccessKey: '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'});
        AWS.config.region = 'ap-southeast-1';
        var bucket = new AWS.S3({params: {Bucket: 'retail-partners-images'}});
        for(var i=0;i<files.length;i++) {
          var file = dataURItoBlob(files[i]['resized']['dataURL']);
          var break_url = files[i]['url'].split('/')
          var hash_name = break_url[break_url.length - 1]
          if (file) {
            var params = {Key: hash_name, ContentType: file.type, Body: file};
            sleep(1000);
            bucket.upload(params, function (err, data) {
              console.log(err)
            });
          } 
        }
      }
    }
    /**
    * @name submit
    * @desc Create a new Post
    * @memberOf RetailPartners.posts.controllers.NewRetailPartnerController
    */
    function submit() {
      try{
        vm.retail_partner_category = parseInt(vm.retail_partner_category)
      }catch(err){
        console.log(err)
      }
      uploadImagesS3(vm.files);
      
      $rootScope.$broadcast('retailPartners.created', {
        vm: vm,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();
      retailPartners.create(vm).then(createPostSuccessFn, createPostErrorFn);


      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Post created.');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('retailPartners.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();