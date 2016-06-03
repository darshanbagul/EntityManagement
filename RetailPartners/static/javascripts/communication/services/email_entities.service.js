(function () {
  'use strict';

  angular
    .module('RetailPartners.communication.services')
    .factory('emailEntities', emailEntities);

    function emailEntities(){
    	var emailList = [];

		var addEmails = function(newObj) {
			emailList = newObj;
		};

		var getEmailList = function(){
			return emailList;
		};

		return {
			addEmails: addEmails,
			getEmailList: getEmailList
		};

    }
})();