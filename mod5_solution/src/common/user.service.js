(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;

  service.getMenuItem = function (shortName) {
    return $http.get(ApiPath + '/menu_items/'+shortName+'.json').then(function (response) {
      return response.data;
    });
  };

  service.signup = function(user) {
      service.user = user;
  };

  service.getUser = function() {
      return service.user;
  };

}



})();
