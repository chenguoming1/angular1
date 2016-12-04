angular.module('MenuApp').service('MenuDataService', ['$http', 'baseUrl', function($http, baseUrl) {
  var dataService = this;

  dataService.getAllCategories = function() {
    var url = baseUrl+'/categories.json';

    return $http({
      method: "GET",
      url: url
    }).then(function (result) {
      return result.data;
    });
  };

  dataService.getItemsForCategory = function(categoryShortName) {
    var url = baseUrl + '/menu_items.json?category='+categoryShortName;
    return $http({
      method: "GET",
      url: url
    }).then(function (result) {
      return result.data;
    });
  };

}]);
